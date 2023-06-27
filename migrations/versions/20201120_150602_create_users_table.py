"""create_users_table

Revision ID: ffdc0a98111c
Revises:
Create Date: 2020-11-20 15:06:02.230689

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'ffdc0a98111c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('username', sa.String(length=40), nullable=False),
                    sa.Column('callsign', sa.String(length=40), nullable=False),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('profile_img', sa.String(length=255), nullable=False),
                    sa.Column('hashed_password', sa.String(length=255), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )
    op.create_table('spots',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=40), nullable=False),
                    sa.Column('desc', sa.String(length=255)),
                    sa.Column('latitude', sa.Float(), nullable=False),
                    sa.Column('longitude', sa.Float(), nullable=False),
                    sa.Column('address', sa.String(length=255)),
                    sa.Column('type', sa.Enum(), nullable=False),
                    sa.Column('owner', sa.Integer(), nullable=False),
                    sa.Column('status', sa.Enum(), nullable=False),
                    sa.Column('preview_img', sa.String(length=255), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.ForeignKeyConstraint(['owner'], ['users.id']),
                    sa.UniqueConstraint('name')
                    )
    op.create_table('reviews',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('reviewer', sa.Integer(), nullable=False),
                    sa.Column('spot_id', sa.Integer(), nullable=False),
                    sa.Column('desc', sa.String(length=255), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.ForeignKeyConstraint(['reviewer'], ['users.id']),
                    sa.ForeignKeyConstraint(['spot_id'], ['spots.id'])
                    )
    op.create_table('favorites',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=255), nullable=False),
                    sa.Column('desc', sa.String(length=255)),
                    sa.Column('visibility', sa.Boolean(), nullable=False),
                    sa.Column('spot_id', sa.Integer(), nullable=False),
                    sa.Column('owner', sa.Integer(), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.ForeignKeyConstraint(['owner'], ['users.id']),
                    sa.ForeignKeyConstraint(['spot_id'], ['spots.id']),
                    sa.UniqueConstraint('name')
                    )
    op.create_table('groups',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(length=255), nullable=False),
                    sa.Column('desc', sa.String(length=255)),
                    sa.Column('visibility', sa.Enum(), nullable=False),
                    sa.Column('type', sa.Enum(), nullable=False),
                    sa.Column('owner', sa.Integer(), nullable=False),
                    sa.Column('preview_img', sa.String(length=255), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.ForeignKeyConstraint(['owner'], ['users.id']),
                    sa.UniqueConstraint('name')
                    )
    op.create_table('images',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('url', sa.String(length=255), nullable=False),
                    sa.Column('user_id', sa.Integer()),
                    sa.Column('spot_id', sa.Integer()),
                    sa.Column('group_id', sa.Integer()),
                    sa.PrimaryKeyConstraint('id'),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
                    sa.ForeignKeyConstraint(['spot_id'], ['spots.id']),
                    sa.ForeignKeyConstraint(['group_id'], ['groups.id']),
                    sa.UniqueConstraint('url')
                    )
    op.create_table('videos',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('url', sa.String(length=255), nullable=False),
                    sa.Column('user_id', sa.Integer()),
                    sa.Column('spot_id', sa.Integer()),
                    sa.Column('group_id', sa.Integer()),
                    sa.PrimaryKeyConstraint('id'),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
                    sa.ForeignKeyConstraint(['spot_id'], ['spots.id']),
                    sa.ForeignKeyConstraint(['group_id'], ['groups.id']),
                    sa.UniqueConstraint('url')
                    )
    op.create_table('visits',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('spot_id', sa.Integer(), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
                    sa.ForeignKeyConstraint(['spot_id'], ['spots.id'])
                    )
    op.create_table('members',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('member', sa.Integer(), nullable=False),
                    sa.Column('group_id', sa.Integer(), nullable=False),
                    sa.Column('privileges', sa.Enum(), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.ForeignKeyConstraint(['member'], ['users.id']), 
                    sa.ForeignKeyConstraint(['group_id'], ['groups.id']),
                    )


    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE spots SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE favorites SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE groups SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE images SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE videos SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE visits SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE members SET SCHEMA {SCHEMA};")

def downgrade():
    op.drop_table('users')
    op.drop_table('spots')
    op.drop_table('reviews')
    op.drop_table('favorites')
    op.drop_table('groups')
    op.drop_table('images')
    op.drop_table('videos')
    op.drop_table('visits')
    op.drop_table('members')