import os
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

class About(webapp.RequestHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__), 'about.html')
        template_values = {}
        self.response.out.write(template.render(path, template_values))

class Contact(webapp.RequestHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__), 'contact.html')
        template_values = {}
        self.response.out.write(template.render(path, template_values))
