function Libs(_lib_) {
	var self = this;
	this.lib = _lib_;
	
	if(window.jQuery == undefined) {
		console.log("Jquery is not loaded. It's mandatory to load JQuery");
	}else{
		this.loadFiles(this.getFiles(this.lib));
	}
};

Libs.prototype.constructor = Libs;

Libs.prototype.getFiles = function(_lib_) {
	var self = this;
	this.libraries = new Array(
		{
			"name"	: "app",
			"libs"	: [
				"code/monkeyman/core/oop.js",
				"code/monkeyman/core/Snippet.js",
				"code/monkeyman/core/Utilities.js",
				"code/Utils.js",
				"code/App.js",
				"code/snippets/Header.js",
				"code/snippets/Lottery.js",
				"code/snippets/ItemBetsList.js",
				"code/snippets/Popup.js",
				"code/snippets/PopupBetOptions.js",			
				"code/views/View.js",
				"code/views/Login.js",
				"code/views/Home.js",
				"code/views/UserSettings.js",
				"code/views/Bet.js",
				"code/views/BetGenerator.js",
				"code/views/BetEditor.js",
				"code/views/BetsList.js",
				"code/views/LockView.js",
				"code/views/TempLockView.js"
			]
		}
	);
	var _libs_ = new Array();
	this.libraries.forEach(function(d){
		if(d.name == _lib_)
			_libs_ = d.libs;
	});
	return _libs_;
};

Libs.prototype.loadFiles = function(files) {
	var index,extension,file;
	files.forEach(function(f){
		index = f.lastIndexOf(".",f.length);
		extension = f.slice(index + 1,f.length);
		alert(extension);
		switch(extension)
		{
			case "css":
				$.ajax({
					async : false,
					url : f,
					success : function(result) {
						$("<style></style>").appendTo("head").html(result);
					},
					error : function(error) {
						console.log("No se pudo cargar " + f);
					}
				});
			break;
			case "js":
				$.ajax({
					async : false,
					url : f,
					dataType : "script",
					success : function(result) {
						//console.log("Se cargo: " + f);
						alert("Se cargo: " + f);
					},
					error : function(error) {
						//console.log("No se pudo cargar " + f);
						alert("No se pudo cargar " + f);
					}
				});

			break;
		}
	});
};