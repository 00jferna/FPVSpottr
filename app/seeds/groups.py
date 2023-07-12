from app.models.groups import db, Group, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_groups():
    demo1 = Group(name='Local Racers', visibility=True, group_type='racing', owner=1, preview_img='img.png')
    demo2 = Group(name='Bando Bashers', visibility=False, group_type='freestyle', owner=2, preview_img='img.png')
    demo3 = Group(name='Tiny Go!', visibility=True, group_type='tinyWhoop', owner=3, preview_img='img.png')
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM groups"))
        
    db.session.commit()