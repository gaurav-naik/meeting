import frappe

@frappe.whitelist()
def get_minutes_for_meeting(meeting_name):
    minutes = frappe.get_all("Meeting Minute", filters={"meeting":meeting_name}, fields=["*"])
    return minutes
    