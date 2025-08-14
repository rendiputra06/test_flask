import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from .config import Config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_class=Config):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config_class)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)

    # Register blueprints
    from .routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    from .routes.users import users_bp
    app.register_blueprint(users_bp, url_prefix='/api/users')

    from .routes.settings import settings_bp
    app.register_blueprint(settings_bp, url_prefix='/api/settings')

    from .routes.profile import profile_bp
    app.register_blueprint(profile_bp, url_prefix='/api/profile')

    @app.route('/test')
    def test_route():
        return "Flask backend is running!"

    return app
