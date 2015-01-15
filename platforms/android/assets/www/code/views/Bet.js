function Bet(config) {
	View.call(this,config);
	this.container = config.container;
	this.todayslotteries = config.todayslotteries;
	this.betData = [];
	this.pathSnippet = "views/bet.html";
	this.dataSnippet = [];
}

inheritPrototype(Bet, View);

Bet.prototype.constructor = Bet;

Bet.prototype.initialize = function(){
	View.prototype.initialize.call(this);
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : this.dataSnippet });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	$('html,body').animate({ scrollTop: 0 }, 'slow',function(){
		utils.removeMessage();
	}); 

	this.generateTodaysLotteries();

	this.addHandlers();
}

Bet.prototype.addHandlers = function() {
	View.prototype.addHandlers.call(this);
	
	$(this.node).find(".btn-cancel").click( { context:this }, function(e){
		$( e.data.context.node ).trigger( "cancel" );
	} );
	
	$($(this.node).find("#partial-amount")).on("input", { context : this }, function(e){
		var _this = e.data.context;
		$(_this.node).find(".total-amount").html(_this.getTotalAmount());
	});

	$($(this.node).find(".item-checkbox input")).change({ context : this }, function(e) {
    	var _this = e.data.context;
		$(_this.node).find(".total-amount").html(_this.getTotalAmount());
	});

	$(this.node).find(".btn-save").click( { context:this }, this.saveBet );
	//$(this.node).find(".btn-new-").click( { context:this }, this.newBet );
}

Bet.prototype.newBet = function(e) {

}

Bet.prototype.saveBet = function(e) {
	var _this = e.data.context;
	var betNumber = $(_this.node).find("#bet-number").val();
	var partialAmount = $(_this.node).find("#partial-amount").val();

	var currentBet = {};	
	
	if( betNumber == "") {
		alert("No se seteo ningun número para la apuesta");
		return false;
	} else if ( betNumber.length > 4) {
		alert("El número apostado no debe ser superior a 4 digitos");
		return false;
	} else if ( isNaN(betNumber) ) {
		alert("El número apostado debe ser un número real");
		return false;
	}

	currentBet.betNumber = betNumber;

	currentBet.bet = Array();
	for(var i=0; i<$(_this.node).find(".lottery").length; i++) {
		var itemLottery = $($(_this.node).find(".lottery")[i]);
		var tmpLotteries = Array();
		for(var j=0; j < itemLottery.find(".item-checkbox input").length; j++) {
			var itemCheckbox = $(itemLottery.find(".item-checkbox input")[j]);
			if(itemCheckbox.is(":checked")) {
				currentBet.bet.push({ 
					lotteryTypeId : parseInt(itemLottery.data("type")),
					lotteryType : utils.getLotteryType(itemLottery.data("type")),
					lotteryNameId : parseInt(itemCheckbox.val()),
					lotteryName : utils.getLotteryName( parseInt(itemCheckbox.val()) )
				});
			}
		}
	}
	if(currentBet.bet.length == 0) {
		alert("Se tiene que seleccionar al menos una Loteria");
		return false;
	}

	currentBet.betPosition = $(_this.node).find("select#bet-position").val();
	
	if( partialAmount == "") {
		alert("No se seteo el monto apostado por cada Loteria");
		return false;
	} else if (isNaN(partialAmount)) {
		alert("La apuesta debe ser un número real");
		return false;
	}

	currentBet.betAmount = partialAmount;
	currentBet.betTotalAmount = _this.getTotalAmount();
	currentBet.betCreated = new Date();

	var id = (_this.betData.ID != undefined) ? _this.betData.ID : -1;
	utils.getMainInstance().lotteryDataBase.insertOrUpdate("bets", {ID: id}, { bet_number : currentBet.betNumber,
																				bet_data : currentBet.bet,
																				bet_position : currentBet.betPosition,
																				bet_amount : currentBet.betAmount,
																				bet_total_amount : currentBet.betTotalAmount,
																				bet_created : currentBet.betCreated,
																				is_active : 1,
																				is_editable : 1});

	utils.getMainInstance().lotteryDataBase.commit();
	//$( _this.node ).trigger( { type : "bets" } );
	$( _this.node ).trigger( { type : "newBet" } );
	utils.showMessage("Partida guardada");
}

Bet.prototype.getTotalAmount = function() {
	var totalChecked = 0;
	for(var i=0; i<$(this.node).find(".item-checkbox input").length;i++){
		if($($(this.node).find(".item-checkbox input")[i]).is(":checked")) {
			totalChecked++;
		}
	}
	return 	parseFloat($(this.node).find("#partial-amount").val() * totalChecked).toFixed(2);
}

Bet.prototype.generateTodaysLotteries = function() {
	this.todayslotteries.lotteries.forEach(function(d){
		if(utils.compareHours(d.expirate)) {
			var lottery = new Lottery( { container : $(this.node).find("#container-lotteries .wrapper-container-lotteries"), lotteryData : d } );
			lottery.initialize();
		}		
	},this);
}