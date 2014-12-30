function Snippet(config) {
	this.config = config;
	this.configuration();
};

Snippet.prototype.constructor = Snippet;

Snippet.prototype.configuration = function() { };

Snippet.prototype.getSnippet = function() {
	var self = this;
	var element;
	jQuery.ajax({
		async : false,
       	url:    this.config.path,
       	success: function(result) {
        	element = self.render(String(result),self.config.data);
        }
    });          
	return element;
};

Snippet.prototype.render = function(_snippet_,data) {
	var self = this;
	var snippet = _snippet_;
	data.forEach(function(d,i){
		var patt = "[" + i + "]";
		snippet = snippet.replace(patt,d);		
	});
	return snippet;
};