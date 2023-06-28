from .db import db, environment, SCHEMA, add_prefix_for_prod
from enum import Enum
from datetime import datetime

class GroupTypes(Enum):
    racing='Racing'
    freestyle='Freestyle'
    cinematic='Cinematic'
    exploring='Exploring'
    tinyWhoop='Tiny Whoop'

class Group(db.Model):
    __tablename__ = 'groups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(40), nullable=False, unique=True)
    desc = db.Column(db.String(255))
    visibility = db.Column(db.Boolean, nullable=False)
    type = db.Column('type',db.Enum(GroupTypes, name='type'), nullable=False)
    owner = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    preview_img = db.Column(db.String(255), nullable=False)
    
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship('User', back_populates='groups')
    images = db.relationship('Image', back_populates='groups', cascade='all, delete-orphan')
    videos = db.relationship('Video', back_populates='groups', cascade='all, delete-orphan')
    members = db.relationship('Member', back_populates='groups', cascade='all, delete-orphan')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'desc': self.desc,
            'visibility': self.visibility,
            'type': self.type,
            'owner': self.owner,
            'preview_img': self.preview_img,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }