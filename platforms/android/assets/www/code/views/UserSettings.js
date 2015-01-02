function UserSettings(config) {
	View.call(this,config);
	this.container = config.container;
	this.pathSnippet = "views/userSettings.html";
	this.isVisible = false;
}

inheritPrototype(UserSettings, View);

UserSettings.prototype.constructor = UserSettings;

UserSettings.prototype.initialize = function(){
	View.prototype.initialize.call(this);
	var since = new Date(utils.getUserData().connectedSince);
	var expiration = new Date(utils.getUserData().expiration);


	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [ 	utils.getUserData().fullName,
																		since.getDate() + "/" + (since.getMonth() + 1) + "/" + since.getFullYear(),
																		expiration.getDate() + "/" + (expiration.getMonth() + 1) + "/" + expiration.getFullYear() ]});
	this.node = $.parseHTML(snippet.getSnippet());
	$(this.node).css({ "right" : -$(document).width() });
	this.container.append(this.node);

	this.addHandlers();

	this.show();
}

UserSettings.prototype.addHandlers = function() {
	View.prototype.addHandlers.call(this);
	$(this.node).find(".btn-remove-data").click( { context:this }, function(e){
		//utils.removeUserData();
		$( e.data.context.node ).trigger( "logout" );
	} );
	$(this.node).find(".btn-show-bets").click( { context:this }, function(e){
		$( e.data.context.node ).trigger( "bets" );
	} );
	$(this.node).find(".btn-back").click( { context:this }, function(e){
		$( e.data.context.node ).trigger( "home" );
	} );
	$(this.node).click({ context:this }, function(e){
		//e.data.context.show();
	});
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