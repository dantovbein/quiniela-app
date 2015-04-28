function Toggle(config){
	this.config = config;
	this.container = this.config.container;
	this.pathSnippet = (this.config.pathSnippet) ? this.config.pathSnippet : "code/Monkeyman/ui/toggle/snippets/toggle.html";
	this.state = (this.config.state) ? this.config.state : false;
	this.padding = 5;
}

Toggle.prototype.constructor = Toggle;

Toggle.prototype.initialize = function() {
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [] });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);
	//this.showState();
	$(this.node).click( { context:this }, this.onChangeState );
	//$(this.node).find(".toggle-btn").click( { context:this }, this.onChangeState );
	//$(this.node).find(".toggle-btn").css({ left : this.padding })
}

Toggle.prototype.onChangeState = function(e) {
	var self = e.data.context;
	self.state = (self.state) ? false : true;
	self.onSwitch();	
}

Toggle.prototype.onSwitch = function() {
	var self = this;
	$(this.node).find(".toggle-btn").animate( { left : (this.state) ? $(this.node).width() - $(this.node).find(".toggle-btn").width() - this.padding : this.padding } ,200, function(){
		//debugger;
		//self.showState();
	} );
}

Toggle.prototype.showState = function() {
	var addClassName = (this.state) ? "active" : "inactive";
	var removeClassName = (this.state) ? "inactive" : "active";

	$(this.node).removeClass(removeClassName);
	$(this.node).addClass(addClassName);
}