from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(40), nullable=False, unique=True)
    desc = db.Column(db.String(255))
    visibility = db.Column(db.Boolean, nullable=False)
    owner = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship('User', back_populates='favorites')

    favorite_spots = db.relationship('FavoriteSpot', back_populates='favorites')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'desc': self.desc,
            'visibility': self.visibility,
            'owner': self.owner,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
    
class FavoriteSpot(db.Model):
    __tablename__ = 'favorite_spots'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    favorite_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('favorites.id')), nullable=False)
    spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), nullable=False)

    spots = db.relationship('Spot', back_populates='favorite_spots')
    favorites = db.relationship('Favorite', back_populates='favorite_spots')

    def to_dict(self):
        return {
            'id': self.id,
            'favorite_id': self.favorite_id,
            'spot_id': self.spot_id
        }