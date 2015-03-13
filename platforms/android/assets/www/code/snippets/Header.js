function Header(config) {
	this.config = config;
	this.initializeParameters();
	this.initialize();
}

Header.prototype.constructor = Header;

Header.prototype.initializeParameters = function(){
	this.container = this.config.container;
	this.pathSnippet = "snippets/header.html";
}

Header.prototype.initialize = function(){
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [ ] });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	this.addHandlers();
}

Header.prototype.addHandlers = function() {
	$(this.node).find(".btn-home").click( { context:this }, function(e){
		$( e.data.context.node ).trigger( "home" );
	} );

	$(this.node).find(".btn-settings").click( { context:this }, function(e){
		$( e.data.context.node ).trigger( "userSettings" );
	} );
}