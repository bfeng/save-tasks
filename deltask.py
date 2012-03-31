import os
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext import db

from models import Task

class DelTaskPage(webapp.RequestHandler):

    def get(self):

        delQueue=db.GqlQuery("SELECT * FROM DelKey")
        id=self.request

    def post(self):

        key=db.get(id)
        key.done=True
