import os
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

class AddTaskPage(webapp.RequestHandler):
    def get(self):
        #<input name="subscribe" type="checkbox" value="yes />
        subscribe_to_newsletter = self.request.get("subscribe", default_value="no")
        path = os.path.join(os.path.dirname(__file__), 'addtask.html')
        template_values = {}
        self.response.out.write(template.render(path, template_values))
