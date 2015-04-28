function BetsList(config) {
	GenericView.call(this,config);	
}

inheritPrototype(BetsList, GenericView);

BetsList.prototype.constructor = BetsList;

BetsList.prototype.initializeParameters = function(){
	GenericView.prototype.initializeParameters.call(this);
}

BetsList.prototype.initialize = function(){
	GenericView.prototype.initialize.call(this);
	
	var today = new Date();
	var betsData = Utils.getMainInstance().lotteryDataBase.query("bets");
	if(betsData.length > 0) {
		var lastBetDate = new Date(Date.parse(betsData[betsData.length-1].bet_created));
		if(lastBetDate.getDate() != today.getDate()){
			// Remover apuestas
			Utils.getMainInstance().lotteryDataBase.deleteRows("bets");
			Utils.getMainInstance().lotteryDataBase.commit();
			alert("Se removieron todas las apuetas del dia anterior");
		} else {
			console.log("Las apuestas son todas del dia de hoy");
		}
	}

	this.getAllBets();

	$(document).bind("removeBet", { context:this },this.removeBet,false);
}

BetsList.prototype.getAllBets = function() {
	$(this.node).find(".bets-list-data").empty();
	var hasBets = false;
	var betsData = Utils.getMainInstance().lotteryDataBase.queryAll("bets",{ query:{ bet_type:this.betType },sort : [["ID","DESC"]] });
	betsData.forEach(function(b){
		if(b.is_active==1) {
			hasBets = true;
			switch(this.betType){
				case 1:
					var itemBetsList = new ItemBetsQuinielaList( { container : $(this.node).find(".bets-list-data"), betData : b } );
					break;
				case 2:
					var itemBetsList = new ItemBetsBorratinaList( { container : $(this.node).find(".bets-list-data"), betData : b } );
					break;
			}
			
			$(itemBetsList).bind( Globals.SHOW_ITEM_OPTIONS, { context:this }, this.showItemOptions, false );
		}
	},this);

	if(!hasBets){
		$(this.node).find(".bets-list-data").append("<li class='no-bets'>No hay apuestas cargadas o ya han sido sincronizadas</li>");
	}
}

BetsList.prototype.showItemOptions = function(e) {
	Utils.getOverlay();
	var betOptions = new PopupBetOptions( { container:$("body"), _parent:e.data.context, betData:e.betData } );
}

BetsList.prototype.removeBet = function(bet) {
	Utils.getMainInstance().lotteryDataBase.update("bets",{ID: bet.ID},function(row){
		var canDelete = Utils.checkBetLimit(row);
		if(canDelete) {
			if(row.bet_sent == 1){
				alert("La apuesta no puede ser removida porque ya fué sincronizada");
			} else {
				row.is_active = 0,
				row.is_editable = 0,
				row.bet_canceled = new Date();
			}
		} else {
			row.is_active = 1;
			alert("No se puede remover la apuesta");
		}
		return row;
	});
	Utils.getMainInstance().lotteryDataBase.commit();
	this.getAllBets();
}

BetsList.prototype.uploadBet = function(id) {
	var vendorStatus = Utils.getMainInstance().checkIfVendorIsActive();
	
	if(vendorStatus==null){
		alert("Usuario eliminado permanentemente o problemas con la conexión");
		Utils.getMainInstance().getLogin();
		return false
	}

	if(vendorStatus=="0") {
		alert("Usuario bloqueado temporalmente");
		Utils.getMainInstance().getLogin();
		return false;
	}

	if(Utils.getMainInstance().lotteryDataBase.query("bets",{ID:id})[0].bet_sent == 1) {
		alert("La jugada ya se sincronizó previamente");
	} else {
		Utils.showMessage("Sincronizando jugada al servidor.");
		this.dataToSend = Utils.getMainInstance().lotteryDataBase.query("bets",{ID:id})[0];
		this.betLocalId = id;
		$.ajax({
			context : this,
			async : false,
			type : "POST",
			data : {
				idLocal:this.betId,
				betNumber:this.dataToSend.bet_number,
				betPosition:this.dataToSend.bet_position,
				betAmount:this.dataToSend.bet_amount,
				betNumberRedoblona:this.dataToSend.bet_number_redoblona,
				betPositionRedoblona:this.dataToSend.bet_position_redoblona,
				betData:this.dataToSend.bet_data,
				betTotalAmount:this.dataToSend.bet_total_amount,
				idDevice:Utils.getUserData().idDevice,
				idVendor:Utils.getUserData().idVendor,
				betCreated:this.dataToSend.bet_created,
				betCanceled:this.dataToSend.bet_canceled,
				isActive:this.dataToSend.is_active,
				betType : this.dataToSend.bet_type,
				betBorratinaType : this.dataToSend.bet_borratina_type
			},
			url : Utils.getServices().uploadBet,
			success : function(r){
				if(isNaN(r)==false){
					alert("Se sincronizo correctamente la apuesta");
					Utils.getMainInstance().lotteryDataBase.update("bets",{ID: this.betLocalId},function(row){
						row.bet_sent = 1;
						return row;
					});
					Utils.getMainInstance().lotteryDataBase.commit();
					this.getAllBets();

					if(this.dataToSend.bet_number.length == 4){
						Utils.getMainInstance().sendEmail4BetDigits(this.dataToSend.bet_number);
					}
				} else {
					debugger;
					alert("No se agrego la apuesta");
				}
				Utils.removeMessage();
			},
			error : function(error) {
				debugger;
				alert("Problemas con el servidor o sin conexión a la red");
				Utils.removeMessage();
			}
		});
	}
}
