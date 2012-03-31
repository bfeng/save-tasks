import os
import json
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext import db

from models import Task

class DelTaskPage(webapp.RequestHandler):

    def get(self):
        key = self.request.get('key')
        one=db.get(key)
        if one.done:
            one.done = False
        else:
            one.done = True
        one.put()
        self.response.headers['Content-type'] = 'text/json'
        self.response.out.write(json.dumps({'success':True}))
