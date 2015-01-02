function PopupBetOptions(config) {
	Popup.call(this,config);
	this.betData = this.config.data;
	this.pathSnippet = "snippets/popupBetOptions.html";
}

inheritPrototype(PopupBetOptions,Popup);

PopupBetOptions.prototype.constructor = PopupBetOptions;

PopupBetOptions.prototype.initialize = function() {
	this.snippetData = [ this.betData.ID, this.betData.bet_number ];
	Popup.prototype.initialize.call(this);
}