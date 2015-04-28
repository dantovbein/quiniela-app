function PopupBetOptions(config) {
	Popup.call(this,config);
}

inheritPrototype(PopupBetOptions,Popup);

PopupBetOptions.prototype.constructor = PopupBetOptions;

PopupBetOptions.prototype.initializeParameters = function() {
	Popup.prototype.initializeParameters.call(this);
	this._parent = this.config._parent;
	this.betData = this.config.betData;
	this.path = "snippets/popupBetOptions.html";
	this.snippetData = [ this.betData.ID, this.betData.bet_number ];
}

PopupBetOptions.prototype.addHandlers  = function() {
	Popup.prototype.addHandlers.call(this);
	$(this.node).find(".btn-edit").click( { context:this }, this.onClickEdit );
	$(this.node).find(".btn-synchronize").click( { context:this }, this.onClickSincronize );
	$(this.node).find(".btn-remove").click( { context:this }, this.onClickRemove );
}

PopupBetOptions.prototype.onClickRemove = function(e) {
	e.data.context.destroy();
	e.data.context._parent.removeBet(e.data.context.betData);
	
}

PopupBetOptions.prototype.onClickEdit = function(e) {
	e.data.context.destroy();
	$(document).trigger({ 	type : "betEditor",
							betData : e.data.context.betData } );
}

PopupBetOptions.prototype.onClickSincronize = function(e) {
	e.data.context.destroy();
	e.data.context._parent.uploadBet(e.data.context.betData.ID);
}



PopupBetOptions.prototype.destroy = function() {
	$(this.node).remove();
	Utils.removeOverlay();
}