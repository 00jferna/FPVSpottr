from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    callsign = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_img = db.Column(db.String(255), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    spots = db.relationship('Spot', back_populates='users', cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='users', cascade='all, delete-orphan')
    favorites = db.relationship('Favorite', back_populates='users', cascade='all, delete-orphan')
    groups = db.relationship('Group', back_populates='users', cascade='all, delete-orphan')
    images = db.relationship('Image', back_populates='users', cascade='all, delete-orphan')
    videos = db.relationship('Video', back_populates='users', cascade='all, delete-orphan')
    visits = db.relationship('Visit', back_populates='users', cascade='all, delete-orphan')
    members = db.relationship('Member', back_populates='users', cascade='all, delete-orphan')
    
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'callsign': self.callsign,
            'email': self.email,
            'profile_img': self.profile_img,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
