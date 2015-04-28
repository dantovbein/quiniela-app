function SliderWithThumbnails(config) {
	Slider.call(this,config);
	this.marginThumbnails = (config.marginThumbnails) ? config.marginThumbnails : 0;
}

SliderWithThumbnails.prototype.constructor = SliderWithThumbnails;

inheritPrototype(SliderWithThumbnails,Slider);

SliderWithThumbnails.prototype.init = function() {
	Slider.prototype.init.call(this);
}

SliderWithThumbnails.prototype.setConfig = function() {
	this.hasTimer = false;
	$(this.node).find(".controls-slider").width(this.config.width);
	this.max = $(this.node).find(".content-thumbnails-list li").length;
	$(this.node).find(".content-thumbnails-list").width( (this.config.widthThumbnail * this.max) + (this.max * (this.marginThumbnails*2) ) + 12 );
	$(this.node).find(".content-slider-list").width(this.config.width * this.max);

	$($(this.node).find(".content-thumbnails-list li")[this.current]).addClass("selected");
}

SliderWithThumbnails.prototype.configListeners = function() {
	Slider.prototype.configListeners.call(this);
	$(this.node).find(".content-slider-list li").click( { context:this }, this.onClickThumb );
	$(this.node).find(".content-thumbnails-list li").click( { context:this }, this.onClickThumbnail );
}

SliderWithThumbnails.prototype.animate = function() {
	Slider.prototype.animate.call(this);
	$(this.node).find(".content-thumbnails-list").animate({ left:this.getThumbnailPosition() },300,function(){ /*Animation Complete*/ });
	$(this.node).find(".content-thumbnails-list li").removeClass("selected");
	$($(this.node).find(".content-thumbnails-list li")[ Math.abs(this.current) ]).addClass("selected");
}

SliderWithThumbnails.prototype.getThumbnailPosition = function(){
	var pos = (this.current * this.config.widthThumbnail) + this.marginThumbnails;
	return pos;
}

SliderWithThumbnails.prototype.onClickThumb = function(event) {
	if(event.data.context.config.parent){
		event.data.context.config.parent.showThumb( { path:$(this).data("path"), image:$(this).data("image") } );
	}
}

SliderWithThumbnails.prototype.onClickThumbnail = function(event) {
	event.data.context.current = ($(this).index() > event.data.context.current ) ? -($(this).index()) : Math.abs($(this).index());
	event.data.context.animate();
}