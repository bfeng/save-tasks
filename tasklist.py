import os
import json
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext import db
from google.appengine.api import users

class TaskList(webapp.RequestHandler):

    def get(self):
        tasks = db.GqlQuery("SELECT * FROM Task ORDER BY priority")

        blank = []

        for a in tasks:

            queue = a.queue
            if queue is None:
                queue = 0
            blank.append({
                'title': a.title,
                'desc': a.desc,
                'start': a.start,
                'due': a.due,
                'assigner': a.assigner,
                'assignee': a.assignee,
                'done': a.done,
                'queue': queue})

        self.response.headers['Content-type'] = 'text/json'
        self.response.out.write(json.dumps(blank))
