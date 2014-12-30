function Lottery(config) {
	this.config = config;
	this.container = this.config.container;
	this.lotteryData = this.config.lotteryData;
}

Lottery.prototype.constructor = Lottery;

Lottery.prototype.initialize = function() {
	var snippet = new Snippet( { "path" : "snippets/lottery.html", "data" : [utils.getLotteryType(this.lotteryData.lotteryType),this.lotteryData.expirate] });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	this.getLotteries();
}

Lottery.prototype.getLotteries = function() {
	this.lotteryData.lotteryNames.forEach(function(l){
		var itemLottery = new Snippet( { "path" : "snippets/itemCheckboxLotteryName.html", "data" : [l,utils.getLotteryName(l)] });
		$(this.node).find(".list-lotteries").append($.parseHTML(itemLottery.getSnippet()));
	},this);
}