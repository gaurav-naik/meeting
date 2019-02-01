frappe.provide('meeting.pages');

frappe.pages['todo-board'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'ToDo Board',
		single_column: true
	});

	frappe.breadcrumbs.add("Meeting")
	wrapper.todo_board = new meeting.pages.ToDoBoard(wrapper);
}

meeting.pages.ToDoBoard = Class.extend({
	init: function(wrapper) {
		this.wrapper = $(wrapper).find('.layout-main-section');
		this.page = wrapper.page;
		this.make();
	},
	make: function() {
		console.log("MAKE")
		return frappe.run_serially([
			() => frappe.dom.freeze(),
			() => {
				this.prepare_menu();
				this.make_page();
			},
			() => {
				frappe.dom.unfreeze();
			}
		]);
	},
	prepare_menu: function() {
		var me = this;
		this.page.clear_menu();
		this.page.add_menu_item(__("View ToDo List"), function () {
			frappe.set_route("List", "ToDo");
		});
		this.page.add_menu_item(__("Get ToDos"), function () {
			me.get_todos();
		});
	},
	make_page: function() {
		this.get_todos();
	},
	get_todos: function() {
		var me = this;
		frappe.call({
			method: "meeting.api.get_todos",
		}).done(function(r) {
			console.log("TODOS", r.message);
			me.wrapper.append(
				frappe.render_template("todo_board", {"todos": r.message})
			)
		});
	},
	init_chart: function() {
		const container = '.chart-container';		
		const options = {
			parent: $(container),
			data: {
				labels: ["12am-3am", "3am-6pm", "6am-9am", "9am-12am",
					"12pm-3pm", "3pm-6pm", "6pm-9pm", "9am-12am"
				],
				datasets: [
					{
						name: "Some Data", type: "bar",
						values: [25, 40, 30, 35, 8, 52, 17, -4]
					},
					{
						name: "Another Set", type: "line",
						values: [25, 50, -10, 15, 18, 32, 27, 14]
					}
				]
			},
			title: "My Awesome Chart on a page in ERPNext",
			type: 'axis-mixed', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
			height: 250,
			colors: ['#7cd6fd', '#743ee2']
		}
		const chart = new frappeChart.Chart(container, options);
	}
});

