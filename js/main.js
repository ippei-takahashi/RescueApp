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
	this.draggableSelector = "#imgRow ul li";
	this.sortableSelector = "#imgRow ul";
	this.initDraggable();
	this.initSortable();
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
		},
		tolerance : "pointer"
	});
};

Builder.prototype.sortHandler = function(item) {
	if($(".sortable-placeholder").children().length == 0) {
		$(".sortable-placeholder").append($(item.children()[0]).clone());
	}
}

Builder.prototype.startHandler = function(item) {
	item.css("display", "none");
}

Builder.prototype.stopHandler = function(item) {
	item.css("position", "relative");
	item.css("display", "block");
	item.css("z-index", "1");
	item.removeClass("ui-draggable-dragging ui-sortable-helper");
}


