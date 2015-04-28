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
				"code/monkeyman/core/Monkeyman.js",
				"code/monkeyman/core/snippets/GenericSnippet.js",
				"code/monkeyman/core/views/GenericView.js",
				"code/Utils.js",
				"code/Globals.js",
				"code/App.js",
				"code/snippets/Header.js",
				"code/snippets/ItemLottery.js",
				"code/snippets/Lottery.js",
				"code/snippets/ItemBetsList.js",
				"code/snippets/ItemBetsQuinielaList.js",
				"code/snippets/ItemBetsBorratinaList.js",
				"code/snippets/Popup.js",
				"code/snippets/PopupBetOptions.js",	
				"code/views/Login.js",
				"code/views/Home.js",
				"code/views/BetHome.js",
				"code/views/BetQuinielaHome.js",
				"code/views/BetBorratinaHome.js",
				"code/views/UserSettings.js",
				"code/views/Bet.js",
				"code/views/BetQuiniela.js",
				"code/views/BetBorratina.js",
				//"code/views/BetGenerator.js",
				//"code/views/BetQuinielaGenerator.js",
				//"code/views/BetBorratinaGenerator.js",
				"code/views/BetEditor.js",
				"code/views/BetsList.js",
				"code/views/BetsQuinielaList.js",
				"code/views/BetsBorratinaList.js",
				"code/views/LockView.js",
				"code/views/AppLockView.js",
				"code/views/ChangeTimeLockView.js",
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
						console.log("Se cargo: " + f);
					},
					error : function(error) {
						console.log("No se pudo cargar " + f);
					}
				});

			break;
		}
	});
};