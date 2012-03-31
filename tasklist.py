import json
from google.appengine.ext import webapp
from google.appengine.ext import db
from google.appengine.api import users

class TaskList(webapp.RequestHandler):

    def get(self):
        tasks = db.GqlQuery("SELECT * FROM Task")

        blank = []

        for a in tasks:

            blank.append({
                'title': a.title,
                'desc': a.desc,
                'start': a.start,
                'due': a.due,
                'assigner': a.assigner,
                'assignee': a.assignee})

        self.response.headers['Content-type'] = 'text/json'
        self.response.out.write(json.dumps(blank))
