function UserSettings(config) {
	View.call(this,config);	
}

inheritPrototype(UserSettings, View);

UserSettings.prototype.constructor = UserSettings;

UserSettings.prototype.initializeParameters = function(){
	View.prototype.initializeParameters.call(this);
	this.pathSnippet = "views/userSettings.html";
	this.isVisible = false;
}

UserSettings.prototype.initialize = function(){
	View.prototype.initialize.call(this);
	var since = new Date(Utils.getUserData().connectedSince);
	var expiration = new Date(Utils.getUserData().expiration);


	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [ 	Utils.getUserData().fullName,
																		Utils.addZero(since.getDate()) + "/" + Utils.addZero((since.getMonth() + 1)) + "/" + since.getFullYear(),
																		Utils.addZero(expiration.getDate()) + "/" + Utils.addZero((expiration.getMonth() + 1)) + "/" + expiration.getFullYear() ]});
	this.node = $.parseHTML(snippet.getSnippet());
	$(this.node).css({ "right" : -$(document).width() });
	this.container.append(this.node);

	this.addHandlers();

	this.show();
}

UserSettings.prototype.addHandlers = function() {
	View.prototype.addHandlers.call(this);
	$(this.node).find(".btn-remove-data").click( { context:this }, function(e){
		//Utils.removeUserData();
		$( e.data.context.node ).trigger( "logout" );
	} );
	$(this.node).find(".btn-show-bets").click( { context:this }, function(e){
		$( e.data.context.node ).trigger( "bets" );
	} );
	$(this.node).find(".btn-back").click( { context:this }, function(e){
		$( e.data.context.node ).trigger( "home" );
	} );
	$(this.node).find(".btn-block-user").click( { context:this }, function(e){
		$( e.data.context.node ).trigger( "blockUser" );
	} );

	$(this.node).find(".btn-synchronize").click( { context:this }, function(e){
		$( e.data.context.node ).trigger( "synchronize" );
	} );

	
}

UserSettings.prototype.show = function() {
	if(this.isVisible) {
		this.hide();
	} else {
		//$(this.node).animate({ right : $(this.node).width() });
		$(this.node).css({ display : "block" });
		$(this.node).animate({ right : 0 });
	}

	this.isVisible = !this.isVisible;
}

UserSettings.prototype.hide = function() {
	$(this.node).animate({ "right" : -$(document).width() }, function(){
		$(this).css({ display : "none" });
	});
}