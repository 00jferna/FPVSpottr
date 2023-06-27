from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    url = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')))
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id')))

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship('User', back_populates='images')
    spots = db.relationship('Spot', back_populates='images')
    groups = db.relationship('Group', back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'user_id': self.user_id,
            'spot_id': self.spot_id,
            'group_id': self.group_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }