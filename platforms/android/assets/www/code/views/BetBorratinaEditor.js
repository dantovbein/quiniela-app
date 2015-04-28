function BetBorratinaEditor(config) {
	BetBorratina.call(this,config);
}

inheritPrototype(BetBorratinaEditor,BetBorratina);

BetBorratinaEditor.prototype.constructor = BetBorratinaEditor;

BetBorratinaEditor.prototype.initializeParameters = function(){
	BetBorratina.prototype.initializeParameters.call(this);
	this.dataSnippet = ["Editar jugada"];
	this.betNumbers = (this.betData.bet_number).split("-");
	
}

BetBorratinaEditor.prototype.initialize = function() {
	BetBorratina.prototype.initialize.call(this);
	$(this.node).find("#bet-borratina-type").val(this.gameType)
	this.showData();
	this.updateTotalAmount(this.getTotalAmount());
}

BetBorratinaEditor.prototype.getGameType = function(){
	return this.betData.bet_borratina_type;
}

BetBorratinaEditor.prototype.showData = function() {
	for(var i=0;i<this.betData.bet_data.length;i++){
		var checkbox = $(this.node).find(".lottery[data-type='" + this.betData.bet_data[i].lotteryTypeId + "']" ).find(".item-checkbox[data-name='" + this.betData.bet_data[i].lotteryNameId + "'] input");
		checkbox.prop('checked', true);
	}
}


BetBorratinaEditor.prototype.onConfirmSaveData = function() {
	$( this ).trigger( { type : Globals.SHOW_BETS } );
}