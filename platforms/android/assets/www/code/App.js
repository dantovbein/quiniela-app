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
		if(localStorage.getItem("changed_time")==1) {
			this.getChangeTimeLockView();
			return false;
		}		
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
		e.stopImmediatePropagation();
		localStorage.setItem("is_temporary_locked","0");
		e.data.context.startTimerLockApp();
	},false );
	
	$(document).bind( Globals.EDIT_BET, { context:this },function(e){ 
		debugger;
		e.stopImmediatePropagation();
		e.data.context.editBet(e.betData);
	},false );

	$(document).bind( "blockUser", { context:this }, function(e){
		e.stopImmediatePropagation();
		localStorage.setItem("is_locked", 1);
		e.data.context.getAppLockView();
	},false );
	
	$(document).bind("resetBetView", { context:this }, function(e){
		e.stopImmediatePropagation();
		e.data.context.getHome();
	},false );
	
	this.delay = 1000 * (Utils.getLimitMinute() * 60);
	this.startTimer();
	this.currentResetTimer = 0;
	
	if(parseInt(localStorage.getItem("is_temporary_locked"))==0){
		this.startTimerLockApp();
	}
	$(document).click( {context:this}, function(e){
		e.stopImmediatePropagation();
    	e.data.context.currentResetTimer = 0;
  	});
  	this.views = [];

  	this.lastTimes = [];
  	this.startTimerToCheckChangedTime();
}

App.prototype.startTimerToCheckChangedTime = function(){
	setTimeout(this.onCompleteTimeCheckChangedTime,1000 * 45,{context:this});
}

App.prototype.onCompleteTimeCheckChangedTime = function(e){
	if(e.context.lastTimes.length == 0){
		e.context.lastTimes.push(new Date());
	}else{
		var last = new Date(e.context.lastTimes[e.context.lastTimes.length - 1]);
		var now = new Date();
		if(last > now) {
			//console.log("Se modificó el horario");
			localStorage.setItem("changed_time", 1);
			e.context.getChangeTimeLockView();
			return false;
		}else{
			//console.log("No se modifico el horario");
		}
		e.context.lastTimes = [];
		e.context.lastTimes.push(now);
	}
	e.context.startTimerToCheckChangedTime();
}


App.prototype.startTimerLockApp = function(){
	this.timerLockApp = setTimeout(this.onCompleteTimerLockApp,1000,{context:this}); // 60 * 1000 = 1 minuto
}

App.prototype.onCompleteTimerLockApp = function(e){
	e.context.currentResetTimer++;
	if(e.context.currentResetTimer == Globals.TIME_STANDBY_APP ){
		console.log("Bloquear app");
		e.context.showTempLockView();
	}else {
		e.context.startTimerLockApp();
	}
}

App.prototype.showTempLockView = function() {
	localStorage.setItem("is_temporary_locked","1");
	var tempLockView = new TempLockView( { container : $("body") } );
	this.views.push(tempLockView);
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
	this.synchronizeByTimer();
}

App.prototype.createDataBase = function() {
	this.lotteryDataBase = new localStorageDB("lottery", localStorage);
	if(this.lotteryDataBase.isNew()) {
		this.lotteryDataBase.createTable("bets",["bet_type","bet_borratina_type","bet_number","bet_data","bet_position","bet_amount","bet_number_redoblona","bet_position_redoblona","bet_total_amount","bet_created","bet_canceled","is_active","is_editable","bet_sent"]);
		this.lotteryDataBase.commit();
	} else {
		// Existe la base de datos
	}
}

App.prototype.removeContent = function() {
	if(this.views.length > 0){
		this.views.forEach(function(v){
			try {
				v.destroy();
			}catch(err){
				console.log("Error al acceder al metodo destroy");
			}
		});
	}
	this.views = [];

	if($("section.view").length > 0) {
		$("section.view").remove();
	}
	
	Utils.removeOverlay();
	Utils.removeMessage();
	
	if($(".popup").length > 0) {
		$(".popup").remove();
	}

	$("main").empty();
}

App.prototype.getHeader = function() {
	var header = new Header( { container : $("body") } );

	$(header.node).bind( "home", { context:this }, function(e) { 
		e.stopImmediatePropagation();
		e.data.context.getHome(); 
	}, false);
	
	$(header.node).bind( "userSettings", { context:this }, function(e) { 
		e.stopImmediatePropagation();
		e.data.context.getSettings(); 
	},false);
}

App.prototype.getLogin = function() {
	Utils.removeUserData();
	this.createDataBase();
	
	if($("header.default-header").length > 0) $("header.default-header").remove();
	if($(".view.user-settings").length > 0) $(".view.user-settings").remove();
	
	this.removeContent();
	
	var login = new Login( { container : $("main") } );
	this.views.push(login);

	$(login.node).bind( "home", { context:this }, function(e) { 
		e.stopImmediatePropagation();
		e.data.context.getHome();
	},false);  	
}

App.prototype.getHome = function() {
	var vendorStatus = this.checkIfVendorIsActive();

	if(vendorStatus==null){
		alert("Usuario eliminado permanentemente o problemas con la conexión");
		this.getLogin();
		return false
	}

	if(vendorStatus=="0") {
		alert("Usuario bloqueado temporalmente");
		this.getLogin();
		return false;
	}

	if(this.isLocked()){
		this.getAppLockView();
		return false;
	} else {
		if($("header.default-header").length == 0) {
			this.getHeader();
		}
		
		this.removeContent();

		var view = new Home( { container : $("main") } );
		this.views.push(view);

		$(view).bind( Globals.GET_BET_QUINIELA_HOME, { context:this }, function(e) { 
			e.stopImmediatePropagation();
			e.data.context.getBet({ betType:Globals.BET_QUINIELA });
		},false);

		$(view).bind( Globals.GET_BET_BORRATINA_HOME, { context:this }, function(e) { 
			e.stopImmediatePropagation();
			e.data.context.getBet({ betType:Globals.BET_BORRATINA });
		},false);

		$(view).bind( Globals.SYNCHRONIZE, { context:this }, function(e) {
			e.stopImmediatePropagation();
			e.data.context.synchronize();
		},false);

	  	this.startTimerToCheckChangedTime();	
	}

	if(parseInt(localStorage.getItem("is_temporary_locked"))==1){
		console.log("Usuario temporalmente bloqueado");
		this.showTempLockView();
	}
}

App.prototype.getBet = function(b) {
	this.removeContent();

	this.currentBetType = b.betType;

	switch(this.currentBetType){
		case Globals.BET_QUINIELA:
			var view = new BetQuinielaHome({ container : $("main") });
			$(view).bind( Globals.SHOW_QUINIELA_BETS, { context:this }, function(e) { 
				e.stopImmediatePropagation();
				e.data.context.showBets(Globals.BET_QUINIELA);
			},false);
			break;
		case Globals.BET_BORRATINA:
			var view = new BetBorratinaHome({ container : $("main") });
			$(view).bind( Globals.SHOW_BORRATINA_BETS, { context:this }, function(e) { 
				e.stopImmediatePropagation();
				e.data.context.showBets(Globals.BET_BORRATINA);
			},false);
			break;
	}

	$(view).bind( Globals.GENERATE_BET, { context:this }, function(e) { 
		e.stopImmediatePropagation();
		e.data.context.generateBet(); 
	},false);	

	this.views.push(view);

}

App.prototype.generateBet = function() {
	this.removeContent();

	switch(this.currentBetType) {
		case Globals.BET_QUINIELA:
			var bet = new BetQuiniela({ container : $("main"), todayslotteries : Utils.getTodayLotteries(Utils.getLotteriesData(this.lotteryData) ) });
			break;
		case Globals.BET_BORRATINA:
			var bet = new BetBorratina({ container : $("main"), todayslotteries : Utils.getTodayLotteries(Utils.getLotteriesData(this.lotteryData) ) });
			break;
	}
	
	$(bet).bind( Globals.NEW_BET, { context:this }, function(e) { 
		e.stopImmediatePropagation();
		e.data.context.generateBet();
	});

	$(bet).bind( Globals.CANCEL, { context:this }, function(e) { 
		e.stopImmediatePropagation();
		e.data.context.getHome();
	});

	this.views.push(bet);
	
}

/*App.prototype.showBets = function() {
	this.removeContent();
	this.bets = new BetsList({ container : $("main") });
	this.views.push(this.bet);
}*/

App.prototype.showBets = function(betType) {
	this.removeContent();

	switch(betType) {
		case Globals.BET_QUINIELA:
			var bet = new BetsQuinielaList({ container : $("main") });
			break;
		case Globals.BET_BORRATINA:
			var bet = new BetsBorratinaList({ container : $("main") });
			break;
	}

	this.views.push(bet);	
}


App.prototype.editBet = function(betData) {
	debugger;
	if(!Utils.checkBetLimit(betData)) {
		alert("No se puede editar la apuesta");
		return false;
	}

	// Cheaquear si ya fue sincronizada
	if(betData.bet_sent == 1) {
		alert("La jugada ya se sincronizó previamente");
		return false;
	}

	this.removeContent();


	switch(betData.bet_type){
		case 1:
			var view = new BetQuinielaEditor({ container : $("main"), todayslotteries : Utils.getTodayLotteries(Utils.getLotteriesData(this.lotteryData)), betData : betData });
			this.currentBetType = Globals.BET_QUINIELA;
			break;
		case 2:
			var view = new BetBorratinaEditor({ container : $("main"), todayslotteries : Utils.getTodayLotteries(Utils.getLotteriesData(this.lotteryData)), betData : betData });
			this.currentBetType = Globals.BET_BORRATINA;
			break;
	}

	this.views.push(this.view);

	$(view).bind( Globals.SHOW_BETS, { context:this }, function(e) { 
		e.stopImmediatePropagation();
		e.data.context.showBets(e.data.context.currentBetType);
	},false);
}

App.prototype.getSettings = function() {
	if($(".view.user-settings").length == 0) {
		this.userSettings = new UserSettings( { container : $("body") } );
		
		$(this.userSettings.node).bind( "logout", { context:this }, function(e) {
			e.stopImmediatePropagation();
			e.data.context.getLogin();
		},false);
	
	} else {
		this.userSettings.show();
	}
}

App.prototype.removePopup = function() {
	Utils.removeOverlay();
	if($(".popup").length > 0 ) $(".popup").remove();
}

App.prototype.synchronize = function() {
	if(this.userSettings)
		this.userSettings.hide();

	this.totalToSychronize = 0;
	this.totalSychronized = 0;

	var betsData = Utils.getMainInstance().lotteryDataBase.query("bets");	

	betsData.forEach(function(b){
		if(b.bet_sent == 0) {
			this.totalToSychronize++;
		}		
	},this);

	if(this.totalToSychronize > 0) {
		Utils.showMessage("Sincronizando las apuestas con el servidor");
	}else{
		alert("No hay jugadas para sincronizar");
	}

	betsData.forEach(function(b){
		if(b.bet_sent == 0) {
			this.uploadBet(b);
		}		
	},this);
	
}

App.prototype.synchronizeByTimer = function() {
	if(this.userSettings)
		this.userSettings.hide();

	this.totalToSychronize = 0;
	this.totalSychronized = 0;

	var betsData = Utils.getMainInstance().lotteryDataBase.query("bets");

	betsData.forEach(function(b){
		if(b.bet_sent == 0) {
			this.totalToSychronize++;
			this.uploadBet(b);
		}		
	},this);

	if(this.totalToSychronize == 0) {
		console.log("No hay jugadas para sincronizar");
	}
	
}

App.prototype.uploadBet = function(bet) {
	this.dataToSend = bet;
	this.betLocalId = bet.ID;

	var vendorStatus = Utils.getMainInstance().checkIfVendorIsActive();
	if(vendorStatus==null){
		alert("Usuario eliminado permanentemente o problemas con la conexión");
		this.getLogin();
		return false
	}

	if(vendorStatus=="0") {
		alert("Usuario bloqueado temporalmente");
		this.getLogin();
		return false;
	}

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
				isActive:this.dataToSend.is_active,
				betType : this.dataToSend.bet_type,
				betBorratinaType : this.dataToSend.bet_borratina_type
				
			},
			url : Utils.getServices().uploadBet,
			success : function(r){
				if(isNaN(r)==false){
					Utils.getMainInstance().lotteryDataBase.update("bets",{ID: this.betLocalId},function(row){
						row.bet_sent = 1;
						return row;
					});
					Utils.getMainInstance().lotteryDataBase.commit();

					if(this.bets) {
						this.bets.getAllBets();
					}
					console.log("Se sincronizo automaticamente la apuesta");
					
					if(this.dataToSend.bet_number.length == 4){
						this.sendEmail4BetDigits(this.dataToSend.bet_number);
					}			

				} else {
					console.log("No se pudo sincronizar automaticamente la apuesta");
				}
				this.totalSychronized++;
				debugger;
				if(this.totalSychronized == this.totalToSychronize){
					Utils.removeMessage();
				}				
			},
			error : function(error) {
				debugger;

				console.log("Problemas con el servidor o sin conexión a la red");
				//alert("Problemas con el servidor o sin conexión a la red");
				Utils.removeMessage();
			}
		});
	}
}

App.prototype.getAppLockView = function() {
	if($("header.default-header").length > 0) $("header.default-header").remove();
	this.removeContent();
	var appLockView = new AppLockView( { container : $("main") } );
	this.views.push(appLockView);

	$(appLockView.node).bind( "home", { context:this }, function(e) {
		e.stopImmediatePropagation();
		e.data.context.unlockApp(); 
	},false);
}

App.prototype.getChangeTimeLockView = function() {
	if($("header.default-header").length > 0) $("header.default-header").remove();
	this.removeContent();
	var changeTimeLockView = new ChangeTimeLockView( { container : $("main") } );
	this.views.push(changeTimeLockView);

	$(changeTimeLockView.node).bind( "home", { context:this }, function(e) {
		e.stopImmediatePropagation();
		e.data.context.unlockChangedTime(); 
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
	this.lotteryDataBase.deleteRows("bets")
	this.getHome();
}

App.prototype.unlockChangedTime = function() {
	localStorage.setItem("changed_time", 0);
	this.lotteryDataBase.deleteRows("bets")
	this.lastTimes = [];
	this.getHome();
}

App.prototype.sendEmail4BetDigits = function(betNumber){
	$.ajax({
		context : this,
		type : "POST",
		data : { 
			betNumber:betNumber,
			vendorName:Utils.getUserData().fullName 
		},
		url : Utils.getServices().sendEmail4betDigits,
		success : function(r){
			console.log("Mail enviado correctamente");
		},
		error : function(error){
			debugger;
		}
	});
}



