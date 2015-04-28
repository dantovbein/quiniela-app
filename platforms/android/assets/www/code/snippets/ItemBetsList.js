function ItemBetsList(config) {
	GenericSnippet.call(this,config);
}

inheritPrototype(ItemBetsList,GenericSnippet);

ItemBetsList.prototype.constructor = ItemBetsList;

ItemBetsList.prototype.initializeParameters = function(){
	this.container = this.config.container;
	this.path = "snippets/itemBetsList.html";
}

ItemBetsList.prototype.initialize = function(){
	GenericSnippet.prototype.initialize.call(this);
}

ItemBetsList.prototype.addHandlers = function() {
	$(this.node).find(".btn-more-options").click( { context:this }, this.showMoreOptions  );
}

ItemBetsList.prototype.showMoreOptions = function(e) {
	$( e.data.context ).trigger( { 
									type : Globals.SHOW_ITEM_OPTIONS,
									betData : e.data.context.config.betData
								} );
}

ItemBetsList.prototype.getParsedDate = function(d){
	var date = new Date(d);
	return Utils.addZero(date.getDate()) + "/" + Utils.addZero((date.getMonth()-1)) + "/" + date.getFullYear() + " " + Utils.addZero(date.getHours()) + ":" + Utils.addZero(date.getMinutes()) + ":" + Utils.addZero(date.getSeconds());
}