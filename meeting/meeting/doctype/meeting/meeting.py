# -*- coding: utf-8 -*-
# Copyright (c) 2019, Gaurav Naik and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Meeting(Document):
	def on_trash(self):
		minutes = frappe.get_all("Meeting Minute", filters={"meeting":self.name})
		try:
			for minute in minutes:
				frappe.delete_doc("Meeting Minute", minute.name)
			frappe.db.commit()
		except Exception as ex:
			frappe.log_error(title="Delete meeting {0}".format(self.name), message=ex)
			frappe.db.rollback()
