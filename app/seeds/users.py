from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo1 = User(username='demo', callsign='DemoPilot', email='demo1@aa.io', profile_img='https://aa-capstone-project.s3.amazonaws.com/default_profile.png', password='password')
    demo2 = User(username='demo2', callsign='newbeepilot', email='demo2@aa.io', profile_img='https://aa-capstone-project.s3.amazonaws.com/default_profile.png', password='password')
    demo3 = User(username='demo3', callsign='bork', email='demo3@aa.io', profile_img='https://aa-capstone-project.s3.amazonaws.com/default_profile.png', password='password')
    demo4 = User(username='demo4', callsign='propnutz', email='demo4@aa.io', profile_img='https://aa-capstone-project.s3.amazonaws.com/default_profile.png', password='password')
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()