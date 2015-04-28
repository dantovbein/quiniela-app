function ItemLottery(config){
	GenericSnippet.call(this,config);
}

inheritPrototype(ItemLottery,GenericSnippet);

ItemLottery.prototype.constructor = ItemLottery;

ItemLottery.prototype.initializeParameters = function(){
	GenericSnippet.prototype.initializeParameters.call(this);
	this.path = "snippets/itemCheckboxLotteryName.html";
	this.dataSnippet = this.config.data;
}

ItemLottery.prototype.addHandlers = function(){
	GenericSnippet.prototype.addHandlers.call(this);
	$(this.node).find("input[type='checkbox']").change({ context:this },function(e){
		e.stopImmediatePropagation();
		$(e.data.context).trigger({ type:Globals.CHECKBOX_CHECKED, checkbox:this },false);
	});
}

ItemLottery.prototype.setState = function(v){
	
}