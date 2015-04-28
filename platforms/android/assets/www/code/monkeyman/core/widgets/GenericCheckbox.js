function GenericCheckbox(config){
	GenericWidget.call(this,config);
}

inheritPrototype(GenericCheckbox,GenericWidget);

GenericCheckbox.prototype.constructor = GenericCheckbox;

GenericCheckbox.prototype.initializeParameters = function(){
	GenericWidget.prototype.initializeParameters.call(this);
}

GenericCheckbox.prototype.initialize = function(){
	GenericWidget.prototype.initialize.call(this);
	this.setState(0);
}

GenericCheckbox.prototype.addHandlers = function(){
	GenericWidget.prototype.addHandlers.call(this);
	$(this.node).click({ context:this },this.onClickHandler );
}

GenericCheckbox.prototype.onClickHandler = function(e){
	var self = e.data.context;
	self.state = (self.state==0) ? 1 : 0;
	self.setState(self.state);
	$(self).trigger({ type:MonkeymanGlobals.GET_CHECKBOX_VALUE, checkbox:self });
}

GenericCheckbox.prototype.setState = function(value){
	this.state = value;
	if($(this.node).hasClass("disabled")) $(this.node).removeClass("disabled");
	if($(this.node).hasClass("enabled")) $(this.node).removeClass("enabled");
	if(this.state == 0){
		$(this.node).addClass("disabled");
	} else {
		$(this.node).addClass("enabled");	
	}
}

GenericCheckbox.prototype.getState = function(){
	return this.state;
}