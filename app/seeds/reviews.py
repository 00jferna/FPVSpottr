from app.models.reviews import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    demo1 = Review(reviewer=2, spot_id=1, review='A nice local spot')
    demo3 = Review(reviewer=1, spot_id=3, review='A nice local spot')
    demo4 = Review(reviewer=1, spot_id=2, review="Industrial park is great spot to fly - open space and no obstacles.")
    demo5 = Review(reviewer=3, spot_id=1, review="Field location has nice long runway but watch out for power lines!")
    demo6 = Review(reviewer=1, spot_id=6, review="Race field is perfect for speed runs - flat and wide open spaces")
    demo7 = Review(reviewer=2, spot_id=3, review="Local park can get crowded on weekends but still fun to fly at")
    demo8 = Review(reviewer=3, spot_id=2, review="Parking lot makes for convenient RC flying with easy access")
    demo9 = Review(reviewer=4, spot_id=2, review="Open area in industrial zone good for beginners to practice")
    demo10 = Review(reviewer=1, spot_id=5, review="Country road with few trees provides great cover from winds")
    demo11 = Review(reviewer=4, spot_id=3, review="Agricultural field allows for free flight without obstructions")
    demo12 = Review(reviewer=2, spot_id=4, review="Hills make for challenging flights but offer beautiful views")
    demo13 = Review(reviewer=3, spot_id=5, review="River offers scenic backdrop for RC flying while enjoying the waterfront")

    db.session.add(demo1)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)
    db.session.add(demo11)
    db.session.add(demo12)
    db.session.add(demo13)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
