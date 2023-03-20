from flask import Flask, request
from flask_restful import Api
from temperature import Temperature
from database import create_wemo_devices_table, create_wemo_device

app = Flask(__name__)
api = Api(app)
api.add_resource(Temperature, '/temperature')

if __name__ == '__main__':
    # Create the database 
    create_wemo_devices_table()
    create_wemo_device('Concordia', 'Switch')
    # running the application 
    app.run()