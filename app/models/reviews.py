from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    reviewer = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    spot_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('spots.id')), nullable=False)
    desc = db.Column(db.String(255), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates='reviews')
    spot = db.relationship('Spot', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'reviewer': self.reviewer,
            'spot_id': self.spot_id,
            'desc': self.desc,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }