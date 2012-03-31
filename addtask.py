import os
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

from models import Task

class AddTaskPage(webapp.RequestHandler):
    def get(self):
        self.response.out.write("...")
