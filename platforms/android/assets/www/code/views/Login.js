function Login(config) {
	GenericView.call(this,config);	
}

inheritPrototype(Login, GenericView);

Login.prototype.constructor = Login;

Login.prototype.initializeParameters = function(){
	GenericView.prototype.initializeParameters.call(this);
	this.path = "views/login.html";
}

Login.prototype.initialize = function(){
	GenericView.prototype.initialize.call(this);
	$(this.node).css({ height : $(document).height() });
}

Login.prototype.addHandlers = function() {
	GenericView.prototype.addHandlers.call(this);
	$(this.node).find(".btn-sign-in").click( { context:this }, this.signIn );
}

Login.prototype.signIn = function(e) {
	var _this = e.data.context;
	var user = $(_this.node).find("#input-user").val();
	var password = $(_this.node).find("#input-password").val();
	var errorElement = $(_this.node).find(".error-log");
	
	if(user == "") {
		errorElement.text("Error en el usuario");
		return false;
	} else if( password == "" ) {
		errorElement.text("Error en la contrasena");
		return false;
	} else {
		Utils.showMessage("Conectando con el servidor.");
		$.ajax({
			async : false,
			type : "POST",
			data : { user : user, password : password },			
			url : Utils.getServices().login,
			success : function(_result_) {
				Utils.removeMessage();
				var result = JSON.parse(_result_);				
				if(result[0].idVendor == null) {
					errorElement.text("Datos incorrectos");
				} else {
					Utils.saveUserData(result);
					errorElement.text("");
					$( _this.node ).trigger( "home" );
				}
				
			},
			error : function(error) {
				alert("Problemas con el servidor o sin conexión a la red");
				Utils.removeMessage();
			}
		});
	}
	
}