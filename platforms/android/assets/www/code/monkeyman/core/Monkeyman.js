var Monkeyman = {
	version : "1.0.13",
	setMain : function(main){
		this.main = main;
	},
	getMain : function(){
		return this.main;
	},
	getClass : function(instance){
		// TODO return a new Instance for a specific Class
	},
	customEvent : function(data){
		var type = data.type;
		var details = (data.details) ? data.details[0] : {};
		if(document.addEventListener) { // The rest
  			var evt = new CustomEvent(type, { 'detail': details } );
  			data.elem.dispatchEvent(evt);
		} else if (document.attachEvent) { // IE
			var evt = document.createEvent("Event");
			evt.initEvent(type, true, false);
			data.elem.dispatchEvent(evt);
		}
	},
	addZero : function(value) {
		return (value < 10) ? "0" + parseFloat(value) : parseFloat(value);
	},
	getMonths : function(){
		return [ { es: [ "Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"] } ];
	},
	getMonthId : function(month,type){
		var arrType = [];
		switch(type){
			case "es": 
				arrType = this.getMonths()[0].es; 
			break;
		}
		var id = -1;
		arrType.forEach(function(m,i){
			if(m.toLocaleLowerCase() == month.toLocaleLowerCase()){
				id = i;
			}
		});
		return id;
	},
	defaultTo : function(value,defaultTo) {
		return (value) ? value : defaultTo;
	},
	validateEmail : function(email) { 
    	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(email);
	},
	setHeight : function(wrapper) {
		var tempHeight = 0;
		var childrens = $(wrapper).children().length;
		for(var i=0; i<childrens; i++){
			var child = $(wrapper).children()[i];
			tempHeight += $(child).height();
		}	
		$(wrapper).css({
			height : tempHeight
		})
	},
	isLoading : function(message) {
		this.getOverlay();
		this.getPreloader(message);
	},
	stopLoading : function() {
		this.removePreloader();
		this.removeOverlay();
	},
	getOverlay:function(){
		var overlay = document.createElement("div");
		overlay.setAttribute("id", "overlay");
		overlay.setAttribute("class", "overlay");
    	document.body.appendChild(overlay);
    	overlay.style.width = document.body.scrollWidth + "px";
		overlay.style.height = document.body.scrollHeight + "px";
	},
	removeOverlay:function(){
		if(document.getElementById("overlay")){
			var overlay = document.getElementById("overlay");
			overlay.remove();
		}else{
			return false;
		}
	},
	getPreloader : function(message){
		this.getOverlay();
		
		var preloader = document.createElement("div");
		preloader.setAttribute("id", "preloader");
		preloader.setAttribute("class", "preloader");

		var preloaderIcon = document.createElement("div");
		preloaderIcon.className = "preloader-icon";
		preloader.appendChild(preloaderIcon);

		var preloaderText = document.createElement("span");
		preloaderText.className = "preloader-text";
		preloaderText.innerHTML = (message != undefined) ? message : "Cargando";
		preloader.appendChild(preloaderText);
		
		document.body.appendChild(preloader);
		preloader.style.top = (window.innerHeight / 2 - preloader.offsetHeight / 2) + "px";
	},
	removePreloader : function(){
		this.removeOverlay();
		if(document.getElementById("preloader")){
			var preloader = document.getElementById("preloader");
			preloader.remove();
		}else{
			return false;
		}
	},
	removePopup : function(e) {
		this.removeOverlay();
		if($(".popup").length > 0) {
			$(".popup").remove();
		}
	},
	highlightButton : function(element,context,className){
		var child;
		for(var i=0; i<context.children().length; i++){
			child = context.children()[i];
			
			if($(child).hasClass(className)){
				$(child).removeClass(className);
			}
		}
		$(element).addClass(className);
	}
}