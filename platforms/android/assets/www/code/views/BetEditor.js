function BetEditor(config) {
	Bet.call(this,config);
}

inheritPrototype(BetEditor,Bet);

BetEditor.prototype.constructor = BetEditor;

BetEditor.prototype.initializeParameters = function(){
	Bet.prototype.initializeParameters.call(this);
	//this.betData = this.config.betData;
	this.dataSnippet = ["Editar jugada"];
}

BetEditor.prototype.initialize = function() {
	Bet.prototype.initialize.call(this);
	this.showData();
	this.updateTotalAmount(this.getTotalAmount());
}

BetEditor.prototype.showData = function() { }

BetEditor.prototype.onConfirmSaveData = function() {
	$( this ).trigger( { type : Globals.SHOW_BETS } );
}