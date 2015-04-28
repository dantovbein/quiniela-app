function Lottery(config) {
	GenericSnippet.call(this,config);
}

inheritPrototype(Lottery,GenericSnippet);

Lottery.prototype.constructor = Lottery;

Lottery.prototype.initializeParameters = function(){
	this.container = this.config.container;
	this.lotteryData = this.config.lotteryData;
	this.path = "snippets/lottery.html";
	this.dataSnippet = [ 	this.lotteryData.lotteryType,
							Utils.getLotteryType(this.lotteryData.lotteryType),
							this.lotteryData.expirate	];
}

Lottery.prototype.initialize = function() {
	GenericSnippet.prototype.initialize.call(this);
	this.getLotteries();
}

Lottery.prototype.getLotteries = function() {
	this.lotteryData.lotteryNames.forEach(function(l){
		var idCheckbox = "-"+l+"-"+this.lotteryData.lotteryType;
		var itemLottery = new ItemLottery( { container:$(this.node).find(".list-lotteries"), data : [ l,l,Utils.getLotteryName(l),idCheckbox,idCheckbox,this.lotteryData.lotteryType ] });
		$(itemLottery).bind(Globals.CHECKBOX_CHECKED, { context:this },this.onNewCheckboxClicked );
	},this);
}

Lottery.prototype.onNewCheckboxClicked = function(e){
	e.stopImmediatePropagation();
	$(e.data.context).trigger({ type:Globals.CHECKBOX_CHECKED, checkbox:e.checkbox ,lotteryType:e.data.context.lotteryData.lotteryType },false);
}