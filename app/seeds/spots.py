from app.models.spots import db, Spot, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_spots():
    demo1 = Spot(name='Millington Barnstormers', desc="Barnstormers Flying Field: FPV heaven! Thrilling flights, epic maneuvers, and a welcoming community. Highly recommended for unforgettable FPV experiences!", latitude='35.29846332258847', longitude='-89.65428151451766', spot_type='field', owner=1, spots_status='active', preview_img='https://aa-capstone-project.s3.amazonaws.com/default_spot.jpg')
    demo2 = Spot(name='Front St', desc="Vibrant commercial hub meets FPV paradise. Soar through towering skyscrapers and navigate urban landscapes for a thrilling drone adventure!" , latitude='35.165922', longitude='-90.046408', spot_type='industrial_park', owner=2, spots_status='active', preview_img='https://aa-capstone-project.s3.amazonaws.com/default_spot.jpg')
    demo3 = Spot(name='Water Plant Park', desc="Embrace nature's beauty as your FPV drone soars above lush greenery. Tranquil, picturesque, and perfect for aerial exploration!", latitude='35.28619044423514', longitude='-89.69229144183005', spot_type='park', owner=3, spots_status='active', preview_img='https://aa-capstone-project.s3.amazonaws.com/default_spot.jpg')
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
def undo_spots():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.spots RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM spots"))

    db.session.commit()
