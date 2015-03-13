function Home(config) {
	View.call(this,config);
}

inheritPrototype(Home, View);

Home.prototype.constructor = Home;

Home.prototype.initializeParameters = function(){
	View.prototype.initializeParameters.call(this);	
	this.pathSnippet = "views/home.html";
}

Home.prototype.initialize = function(){
	View.prototype.initialize.call(this);
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [] });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	$(this.node).find(".generate-bet").click( { context:this }, function(e){
		$( e.data.context.node ).trigger( "generateBet" );
	} );

	$(this.node).find(".show-bets").click( { context:this }, function(e){
		$( e.data.context.node ).trigger( "showBets" );
	} );

	$(this.node).find(".synchronize").click( { context:this }, function(e){
		$( e.data.context.node ).trigger( "synchronize" );
	} );

	this.addHandlers();	
}