function BetBorratinaEditor(config) {
	BetBorratina.call(this,config);
}

inheritPrototype(BetBorratinaEditor,BetBorratina);

BetBorratinaEditor.prototype.constructor = BetBorratinaEditor;

BetBorratinaEditor.prototype.initializeParameters = function(){
	BetBorratina.prototype.initializeParameters.call(this);
	this.dataSnippet = ["Editar jugada"];
}

BetBorratinaEditor.prototype.initialize = function() {
	BetBorratina.prototype.initialize.call(this);
	this.showData();
	this.updateTotalAmount(this.getTotalAmount());
}


BetBorratinaEditor.prototype.showData = function() {
	/*
	$(this.node).find("#bet-number").val(this.betData.bet_number);
	*/
	for(var i=0;i<this.betData.bet_data.length;i++){
		var checkbox = $(this.node).find(".lottery[data-type='" + this.betData.bet_data[i].lotteryTypeId + "']" ).find(".item-checkbox[data-name='" + this.betData.bet_data[i].lotteryNameId + "'] input");
		checkbox.prop('checked', true);
	}
	/*
	$(this.node).find("#partial-amount").val(this.betData.bet_amount);
	$(this.node).find(".total-amount").html(this.getTotalAmount());
	*/
}


BetBorratinaEditor.prototype.onConfirmSaveData = function() {
	$( this ).trigger( { type : Globals.SHOW_BETS } );
}





/*function BetBorratinaEditor(config) {
	BetEditor.call(this,config);
}

inheritPrototype(BetBorratinaEditor,BetEditor);

BetBorratinaEditor.prototype.constructor = BetBorratinaEditor;

BetBorratinaEditor.prototype.initializeParameters = function(){
	BetEditor.prototype.initializeParameters.call(this);
	this.path = "views/betBorratina.html";
	this.betType = Utils.getBetType(Globals.BET_BORRATINA);
}

BetBorratina.prototype.generateInputNumbers = function(){
	$(this.node).find(".wrapper-container-numbers").empty();
	$(this.node).find(".list-lotteries .item-checkbox input:checkbox").prop("checked",false);
	$(this.node).find(".list-lotteries .item-checkbox input:checkbox").prop("disabled",false);
	for(var i=0;i<this.gameType;i++){
		var inp = "<input id='bet-number-" + i + "' type='number' placeholder='Número " + (i+1) + "' maxlength='2' />";
		$(this.node).find(".wrapper-container-numbers").append(inp);
	}
}*/







/*
BetBorratinaEditor.prototype.saveBet = function() {
	BetBorratina.prototype.saveBet.call(this);
}

BetBorratinaEditor.prototype.getTotalAmount = function() {
	this.totalChecked = 0;
	for(var i=0; i<$(this.node).find(".wrapper-container-lotteries .item-checkbox input").length;i++){
		if($($(this.node).find(".wrapper-container-lotteries .item-checkbox input")[i]).is(":checked")) {
			this.totalChecked++;
		}
	}
	(this.gameType==8) ? (this.totalChecked + 1) : this.totalChecked;
	var t = $(this.node).find("#partial-amount").val() * this.totalChecked;
	return 	parseFloat((this.gameType==8) ? t/2 : t).toFixed(2);
}

BetBorratina.prototype.onNewCheckboxClicked = function(e){
	e.stopImmediatePropagation();
	var self = e.data.context;
	if(self.gameType==8) {
		$(this.node).find(".item-checkbox input:checkbox").prop("checked",$(e.checkbox).is(":checked"));
	}
	self.updateTotalAmount(self.getTotalAmount());
}*/