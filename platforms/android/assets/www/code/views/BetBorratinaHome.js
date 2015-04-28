function BetBorratinaHome(config) {
	BetHome.call(this,config);
}

inheritPrototype(BetBorratinaHome,BetHome);

BetBorratinaHome.prototype.constructor = BetBorratinaHome;

BetBorratinaHome.prototype.initializeParameters = function(){
	BetHome.prototype.initializeParameters.call(this);
	this.path = "views/betBorratinaHome.html";
}