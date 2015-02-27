function Login(config) {
	View.call(this,config);
	this.container = config.container;
	this.pathSnippet = "views/login.html";
}

inheritPrototype(Login, View);

Login.prototype.constructor = Login;

Login.prototype.initialize = function(){
	View.prototype.initialize.call(this);
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [] });
	this.node = $.parseHTML(snippet.getSnippet());
	$(this.node).css({ height : $(document).height() });
	this.container.append(this.node);
	this.addHandlers();	
}

Login.prototype.addHandlers = function() {
	View.prototype.addHandlers.call(this);
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
				errorElement.text("error",error);
			}
		});
	}
	
}