function GenericView(config) {
	this.config = config;
	this.initializeParameters();
	this.initialize();
	this.addHandlers();
}

GenericView.prototype.constructor = GenericView;

GenericView.prototype.initializeParameters = function() {
	this.container = this.config.container;
	this._name = (this.config.name) ? this.config.name : "";
	this.path = (this.config.path) ? this.config.path : "";
}

GenericView.prototype.initialize = function() {
	var snippet = new Snippet( { path : this.path , data : (this.dataSnippet != undefined) ? this.dataSnippet : [] } );
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);
}

GenericView.prototype.addHandlers = function() {}

GenericView.prototype.destroy = function() {
	$(this.node).remove();
}

GenericView.prototype.reset = function() { }