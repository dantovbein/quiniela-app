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

PopupBetOptions.prototype.addHandlers  = function() {
	Popup.prototype.addHandlers.call(this);
	$(this.node).find(".btn-edit").click( { context:this }, this.onClickEdit );
	$(this.node).find(".btn-sincronize").click( { context:this }, this.onClickSincronize );
	$(this.node).find(".btn-remove").click( { context:this }, function(e){
		var _this = e.data.context;
		$(document).trigger({ 	type : "removeBet",
								betData : _this.betData });
	});
}

PopupBetOptions.prototype.onClickEdit = function(e) {
	$(document).trigger( { 	type : "betEditor",
							betData : e.data.context.betData } );
}

PopupBetOptions.prototype.onClickSincronize = function(e) {
	$(document).trigger( { 	type : "sincronizeBet",
							betData : e.data.context.betData } );
}