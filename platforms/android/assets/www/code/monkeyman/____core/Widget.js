function Widget(config) {
	this.config = config;
}
Widget.prototype.constructor = Widget;
Widget.prototype.init = function() { 
	var snippet = new Snippet( { "path" : this.config.snippet, "data" : [ ]});
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);
}
Widget.prototype.configure = function() { }
Widget.prototype.destroy = function() { }