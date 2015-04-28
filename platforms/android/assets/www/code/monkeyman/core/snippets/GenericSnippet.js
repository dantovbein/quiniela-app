function GenericSnippet(config) {
	this.config = config;
	this.initializeParameters();
	this.initialize();
	this.addHandlers();
}

GenericSnippet.prototype.constructor = GenericSnippet;

GenericSnippet.prototype.initializeParameters = function() {
	this.container = this.config.container;
	this._name = (this.config.name) ? this.config.name : "";
	this.path = (this.config.path) ? this.config.path : "";
}

GenericSnippet.prototype.initialize = function() {
	var snippet = new Snippet( { path : this.path , data : (this.dataSnippet != undefined) ? this.dataSnippet : [] } );
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);
}

GenericSnippet.prototype.addHandlers = function() {}

GenericSnippet.prototype.destroy = function() {
	$(this.node).remove();
}