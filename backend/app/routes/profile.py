from flask import Blueprint, request, jsonify
from app import db
from app.models import User
from flask_jwt_extended import jwt_required, get_jwt_identity

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_identity = get_jwt_identity()
    username = current_user_identity['username']
    user = User.query.filter_by(username=username).first_or_404()
    return jsonify(user.to_dict())

@profile_bp.route('/', methods=['PUT'])
@jwt_required()
def update_profile():
    current_user_identity = get_jwt_identity()
    username = current_user_identity['username']
    user = User.query.filter_by(username=username).first_or_404()

    data = request.get_json()

    # User can update their email, first_name, last_name, and password
    user.email = data.get('email', user.email)
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)

    if 'password' in data and data['password']:
        user.set_password(data['password'])

    db.session.commit()

    return jsonify(user.to_dict())
