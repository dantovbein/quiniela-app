function ItemBetsList(config) {
	GenericSnippet.call(this,config);
}

inheritPrototype(ItemBetsList,GenericSnippet);

ItemBetsList.prototype.constructor = ItemBetsList;

ItemBetsList.prototype.initializeParameters = function(){
	this.container = this.config.container;
	this.betData = this.config.betData;
	this.path = "snippets/itemBetsList.html";
}

ItemBetsList.prototype.initialize = function(){
	var hour = new Date(this.betData.bet_created);
	GenericSnippet.prototype.initialize.call(this);
}

ItemBetsList.prototype.addHandlers = function() {
	$(this.node).find(".btn-more-options").click( { context:this }, this.showMoreOptions  );
}

ItemBetsList.prototype.showMoreOptions = function(e) {
	$( e.data.context.node ).trigger( { 
										type : Globals.SHOW_ITEM_OPTIONS,
										item : e.data.context
									} );
} 