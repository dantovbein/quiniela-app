function BetBorratina(config) {
	Bet.call(this,config);
}

inheritPrototype(BetBorratina, Bet);

BetBorratina.prototype.constructor = BetBorratina;

BetBorratina.prototype.initializeParameters = function(){
	Bet.prototype.initializeParameters.call(this);
	this.path = "views/betBorratina.html";
	this.dataSnippet = ["Ingresar jugada Borratina"];
	this.betType = Utils.getBetType(Globals.BET_BORRATINA);
	this.betNumbers = [];
}

BetBorratina.prototype.addHandlers = function() {
	Bet.prototype.addHandlers.call(this);
	$(this.node).find("#bet-borratina-type").on("change", { context:this }, function(e){
		e.data.context.gameType = parseFloat(this.value);
		e.data.context.generateInputNumbers();
		e.data.context.updateTotalAmount(e.data.context.getTotalAmount());
	})
}

BetBorratina.prototype.initialize = function(){
	Bet.prototype.initialize.call(this);
	this.gameType = this.getGameType();
	this.generateInputNumbers();
}

BetBorratina.prototype.getGameType = function(){
	return parseFloat($(this.node).find("#bet-borratina-type").val());
}

BetBorratina.prototype.generateInputNumbers = function(){
	var totalBetNumbersBetted = $(this.node).find(".wrapper-container-numbers input[type='number']").length;
	for(var j=0;j<totalBetNumbersBetted;j++){
		this.betNumbers.push($($(this.node).find(".wrapper-container-numbers input[type='number']")[j]).val());
	}
	$(this.node).find(".wrapper-container-numbers").empty();
	for(var i=0;i<this.gameType;i++){
		var placeholder = (this.betNumbers[i]!=undefined && this.betNumbers[i]!="") ? "value='" + this.betNumbers[i] + "'" : "placeholder='Número " + (i+1) + "'";
		var inp = "<input id='bet-number-" + i + "' type='number' " + placeholder + "  maxlength='2' />";
		$(this.node).find(".wrapper-container-numbers").append(inp);
	}
	if(this.gameType==8){
		for(var l=0;l<$(this.node).find(".wrapper-container-lotteries .lottery").length;l++){
			var lottery = $($(this.node).find(".wrapper-container-lotteries .lottery")[l]);
			for(var m=0;m<$(lottery).find(".item-checkbox input:checkbox").length;m++){
				var checkbox = $($(lottery).find(".item-checkbox input:checkbox")[m]);
				if($(checkbox).prop("checked")){
					$(lottery).find(".item-checkbox input:checkbox").prop("checked",true);
				}
			}
		}
	}
	this.betNumbers = [];
}

BetBorratina.prototype.saveBet = function() {
	var currentBet = {};	
	
	var betNumber = "";
	var totalNumbers = $(".wrapper-container-numbers input[type='number']").length;
	var numbersBetted = [];
	this.numberRepeated = false;
	for(var b=0;b<totalNumbers;b++){
		var inp = $(".wrapper-container-numbers input[type='number']")[b];
		if($(inp).val() == ""){
			alert("No pueden haber números sin cargar");
			return false;
		}else if($(inp).val().length != 2){
			alert("Los números apostados deben ser de 2 dígitos");
			return false;
		}else if(isNaN($(inp).val())){
			alert("Los números apostados deben ser números reales");
			return false;
		}else{
			var numberBetted = $(inp).val();
			if(numbersBetted.length == 0){
				numbersBetted.push(numberBetted);
			}else{
				numbersBetted.forEach(function(n){
					if(numberBetted==n){
						this.numberRepeated = true;
						return false;
					}
				},this);
				numbersBetted.push(numberBetted);
			}
			if(b<totalNumbers-1){
				betNumber += (numberBetted + "-");
			}else{
				betNumber += numberBetted;
			}
			//numbersBetted.push($(inp).val());	
		}
	}
	if(this.numberRepeated) {
	//	alert("No pueden haber números repetidos");
	//	return false;
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
	currentBet.betAmount = partialAmount;
	
	currentBet.betTotalAmount = this.getTotalAmount();
	currentBet.betCreated = new Date();

	var id = (this.betData.ID != undefined) ? this.betData.ID : -1;
	Utils.getMainInstance().lotteryDataBase.insertOrUpdate("bets", {ID: id}, { 	
																				bet_type : this.betType,
																				bet_borratina_type : this.gameType,
																				bet_number : currentBet.betNumber,
																				bet_data : currentBet.bet,
																				bet_amount : currentBet.betAmount,
																				bet_total_amount : currentBet.betTotalAmount,
																				bet_created : currentBet.betCreated,
																				is_active : 1,
																				is_editable : 1,
																				bet_sent : 0 
																			});

	Utils.getMainInstance().lotteryDataBase.commit();
	this.onConfirmSaveData();
}

BetBorratina.prototype.getTotalAmount = function() {
	Bet.prototype.getTotalAmount.call(this);
	(this.gameType==8) ? (this.totalChecked + 1) : this.totalChecked;
	var t = $(this.node).find("#partial-amount").val() * this.totalChecked;
	return 	parseFloat((this.gameType==8) ? t/2 : t).toFixed(2);
}

BetBorratina.prototype.generateTodaysLotteries = function() {
	Bet.prototype.generateTodaysLotteries.call(this);
	var itemsToDelete = [];
	for(var i=0; i<$(this.node).find(".wrapper-container-lotteries .lottery .item-checkbox").length;i++){
		var c = $($(this.node).find(".wrapper-container-lotteries .lottery .item-checkbox")[i]);
		var n = $(c).attr("data-name");
		if(n != 1 && n != 2){			
			if(itemsToDelete.length==0){
				itemsToDelete.push(n);
			}else{
				var exist = false;
				itemsToDelete.forEach(function(a){
					if(a==n) exist=true;
				});
				if(!exist) itemsToDelete.push(n);
			}
		}
	}
	itemsToDelete.forEach(function(t){
		$(".item-checkbox[data-name='" + t + "']").remove();
	},this);
}

BetBorratina.prototype.onNewCheckboxClicked = function(e){
	Bet.prototype.onNewCheckboxClicked.call(this,e);
	var self = e.data.context;
	if(self.gameType==8) {
		$(this.node).find(".item-checkbox input:checkbox").prop("checked",$(e.checkbox).is(":checked"));
	}
	self.updateTotalAmount(self.getTotalAmount());
}

