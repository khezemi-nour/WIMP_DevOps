import unittest
import json
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import database 
from app import app


class TestWemoAPI(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.client = app.test_client()
        database.drop_table('wemo_device')
        database.create_wemo_devices_table()

    def test_create_wemo_device(self):
        response = self.client.post('/wemo', json.dumps({
            'name': 'Concordia',
            'type': 'Switch'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data), {'id': 1, 'name': 'Concordia', 'type': 'Switch'})

    def test_get_wemo_device_by_name(self):
        database.create_wemo_device('Concordia','Switch')
        response = database.get_wemo_device_by_name('Concordia')
        self.assertEqual(response, {'id': 1, 'name': 'Concordia', 'type': 'Switch'} )


class TestWemoControl(unittest.TestCase):

    def setUp(self):
        app.testing = True
        self.client = app.test_client()
        database.drop_table('wemo_device')
        database.create_wemo_devices_table()
        database.create_wemo_device('Concordia', 'Switch')

    def tearDown(self):
        pass

    @unittest.skip("demonstrating how to skip a test")
    def test_turn_on_wemo_device(self):
        response = self.client.get('/wemo?action=on&name=Concordia')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data), {'status': 'on'})
    
    @unittest.skip("demonstrating how to skip a test")
    def test_turn_off_wemo_device(self):
        response = self.client.get('/wemo?action=off&name=Concordia')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data), {'status': 'off'})

if __name__ == '__main__':
    unittest.main()
