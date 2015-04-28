function BetQuinielaHome(config) {
	BetHome.call(this,config);
}

inheritPrototype(BetQuinielaHome,BetHome);

BetQuinielaHome.prototype.constructor = BetQuinielaHome;

BetQuinielaHome.prototype.initializeParameters = function(){
	BetHome.prototype.initializeParameters.call(this);
	this.path = "views/betQuinielaHome.html";
}