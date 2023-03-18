from flask import request,jsonify
from flask_restful import Resource
from database import get_wemo_device_by_name , create_wemo_device
import pywemo


class Wemo(Resource):
    def post(self):
        name = request.json['name']
        device_type = request.json['type']
        create_wemo_device(name, device_type)
        return jsonify({'message': f'Wemo device {name} ({device_type}) created successfully'})

    def get(self):
        devices = pywemo.discover_devices()
        target =  get_wemo_device_by_name(request.args.get('name') or 'Concordia')
        
        if target is None :     
            return jsonify({'error': 'Wemo device not found'}),404
        for device in devices:
            if device.name == target['name']:
                wemo = device
                break
        else:
            return jsonify({'error': 'Wemo device not found'}),404
        action = request.args.get('action')
        if action == 'on':
            wemo.on()
            return jsonify({'status': 'on'}),200
        elif action == 'off':
            wemo.off()
            return jsonify({'status': 'off'}),200
        else:
            return jsonify({'error': 'Invalid action'}),204

