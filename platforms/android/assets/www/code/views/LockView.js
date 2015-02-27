function LockView(config) {
	View.call(this,config);
	this.container = config.container;
	this.pathSnippet = "views/lockView.html";
}

inheritPrototype(LockView, View);

LockView.prototype.constructor = LockView;

LockView.prototype.initialize = function(){
	View.prototype.initialize.call(this);
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [] });
	this.node = $.parseHTML(snippet.getSnippet());
	$(this.node).css({ height : $(document).height() });
	this.container.append(this.node);
	this.addHandlers();	
}

LockView.prototype.addHandlers = function() {
	View.prototype.addHandlers.call(this);
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
				errorElement.text("error",error);
			}
		});
	}	
}