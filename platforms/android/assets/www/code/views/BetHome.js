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
}

BetHome.prototype.addHandlers = function() {
	$(this.node).find(".generate-bet").click( { context:this }, function(e){
		$( e.data.context ).trigger( Globals.GENERATE_BET );
	} );
}