function TempLockView(config) {
	View.call(this,config);	
}

inheritPrototype(TempLockView, View);

TempLockView.prototype.constructor = TempLockView;

TempLockView.prototype.initializeParameters = function(){
	View.prototype.initializeParameters.call(this);
	this.pathSnippet = "views/tempLockView.html";
}

TempLockView.prototype.initialize = function(){
	View.prototype.initialize.call(this);
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [] });
	this.node = $.parseHTML(snippet.getSnippet());
	$(this.node).css({ height : $(document).height() });
	this.container.append(this.node);
	this.addHandlers();	
}

TempLockView.prototype.addHandlers = function() {
	View.prototype.addHandlers.call(this);
	
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