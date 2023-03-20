from flask import Flask, request
from flask_restful import Api
from temperature import Temperature
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
csrf = CSRFProtect()
csrf.init_app(app) # Compliant
api = Api(app)
api.add_resource(Temperature, '/temperature')

if __name__ == '__main__':
    # Create the database 
    # running the application 
    app.run()