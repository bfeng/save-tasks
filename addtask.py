import os
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

from models import Task

class AddTaskPage(webapp.RequestHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__), 'addtask.html')
        template_values = {}
        self.response.out.write(template.render(path, template_values))

    def post(self):
        temp = Task(title=self.request.get("Title"),
                desc=self.request.get("Description"),
                start=self.request.get("Start"),
                due=self.request.get("Due"),
                assigner=self.request.get("Assigner"),
                assignee=self.request.get("Assignee"),
                priority=int(self.request.get("Priority")))
        temp.put()
        self.redirect('/#gantt')
