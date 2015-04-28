function Preloader(config) {
	this.config = config;
	this.container = this.config.container;
	this.pathSnippet = (this.config.pathSnippet) ? this.config.pathSnippet : "code/monkeyman/ui/preloader/snippets/preloader.html";
	this.dataSnippet = [];
	this.autoHeight = (this.config.autoHeight) ? this.config.autoHeight : true;
}

Preloader.prototype.constructor = Preloader;

Preloader.prototype.initialize = function() {
	var snippet = new Snippet( { path : this.pathSnippet , data : this.dataSnippet } );
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	if(this.autoHeight)
		$(this.node).css( { height : $(document).height() } );
}

Preloader.prototype.destroy = function() {
	$(this.node).remove();
}