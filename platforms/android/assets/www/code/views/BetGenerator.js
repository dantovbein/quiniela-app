function BetGenerator(config) {
	Bet.call(this,config);
	this.pathSnippet = "views/bet.html";
	this.dataSnippet = ["Agregar nueva jugada"];
}

inheritPrototype(BetGenerator, Bet);

BetGenerator.prototype.constructor = BetGenerator;