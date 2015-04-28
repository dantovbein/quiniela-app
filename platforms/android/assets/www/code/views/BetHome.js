function BetHome(config) {
	GenericView.call(this,config);
}

inheritPrototype(BetHome, GenericView);

BetHome.prototype.constructor = BetHome;

BetHome.prototype.initializeParameters = function(){
	GenericView.prototype.initializeParameters.call(this);
}

BetHome.prototype.initialize = function(){
	GenericView.prototype.initialize.call(this);

	$(this.node).find(".generate-bet").click( { context:this }, function(e){
		$( e.data.context ).trigger( Globals.GENERATE_BET );
	} );

	$(this.node).find(".show-bets").click( { context:this }, function(e){
		$( e.data.context ).trigger( Globals.SHOW_BETS );
	} );

	$(this.node).find(".synchronize").click( { context:this }, function(e){
		$( e.data.context ).trigger( Globals.SYNCHRONIZE );
	} );
}