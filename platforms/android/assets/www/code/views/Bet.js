function Bet(config) {
	GenericView.call(this,config);
}

inheritPrototype(Bet, GenericView);

Bet.prototype.constructor = Bet;

Bet.prototype.initializeParameters = function(){
	GenericView.prototype.initializeParameters.call(this);
	this.todayslotteries = this.config.todayslotteries;
	this.betData = [];
	this.dataSnippet = [];
	this.betTime = 0;
	this.lotteries = [];
}

Bet.prototype.initialize = function(){
	GenericView.prototype.initialize.call(this);

	$('html,body').animate({ scrollTop: 0 }, 'slow',function(){
		Utils.removeMessage();
	}); 

	this.startTimer();
	this.generateTodaysLotteries();
	this.updateTotalAmount(this.getTotalAmount());
}

Bet.prototype.startTimer = function() {
   this.betTimer = setTimeout(this.onCompleteTimer,1000,{context:this});
}

Bet.prototype.onCompleteTimer = function(e){
	e.context.betTime++;
	if(e.context.betTime == Globals.TIME_RESET_BET_VIEW ){
		console.log("Reset Bet");
		$(document).trigger({ type:Globals.RESET_VIEW });
	}else {
		e.context.startTimer();
	}
}

Bet.prototype.addHandlers = function() {
	GenericView.prototype.addHandlers.call(this);
	
	$(this.node).find(".btn-cancel").click( { context:this }, function(e){
		e.stopImmediatePropagation();
		$( e.data.context ).trigger( Globals.CANCEL );
	} );
	
	$($(this.node).find("#partial-amount")).on("input", { context : this }, function(e){
		e.stopImmediatePropagation();
		$(e.data.context.node).find(".total-amount").html(e.data.context.getTotalAmount());
	});

	/*$($(this.node).find(".item-checkbox input")).change({ context : this }, function(e) {
    	e.stopImmediatePropagation();
		$(e.data.context.node).find(".total-amount").html(e.data.context.getTotalAmount());
	});*/

	$(this.node).find(".btn-save").click( { context:this }, function(e){
		e.stopImmediatePropagation();
		e.data.context.saveBet();
	} );
}

Bet.prototype.newBet = function(e) { }

Bet.prototype.saveBet = function() { }

Bet.prototype.getTotalAmount = function() {
	this.totalChecked = 0;
	for(var i=0; i<$(this.node).find(".wrapper-container-lotteries .item-checkbox input").length;i++){
		if($($(this.node).find(".wrapper-container-lotteries .item-checkbox input")[i]).is(":checked")) {
			this.totalChecked++;
		}
	}
}

Bet.prototype.updateTotalAmount = function(val){
	$(this.node).find(".total-amount").text(val);
}

Bet.prototype.getBetsBetted = function(){
	var arr = [];
	for(var i=0; i<$(this.node).find(".lottery").length; i++) {
		var itemLottery = $($(this.node).find(".lottery")[i]);
		var tmpLotteries = Array();
		for(var j=0; j < itemLottery.find(".item-checkbox input").length; j++) {
			var itemCheckbox = $(itemLottery.find(".item-checkbox input")[j]);
			if(itemCheckbox.is(":checked")) {
				arr.push({ 
					lotteryTypeId : parseInt(itemLottery.data("type")),
					lotteryType : Utils.getLotteryType(itemLottery.data("type")),
					lotteryNameId : parseInt(itemCheckbox.val()),
					lotteryName : Utils.getLotteryName( parseInt(itemCheckbox.val()) )
				});
			}
		}
	}
	return arr;
}

Bet.prototype.generateTodaysLotteries = function() {
	if(this.todayslotteries.lotteries != undefined) {
		this.todayslotteries.lotteries.forEach(function(d){
			if(Utils.compareHours(d.expirate)) {
				var lottery = new Lottery( { container : $(this.node).find("#container-lotteries .wrapper-container-lotteries"), lotteryData : d } );
				$(lottery).bind(Globals.CHECKBOX_CHECKED, { context:this }, this.onNewCheckboxClicked);
				this.lotteries.push(lottery);
			}		
		},this);
	}
}

Bet.prototype.onNewCheckboxClicked = function(e){
	e.stopImmediatePropagation();
}

Bet.prototype.destroy = function() {
	clearTimeout(this.betTimer);
}