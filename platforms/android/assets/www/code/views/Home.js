function Home(config) {
	GenericView.call(this,config);
}

inheritPrototype(Home, GenericView);

Home.prototype.constructor = Home;

Home.prototype.initializeParameters = function(){
	GenericView.prototype.initializeParameters.call(this);	
	this.path = "views/home.html";
}

Home.prototype.initialize = function(){
	GenericView.prototype.initialize.call(this);
	
	$(this.node).find(".bet-quiniela-home").click( { context:this }, function(e){
		$( e.data.context ).trigger( { type:Globals.GET_BET_QUINIELA_HOME } );
	} );

	$(this.node).find(".bet-borratina-home").click( { context:this }, function(e){
		$( e.data.context ).trigger( { type:Globals.GET_BET_BORRATINA_HOME } );
	} );
}