function Header(config) {
	this.container = config.container;
	this.pathSnippet = "snippets/header.html";
}

Header.prototype.constructor = Header;

Header.prototype.initialize = function(){
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [ ] });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	this.addHandlers();
}

Header.prototype.addHandlers = function() {
	$(this.node).find(".btn-settings").click( { context:this }, function(e){
		$( e.data.context.node ).trigger( "userSettings" );
	} );
}