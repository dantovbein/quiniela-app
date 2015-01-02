function BetsList(config) {
	View.call(this,config);
	this.container = config.container;
	
	this.pathSnippet = "views/betsList.html";
}

inheritPrototype(BetsList, View);

BetsList.prototype.constructor = BetsList;

BetsList.prototype.initialize = function(){
	View.prototype.initialize.call(this);
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [] });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	this.getAllBets();

	$(document).bind("removeBet", { context:this },this.removeBet);
}

BetsList.prototype.getAllBets = function() {
	var bets = utils.getMainInstance().lotteryDataBase.query("bets");
	for(var i=0;i<bets.length;i++) {
		var itemBetsList = new ItemBetsList( { container : $(this.node).find(".bets-list-data"), betData : bets[i] } );
		itemBetsList.initialize();
		$(itemBetsList.node).bind( "showItemOptions", { context:this }, this.showItemOptions );
	}
}

BetsList.prototype.showItemOptions = function(e) {
	utils.getOverlay();
	var betOptions = new PopupBetOptions( { container:$("body"), data:e.item.betData } );
	betOptions.initialize();
}

BetsList.prototype.removeBet = function(e) {
	utils.getMainInstance().lotteryDataBase.deleteRows("bets", {ID: e.betData.ID});
	utils.getMainInstance().lotteryDataBase.commit();

	$(e.data.context.node).find(".bets-list-data .item-bets-list[data-bet='" + e.betData.ID + "']").remove();
}