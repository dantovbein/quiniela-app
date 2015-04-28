function BetQuinielaEditor(config) {
	BetQuiniela.call(this,config);
}

inheritPrototype(BetQuinielaEditor,BetQuiniela);

BetQuinielaEditor.prototype.constructor = BetQuinielaEditor;

BetQuinielaEditor.prototype.initializeParameters = function(){
	BetQuiniela.prototype.initializeParameters.call(this);
	this.dataSnippet = ["Editar jugada"];
}

BetQuinielaEditor.prototype.initialize = function() {
	BetQuiniela.prototype.initialize.call(this);
	this.showData();
	this.updateTotalAmount(this.getTotalAmount());
}

BetQuinielaEditor.prototype.showData = function() {
	$(this.node).find("#bet-number").val(this.betData.bet_number);
	$(this.node).find("select#bet-position").val(this.betData.bet_position);
	for(var i=0;i<this.betData.bet_data.length;i++){
		var checkbox = $(this.node).find(".lottery[data-type='" + this.betData.bet_data[i].lotteryTypeId + "']" ).find(".item-checkbox[data-name='" + this.betData.bet_data[i].lotteryNameId + "'] input");
		checkbox.prop('checked', true);
	}
	$(this.node).find("#partial-amount").val(this.betData.bet_amount);
	$(this.node).find("#bet-number-redoblona").val(this.betData.bet_number_redoblona);
	$(this.node).find("select#bet-position-redoblona").val(this.betData.bet_position_redoblona);	
}

BetQuinielaEditor.prototype.onConfirmSaveData = function() {
	$( this ).trigger( { type : Globals.SHOW_BETS } );
}
