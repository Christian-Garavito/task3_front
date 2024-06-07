from flask import Flask, jsonify, request, render_template
from database import *

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# Define your endpoints
@app.route('/televisores', methods=['GET'])
def get_televisores():
    
    result = read_televisores()

    if result:
        return jsonify(result)
    else:
        return jsonify({"message": "No data found"}), 404

 # crear televisores 
@app.route('/televisores/<serie>', methods=['GET'])
def get_televisor_by_serie(serie):
    result = find_televisor_by_serie(serie)
    if result:
        return jsonify(result)
    else:
        return jsonify({"message": "Televisor not found"}), 404

 # agregar un televisor
@app.route('/televisores', methods=['POST'])
def post_televisor():
    data = request.json
    create_televisor(data.get('serie'), data.get('marca'), data.get('nombre_cliente'), data.get('apellido_cliente'), data.get('numero_cedula'))
    return jsonify({"message": "Televisor created"}), 201

 # editar un tv 
@app.route('/televisores/<serie>', methods=['PUT'])
def put_televisor(serie):
    data = request.json
    update_televisor(serie, data.get('marca'), data.get('nombre_cliente'), data.get('apellido_cliente'), data.get('numero_cedula'))
    return jsonify({"message": "Televisor updated"}), 200

 # borrar un televisor.
@app.route('/televisores/<serie>', methods=['DELETE'])
def del_televisor(serie):
    delete_televisor(serie)
    return jsonify({"message": "Televisor deleted"}), 200
 


if __name__ == "__main__":
    app.run(debug=True)