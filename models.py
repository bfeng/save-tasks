import datetime
from google.appengine.ext import db
from google.appengine.api import users

class Task(db.Model):
    title = db.StringProperty(required=True)
    desc = db.StringProperty()
    created = db.DateTimeProperty(auto_now_add=True)
    start = db.StringProperty(required=True)
    due = db.StringProperty(required=True)
#    start = db.DateTimeProperty(required=True)
#    due = db.DateTimeProperty(required=True)
    assigner = db.StringProperty()
    assignee = db.StringProperty()

class User(db.Model):

    username = db.StringProperty(required=True)
    email = db.StringProperty(required=True)
