import json
from google.appengine.ext import webapp
from google.appengine.ext import db
from google.appengine.api import users

class TaskList(webapp.RequestHandler):

    def get(self):
        tasks = db.GqlQuery("SELECT * FROM Task")
        for a in tasks:
            blank = []

            blank.append(a.title)
            blank.append(a.desc)
            blank.append(a.start)
            blank.append(a.due)
            blank.append(a.assigner)
            blank.append(a.assignee)

            self.response.out.write(json.dumps(blank))
            self.response.out.write("<br />")
