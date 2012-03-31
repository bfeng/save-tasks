import os
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext import db

from models import Task

class DelTaskPage(webapp.RequestHandler):

    def get(self):
        key = self.request.get('key')
        one=db.get(key)
        one.done = True
        self.response.out.write("{'deleted':'true'}")
