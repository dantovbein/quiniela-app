function LockView(config) {
	GenericView.call(this,config);	
}

inheritPrototype(LockView, GenericView);

LockView.prototype.constructor = LockView;

LockView.prototype.initializeParameters = function(){
	GenericView.prototype.initializeParameters.call(this);
}

LockView.prototype.initialize = function(){
	GenericView.prototype.initialize.call(this);
	$(this.node).css({ height : $(document).height() });
}

LockView.prototype.addHandlers = function() {
	GenericView.prototype.addHandlers.call(this);
	$(this.node).find(".btn-sign-in").click( { context:this }, this.signIn );
}

LockView.prototype.signIn = function(e) {
	var _this = e.data.context;
	var unlockAppCode = $(_this.node).find("#input-unlock-code").val();
	var errorElement = $(_this.node).find(".error-log");
	
	if( unlockAppCode == "" ) {
		errorElement.text("Debe escribirse un código");
		return false;
	} else {
		Utils.showMessage("Conectando con el servidor.");
		$.ajax({
			context : _this,
			async : false,
			type : "POST",
			data : { user : Utils.getUserData().idVendor ,unlockAppCode : unlockAppCode },			
			url : Utils.getServices().unlock,
			success : function(_result_) {
				debugger;
				Utils.removeMessage();
				var result = JSON.parse(_result_);
				if((result[0].idVendor == Utils.getUserData().idVendor)) {
					$(this.node).trigger( "home" );
				}else{
					alert("Error en el código.");
					return false;
				}				
			},
			error : function(error) {
				alert("Problemas con el servidor o sin conexión a la red");
				Utils.removeMessage();
			}
		});
	}	
}