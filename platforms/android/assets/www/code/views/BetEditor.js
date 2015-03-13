function BetEditor(config) {
	Bet.call(this,config);
}

inheritPrototype(BetEditor,Bet);

BetEditor.prototype.constructor = BetEditor;

BetEditor.prototype.initializeParameters = function(){
	Bet.prototype.initializeParameters.call(this);
	this.betData = this.config.betData;
	this.pathSnippet = "views/bet.html";
	this.dataSnippet = ["Editar jugada"];
}

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
	$(this.node).find("#bet-number-redoblona").val(this.betData.bet_number_redoblona);
	$(this.node).find("select#bet-position-redoblona").val(this.betData.bet_position_redoblona);
	$(this.node).find(".total-amount").html(this.getTotalAmount());
}