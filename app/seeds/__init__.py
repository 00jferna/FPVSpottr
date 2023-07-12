from flask.cli import AppGroup
from .users import seed_users, undo_users
from .spots import seed_spots, undo_spots
from .reviews import seed_reviews, undo_reviews
from .favorites import seed_favorites, undo_favorites
from .favorite_spots import seed_favorite_spots, undo_favorite_spots
from .groups import seed_groups, undo_groups
from .images import seed_images, undo_images
from .videos import seed_videos, undo_videos
from .visits import seed_visits, undo_visits
from .members import seed_members, undo_members

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_spots()
        undo_reviews()
        undo_favorites()
        undo_favorite_spots()
        undo_groups()
        undo_images()
        undo_videos()
        undo_visits()
        undo_members()
    seed_users()
    seed_spots()
    seed_reviews()
    seed_favorites()
    seed_favorite_spots()
    seed_groups()
    seed_images()
    seed_videos()
    seed_visits()
    seed_members()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_spots()
    undo_reviews()
    undo_favorites()
    undo_favorite_spots()
    undo_groups()
    undo_images()
    undo_videos()
    undo_visits()
    undo_members()
    # Add other undo functions here