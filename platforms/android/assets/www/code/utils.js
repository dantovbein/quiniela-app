var Utils = {
	setMainInstance : function(instance) {
		this.mainInstance = instance;
	},
	getMainInstance : function() {
		return this.mainInstance;
	},
	getServices : function(){
		//var url = "";
		//var url = "http://deaene.com.ar/apps/Quiniela/mobile/";
		var url = "http://yoviajoriveras.com/app/";
		return {	
			login : url + "service/manager/login.php",
			uploadBet : url + "service/manager/uploadBet.php",
			unlock : url + "service/manager/unlock.php",
			checkIfVendorIsActive : url + "service/manager/checkIfVendorIsActive.php"
		};
	},
	addZero : function(value) {
		return (value < 10) ? "0" + parseFloat(value) : parseFloat(value);
	},
	saveUserData : function(data) {
		localStorage.setItem("id_vendor", data[0].idVendor);
		localStorage.setItem("id_device", data[0].idDevice);
		localStorage.setItem("user", data[0].user);
		localStorage.setItem("password", data[0].password);
		localStorage.setItem("full_name", data[0].fullName);
		localStorage.setItem("unlock_app_code", data[0].unlockAppCode);
		localStorage.setItem("unlock_code", data[0].unlockCode);
		localStorage.setItem("connected_since", new Date());
		localStorage.setItem("expiration", this.getExpirationDate());
		localStorage.setItem("is_locked", 0);
		localStorage.setItem("is_temporary_locked", 0);
	},
	showMessage : function(text) {
		$("body").append("<div class='app-message'><span class='app-message-desc'>" + text + "</span></div>");
		$(".app-message").width($(document).width());
		$(".app-message").height($(document).height());
	},
	removeMessage : function(){
		if($(".app-message").length > 0) $(".app-message").remove();
	},
	removeUserData : function() {
		if(this.getMainInstance().lotteryDataBase) {
			this.getMainInstance().lotteryDataBase.drop();
			localStorage.clear();
		}
	},
	getExpirationDate : function() {
		var now = new Date();
		return new Date(now.setDate(now.getDate() + 30));
	},
	getUserData : function() {
		return { 
			idVendor : localStorage.getItem("id_vendor") ,
			idDevice : localStorage.getItem("id_device") ,
			user : localStorage.getItem("user") ,
			password : localStorage.getItem("password") ,
			fullName : localStorage.getItem("full_name") ,
			code : localStorage.getItem("code") ,
			connectedSince : localStorage.getItem("connected_since") ,
			expiration : localStorage.getItem("expiration"),
			isLocked : localStorage.getItem("is_locked")
		}
	},
	checkConnection : function() {
	    var networkState = navigator.network.connection.type;

	    var states = {};
	    states[Connection.UNKNOWN]  = 'Unknown connection';
	    states[Connection.ETHERNET] = 'Ethernet connection';
	    states[Connection.WIFI]     = 'WiFi connection';
	    states[Connection.CELL_2G]  = 'Cell 2G connection';
	    states[Connection.CELL_3G]  = 'Cell 3G connection';
	    states[Connection.CELL_4G]  = 'Cell 4G connection';
	    states[Connection.NONE]     = 'No network connection';

	    alert('Connection type: ' + states[networkState]);
	},
	getDecimalNumber : function(value) {
		return (value < 10) ? "0" + parseFloat(value) : parseFloat(value);
	},
	getLimitMinute : function(){
		return 3;
	},
	checkBetLimit : function(bet) {
		var minutes = this.getLimitMinute();
		var now = new Date();
		var betTime = new Date(bet.bet_created);
    	var limit = new Date ( betTime );
    	limit.setTime( betTime.getTime() + (minutes * 60000));
		return (now <= limit);
	},
	compareHours : function(sampleTime) {
		var time1 = new Date();
		var splitTime = sampleTime.split(":");
		time1.setHours(splitTime[0],splitTime[1]-10,0);
		var now = new Date();
		return (now <= time1);
	},
	getTodayLotteries : function(lotteryData) {
		var today = new Date();
		var todayLotteryData = new Object();
		lotteryData.days.forEach(function(d){
			if(d.day == today.getDay()) {
				todayLotteryData = d;
			}
		});
		return todayLotteryData;
	},
	checkNewDay : function(){
		debugger;
	},
	getOverlay : function() {
		$("body").append("<div class='overlay'></div>");
		$(".overlay").css( { height : $(window).height() } );
	},
	removeOverlay : function() {
		if($(".overlay").length > 0) $(".overlay").remove();
	},
	getLotteryType : function(value) {
		switch(value) {
			case 1 :
				return "Primera";
			case 2 :
				return "Matutina";
			case 3 :
				return "Vespertina";
			case 4 :
				return "Nocturna";
		}
	},
	getLotteryName : function(value) {
		switch(value) {
			case 1 :
				return "Nacional";
			case 2 :
				return "Provincia";
			case 3 :
				return "Santa Fe";
			case 4 :
				return "Tombola";
			case 5 :
				return "Tombola (Uruguay)";
			case 6 :
				return "Cordoba";
			case 7 :
				return "Santiago";
		}
	},
	getLotteriesData : function() {
		var lotteryData = {
			"days" : [
				{ 	
					"day" : 1,
					"lotteries" : [ 
						{
							"lotteryType" : 1,
							"expirate" : "11:30",
							"lotteryNames" : [ 1,2,3 ]
						},{
							"lotteryType" : 2,
							"expirate" : "14:30",
							"lotteryNames" : [ 1,2,3,5 ]
						},{
							"lotteryType" : 3,
							"expirate" : "17:30",
							"lotteryNames" : [ 1,2,3 ]
						},{
							"lotteryType" : 4,
							"expirate" : "21:00",
							"lotteryNames" : [ 1,2,3,5 ]
						} 
					] 
				},{ 	
					"day" : 2,
					"lotteries" : [ 
						{
							"lotteryType" : 1,
							"expirate" : "11:30",
							"lotteryNames" : [ 1,2,3 ]
						},{
							"lotteryType" : 2,
							"expirate" : "14:30",
							"lotteryNames" : [ 1,2,3,5 ]
						},{
							"lotteryType" : 3,
							"expirate" : "17:30",
							"lotteryNames" : [ 1,2,3 ]
						},{
							"lotteryType" : 4,
							"expirate" : "21:00",
							"lotteryNames" : [ 1,2,3,5 ]
						} 
					] 
				},{ 	
					"day" : 3,
					"lotteries" : [ 
						{
							"lotteryType" : 1,
							"expirate" : "11:30",
							"lotteryNames" : [ 1,2,3 ]
						},{
							"lotteryType" : 2,
							"expirate" : "14:30",
							"lotteryNames" : [ 1,2,3,5 ]
						},{
							"lotteryType" : 3,
							"expirate" : "17:30",
							"lotteryNames" : [ 1,2,3 ]
						},{
							"lotteryType" : 4,
							"expirate" : "21:00",
							"lotteryNames" : [ 1,2,3,4,6 ]
						} 
					] 
				},{ 	
					"day" : 4,
					"lotteries" : [ 
						{
							"lotteryType" : 1,
							"expirate" : "11:30",
							"lotteryNames" : [ 1,2,3 ]
						},{
							"lotteryType" : 2,
							"expirate" : "14:30",
							"lotteryNames" : [ 1,2,3,5 ]
						},{
							"lotteryType" : 3,
							"expirate" : "17:30",
							"lotteryNames" : [ 1,2,3 ]
						},{
							"lotteryType" : 4,
							"expirate" : "21:00",
							"lotteryNames" : [ 1,2,3,5 ]
						} 
					] 
				},{ 	
					"day" : 5,
					"lotteries" : [ 
						{
							"lotteryType" : 1,
							"expirate" : "11:30",
							"lotteryNames" : [ 1,2,3 ]
						},{
							"lotteryType" : 2,
							"expirate" : "14:30",
							"lotteryNames" : [ 1,2,3,5 ]
						},{
							"lotteryType" : 3,
							"expirate" : "17:30",
							"lotteryNames" : [ 1,2,3 ]
						},{
							"lotteryType" : 4,
							"expirate" : "21:00",
							"lotteryNames" : [ 1,2,3,5 ]
						} 
					] 
				},{ 	
					"day" : 6,
					"lotteries" : [ 
						{
							"lotteryType" : 1,
							"expirate" : "11:30",
							"lotteryNames" : [ 1,2,3 ]
						},{
							"lotteryType" : 2,
							"expirate" : "15:00",
							"lotteryNames" : [ 1,2,3,5 ]
						},{
							"lotteryType" : 3,
							"expirate" : "178:00",
							"lotteryNames" : [ 1,2,3 ]
						},{
							"lotteryType" : 4,
							"expirate" : "21:00",
							"lotteryNames" : [ 1,2,3,5,7 ]
						} 
					] 
				},{ 	
					"day" : 7,
					"lotteries" : []
				}
			]
		};
		return lotteryData;
	}
}

/* 

Days: 
1 Mon 
2 Tue
3 Wed
4 Thu
5 Fri
6 Sat
? Sun 

lottery_type
1	Primera
2	Matutina
3	Vespertina
4	Nocturna

lottery_name
1	Nacional
2	Provincia
3	Santa Fe	
4	Tombola
5	Tombola (Uruguay)
6	Cordoba
7	Santiago

Borrar siempre la ultima partida

*/