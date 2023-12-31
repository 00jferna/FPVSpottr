from app.models.members import db, Member, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_members():
    demo1 = Member(member=1, group_id=1, privileges="owner")
    demo2 = Member(member=2, group_id=2, privileges="owner")
    demo3 = Member(member=3, group_id=3, privileges="owner")
    demo4 = Member(member=2, group_id=1, privileges="admin")
    demo5 = Member(member=3, group_id=1, privileges="member")
    demo6 = Member(member=4, group_id=1, privileges="member")
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_members():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.members RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM members"))
        
    db.session.commit()