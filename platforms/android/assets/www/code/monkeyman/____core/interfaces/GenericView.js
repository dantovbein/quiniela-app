function GenericView(config) {
	this.config = config;
	this.initializeParameters();
	this.initialize();
}

GenericView.prototype.constructor = GenericView;

GenericView.prototype.initializeParameters = function() {
	this.container = this.config.container;
}

GenericView.prototype.initialize = function() {
	debugger;
	var snippet = new Snippet( { path : this.pathSnippet , data : (this.data != undefined) ? this.data : [] } );
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);
}

GenericView.prototype.addHandlers = function(){ }