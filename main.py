import os
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

class MainPage(webapp.RequestHandler):
    def get(self):

        user = users.get_current_user()

	if user:

            name = user.nickname()


        else:

            name = 'Sign in'


#        name=''
        logout = users.create_logout_url("/")
        template_values = {'Username':name, 'Logout':logout}
        path = os.path.join(os.path.dirname(__file__), 'main.html')
        self.response.out.write(template.render(path, template_values))

    def post(self):
        self.get()

application = webapp.WSGIApplication([('/', MainPage)],
            debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()


#django
