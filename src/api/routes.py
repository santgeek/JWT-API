"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, TokenBlockedList
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
 

app = Flask(__name__)
bcrypt = Bcrypt(app)
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)  

@api.before_request
def handle_options_request():
    if request.method == 'OPTIONS':
        return '', 204

@api.route('/signup', methods=['POST'])
def signup_user():
    user_data = request.get_json()
    if user_data["email"] is None:
        return jsonify({"message": "No mail detected"}), 400
    if user_data["password"] is None:
        return jsonify({"message": "No password detected"}), 400
    user_data["password"]=bcrypt.generate_password_hash(user_data["password"]).decode('utf-8')
    print('Insert data password: ', user_data["password"])
    user=User(email=user_data["email"], password=user_data["password"], is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Usuario registrado"})
    
@api.route('/login', methods=['POST'])
def login_user():
    login_data = request.get_json()
    if login_data["email"] is None:
        return jsonify({"message": "No mail detected"}), 400
    if login_data["password"] is None:
        return jsonify({"message": "No password detected"}), 400 
    #buscar al usuario en la base de datos y verificar si existe
    user=User.query.filter_by(email=login_data["email"]).first()
    if user is None:
        return jsonify({"message": "User not found"}), 401
    #verificar la clave encriptada contra la clave recibida en la petición
    valid_password=bcrypt.check_password_hash(user.password, login_data["password"])
    if not valid_password:
        return jsonify({"message": "Invalid password"}), 401
    #crear y retornar el token de la sesión
    token=create_access_token(identity=user.id,additional_claims={"role": "admin"})
    return jsonify({"token": token})

@api.route('/private', methods=['GET'])
@jwt_required()
def access_private():
    user_id = get_jwt_identity()
    token_info = get_jwt()
    user = User.query.get(user_id)
    return jsonify({"user_info": user.serialize(), "role":token_info["role"]})

@api.route("/logout", methods=["POST"])
@jwt_required()
def user_logout():
   token_data=get_jwt()
   token_blocked=TokenBlockedList(jti=token_data["jti"])
   db.session.add(token_blocked)
   db.session.commit()
   return jsonify({"msg":"Sesión cerrada"})