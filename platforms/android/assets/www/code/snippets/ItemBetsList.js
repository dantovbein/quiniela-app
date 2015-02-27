function ItemBetsList(config) {
	this.container = config.container;
	this.betData = config.betData;
	this.pathSnippet = "snippets/itemBetsList.html";
}

ItemBetsList.prototype.constructor = ItemBetsList;

ItemBetsList.prototype.initialize = function(){
	var hour = new Date(this.betData.bet_created);
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [ this.betData.ID,this.betData.bet_number,this.betData.bet_position,this.betData.bet_total_amount,Utils.getDecimalNumber(hour.getHours()) + ":" + Utils.getDecimalNumber(hour.getMinutes()) ] });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	this.addHandlers();
}

ItemBetsList.prototype.addHandlers = function() {
	$(this.node).find(".btn-more-options").click( { context:this }, this.showMoreOptions  );
}

ItemBetsList.prototype.showMoreOptions = function(e) {
	$( e.data.context.node ).trigger( { 
										type : "showItemOptions",
										item : e.data.context
									} );
} 