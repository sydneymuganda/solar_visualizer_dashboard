from flask import Flask, jsonify
from flask_cors import CORS
from controller.solarController import solar_BluePrint
from controller.waterController import water_BluePrint

app = Flask(__name__)
CORS(app)
app.config.from_object("config.DevelopmentConfig")
app.register_blueprint(solar_BluePrint)
app.register_blueprint(water_BluePrint)
if __name__ == "__main__":
    app.run(debug=True)