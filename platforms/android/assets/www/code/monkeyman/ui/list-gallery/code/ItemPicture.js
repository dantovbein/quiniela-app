function ItemPicture(config){
	ItemList.call(this,config);
	this.pathSnippet = (this.config.pathSnippet) ? this.config.pathSnippet : "../../src/ui/list-gallery/snippets/item-picture.html";
	this.dataSnippet = [ this.config.data.id, this.config.data.image, this.config.data.value ];
}
inheritPrototype(ItemPicture,ItemList);

ItemPicture.prototype.constructor = ItemPicture;