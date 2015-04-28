function BetQuiniela(config) {
	Bet.call(this,config);
}

inheritPrototype(BetQuiniela, Bet);

BetQuiniela.prototype.constructor = BetQuiniela;

BetQuiniela.prototype.initializeParameters = function(){
	Bet.prototype.initializeParameters.call(this);
	this.path = "views/betQuiniela.html";
	this.dataSnippet = ["Ingresar jugada"];
	this.betType = Utils.getBetType(Globals.BET_QUINIELA);
}

BetQuiniela.prototype.saveBet = function() {
	debugger;
	var currentBet = {};

	var betNumber = $(this.node).find("#bet-number").val();
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

	currentBet.bet = this.getBetsBetted();
	if(currentBet.bet.length == 0) {
		alert("Se tiene que seleccionar al menos una Loteria");
		return false;
	}

	var partialAmount = $(this.node).find("#partial-amount").val();
	if( partialAmount == "") {
		alert("No se seteo el monto apostado por cada Loteria");
		return false;
	} else if (isNaN(partialAmount)) {
		alert("La apuesta debe ser un número real");
		return false;
	}

	var betPosition = $(this.node).find("select#bet-position").val();
	if(betPosition == "") {	
		alert("Se tiene que seleccionar al menos una posición para la apuesta");
		return false;
	}
	
	var betNumberRedoblona = $(this.node).find("#bet-number-redoblona").val();
	var betPositionRedoblona = $(this.node).find("select#bet-position-redoblona").val();
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
	
	currentBet.betTotalAmount = this.getTotalAmount();
	currentBet.betCreated = new Date();

	debugger;
	var id = (this.betData.ID != undefined) ? this.betData.ID : -1;
	Utils.getMainInstance().lotteryDataBase.insertOrUpdate("bets", {ID: id}, { 	
																				bet_type : this.betType,
																				bet_number : currentBet.betNumber,
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
	debugger;

	Utils.getMainInstance().lotteryDataBase.commit();
	debugger;
	this.onConfirmSaveData();	
}

BetQuiniela.prototype.getTotalAmount = function() {
	debugger;
	Bet.prototype.getTotalAmount.call(this);
	debugger;
	return 	parseFloat($(this.node).find("#partial-amount").val() * this.totalChecked).toFixed(2);
}

BetQuiniela.prototype.onNewCheckboxClicked = function(e){
	Bet.prototype.onNewCheckboxClicked.call(this,e);
	var self = e.data.context;
	self.updateTotalAmount(self.getTotalAmount());
}

