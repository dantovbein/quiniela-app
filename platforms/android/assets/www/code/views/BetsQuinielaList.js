function BetsQuinielaList(config) {
	BetsList.call(this,config);	
}

inheritPrototype(BetsQuinielaList, BetsList);

BetsQuinielaList.prototype.constructor = BetsQuinielaList;

BetsQuinielaList.prototype.initializeParameters = function(){
	BetsList.prototype.initializeParameters.call(this);
	this.path = "views/betsQuinielaList.html";
	this.betType = Utils.getBetType(Globals.BET_QUINIELA);
}

BetsQuinielaList.prototype.initialize = function(){
	BetsList.prototype.initialize.call(this);
}
