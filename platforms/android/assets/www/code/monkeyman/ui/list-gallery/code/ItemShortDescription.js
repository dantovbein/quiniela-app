function ItemShortDescription(config){
	ItemList.call(this,config);
	this.pathSnippet = (this.config.pathSnippet) ? this.config.pathSnippet : "../../src/ui/list-gallery/snippets/item-short-description.html";
	this.dataSnippet = [ this.config.data.id, this.config.data.title, this.config.data.value ];
}
inheritPrototype(ItemShortDescription,ItemList);

ItemShortDescription.prototype.constructor = ItemShortDescription;

ItemShortDescription.prototype.updateSize = function() {
	ItemList.prototype.updateSize.call(this);
	for(var i=0; i<this.childrens; i++){
		var child = $(this.node).find(".wrapper-data").children()[i];
		this.tempWrapperDataHeight += $(child).height();
	}
	$(this.node).find(".wrapper-data").css({
		height : this.tempWrapperDataHeight
	});
}