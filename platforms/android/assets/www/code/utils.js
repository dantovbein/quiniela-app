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
var utils = {
	setMainInstance : function(instance) {
		this.mainInstance = instance;
	},
	getMainInstance : function() {
		return this.mainInstance;
	},
	getServices : function(){
		var url = "http://deaene.com.ar/apps/Quiniela/mobile/";
		return {			
			login : url + "service/manager/login.php"
		};
	},
	saveUserData : function(data) {
		localStorage.setItem("id_vendor", data[0].idVendor);
		localStorage.setItem("id_phone", data[0].idPhone);
		localStorage.setItem("user", data[0].user);
		localStorage.setItem("password", data[0].password);
		localStorage.setItem("full_name", data[0].fullName);
		localStorage.setItem("code", data[0].code);
		localStorage.setItem("connected_since", new Date());
	},
	getUserData : function() {
		return { 
			user : localStorage.getItem("user") ,
			fullName: localStorage.getItem("full_name")
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
	compareHours : function(sampleTime) {
		var time1 = new Date();
		var splitTime = sampleTime.split(":");
		time1.setHours(splitTime[0],splitTime[1],0);
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
	saveBet : function(bet) {

	},
	getLotteryType : function(value) {
		switch(value) {
			case 1 :
				return "Primera";
				break;
			case 2 :
				return "Matutina";
				break;
			case 3 :
				return "Vespertina";
				break;
			case 4 :
				return "Nocturna";
				break;
		}
	},
	getLotteryName : function(value) {
		switch(value) {
			case 1 :
				return "Nacional";
				break;
			case 2 :
				return "Provincia";
				break;
			case 3 :
				return "Santa Fe";
				break;
			case 4 :
				return "Tombola";
				break;
			case 5 :
				return "Tombola (Uruguay)";
				break;
			case 6 :
				return "Cordoba";
				break;
			case 7 :
				return "Santiago";
				break;
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
							"expirate" : "18:00",
							"lotteryNames" : [ 1,2,3 ]
						},{
							"lotteryType" : 4,
							"expirate" : "21:00",
							"lotteryNames" : [ 1,2,3,5,7 ]
						} 
					] 
				}
			]
		};
		return lotteryData;
	}
}