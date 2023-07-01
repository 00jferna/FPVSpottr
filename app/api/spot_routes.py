from flask import Blueprint, jsonify, session, request
from app.models import User, db, Spot
from app.forms import SpotForm
from flask_login import current_user, login_required

spot_routes = Blueprint('spots', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Get all Spots
@spot_routes.route('/')
def get_spots():
    spots = Spot.query.all()
    for spot in spots:
        type_value = spot.spot_type.value
        status_value = spot.spots_status.value
        spot.spot_type = type_value
        spot.spots_status = status_value

    return {
        "Spots": [spot.to_dict() for spot in spots]
    }


# Get Spots by User ID
@spot_routes.route('/user/<int:userId>')
def get_spots_by_user(userId):
    user = User.query.get(userId)
    if not user:
        return{
            "message": "User couldn't be found",
            "statusCode": 404
        }

    spots = Spot.query.filter_by(owner=userId).all()
    for spot in spots:
        type_value = spot.spot_type.value
        status_value = spot.spots_status.value
        spot.spot_type = type_value
        spot.spots_status = status_value

    return {
        "UserSpots": [spot.to_dict() for spot in spots]
    }


# Get a Spot by Spot ID
@spot_routes.route('/<int:spotId>')
def get_spot_by_id(spotId):
    spot = Spot.query.get(spotId)
    if not spot:
        return{
            "message": "Spot couldn't be found",
            "statusCode": 404
        }

    type_value = spot.spot_type.value
    status_value = spot.spots_status.value
    spot.spot_type = type_value
    spot.spots_status = status_value

    return spot.to_dict()


# Create a new Spot
@spot_routes.route('create', methods=['POST'])
@login_required
def create_spot():
    default_img = '/assets/default_spot.png'
    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_spot = Spot(
            owner=current_user.id,
            name=form.data['name'],
            desc=form.data['desc'],
            latitude=float(form.data['latitude']),
            longitude=float(form.data['longitude']),
            address=form.data['address'],
            spot_type=form.data['spot_type'],
            spots_status=form.data['spots_status'],
            preview_img=form.data['preview_img']
        )

        if len(form.data['preview_img']) > 0:
            new_spot.preview_img = default_img
        db.session.add(new_spot)
        db.session.commit()

        type_value = new_spot.spot_type.value
        status_value = new_spot.spots_status.value
        new_spot.spot_type = type_value
        new_spot.spots_status = status_value
        print(new_spot.to_dict())

        return new_spot.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Update a Spot by Spot ID
@spot_routes.route('<int:spotId>', methods=['POST'])
@login_required
def update_spot(spotId):
    default_img = '/assets/default_spot.png'
    spot = Spot.query.get(spotId)
    if not spot:
        return {
            "message": "Spot couldn't be found",
            "statusCode": 404
        }

    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user.id == spot.owner and form.validate_on_submit():
        print(form.data['name'])
        # spot.name=form.data['name'],
        spot.desc = form.data['desc'],
        spot.latitude = float(form.data['latitude']),
        spot.longitude = float(form.data['longitude']),
        spot.address = form.data['address'],
        spot.spot_type = form.data['spot_type'],
        spot.spots_status = form.data['spots_status'],
        spot.preview_img = form.data['preview_img']

        if len(form.data['preview_img']) > 0:
            spot.preview_img = default_img

        # db.session.commit()

        # type_value = spot.spot_type.value
        # status_value = spot.spots_status.value
        # spot.spot_type = type_value
        # spot.spots_status = status_value
        print('------------------------------------------------1')
        print(spot.to_dict())
        print('------------------------------------------------2')
        return "spot.to_dict()"

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Delete a Spot by Spot ID
@spot_routes.route('<int:spotId>', methods=['DELETE'])
@login_required
def delete_spot(spotId):
    spot = Spot.query.get(spotId)
    if not spot:
        return {
            "message": "Spot couldn't be found",
            "statusCode": 404
        }
    db.session.delete(spot)
    db.session.commit()

    return {
        "id": spot.id,
        "message": "Successfully deleted",
        "statusCode": 200
    }
