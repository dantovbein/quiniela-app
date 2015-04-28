function ItemSlider(config) {
	this.config = config;
	this.container = this.config.container;
	this.pathSnippet = this.config.snippet;
	this.data = this.config.data;
	this.dataSnippet = [ this.data.thumb ];
}

ItemSlider.prototype.constructor = ItemSlider;

ItemSlider.prototype.initialize = function() {
	var snippet = new Snippet( { path : this.pathSnippet, data : this.dataSnippet });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);
}