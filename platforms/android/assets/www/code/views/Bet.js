function Bet(config) {
	View.call(this,config);
	this.container = config.container;
	this.todayslotteries = config.todayslotteries;

	this.pathSnippet = "views/bet.html";
}

inheritPrototype(Bet, View);

Bet.prototype.constructor = Bet;

Bet.prototype.initialize = function(){
	View.prototype.initialize.call(this);
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [] });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	this.generateTodaysLotteries();

	this.addHandlers();
}

Bet.prototype.addHandlers = function() {
	View.prototype.addHandlers.call(this);
	
	$(this.node).find(".btn-cancel").click( { context:this }, function(e){
		$( e.data.context.node ).trigger( "home" );
	} );
	$(this.node).find(".btn-save").click( { context:this }, this.saveBet );

	$($(this.node).find("#partial-amount")).on("input", { context : this }, function(e){
		var _this = e.data.context;
		$(_this.node).find(".total-amount").html(_this.getTotalAmount());
	});

	$($(this.node).find(".item-checkbox input")).change({ context : this }, function(e) {
    	var _this = e.data.context;
		$(_this.node).find(".total-amount").html(_this.getTotalAmount());
	});
}

Bet.prototype.saveBet = function(e) {
	var _this = e.data.context;
	var betNumber = $(_this.node).find("#bet-number").val();
	var partialAmount = $(_this.node).find("#partial-amount").val();

	var currentBet = {};	
	
	if( betNumber == "") {
		alert("No se seteo ningun número para la apuesta");
		return false;
	} else if ( betNumber.length > 4) {
		alert("El número apostado no debe ser superior a 4 digitos");
		return false;
	} else if ( isNaN(betNumber) ) {
		alert("El número apostado debe ser un número real");
		return false;
	}

	currentBet.betNumber = betNumber;

	currentBet.bet = Array();
	for(var i=0; i<$(_this.node).find(".lottery").length; i++) {
		var itemLottery = $($(_this.node).find(".lottery")[i]);
		var tmpLotteries = Array();
		for(var j=0; j < itemLottery.find(".item-checkbox input").length; j++) {
			var itemCheckbox = $(itemLottery.find(".item-checkbox input")[j]);
			if(itemCheckbox.is(":checked")) {
				currentBet.bet.push({ 
					lotteryTypeId : parseInt(itemLottery.data("type")),
					lotteryType : utils.getLotteryType(itemLottery.data("type")),
					lotteryNameId : parseInt(itemCheckbox.val()),
					lotteryName : utils.getLotteryName( parseInt(itemCheckbox.val()) )
				});
			}
		}
	}
	if(currentBet.bet.length == 0) {
		alert("Se tiene que seleccionar al menos una Loteria");
		return false;
	}

	currentBet.betPosition = $(_this.node).find("select#bet-position").val();
	
	if( partialAmount == "") {
		alert("No se seteo el monto apostado por cada Loteria");
		return false;
	} else if (isNaN(partialAmount)) {
		alert("La apuesta debe ser un número real");
		return false;
	}

	currentBet.betAmount = partialAmount;
	currentBet.betTotalAmount = _this.getTotalAmount();
	currentBet.date = new Date();

	utils.getMainInstance().lotteryDataBase.insert("bets",{ bet_number : currentBet.betNumber,
															bet_data : currentBet.bet,
															bet_position : currentBet.betPosition,
															total_amount : parseFloat(currentBet.betTotalAmount),
															date : currentBet.date});
	utils.getMainInstance().lotteryDataBase.commit();
}

Bet.prototype.getTotalAmount = function() {
	var totalChecked = 0;
	for(var i=0; i<$(this.node).find(".item-checkbox input").length;i++){
		if($($(this.node).find(".item-checkbox input")[i]).is(":checked")) {
			totalChecked++;
		}
	}
	return 	$(this.node).find("#partial-amount").val() * totalChecked;
}

Bet.prototype.insertBet = function() {
	/*var online = navigator.onLine;
	if(online) {
		alert("Conexion");
	} else {
		alert("No hay conexion a Internet, los datos se guardarán de forma local");
	}*/
	$.ajax({
			async : false,
			type : "POST",
			data : { user : user, password : password },			
			url : utils.getServices().insertBet,
			success : function(_result_) {
				var result = JSON.parse(_result_);
				
				if(result[0].idVendor == null) {
					errorElement.text("Datos incorrectos");
				} else {
					utils.saveUserData(result);
					errorElement.text("");
					$( _this.node ).trigger( "home" );
				}
				
			},
			error : function(error) {
				errorElement.text("error",error);
			}
		});
}


Bet.prototype.generateTodaysLotteries = function() {
	this.todayslotteries.lotteries.forEach(function(d){
		if(utils.compareHours(d.expirate)) {
			var lottery = new Lottery( { container : $(this.node).find("#container-lotteries .wrapper-container-lotteries"), lotteryData : d } );
			lottery.initialize();
		}		
	},this);
}