function BetQuinielaHome(config) {
	BetHome.call(this,config);
}

inheritPrototype(BetQuinielaHome,BetHome);

BetQuinielaHome.prototype.constructor = BetQuinielaHome;

BetQuinielaHome.prototype.initializeParameters = function(){
	BetHome.prototype.initializeParameters.call(this);
	this.path = "views/betQuinielaHome.html";
}

BetQuinielaHome.prototype.addHandlers = function(){
	BetHome.prototype.addHandlers.call(this);
	$(this.node).find(".show-bets").click( { context:this }, function(e){
		$( e.data.context ).trigger( Globals.SHOW_QUINIELA_BETS );
	} );
}