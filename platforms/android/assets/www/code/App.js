function App(config) {
	this.config = config;
	this.initialize();
} 

App.prototype.contstructor = App;

App.prototype.initialize = function() {
	this.configure()

	if(utils.getUserData().user == "" || utils.getUserData().user == null) {
		this.getLogin();
	} else {		
		this.getHome();
	}
}

App.prototype.configure = function() {
	this.createDataBase();
	utils.setMainInstance(this);
	$(document).bind( "removePopup", { context:this }, this.removePopup,false );
	$(document).bind( "betEditor", { context:this }, this.editBet,false );
	$(document).bind( "blockUser", { context:this }, function(e){
		localStorage.setItem("is_locked", 1);
		e.data.context.getLockView();
	},false );
}

App.prototype.createDataBase = function() {
	this.lotteryDataBase = new localStorageDB("lottery", localStorage);
	if(this.lotteryDataBase.isNew()) {
		this.lotteryDataBase.createTable("bets",["bet_number","bet_data","bet_position","bet_amount","total_amount","date"]);
		this.lotteryDataBase.commit();
	} else {
		// Existe la base de datos
	}
}

App.prototype.removeContent = function() {
	if($("section.view").length > 0) {
		$("section.view").remove();
	}
	
	utils.removeOverlay();
	
	if($(".popup").length > 0) {
		$(".popup").remove();
	}
}

App.prototype.getHeader = function() {
	var header = new Header( { container : $("body") } );
	header.initialize();

	$(header.node).bind( "home", { context:this }, function(e) { e.data.context.getHome(); }, false);
	$(header.node).bind( "userSettings", { context:this }, function(e) { e.data.context.getSettings(); },false);
}

App.prototype.getLogin = function() {
	utils.removeUserData();
	this.createDataBase();
	
	if($("header.default-header").length > 0) $("header.default-header").remove();
	if($(".view.user-settings").length > 0) $(".view.user-settings").remove();
	
	this.removeContent();

	var login = new Login( { container : $("main") } );
	login.initialize();
	
	$(login.node).bind( "home", { context:this }, function(e) { e.data.context.getHome(); },false);  	
}

App.prototype.getHome = function() {
	if(this.isLocked()){
		this.getLockView();
		return false;
	} else {
		if($("header.default-header").length == 0) this.getHeader();
		this.removeContent();

		var home = new Home( { container : $("main") } );
		home.initialize();
		$(home.node).bind( "generateBet", { context:this }, function(e) { e.data.context.generateBet(); },false);
	  	//$(home.node).bind( "editBet", { context:this }, function(e) { e.data.context.editGame(); });
	  	//$(home.node).bind( "removeBet", { context:this }, function(e) { e.data.context.removeGame(); });
	  	//$(home.node).bind( "synchronize", { context:this }, function(e) { e.data.context.synchronize(); });			
	}	
}

App.prototype.getLockView = function() {
	if($("header.default-header").length > 0) $("header.default-header").remove();
	this.removeContent();
	var lockView = new LockView( { container : $("main") } );
	lockView.initialize();
	$(lockView.node).bind( "home", { context:this }, function(e) { 
		e.data.context.unlockApp(); 
	},false);
}

App.prototype.isLocked = function() {
	var today = new Date();
	var expiration = new Date(utils.getUserData().expiration);
	if(parseInt(utils.getUserData().isLocked) == 1){
		return true;
	}else if (today > expiration) {
		return true;
	} else {
		return false;
	}
}

App.prototype.unlockApp = function() {
	localStorage.setItem("is_locked", 0);
	this.getHome();
}


App.prototype.getSettings = function() {
	if($(".view.user-settings").length == 0) {
		this.userSettings = new UserSettings( { container : $("body") } );
		this.userSettings.initialize();

		$(this.userSettings.node).bind( "bets", { context:this }, function(e) { e.data.context.getBets(); },false);
		$(this.userSettings.node).bind( "logout", { context:this }, function(e) { e.data.context.getLogin(); },false);
	} else {
		this.userSettings.show();
	}
}

App.prototype.generateBet = function() {
	this.removeContent();
	var bet = new BetGenerator({ container : $("main"), todayslotteries : utils.getTodayLotteries(utils.getLotteriesData(this.lotteryData) ) });
	bet.initialize();

	$(bet.node).bind( "home", { context:this }, function(e) { e.data.context.getHome(); });
}

App.prototype.getBets = function() {
	this.removeContent();
	var bets = new BetsList({ container : $("main") });
	bets.initialize();
}

App.prototype.editBet = function(e) {
	if(!utils.checkBetLimit(e.betData)) {
		alert("No se puede editar la apuesta");
		return false;
	}

	e.data.context.removeContent();
	var bet = new BetEditor({ container : $("main"), todayslotteries : utils.getTodayLotteries(utils.getLotteriesData(this.lotteryData)), betData : e.betData });
	bet.initialize();

	$(bet.node).bind( "home", { context:this }, function(e) { e.data.context.getHome(); },false);
}

App.prototype.removeGame = function() {
	//this.removeContent();
	alert("remove game");
}

App.prototype.synchronize = function() {
	//this.removeContent();
	alert("synchronize");
}

App.prototype.removePopup = function() {
	utils.removeOverlay();
	if($(".popup").length > 0 ) $(".popup").remove();
}


