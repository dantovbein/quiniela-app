function BetEditor(config) {
	Bet.call(this,config);
	this.betData = this.config.betData;
	this.pathSnippet = "views/bet.html";
	this.dataSnippet = ["Editar jugada"];
}

inheritPrototype(BetEditor,Bet);

BetEditor.prototype.constructor = BetEditor;

BetEditor.prototype.initialize = function() {
	Bet.prototype.initialize.call(this);
	this.showData();
}

BetEditor.prototype.showData = function() {
	$(this.node).find("#bet-number").val(this.betData.bet_number);
	$(this.node).find("select#bet-position").val(this.betData.bet_position);
	for(var i=0;i<this.betData.bet_data.length;i++){
		var checkbox = $(this.node).find(".lottery[data-type='" + this.betData.bet_data[i].lotteryTypeId + "']" ).find(".item-checkbox[data-name='" + this.betData.bet_data[i].lotteryNameId + "'] input");
		checkbox.prop('checked', true);
	}
	$(this.node).find("#partial-amount").val(this.betData.bet_amount);
	$(this.node).find(".total-amount").html(this.getTotalAmount());

	$(this.node).find("#item-checkbox-component-tapadita").prop('checked', (this.betData.is_tapadita) ? 1 : 0 );
}
/*
BetEditor.prototype.saveBet = function(e){
	Bet.prototype.saveBet.call(this,e);
	$( e.data.context.node ).trigger( { type : "bets" } );
}*/
