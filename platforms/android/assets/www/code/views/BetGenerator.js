function BetGenerator(config) {
	Bet.call(this,config);	
}

inheritPrototype(BetGenerator, Bet);

BetGenerator.prototype.constructor = BetGenerator;

BetGenerator.prototype.initializeParameters = function(){
	Bet.prototype.initializeParameters.call(this);
	this.pathSnippet = "views/bet.html";
	this.dataSnippet = ["Agregar nueva jugada"];
}