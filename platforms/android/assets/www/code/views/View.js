function View(config) { 
	this.config = config;
	this.initializeParameters();
	this.initialize();
}
View.prototype.constructor = View;
View.prototype.initializeParameters = function() {
	this.container = this.config.container;
};
View.prototype.initialize = function() {};
View.prototype.configure = function() {}
View.prototype.addHandlers = function() {}
View.prototype.bindEvents = function() {}
View.prototype.destroy = function() {}