import frappe
from frappe import _

@frappe.whitelist()
def get_minutes_for_meeting(meeting_name):
    minutes = frappe.get_all("Meeting Minute", filters={"meeting":meeting_name}, fields=["*"])
    return minutes
    
@frappe.whitelist()
def get_todos(date=None):
    from werkzeug.exceptions import Forbidden

    try:
        frappe.only_for(("System Manager"))
    except frappe.PermissionError:
        raise Forbidden(_("You need to be logged in and have System Manager or Account Manager Role to be able to download this zip."))

    todos = frappe.get_all("ToDo", filters={"owner": frappe.session.user}, fields=["*"])
    return todos
