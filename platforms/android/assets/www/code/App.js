function App(config) {
	this.config = config;
	this.initialize();
} 

App.prototype.contstructor = App;

App.prototype.initialize = function() {
	this.configure()
	if(Utils.getUserData().user == "" || Utils.getUserData().user == null) {
		this.getLogin();
	} else {		
		this.getHome();
	}
}

App.prototype.configure = function() {
	this.totalToSychronize = 0;
	this.totalSychronized = 0;
	this.createDataBase();
	Utils.setMainInstance(this);
	$(document).bind( "removePopup", { context:this }, this.removePopup,false );
	$(document).bind( "appTemporaryUnlocked", { context:this }, function(e){
		localStorage.setItem("is_temporary_locked","0");
		e.data.context.startTimerLockApp();
	},false );
	$(document).bind( "betEditor", { context:this }, this.editBet,false );
	$(document).bind( "blockUser", { context:this }, function(e){
		localStorage.setItem("is_locked", 1);
		e.data.context.getLockView();
	},false );
	$(document).bind("resetBetView", { context:this }, function(e){
		e.data.context.getHome();
	},false );

	this.delay = 1000 * (Utils.getLimitMinute() * 60);
	this.startTimer();

	this.currentResetTimer = 0;
	
	if(parseInt(localStorage.getItem("is_temporary_locked"))==0){
		this.startTimerLockApp();
	}
	

	$(document).click( {context:this}, function(e){
    	e.data.context.currentResetTimer = 0;
  	});
}

App.prototype.startTimerLockApp = function(){
	this.timerLockApp = setTimeout(this.onCompleteTimerLockApp,1000,{context:this}); // 60 * 1000 = 1 minuto
}

App.prototype.onCompleteTimerLockApp = function(e){
	e.context.currentResetTimer++;
	console.log("AppTimer",e.context.currentResetTimer);
	if(e.context.currentResetTimer == 60 * 10 ){ // 10 = 10 minutos
		console.log("Bloquear app");
		e.context.showTempLockView();
	}else {
		e.context.startTimerLockApp();
	}
}

App.prototype.showTempLockView = function() {
	localStorage.setItem("is_temporary_locked","1");
	var tempLockView = new TempLockView( { container : $("body") } );
	tempLockView.initialize();
}

App.prototype.checkIfVendorIsActive = function(){
	this.tempVendorStatus;
	$.ajax({
		context : this,
		async : false,
		type : "POST",
		data : {
			idVendor : Utils.getUserData().idVendor		
		},
		url : Utils.getServices().checkIfVendorIsActive,
		success : function(r){
			var result = JSON.parse(r);
			this.tempVendorStatus = result[0].isActive;
		},
		error : function(error) {
			debugger;
		}
	});
	return this.tempVendorStatus;
}

App.prototype.startTimer = function() {
   var timer = setTimeout(this.onCompleteTimer,this.delay,{context:this});
}

App.prototype.onCompleteTimer = function(data) {
	data.context.checkBets();
	data.context.startTimer();
}

App.prototype.checkBets = function() {
	var betsData = this.lotteryDataBase.query("bets");
	console.log("Chequear jugadas:",betsData.length);
	betsData.forEach(function(b){
		this.lotteryDataBase.update("bets", {ID: b.ID},function(row){
			row.is_editable = (Utils.checkBetLimit(b)) ? 1 : 0
			return row;
		});
	},this);
	this.lotteryDataBase.commit();
	this.synchronize();
}

App.prototype.createDataBase = function() {
	this.lotteryDataBase = new localStorageDB("lottery", localStorage);
	if(this.lotteryDataBase.isNew()) {
		this.lotteryDataBase.createTable("bets",["bet_number","bet_data","bet_position","bet_amount","bet_number_redoblona","bet_position_redoblona","bet_total_amount","bet_created","bet_canceled","is_active","is_editable","bet_sent"]);
		this.lotteryDataBase.commit();
	} else {
		// Existe la base de datos
	}
}

App.prototype.removeContent = function() {
	if($("section.view").length > 0) {
		$("section.view").remove();
	}
	
	Utils.removeOverlay();
	Utils.removeMessage();
	
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
	Utils.removeUserData();
	this.createDataBase();
	
	if($("header.default-header").length > 0) $("header.default-header").remove();
	if($(".view.user-settings").length > 0) $(".view.user-settings").remove();
	
	this.removeContent();

	var login = new Login( { container : $("main") } );
	login.initialize();
	
	$(login.node).bind( "home", { context:this }, function(e) { e.data.context.getHome(); },false);  	
}

App.prototype.getHome = function() {

	if(this.checkIfVendorIsActive()==null){
		alert("Usuario eliminado permanentemente o problemas con la conexión");
		this.getLogin();
		return false
	}

	if(this.checkIfVendorIsActive()=="0") {
		alert("Usuario bloqueado temporalmente");
		this.getLogin();
		return false;
	}

	if(this.isLocked()){
		this.getLockView();
		return false;
	} else {
		if($("header.default-header").length == 0) this.getHeader();
		this.removeContent();

		var home = new Home( { container : $("main") } );
		home.initialize();
		$(home.node).bind( "generateBet", { context:this }, function(e) { e.data.context.generateBet(); },false);
	  	$(home.node).bind( "showBets", { context:this }, function(e) { e.data.context.getBets(); });
	  	$(home.node).bind( "synchronize", { context:this }, function(e) { e.data.context.synchronize(); });			
	}

	if(parseInt(localStorage.getItem("is_temporary_locked"))==1){
		console.log("Usuario temporalmente bloqueado");
		this.showTempLockView();
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
	var expiration = new Date(Utils.getUserData().expiration);
	if(parseInt(Utils.getUserData().isLocked) == 1){
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
		$(this.userSettings.node).bind( "synchronize", { context:this }, function(e) { e.data.context.synchronize(); },false);
	} else {
		this.userSettings.show();
	}
}

App.prototype.generateBet = function() {
	this.removeContent();
	this.bet = new BetGenerator({ container : $("main"), todayslotteries : Utils.getTodayLotteries(Utils.getLotteriesData(this.lotteryData) ) });
	this.bet.initialize();

	//$(bet.node).bind( "bets", { context:this }, function(e) { e.data.context.getBets(); });
	$(this.bet.node).bind( "newBet", { context:this }, function(e) { e.data.context.generateBet(); });
	$(this.bet.node).bind( "cancel", { context:this }, function(e) { e.data.context.getHome(); });

}

App.prototype.getBets = function() {
	this.removeContent();
	this.bets = new BetsList({ container : $("main") });
	this.bets.initialize();
}


App.prototype.editBet = function(e) {
	if(!Utils.checkBetLimit(e.betData)) {
		alert("No se puede editar la apuesta");
		return false;
	}
	e.data.context.removeContent();
	this.bet = new BetEditor({ container : $("main"), todayslotteries : Utils.getTodayLotteries(Utils.getLotteriesData(this.lotteryData)), betData : e.betData });
	this.bet.initialize();

	$(this.bet.node).bind( "newBet", { context:e.data.context }, function(e) { e.data.context.getBets(); },false);
}

App.prototype.removePopup = function() {
	Utils.removeOverlay();
	if($(".popup").length > 0 ) $(".popup").remove();
}

App.prototype.removeGame = function() {
	//this.removeContent();
	alert("remove game");
}

App.prototype.synchronize = function() {
	if(this.userSettings)
		this.userSettings.hide();

	this.totalToSychronize = 0;
	this.totalSychronized = 0;

	var betsData = Utils.getMainInstance().lotteryDataBase.query("bets");

	betsData.forEach(function(b){
		debugger;
	
		if(b.is_editable==0) {
			this.totalToScronize++;
		} 
		if(b.bet_sent == 0) {
			this.uploadBet(b);
		}		
	},this);
	if(this.totalToScronize > 0) {
		Utils.showMessage("Sincronizando las apuestas con el servidor");
	}
}

App.prototype.uploadBet = function(bet) {
	debugger;
	
	this.dataToSend = bet;
	this.betLocalId = bet.ID;

	if(Utils.getMainInstance().lotteryDataBase.query("bets",{ID:this.betLocalId})[0].bet_sent == 1) {
		console.log("La jugada ya se sincronizó previamente");
	}else {
		$.ajax({
			context : this,
			async : false,
			type : "POST",
			data : {
				idLocal:this.betLocalId,
				betNumber:this.dataToSend.bet_number,
				betPosition:this.dataToSend.bet_position,
				betAmount:this.dataToSend.bet_amount,
				betNumberRedoblona:this.dataToSend.bet_number_redoblona,
				betPositionRedoblona:this.dataToSend.bet_position_redoblona,
				betData:this.dataToSend.bet_data,
				betTotalAmount:this.dataToSend.bet_total_amount,
				idDevice:Utils.getUserData().idDevice,
				idVendor:Utils.getUserData().idVendor,
				betCreated:this.dataToSend.bet_created,
				betCanceled:this.dataToSend.bet_canceled,
				isActive:this.dataToSend.is_active
				
			},
			url : Utils.getServices().uploadBet,
			success : function(r){
				debugger;
	
				if(isNaN(r)==false){
					//Utils.getMainInstance().lotteryDataBase.deleteRows("bets",{ID:this.betLocalId});
					//Utils.getMainInstance().lotteryDataBase.commit();
					Utils.getMainInstance().lotteryDataBase.update("bets",{ID: this.betLocalId},function(row){
						row.bet_sent = 1;
						return row;
					});
					Utils.getMainInstance().lotteryDataBase.commit();

					if(this.bets) {
						this.bets.getAllBets();
					}
					console.log("Se sincronizo automaticamente la apuesta");
				} else {
					debugger;
					console.log("No se pudo sincronizar automaticamente la apuesta");
				}
				this.totalSychronized++;
				if(this.totalSychronized == this.totalToSychronize){
					Utils.removeMessage();
				}				
			},
			error : function(error) {
				debugger;
			}
		});
	}
}



