from .db import db, environment, SCHEMA, add_prefix_for_prod
from enum import Enum
from datetime import datetime

class Member(db.Model):
    __tablename__ = 'members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    member = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False, unique=True)
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id')), nullable=False)
    privileges = db.Column('privileges', db.Enum('member','admin','owner', name='privileges'), nullable=False)
    
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship('User', back_populates='members')
    groups = db.relationship('Group', back_populates='members')


    def to_dict(self):
        return {
            'id': self.id,
            'member': self.member,
            'group_id': self.group_id,
            'privileges': self.privileges,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }