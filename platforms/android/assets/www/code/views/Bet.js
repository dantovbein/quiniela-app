function Bet(config) {
	View.call(this,config);
	this.container = config.container;
	this.todayslotteries = config.todayslotteries;

	this.pathSnippet = "views/bet.html";
}

inheritPrototype(Bet, View);

Bet.prototype.constructor = Bet;

Bet.prototype.initialize = function(){
	View.prototype.initialize.call(this);
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [] });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	this.generateTodaysLotteries();

	this.addHandlers();
}

Bet.prototype.addHandlers = function() {
	View.prototype.addHandlers.call(this);
	
	$(this.node).find(".btn-cancel").click( { context:this }, function(e){
		$( e.data.context.node ).trigger( "home" );
	} );
	$(this.node).find(".btn-save").click( { context:this }, this.saveBet );
}

Bet.prototype.saveBet = function(e) {
	var _this = e.data.context;
	var betNumber = $(_this.node).find("#bet-number").val();
	var partialAmount = $(_this.node).find("#partial-amount").val();
	
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

	// Find if is there any checkbox checked
	var checked = 0;
	for(var i=0; i<$(_this.node).find(".item-checkbox input").length;i++) {
		if($($(_this.node).find(".item-checkbox input")[i]).is(":checked")){
			checked++;
		}
	}
	if(checked <= 0) {
		alert("Se tiene que seleccionar al menos una Loteria");
		return false;
	}
	// getAllBets();
	
	if( partialAmount == "") {
		alert("No se seteo el monto apostado por cada Loteria");
		return false;
	} else if (isNaN(partialAmount)) {
		alert("La apuesta debe ser un número real");
		return false;
	}

	utils.checkConnection();
	//_this.uploadCurrentBet();
}

Bet.prototype.uploadCurrentBet = function() {
	var online = navigator.onLine;
	if(online) {
		alert("Conexion");
	} else {
		alert("No hay conexion a Internet, los datos se guardarán de forma local");
	}
}


Bet.prototype.generateTodaysLotteries = function() {
	this.todayslotteries.lotteries.forEach(function(d){
		if(utils.compareHours(d.expirate)) {
			var lottery = new Lottery( { container : $(this.node).find("#container-lotteries .wrapper-container-lotteries"), lotteryData : d } );
			lottery.initialize();
		}		
	},this);
}