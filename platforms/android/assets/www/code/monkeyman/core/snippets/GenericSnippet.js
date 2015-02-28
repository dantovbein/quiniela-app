function GenericSnippet(config) {
	this.config = config;
	this.initializeParameters();
	this.initialize();
}

GenericSnippet.prototype.constructor = GenericSnippet;

GenericSnippet.prototype.initializeParameters = function() {
	this.container = this.config.container;
}

GenericSnippet.prototype.initialize = function() {
	//alert("OJO QUE PUEDEN HABER MAS DE DOS initialize en y atencion en el valor pathSnippet ",this);
	debugger;
	var snippet = new Snippet( { path : this.path , data : (this.dataSnippet != undefined) ? this.dataSnippet : [] } );
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);
}

GenericSnippet.prototype.addHandlers = function() {}

GenericSnippet.prototype.destroy = function() {
	$(this.node).remove();
}