function BetsBorratinaList(config) {
	BetsList.call(this,config);	
}

inheritPrototype(BetsBorratinaList, BetsList);

BetsBorratinaList.prototype.constructor = BetsBorratinaList;

BetsBorratinaList.prototype.initializeParameters = function(){
	BetsList.prototype.initializeParameters.call(this);
	this.path = "views/betsBorratinaList.html";
	this.betType = Utils.getBetType(Globals.BET_BORRATINA);
}

BetsBorratinaList.prototype.initialize = function(){
	BetsList.prototype.initialize.call(this);
}
