# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("Meeting"),
			"items": [
				{
					"type": "doctype",
					"name": "Meeting",
					"description": _("List of Meetings.")
				},
				{
					"type": "doctype",
					"name": "Meeting Minute",
                    "label": "Meeting Minutes",
					"description": _("List of Meeting Minutes.")
				},
				{
					"type": "page",
					"name": "todo-board",
                    "label": "ToDo Board",
					"description": _("ToDo Board")
				},
				{
					"type": "doctype",
					"name": "Meeting Settings",
					"label": "Settings",
					"description": _("Meeting Settings")
				}
            ]
		}
	]
