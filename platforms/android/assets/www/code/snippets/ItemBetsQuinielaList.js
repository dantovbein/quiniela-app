function ItemBetsQuinielaList(config) {
	ItemBetsList.call(this,config);
}

inheritPrototype(ItemBetsQuinielaList,ItemBetsList);

ItemBetsQuinielaList.prototype.constructor = ItemBetsQuinielaList;

ItemBetsQuinielaList.prototype.initializeParameters = function(){
	ItemBetsList.prototype.initializeParameters.call(this);
	this.dataSnippet = [
							this.config.betData.ID,
							this.config.betData.bet_number,
							this.config.betData.bet_position,
							this.config.betData.bet_total_amount,
							this.getParsedDate(this.config.betData.bet_created)
						];	
}