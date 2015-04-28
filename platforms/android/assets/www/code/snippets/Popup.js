function Popup(config) {
	GenericSnippet.call(this,config);
}

inheritPrototype(Popup,GenericSnippet);

Popup.prototype.constructor = Popup;

Popup.prototype.initializeParameters = function() {
	this.container = this.config.container;
	this.snippetData = [];
}

Popup.prototype.addHandlers  = function() {
	$(this.node).find(".btn-close").click( { context:this }, this.close );
}

Popup.prototype.close = function(e) {
	$(document).trigger("removePopup");
}