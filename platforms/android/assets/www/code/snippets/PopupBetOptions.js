function PopupBetOptions(config) {
	Popup.call(this,config);
	this.betData = this.config.data;
	this.pathSnippet = "snippets/popupBetOptions.html";
	this._parent = this.config._parent;
}

inheritPrototype(PopupBetOptions,Popup);

PopupBetOptions.prototype.constructor = PopupBetOptions;

PopupBetOptions.prototype.initialize = function() {
	this.snippetData = [ this.betData.ID, this.betData.bet_number ];
	Popup.prototype.initialize.call(this);
}

PopupBetOptions.prototype.addHandlers  = function() {
	Popup.prototype.addHandlers.call(this);
	$(this.node).find(".btn-edit").click( { context:this }, this.onClickEdit );
	$(this.node).find(".btn-synchronize").click( { context:this }, this.onClickSincronize );
	$(this.node).find(".btn-remove").click( { context:this }, this.onClickRemove );
}

PopupBetOptions.prototype.onClickRemove = function(e) {
	e.data.context.destroy();
	/*$(document).trigger({ 	type : "removeBet",
							betId : e.data.context.betData.ID });*/
	e.data.context._parent.removeBet(e.data.context.betData);
	
}

PopupBetOptions.prototype.onClickEdit = function(e) {
	e.data.context.destroy();
	$(document).trigger({ 	type : "betEditor",
							betData : e.data.context.betData } );
}

PopupBetOptions.prototype.onClickSincronize = function(e) {
	e.data.context.destroy();
	/*$(document).trigger({ 	type : "sincronizeBet",
							betId : e.data.context.betData.ID } );*/
	e.data.context._parent.uploadBet(e.data.context.betData.ID);
}



PopupBetOptions.prototype.destroy = function() {
	$(this.node).remove();
	Utils.removeOverlay();
}