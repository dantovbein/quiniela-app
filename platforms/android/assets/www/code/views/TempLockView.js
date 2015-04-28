function TempLockView(config) {
	GenericView.call(this,config);	
}

inheritPrototype(TempLockView, GenericView);

TempLockView.prototype.constructor = TempLockView;

TempLockView.prototype.initializeParameters = function(){
	GenericView.prototype.initializeParameters.call(this);
	this.path = "views/tempLockView.html";
}

TempLockView.prototype.initialize = function(){
	GenericView.prototype.initialize.call(this);
	$(this.node).css({ height : $(document).height() });
}

TempLockView.prototype.addHandlers = function() {
	GenericView.prototype.addHandlers.call(this);
	
	$(this.node).find(".btn-sign-in").click( { context:this }, this.signIn );
}

TempLockView.prototype.signIn = function(e) {
	var _this = e.data.context;
	var unlockCode = $(_this.node).find("#input-unlock-code").val();
	var errorElement = $(_this.node).find(".error-log");
	
	if( unlockCode == "" ) {
		errorElement.text("Debe escribirse un código");
		return false;
	} else {
		if(unlockCode == localStorage.getItem("unlock_code")){
			console.log("Aplicacion desbloqueada");
			$(document).trigger({type:"appTemporaryUnlocked"});
			$(_this.node).remove();
		}else{
			errorElement.text("Error en el código");
			return false;	
		}
	}	
}