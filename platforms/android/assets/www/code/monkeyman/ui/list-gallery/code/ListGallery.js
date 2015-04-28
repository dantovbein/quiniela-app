function ListGallery(config) {
	this.config = config;
	this.container = this.config.container;
	this.pathSnippet = "../../src/ui/list-gallery/snippets/list-gallery.html";
	this.items = [];
	this.lastItemHeight = 0;
	this.itemWidth = 200;
	this.itemHeight = 230;
	this.padding = 10;
	this.itemsToAdd = 0;
}

ListGallery.prototype.constructor = ListGallery;

ListGallery.prototype.initialize = function() {
	var snippet = new Snippet( { "path" : this.pathSnippet, "data" : [] });
	this.node = $.parseHTML(snippet.getSnippet());
	this.container.append(this.node);

	$( window ).resize({ context:this },this.onResizeComponent);
}

ListGallery.prototype.onResizeComponent = function(e){
	e.data.context.arrange();
}

ListGallery.prototype.addNewItemByType = function(d) {
	var data = {  	container:$(this.node).find(".list-gallery"),
					pathSnippet:this.getItem(d.type),
					itemWidth:this.itemWidth,
					itemHeight:this.itemHeight,
					dataChild:$(this.node).find(".list-gallery li").length
				};
	var itemList = this.getItem( { type:d.type, data:data });
	itemList.initialize();
	this.items.push(itemList);
	this.arrange();
}

ListGallery.prototype.addNewItem = function(d) {
	var data = {  	container:$(this.node).find(".list-gallery"),
					itemWidth:this.itemWidth,
					itemHeight:this.itemHeight,
					data:d
				};
	var itemList = this.getItem( { type:d.type, data:data });
	itemList.initialize();
	this.items.push(itemList);
	this.arrange();
}

ListGallery.prototype.getItem = function(d) {
	switch(d.type) {
		case 1:
			return new ItemPicture(d.data);
			break;
		case 2:
			return new ItemShortDescription(d.data);
			break;
		case 3:
			return new ItemLargeDescription(d.data);
			break;
	}				
}

ListGallery.prototype.addItems = function(dataSource) {
	this.removeAll();

	dataSource.forEach(function(d){
		this.addNewItem(d);
	},this);
}

ListGallery.prototype.addItemsByNumber = function(itemsToAdd) {
	this.removeAll();

	if(itemsToAdd==0)
		return false;

	this.itemsToAdd = itemsToAdd;
	for(var i=0;i<this.itemsToAdd;i++){
		var itemList = new ItemList( { container:$(this.node).find(".list-gallery"),itemWidth:this.itemWidth,itemHeight:this.itemHeight,dataChild:$(this.node).find(".list-gallery li").length });
		itemList.initialize();
		this.items.push(itemList);
	}

	this.arrange();
}

ListGallery.prototype.removeItem = function() {
	if(this.items.length==0)
		return false;

	var lastItem = this.items[this.items.length-1];
	lastItem.destroy()
	this.items.splice(this.items.length-1,1);
	
	this.arrange();
}

ListGallery.prototype.removeAll = function() {
	$.each(this.items,function(index,item){
		item.destroy();
	});
	this.items = [];
}

ListGallery.prototype.arrange = function() {
	var containerHeight = $(this.node).height();
	var containerWidth = $(this.node).width();

	this.newSize = this.getNewItemSize();
	var tempItemWidth = Math.floor(this.newSize.w);
	var tempItemHeight = Math.floor(this.newSize.h);
	
	this.items.forEach(function(item,index){
		$(item.node).css({
 			"width" : tempItemWidth,
 			"height" : tempItemHeight
 		});
 		this.tempItem = item;
	},this);
	
	var totalItems = $(this.node).find(".list-gallery li").length;
	var maxRows = Math.floor($(this.node).height() / tempItemHeight);
	var maxColumns = (totalItems%maxRows==0) ? totalItems/maxRows : (totalItems-(totalItems%maxRows))/maxRows+1;
	var listWidth = tempItemWidth*maxColumns;
	var listHeight = tempItemHeight*maxRows;
	var gapW = containerWidth - listWidth;
	var gapH = containerHeight - listHeight;
	var minGap = Math.min(gapW,gapH);
	var minSize = (minGap==gapW) ? listWidth : listHeight;
	var side = (minSize==listWidth) ? containerWidth : containerHeight;
	var scale = (minGap==0) ? 1 : side/minSize;
	//console.log("gapW:",gapW,"gapH:",gapH,"minGap:",minGap,"minSize:",minSize,"scale:",scale);

	$(this.node).find(".list-gallery").css({
		width : listWidth,
		left : containerWidth / 2 - listWidth / 2,
		top : containerHeight / 2 - listHeight / 2,
		'-webkit-transform' : 'scale(' + scale + ')',
		'-moz-transform'    : 'scale(' + scale + ')',
		'-ms-transform'     : 'scale(' + scale + ')',
		'-o-transform'      : 'scale(' + scale + ')',
		'transform'         : 'scale(' + scale + ')'
	});
	this.tempItem.updateSize();
}

ListGallery.prototype.getNewItemSize = function() {
	var newScale = this.getNewScale($(this.node).height() * 1 / (this.itemHeight ) );
	var newSize = this.getNewSize(newScale);
	var newSurface = this.getNewSurface(newSize);
	var itemsInSurface = this.getAvailableSpace() / newSurface;
	
	if(itemsInSurface < 1) {
		newScale = this.getNewScale(newScale);
		newSize = this.getNewSize(newScale);
	}	
	return newSize;
}

ListGallery.prototype.getNewScale = function(newScale) {
	var newSize = this.getNewSize(newScale);
	var newSurface = this.getNewSurface(newSize);
	var itemsInSurface = this.getAvailableSpace() / newSurface;
	var hasNewScale = false;
	if(itemsInSurface > 1) {
		var size = this.getNewSize(newScale);
		var rows = 1;
		var listWidth = 0;
		
		this.items.forEach(function(item,index){
			if( (listWidth + size.w) < $(this.node).width()){
				listWidth += size.w;				
			} else {
				listWidth = size.w;
				rows++;
			}
		},this);
		
		if( (rows * size.h) > $(this.node).height() ) {
			var columns = Math.ceil( $(this.node).width()/size.w );
			var tempWidth = $(this.node).width() / columns;
			var tempScale = tempWidth * newScale / size.w;
			var tempColumns = Math.ceil($(this.node).width() / tempWidth);
			var tempRows = Math.ceil(this.items.length / columns);
			var newSize = Math.min( $(this.node).width() / tempColumns , $(this.node).height() / tempRows );
			var tempSide = (newSize == $(this.node).width() / tempColumns) ? size.w : size.h;
			newScale = (tempRows==1) ? tempScale : newSize * newScale / tempSide;;
		}
		hasNewScale = true;
	}
	return (hasNewScale) ? newScale : this.getNewScale(newScale * 0.99);
}

ListGallery.prototype.getNewSize = function(newScale) {
	return { w : this.itemWidth * newScale , h : this.itemHeight * newScale };
}

ListGallery.prototype.getNewSurface = function(newSize) {
	return ( newSize.w * newSize.h ) * this.items.length;
}

ListGallery.prototype.getAvailableSpace = function() {
	var availableSpace = $(this.node).width() * $(this.node).height();
	return availableSpace;
}


