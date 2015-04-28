function Slider(config) {
	this.config = config;
	this.container = this.config.container;
	this.current = 0;
	this.pathSnippet = (this.config.snippet) ? this.config.snippet : "";
	this.pathItemSnippetSlider = (this.config.itemSnippet) ? this.config.itemSnippet : "";
	this.pictures = (this.config.pictures) ? this.config.pictures : [];
	this.dataSnippet = [];
}

Slider.prototype.constructor = Slider;

Slider.prototype.initialize = function() {
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" :this.dataSnippet });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	this.addPictures();

	$(this.node).width(this.config.width);	
	this.setConfig();
	this.configListeners();
}

Slider.prototype.addPictures = function() {
	if(this.pictures.length > 0) {
		this.pictures.forEach(function(item){
			var itemSlider = new ItemSlider( { container:$(this.node).find(".content-slider-list"),snippet:this.pathItemSnippetSlider,data:item,path:this.path } );
			itemSlider.initialize();
		},this);

		if($(this.node).find(".content-slider-list li").length <= 1){
			$(this.node).find(".controls-slider").css({ display : "none" });
		}
	}
}

Slider.prototype.setConfig = function() {
	this.delay = (this.config.delay) ? this.config.delay * 1000 : 3000; 
	this.hasTimer = (this.config.delay == 0) ? false : true;

	$(this.node).height(this.config.height);
	$(this.node).find(".content-slider-list").height(this.config.height);
	$(this.node).find(".controls-slider").width(this.config.width);
	this.max = $(this.node).find(".content-slider-list li").length;
	$(this.node).find(".content-slider-list").width(this.config.width * this.max);	
	if(this.hasTimer)
		this.startTimer();
}

Slider.prototype.startTimer = function() {
    this.timer = setTimeout(this.onTickTimer,this.delay,{context:this});
}

Slider.prototype.onTickTimer = function(data) {
	data.context.goNext();
	data.context.timer = setTimeout(data.context.onTickTimer,data.context.delay,{context:data.context});
}

Slider.prototype.configListeners = function() {
	$(this.node).find(".btn.prev").click( { context : this }, this.onClickPrev );
	$(this.node).find(".btn.next").click( { context : this }, this.onClickNext );
}

Slider.prototype.onClickPrev = function(event) {
	event.data.context.goPrevious();
	if(event.data.context.hasTimer){
		clearTimeout(event.data.context.timer);
		event.data.context.timer = setTimeout(event.data.context.onTickTimer,10000,{context:event.data.context});
	}
}

Slider.prototype.goPrevious = function() {
	if(this.current < 0) {
		this.current++;
		this.animate();
	} else {
		this.current = -this.max + 1;
		this.animate();
	}
}

Slider.prototype.onClickNext = function(event) {
	event.data.context.goNext();
	if(event.data.context.hasTimer){
		clearTimeout(event.data.context.timer);
		event.data.context.timer = setTimeout(event.data.context.onTickTimer,10000,{context:event.data.context});
	}
}

Slider.prototype.goNext = function() {
	if(Math.abs((this.current - 1)) < this.max) {
		this.current--;
		this.animate();
	} else {
		this.current=0;
		this.animate();
	}
}

Slider.prototype.getThumbPosition = function(){
	var pos = this.current * this.config.width;
	return pos;
}

Slider.prototype.animate = function() {
	$(this.node).find(".content-slider-list").animate({ left:this.getThumbPosition() },300,function(){ /*Animation Complete*/ });
}