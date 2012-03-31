import os
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

from addtask import AddTaskPage
from adduser import AddUserPage
from info import About
from info import Contact
from tasklist import TaskList
from deltask import DelTaskPage

class MainPage(webapp.RequestHandler):
    def get(self):

        user = users.get_current_user()

        if user:

            name = user.nickname()


        else:

            name = 'Sign in' 

        template_values = {'Username':name, 'Logout':name}
        path = os.path.join(os.path.dirname(__file__), 'main.html')
        self.response.out.write(template.render(path, template_values))

    def post(self):
        self.get()

application = webapp.WSGIApplication([('/', MainPage),
                                      ('/addTask', AddTaskPage),
                                      ('/addUser', AddUserPage),
                                      ('/about', About),
                                      ('/logout', About),
                                      ('/contact', Contact),
                                      ('/tasks', TaskList),
                                      ('/del', DelTaskPage)],
                                      debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()


#django
