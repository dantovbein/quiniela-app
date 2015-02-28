function BetsList(config) {
	View.call(this,config);
	this.container = config.container;	
	this.pathSnippet = "views/betsList.html";
}

inheritPrototype(BetsList, View);

BetsList.prototype.constructor = BetsList;

BetsList.prototype.initialize = function(){
	View.prototype.initialize.call(this);
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [] });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);


	
	var today = new Date();
	var betsData = Utils.getMainInstance().lotteryDataBase.query("bets");
	if(betsData.length > 0) {
		var lastBetDate = new Date(Date.parse(betsData[betsData.length-1].bet_created));
		if(lastBetDate.getDate() < today.getDate() || lastBetDate.getMonth() < today.getMonth() || lastBetDate.getFullYear() < today.getFullYear()){
			// Remover apuestas
			Utils.getMainInstance().lotteryDataBase.deleteRows("bets");
			Utils.getMainInstance().lotteryDataBase.commit();
			alert("Se removieron todas las apuetas del dia anterior");
		}
	}

	this.getAllBets();

	$(document).bind("removeBet", { context:this },this.removeBet,false);
	//$(document).bind("sincronizeBet", { context:this },this.sincronizeBet,false);
}

BetsList.prototype.getAllBets = function() {
	$(this.node).find(".bets-list-data").empty();
	var betsData = Utils.getMainInstance().lotteryDataBase.query("bets");
	betsData.forEach(function(b){
		if(b.is_active==1) {
			var itemBetsList = new ItemBetsList( { container : $(this.node).find(".bets-list-data"), betData : b } );
			itemBetsList.initialize();
			$(itemBetsList.node).bind( "showItemOptions", { context:this }, this.showItemOptions , false );
		}
	},this);
	if(betsData.length == 0){
		$(this.node).find(".bets-list-data").append("<li class='no-bets'>No hay apuestas cargadas o ya han sido sincronizadas</li>");
	}
}

BetsList.prototype.showItemOptions = function(e) {
	Utils.getOverlay();
	var betOptions = new PopupBetOptions( { container:$("body"), _parent:e.data.context, data:e.item.betData } );
	betOptions.initialize();
}

BetsList.prototype.removeBet = function(bet) {
	Utils.getMainInstance().lotteryDataBase.update("bets",{ID: bet.ID},function(row){
		var canDelete = Utils.checkBetLimit(row);
		if(canDelete) {
			row.is_active = 0,
			row.is_editable = 0,
			row.bet_canceled = new Date()
		} else {
			row.is_active = 1;
			alert("No se puede remover la apuesta");
		}
		return row;
	});
	Utils.getMainInstance().lotteryDataBase.commit();
	this.getAllBets();
}


//BetsList.prototype.sincronizeBet = function(e){
//	e.data.context.dataToSend = Utils.getMainInstance().lotteryDataBase.query("bets",{ID:e.betId})[0];
//	e.data.context.betLocalId = e.betId;
//}

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
				betData:this.dataToSend.bet_data,
				betPosition:this.dataToSend.bet_position,
				betAmount:this.dataToSend.bet_amount,
				betTotalAmount:this.dataToSend.bet_total_amount,
				idDevice:Utils.getUserData().idDevice,
				idVendor:Utils.getUserData().idVendor,
				betCreated:this.dataToSend.bet_created,
				betCanceled:this.dataToSend.bet_canceled,
				isActive:this.dataToSend.is_active,
				betNumberRedoblona:this.dataToSend.bet_number_redoblona,
				betPositionRedoblona:this.dataToSend.bet_position_redoblona,
			},
			url : Utils.getServices().uploadBet,
			success : function(r){
				if(isNaN(r)==false){
					//Utils.getMainInstance().lotteryDataBase.deleteRows("bets",{ID:this.betLocalId});
					//Utils.getMainInstance().lotteryDataBase.commit();
					alert("Se sincronizo correctamente la apuesta");
					
					Utils.getMainInstance().lotteryDataBase.update("bets",{ID: this.betLocalId},function(row){
						row.bet_sent = 1;
						return row;
					});
					Utils.getMainInstance().lotteryDataBase.commit();
					
					this.getAllBets();
				} else {
					debugger;
					alert("No se agrego la apuesta");
				}
				Utils.removeMessage();
			},
			error : function(error) {
				debugger;
			}
		});
	}
}
