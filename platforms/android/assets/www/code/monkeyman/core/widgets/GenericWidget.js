function GenericWidget(config) {
	this.config = config;
	this.container = this.config.container;
}

GenericWidget.prototype.constructor = GenericWidget;

GenericWidget.prototype.initializeParameters = function() {}

GenericWidget.prototype.initialize = function() {
	var snippet = new Snippet( { path : this.pathSnippet , data : (this.dataSnippet != undefined) ? this.dataSnippet : [] } );
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);
}

GenericWidget.prototype.addHandlers = function() {}

GenericWidget.prototype.destroy = function() {}