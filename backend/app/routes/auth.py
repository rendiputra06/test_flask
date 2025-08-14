from flask import Blueprint, request, jsonify
from app import db
from app.models import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not 'username' in data or not 'password' in data or not 'email' in data:
        return jsonify({'message': 'Missing username, email, or password'}), 400

    if User.query.filter_by(username=data['username']).first() or User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'User already exists'}), 400

    user = User(
        username=data['username'],
        email=data['email']
    )
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not 'username' in data or not 'password' in data:
        return jsonify({'message': 'Missing username or password'}), 400

    user = User.query.filter_by(username=data['username']).first()

    if user is None or not user.check_password(data['password']):
        return jsonify({'message': 'Invalid username or password'}), 401

    access_token = create_access_token(identity={'username': user.username, 'is_admin': user.is_admin})
    return jsonify(access_token=access_token)

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # For JWT, logout can be handled on the client-side by simply deleting the token.
    # We can also implement token blocklisting if needed.
    return jsonify({"message": "Successfully logged out"}), 200
