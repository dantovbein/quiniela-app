function Popup(config) {
	this.config = config;
	this.container = this.config.container;
	this.snippetData = [];
}

Popup.prototype.constructor = Popup;

Popup.prototype.initialize = function() {
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : this.snippetData });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	this.addHandlers();
}

Popup.prototype.addHandlers  = function() {
	$(this.node).find(".btn-close").click( { context:this }, this.close );
}

Popup.prototype.close = function(e) {
	$(document).trigger("removePopup");
}