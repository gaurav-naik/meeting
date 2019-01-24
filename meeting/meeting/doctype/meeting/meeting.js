// Copyright (c) 2019, Gaurav Naik and contributors
// For license information, please see license.txt

frappe.ui.form.on('Meeting', {
	refresh: function(frm) {
		frm.add_custom_button(__('View Minutes'), function () {
			frappe.route_options = {"meeting": frm.doc.name}
			frappe.set_route("List", "Meeting Minute", "List");
		});	
		frm.add_custom_button(__('View Minutes in Form'), function () {
			console.log("MEETING", frm.doc.name)
			frappe.call({
				method: "meeting.api.get_minutes_for_meeting",
				args: {
					meeting_name: frm.doc.name
				}
			}).done((r) => {
				console.log(r);
				var template = '<ul>' +
				'{% for(var i=0; i<=minutes.length; i++) { %}' +
				'<li>{{ minutes[i] }}</li>' +
				'{% } %}' +
				'</ul>';
				var html = frappe.render_template(template, {"minutes": r.message});
				frm.set_value("minutes_html", html);
			});
		});	
	},
});

