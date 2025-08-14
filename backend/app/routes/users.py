from flask import Blueprint, request, jsonify
from app import db
from app.models import User
from flask_jwt_extended import jwt_required, get_jwt

users_bp = Blueprint('users', __name__)

def admin_required():
    def wrapper(fn):
        @jwt_required()
        def decorator(*args, **kwargs):
            claims = get_jwt()
            if claims.get('is_admin'):
                return fn(*args, **kwargs)
            else:
                return jsonify(msg="Admins only!"), 403
        return decorator
    return wrapper

@users_bp.route('/', methods=['GET'])
@admin_required()
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@users_bp.route('/<int:id>', methods=['GET'])
@admin_required()
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict())

@users_bp.route('/', methods=['POST'])
@admin_required()
def create_user():
    data = request.get_json()
    # Add validation
    user = User(
        username=data['username'],
        email=data['email'],
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        is_active=data.get('is_active', True),
        is_admin=data.get('is_admin', False)
    )
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

@users_bp.route('/<int:id>', methods=['PUT'])
@admin_required()
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.is_active = data.get('is_active', user.is_active)
    user.is_admin = data.get('is_admin', user.is_admin)
    if 'password' in data:
        user.set_password(data['password'])
    db.session.commit()
    return jsonify(user.to_dict())

@users_bp.route('/<int:id>', methods=['DELETE'])
@admin_required()
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'})
