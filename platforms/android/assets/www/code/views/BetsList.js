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

	//this.addHandlers();
	this.getAllBets();
}

BetsList.prototype.getAllBets = function() {
	var bets = utils.getMainInstance().lotteryDataBase.query("bets");
	//debugger;
	for(var i=0;i<bets.length;i++) {
		var itemBetsList = new ItemBetsList( { container : $(this.node).find(".bets-list-data"), betData : bets[i] } );
		itemBetsList.initialize();
	}
}