function ItemList(config){
	this.config = config;
	this.container = this.config.container;
	this.itemWidth = this.config.itemWidth
	this.itemHeight = this.config.itemHeight;
}

ItemList.prototype.constructor = ItemList;

ItemList.prototype.initialize = function() {
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : this.dataSnippet });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	$(this.node).css( { "width" : this.itemWidth,
						"height" : this.itemHeight });
}

ItemList.prototype.updateSize = function() {
	this.tempHeight = $(this.node).height();
	this.childrens = $(this.node).find(".wrapper-data").children().length;
	this.tempWrapperDataHeight = 0;
}

ItemList.prototype.destroy = function() {
	$(this.node).remove()
}