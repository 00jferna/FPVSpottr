from .db import db, environment, SCHEMA, add_prefix_for_prod
from enum import Enum
from datetime import datetime

class SpotTypes(Enum):
    field='Field'
    park='Park'
    playground='Playground'
    bando='Bando'
    industrialPark='Industrial Park'

class SpotStatus(Enum):
    active='Active'
    inactive='Inactive'


class Spot(db.Model):
    __tablename__ = 'spots'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(40), nullable=False, unique=True)
    desc = db.Column(db.String(255))
    latitude = db.Column(db.Float(), nullable=False)
    longitude = db.Column(db.Float(), nullable=False)
    address = db.Column(db.String(255))
    spot_type = db.Column('spot_type', db.Enum(SpotTypes, name='spot_type'), nullable=False)
    owner = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    spots_status = db.Column('spots_status', db.Enum(SpotStatus, name='spots_status'), nullable=False)
    preview_img = db.Column(db.String(255), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship('User', back_populates='spots')
    reviews = db.relationship('Review', back_populates='spots', cascade='all, delete-orphan')
    favorite_spots = db.relationship('FavoriteSpot', back_populates='spots', cascade='all, delete-orphan')
    images = db.relationship('Image', back_populates='spots', cascade='all, delete-orphan')
    videos = db.relationship('Video', back_populates='spots', cascade='all, delete-orphan')
    visits = db.relationship('Visit', back_populates='spots', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'desc': self.desc,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'address': self.address,
            'spot_type': self.spot_type,
            'owner': self.users.to_dict(),
            'spots_status': self.spots_status,
            'preview_img': self.preview_img,
            'created_at':self.created_at,
            'updated_at': self.updated_at
        }