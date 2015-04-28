function Header(config) {
	GenericSnippet.call(this,config);
}

inheritPrototype(Header,GenericSnippet);

Header.prototype.constructor = Header;

Header.prototype.initializeParameters = function(){
	this.container = this.config.container;
	this.path = "snippets/header.html";
}

Header.prototype.addHandlers = function() {
	$(this.node).find(".btn-home").click( { context:this }, function(e){
		$( e.data.context.node ).trigger( "home" );
	} );

	$(this.node).find(".btn-settings").click( { context:this }, function(e){
		$( e.data.context.node ).trigger( "userSettings" );
	} );
}