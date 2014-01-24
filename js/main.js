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
	this.canvas = $("#canvas");
	this.wrapper = $("#wrapper");
	this.range = $("#range");
	this.timeline = $($("#main table tbody tr")[1]);
	this.dialog = $("#dialog");
	this.dialogImg = $("#dialog img")[0];
	this.footer = $("#footer");
	this.dialogOpened = false;

	this.initDraggable();
	this.initSortable();
	this.initDialog();
	this.initCanvas();

	this.range.on("change", function() {
		var oldSrc = self.dialogImg.src;
		var root = "img/" + oldSrc.split("/")[oldSrc.split("/").length - 2] + "/";
		var fileName = this.value + "";
		while(true) {
			if (fileName.length >= 4) {
				break;
			}
			fileName = "0" + fileName; 
		}
		fileName += "." + oldSrc.split(".")[oldSrc.split(".").length - 1];
		self.dialogImg.src = root + fileName;
	});
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
			setTimeout(self.drawOverlay, 20, self);
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
			setTimeout(self.drawOverlay, 20, self);
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
	item.css("z-index", "200");
	item.removeClass("ui-draggable-dragging ui-sortable-helper");
};

Builder.prototype.resizeOverlay = function() {
	var top = this.timeline.height() + this.timeline.offset().top;
	var height = this.wrapper.height() - top - this.footer.height();
	this.overlay.attr("height", height);
	this.overlay.attr("width", this.wrapper.width());
	this.overlay.css("top", top + "px");
	this.drawOverlay();
};

Builder.prototype.drawOverlay = function() {
	var self = arguments.length ? arguments[0] : this;
	if (!self.overlay || !overlay.getContext) {
		return false;
	}
	var ctx = overlay.getContext('2d');
	var offset = self.timeline.offset();
	var bottom = offset.top + self.timeline.height();
	var left = offset.left;
	var width = self.timeline.width();

	ctx.beginPath();
	ctx.clearRect(0, 0, self.overlay.width(), self.overlay.height());

	$("#imgRow ul li div").each(function() {
		var $this = $(this);
		var time = $this.data("time");
		var timeRatio = (time.split(":")[0] - 21) * 60 + (time.split(":")[1] - 0);
		ctx.moveTo(timeRatio * width / 360, 0);
		ctx.lineTo($this.offset().left + $this.width() / 2, $this.offset().top - bottom);
	});

	ctx.closePath();
	ctx.stroke();

	$(self.draggableSelector).css("z-index", 100);
	$("#imgRow ul li div img").parent().parent().css("z-index", 200);
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

Builder.prototype.openDialog = function(img) {
	if(!this.dialogOpened) {
		this.dialogOpened = true;
		this.dialog.css("display", "");
		this.dialogImg.src = img.src;
		var max = $(img).parent().data("max");
		this.range.attr("max", max);
		if (max === 0) {
			this.range.css("display", "none");
		} else {
			this.range.css("display", "");
		}
	}
};

Builder.prototype.closeDialog = function() {
	if(this.dialogOpened) {
		this.dialogOpened = false;
		this.dialog.css("display", "none");
	}
};

Builder.prototype.initCanvas = function() {
	var self = this, drawFlag = false, oldX, oldY;
	this.canvas.on("mousedown", function(e){
		drawFlag = true;
		var rect = e.target.getBoundingClientRect();
		oldX = e.clientX - rect.left;
		oldY = e.clientY - rect.top;
	});
	this.canvas.on("mouseup", function(){
		drawFlag = false;
	});
	this.canvas.on("mousemove", function (e){
		if (!drawFlag) return;
		var rect = e.target.getBoundingClientRect();
		var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;;
		var context = this.getContext("2d");
		context.strokeStyle = "rgba(255,0,0,1)";
		context.lineWidth = 1;
		context.beginPath();
		context.moveTo(oldX, oldY);
		context.lineTo(x, y);
		context.closePath();
		context.stroke();
		oldX = x;
		oldY = y;
	});
};
