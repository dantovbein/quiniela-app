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

	this.getAllBets();

	$(document).bind("removeBet", { context:this },this.removeBet,false);
	$(document).bind("sincronizeBet", { context:this },this.sincronizeBet,false);
}

BetsList.prototype.getAllBets = function() {
	$(this.node).find(".bets-list-data").empty();
	var betsData = utils.getMainInstance().lotteryDataBase.query("bets");
	betsData.forEach(function(b){
		if(b.is_active==1) {
			var itemBetsList = new ItemBetsList( { container : $(this.node).find(".bets-list-data"), betData : b } );
			itemBetsList.initialize();
			$(itemBetsList.node).bind( "showItemOptions", { context:this }, this.showItemOptions , false );
		}
	},this);
}

BetsList.prototype.showItemOptions = function(e) {
	utils.getOverlay();
	var betOptions = new PopupBetOptions( { container:$("body"), _parent:e.data.context, data:e.item.betData } );
	betOptions.initialize();
}

BetsList.prototype.removeBet = function(bet) {
	utils.getMainInstance().lotteryDataBase.update("bets",{ID: bet.ID},function(row){
		var canDelete = utils.checkBetLimit(row);
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
	utils.getMainInstance().lotteryDataBase.commit();
	this.getAllBets();
}


BetsList.prototype.sincronizeBet = function(e){
//	e.data.context.dataToSend = utils.getMainInstance().lotteryDataBase.query("bets",{ID:e.betId})[0];
//	e.data.context.betLocalId = e.betId;
}

BetsList.prototype.uploadBet = function(id) {
	this.dataToSend = utils.getMainInstance().lotteryDataBase.query("bets",{ID:id})[0];
	this.betLocalId = id;
	debugger;
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
			idDevice:utils.getUserData().idDevice,
			idVendor:utils.getUserData().idVendor,
			betCreated:this.dataToSend.bet_created,
			betCanceled:this.dataToSend.bet_canceled,
			isActive:this.dataToSend.is_active
		},
		url : utils.getServices().uploadBet,
		success : function(r){
			debugger;
			if(isNaN(r)==false){
				utils.getMainInstance().lotteryDataBase.deleteRows("bets",{ID:this.betLocalId});
				utils.getMainInstance().lotteryDataBase.commit();
				alert("Se sincronizo correctamente la apuesta");
				this.getAllBets();
			} else {
				alert("No se agrego la apuesta");
			}
		},
		error : function(error) {
			debugger;
		}
	});
}
