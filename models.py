from google.appengine.ext import db

class Task(db.Model):
    title = db.StringProperty(required=True)
    desc = db.StringProperty()
    created = db.DateTimeProperty(auto_now_add=True)
    start = db.DateTimeProperty(required=True)
    due = db.DateTimeProperty(required=True)
    assigner = db.StringProperty()
    assignee = db.StringProperty()
