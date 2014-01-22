var Builder = function() {
	this.init();
};

var RescueApp = function() {
	var self = this;
	$(document).ready(function() {
		self.Builder = new Builder();
	});
};

window.RescueApp = new RescueApp();

Builder.prototype.init = function() {
	var self = this;
	this.draggableSelector = "#imgRow ul li";
	this.sortableSelector = "#imgRow ul";
	this.draggableImages = $("#imgRow ul li div img");

	this.overlay = $("#overlay");
	this.wrapper = $("#wrapper");
	this.range = $("#range");
	this.timeline = $($("#main table tbody tr")[1]);
	this.dialog = $("#dialog");
	this.dialogImg = $("#dialog img")[0];
	this.dialogOpened = false;

	this.initDraggable();
	this.initSortable();
	this.initDialog();

	this.resizeOverlay();
	$(window).resize(function(){
		self.resizeOverlay();
	});
};

Builder.prototype.initDraggable = function() {
	var self = this;
	return $(this.draggableSelector).draggable({
		connectToSortable: self.sortableSelector,
		start: function(event, ui) {
			self.startHandler(ui.helper);
		},
		stop: function(event, ui) {
			self.stopHandler(ui.helper);
			self.drawOverlay();
		},
		revert: "invalid"
	});
};

Builder.prototype.initSortable = function() {
	var self = this;
	return $(this.sortableSelector).sortable({
		connectWith: self.sortableSelector,
		placeholder : 'sortable-placeholder',
		sort: function(event, ui) {
			self.sortHandler(ui.item);
		},
		start: function(event, ui) {
			self.startHandler(ui.item);
		},
		stop: function(event, ui) {
			self.stopHandler(ui.item);
			self.drawOverlay();
		},
		tolerance : "pointer"
	});
};

Builder.prototype.sortHandler = function(item) {
	if($(".sortable-placeholder").children().length == 0) {
		$(".sortable-placeholder").append($(item.children()[0]).clone());
	}
};

Builder.prototype.startHandler = function(item) {
	item.css("display", "none");
};

Builder.prototype.stopHandler = function(item) {
	item.css("position", "relative");
	item.css("display", "block");
	item.css("z-index", "1000");
	item.removeClass("ui-draggable-dragging ui-sortable-helper");
};

Builder.prototype.resizeOverlay = function() {
	this.overlay.attr("height", this.wrapper.height());
	this.overlay.attr("width", this.wrapper.width());
	this.drawOverlay();
};

Builder.prototype.drawOverlay = function() {
	if (!this.overlay || !overlay.getContext) {
		return false;
	}
	var ctx = overlay.getContext('2d');
	var offset = this.timeline.offset();
	var bottom = offset.top + this.timeline.height();
	var left = offset.left;
	var width = this.timeline.width();

	ctx.beginPath();
	ctx.clearRect(0, 0, this.overlay.width(), this.overlay.height());


	$("#imgRow ul li div").each(function() {
		var $this = $(this);
		var time = $this.data("time");
		var timeRatio = (time.split(":")[0] - 21) * 60 + (time.split(":")[1] - 0);
		ctx.moveTo(timeRatio * width / 360, bottom);
		ctx.lineTo($this.offset().left + $this.width() / 2, $this.offset().top);
	});

	ctx.closePath();
	ctx.stroke();
};

Builder.prototype.initDialog = function() {
	var self = this;
	this.draggableImages.on("click", function(){
		self.openDialog(this);
	});
	this.overlay.on("click", function() {
		self.closeDialog();
	});
};

Builder.prototype.initScroll = function() {
	this.dialog[0].onscroll = function() {
		var scroll = this.scrollTop;
		var range = this.scrollHeight - this.offsetHeight;
		console.log(scroll);
		console.log(range);
	}
};

Builder.prototype.openDialog = function(img) {
	if(!this.dialogOpened) {
		this.dialogOpened = true;
		this.dialog.css("display", "");
		this.dialogImg.src = img.src;		
	}
};

Builder.prototype.closeDialog = function() {
	if(this.dialogOpened) {
		this.dialogOpened = false;
		this.dialog.css("display", "none");
	}
};
