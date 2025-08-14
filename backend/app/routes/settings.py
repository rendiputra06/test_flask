from flask import Blueprint, request, jsonify
from app import db
from app.models import GlobalSetting, MenuSetting
from .users import admin_required

settings_bp = Blueprint('settings', __name__)

# Global Settings Routes
@settings_bp.route('/global', methods=['GET'])
@admin_required()
def get_global_settings():
    settings = GlobalSetting.query.all()
    return jsonify([s.to_dict() for s in settings])

@settings_bp.route('/global', methods=['POST'])
@admin_required()
def create_global_setting():
    data = request.get_json()
    setting = GlobalSetting(key=data['key'], value=data['value'])
    db.session.add(setting)
    db.session.commit()
    return jsonify(setting.to_dict()), 201

@settings_bp.route('/global/<string:key>', methods=['PUT'])
@admin_required()
def update_global_setting(key):
    setting = GlobalSetting.query.filter_by(key=key).first_or_404()
    data = request.get_json()
    setting.value = data.get('value', setting.value)
    db.session.commit()
    return jsonify(setting.to_dict())

@settings_bp.route('/global/<string:key>', methods=['DELETE'])
@admin_required()
def delete_global_setting(key):
    setting = GlobalSetting.query.filter_by(key=key).first_or_404()
    db.session.delete(setting)
    db.session.commit()
    return jsonify({'message': 'Global setting deleted'})


# Menu Settings Routes
@settings_bp.route('/menu', methods=['GET'])
def get_menu_settings():
    # Publicly accessible to build menus, but modification requires admin
    menus = MenuSetting.query.order_by(MenuSetting.order).all()
    return jsonify([m.to_dict() for m in menus])

@settings_bp.route('/menu', methods=['POST'])
@admin_required()
def create_menu_setting():
    data = request.get_json()
    menu = MenuSetting(
        name=data['name'],
        url=data['url'],
        icon=data.get('icon'),
        parent_id=data.get('parent_id'),
        order=data.get('order', 0)
    )
    db.session.add(menu)
    db.session.commit()
    return jsonify(menu.to_dict()), 201

@settings_bp.route('/menu/<int:id>', methods=['PUT'])
@admin_required()
def update_menu_setting(id):
    menu = MenuSetting.query.get_or_404(id)
    data = request.get_json()
    menu.name = data.get('name', menu.name)
    menu.url = data.get('url', menu.url)
    menu.icon = data.get('icon', menu.icon)
    menu.parent_id = data.get('parent_id', menu.parent_id)
    menu.order = data.get('order', menu.order)
    db.session.commit()
    return jsonify(menu.to_dict())

@settings_bp.route('/menu/<int:id>', methods=['DELETE'])
@admin_required()
def delete_menu_setting(id):
    menu = MenuSetting.query.get_or_404(id)
    db.session.delete(menu)
    db.session.commit()
    return jsonify({'message': 'Menu setting deleted'})
