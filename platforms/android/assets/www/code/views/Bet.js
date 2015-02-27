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
		Utils.removeMessage();
	}); 

	this.generateTodaysLotteries();

	this.addHandlers();

	this.betTimer = 0;
	this.startTimer();
}

Bet.prototype.startTimer = function() {
   var timer = setTimeout(this.onCompleteTimer,1000,{context:this});
}

Bet.prototype.onCompleteTimer = function(e){
	e.context.betTimer++;
	console.log("betTimer",e.context.betTimer);
	if(e.context.betTimer == (3 * 10) ){
		//e.context.showTempLockView();
		console.log("Reset Bet");
		$(document).trigger({ type:"resetBetView" });
	}else {
		e.context.startTimer();
	}
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
}

Bet.prototype.newBet = function(e) {

}

Bet.prototype.saveBet = function(e) {
	var _this = e.data.context;
	var betNumber = $(_this.node).find("#bet-number").val();
	var partialAmount = $(_this.node).find("#partial-amount").val();
	var betPosition = $(_this.node).find("select#bet-position").val();
	var betNumberRedoblona = $(_this.node).find("#bet-number-redoblona").val();
	var betPositionRedoblona = $(_this.node).find("select#bet-position-redoblona").val();
	
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
					lotteryType : Utils.getLotteryType(itemLottery.data("type")),
					lotteryNameId : parseInt(itemCheckbox.val()),
					lotteryName : Utils.getLotteryName( parseInt(itemCheckbox.val()) )
				});
			}
		}
	}
	if(currentBet.bet.length == 0) {
		alert("Se tiene que seleccionar al menos una Loteria");
		return false;
	}

	if( partialAmount == "") {
		alert("No se seteo el monto apostado por cada Loteria");
		return false;
	} else if (isNaN(partialAmount)) {
		alert("La apuesta debe ser un número real");
		return false;
	}

	if(betPosition == "") {	
		alert("Se tiene que seleccionar al menos una posición para la apuesta");
		return false;
	}
	
	if(betNumberRedoblona != "") {
		if ( betNumberRedoblona.length > 4) {
			alert("El número apostado para la Redoblona no debe ser superior a 4 digitos");
			return false;
		} else if ( isNaN(betNumberRedoblona) ) {
			alert("El número apostado para la Redoblona debe ser un número real");
			return false;
		}
		if(betPositionRedoblona == "") {	
			alert("Se tiene que seleccionar al menos una posición para la apuesta de la Redoblona");
			return false;
		}
	}

	if(betPosition == "") {	
		alert("Se tiene que seleccionar al menos una posición para la apuesta");
		return false;
	}

	currentBet.betAmount = partialAmount;
	currentBet.betPosition = betPosition;
	currentBet.betTotalAmount = _this.getTotalAmount();
	currentBet.betCreated = new Date();

	var id = (_this.betData.ID != undefined) ? _this.betData.ID : -1;
	Utils.getMainInstance().lotteryDataBase.insertOrUpdate("bets", {ID: id}, { 	bet_number : currentBet.betNumber,
																				bet_data : currentBet.bet,
																				bet_position : currentBet.betPosition,
																				bet_amount : currentBet.betAmount,
																				bet_total_amount : currentBet.betTotalAmount,
																				bet_created : currentBet.betCreated,
																				bet_number_redoblona : betNumberRedoblona,
																				bet_position_redoblona : betPositionRedoblona,
																				is_active : 1,
																				is_editable : 1,
																				bet_sent : 0 });

	Utils.getMainInstance().lotteryDataBase.commit();
	Utils.showMessage("Partida guardada");
	$( _this.node ).trigger( { type : "newBet" } );
	
}

Bet.prototype.getTotalAmount = function() {
	var totalChecked = 0;
	for(var i=0; i<$(this.node).find(".wrapper-container-lotteries .item-checkbox input").length;i++){
		if($($(this.node).find(".wrapper-container-lotteries .item-checkbox input")[i]).is(":checked")) {
			totalChecked++;
		}
	}
	return 	parseFloat($(this.node).find("#partial-amount").val() * totalChecked).toFixed(2);
}

Bet.prototype.generateTodaysLotteries = function() {
	this.todayslotteries.lotteries.forEach(function(d){
		if(Utils.compareHours(d.expirate)) {
			var lottery = new Lottery( { container : $(this.node).find("#container-lotteries .wrapper-container-lotteries"), lotteryData : d } );
			lottery.initialize();
		}		
	},this);
}

Bet.prototype.destroy = function() {
	debugger;
}