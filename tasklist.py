import os
import json
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext import db
from google.appengine.api import users

class TaskList(webapp.RequestHandler):

    def get(self):
        tasks = db.GqlQuery("SELECT * FROM Task ORDER BY priority DESC")
        blank = []
        for a in tasks:

            blank.append(a.title)
            blank.append(a.desc)
            blank.append(a.start)
            blank.append(a.due)
            blank.append(a.assigner)
            blank.append(a.assignee)
            blank.append(a.priority)

        self.response.out.write(json.dumps(blank))
        self.response.out.write("<br />")

#        template_values = {}
#        path = os.path.join(os.path.dirname(__file__), 'deltask.html')
#        self.response.out.write(template.render(path, template_values))
#
#    def post(self):
#    
#        delKey=self.request.get("DelKey")
#
#        key=db.get(delKey)
#        db.delete(key)
#        self.redirect("/tasks")
