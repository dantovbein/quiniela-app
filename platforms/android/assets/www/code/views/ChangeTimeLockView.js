function ChangeTimeLockView(config) {
	LockView.call(this,config);	
}

inheritPrototype(ChangeTimeLockView, LockView);

ChangeTimeLockView.prototype.constructor = ChangeTimeLockView;

ChangeTimeLockView.prototype.initializeParameters = function(){
	LockView.prototype.initializeParameters.call(this);
	this.pathSnippet = "views/changeTimeLockView.html";
}