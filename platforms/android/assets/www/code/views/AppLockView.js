function AppLockView(config) {
	LockView.call(this,config);	
}

inheritPrototype(AppLockView, LockView);

AppLockView.prototype.constructor = AppLockView;

AppLockView.prototype.initializeParameters = function(){
	LockView.prototype.initializeParameters.call(this);
	this.path = "views/appLockView.html";
}