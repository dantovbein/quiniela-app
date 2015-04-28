function GenericWidget(config) {
	this.config = config;
	this.initializeParameters();
	this.initialize();
	this.addHandlers();
}

GenericWidget.prototype.constructor = GenericWidget;

GenericWidget.prototype.initializeParameters = function() {
	this.container = this.config.container;
	this._name = (this.config.name) ? this.config.name : "";
	this.path = (this.config.path) ? this.config.path : "";
}

GenericWidget.prototype.initialize = function() {
	var snippet = new Snippet( { path : this.path , data : (this.dataSnippet != undefined) ? this.dataSnippet : [] } );
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);
}

GenericWidget.prototype.addHandlers = function() {}

GenericWidget.prototype.destroy = function() {
	$(this.node).remove();
}