# The pre-configuration for the device 
### ENABLE THE ONE-WIRE INTERFACE 
We’ll need to enable the One-Wire interface before the Pi can receive data from the sensor. Once you’ve connected the DS18B20, power up your Pi and log in, then follow these steps to enable the One-Wire interface:
1. At the command prompt, enter `sudo nano /boot/config.txt`, then add this to the bottom of the file: `dtoverlay=w1-gpio`
2. Exit Nano, and reboot the Pi with sudo reboot
3. Log in to the Pi again, and at the command prompt enter `sudo modprobe w1-gpio`
4. Then enter `sudo modprobe w1-therm`
5. Change directories to the `/sys/bus/w1/devices `directory by entering `cd /sys/bus/w1/devices`
6. Now enter ls to list the devices:
7. Now enter `cd 28-XXXXXXXXXXXX` (change the X’s to your own address)
8. Enter `cat w1_slave` which will show the raw temperature reading output by the sensor