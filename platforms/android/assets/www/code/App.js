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
	utils.setMainInstance(this);
	$(document).bind( "removePopup", { context:this }, this.removePopup );
	$(document).bind( "betEditor", { context:this }, this.editBet );
}

App.prototype.createDataBase = function() {
	this.lotteryDataBase = new localStorageDB("lottery", localStorage);
	if(this.lotteryDataBase.isNew()) {
		this.lotteryDataBase.createTable("bets",["bet_number","bet_data","bet_position","bet_amount","total_amount","date"]);
		this.lotteryDataBase.commit();
	}
}

App.prototype.getLotteriesData = function() {
	var self = this;
	$.ajax({
		async : false,
		//url : "data/lotteries.json",
		url : "http://deaene.com.ar/apps/Quiniela/mobile/data/lotteries.json",
		context : this,
		success : function(result) {
			//alert(result.days[0].day);
			this.lotteryData = result;
		},
		error : function(error) {
			alert("error");
		}
	})
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

//App.prototype.bindEvents = function() {
	//document.addEventListener('getHome', this.getHome, true);
//}

App.prototype.getHeader = function() {
	var header = new Header( { container : $("body") } );
	header.initialize();

	$(header.node).bind( "home", { context:this }, function(e) { e.data.context.getHome(); });
	$(header.node).bind( "userSettings", { context:this }, function(e) { e.data.context.getSettings(); });
}

App.prototype.getLogin = function() {
	utils.removeUserData();
	this.createDataBase();
	
	if($("header.default-header").length > 0) $("header.default-header").remove();
	if($(".view.user-settings").length > 0) $(".view.user-settings").remove();
	
	this.removeContent();

	var login = new Login( { container : $("main") } );
	login.initialize();
	
	$(login.node).bind( "home", { context:this }, function(e) { e.data.context.getHome(); });  	
}

App.prototype.getHome = function() {
	if($("header.default-header").length == 0) this.getHeader();
	this.removeContent();

	var home = new Home( { container : $("main") } );
	home.initialize();

	$(home.node).bind( "generateBet", { context:this }, function(e) { e.data.context.generateBet(); });
  	//$(home.node).bind( "editBet", { context:this }, function(e) { e.data.context.editGame(); });
  	//$(home.node).bind( "removeBet", { context:this }, function(e) { e.data.context.removeGame(); });
  	//$(home.node).bind( "synchronize", { context:this }, function(e) { e.data.context.synchronize(); });
}

App.prototype.getSettings = function() {
	//this.removeContent();

	if($(".view.user-settings").length == 0) {
		this.userSettings = new UserSettings( { container : $("body") } );
		this.userSettings.initialize();

		$(this.userSettings.node).bind( "bets", { context:this }, function(e) { e.data.context.getBets(); });
		$(this.userSettings.node).bind( "logout", { context:this }, function(e) { e.data.context.getLogin(); });
	} else {
		//this.showSettings();
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

	$(bet.node).bind( "home", { context:this }, function(e) { e.data.context.getHome(); });
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


