from app.models.groups import db, Group, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_groups():
    demo1 = Group(name='Local Racers', desc="Adrenaline-Fueled FPV Racers: Join our local group for heart-pounding FPV racing action! Experience intense competition, camaraderie, and thrilling courses as we push the limits of speed and skill. Get ready for the ultimate FPV racing adventure!", visibility=True, group_type='racing', owner=1, preview_img='https://aa-capstone-project.s3.amazonaws.com/default_spot.jpg')
    demo2 = Group(name='Bando Bashers', desc="Unleash Creativity in the Skies: Join our local freestyle FPV group for mind-blowing aerial acrobatics, jaw-dropping tricks, and a supportive community of passionate freestyle pilots. Get inspired, push boundaries, and take your FPV skills to new heights!" , visibility=False, group_type='freestyle', owner=2, preview_img='https://aa-capstone-project.s3.amazonaws.com/default_spot.jpg')
    demo3 = Group(name='Tiny Go!', desc="Micro Madness Awaits: Join our local TinyWhoop racing group for thrilling indoor adventures! Experience the excitement of small-scale racing, navigate challenging courses, and bond with fellow enthusiasts. Get ready for big fun in a tiny package!", visibility=True, group_type='tiny_whoop', owner=3, preview_img='https://aa-capstone-project.s3.amazonaws.com/default_spot.jpg')
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