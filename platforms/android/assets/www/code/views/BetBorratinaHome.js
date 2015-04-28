function BetBorratinaHome(config) {
	BetHome.call(this,config);
}

inheritPrototype(BetBorratinaHome,BetHome);

BetBorratinaHome.prototype.constructor = BetBorratinaHome;

BetBorratinaHome.prototype.initializeParameters = function(){
	BetHome.prototype.initializeParameters.call(this);
	this.path = "views/betBorratinaHome.html";
}

BetBorratinaHome.prototype.addHandlers = function(){
	BetHome.prototype.addHandlers.call(this);
	$(this.node).find(".show-bets").click( { context:this }, function(e){
		$( e.data.context ).trigger( Globals.SHOW_BORRATINA_BETS );
	} );
}