from .aws import (if_allowed_image, file_unique_name,
                  upload_S3, create_presigned_url)
from flask import Blueprint, jsonify, session, request
from app.models import User, db, Spot
from app.forms import SpotForm
from flask_login import current_user, login_required

spot_routes = Blueprint('spots', __name__)

default_img = 'https://aa-capstone-project.s3.amazonaws.com/default_spot.jpg'


# Upload to AWS
@spot_routes.route('/upload', methods=["POST"])
@login_required
def upload_file():
    if "image" not in request.files:
        return {"Image": "Image required"}, 400

    image = request.files["image"]

    if not if_allowed_image(image.filename):
        return {"Image": "File type not supported"}, 400

    image.filename = file_unique_name(image.filename)
    image_upload = upload_S3(image)

    if "url" not in image_upload:
        return image_upload, 400

    image_url = image_upload["url"]

    return {
        "image_url": image_url
    }, 201


# Get all Spots
@spot_routes.route('/')
def get_spots():
    spots = Spot.query.all()
    for spot in spots:
        type_value = spot.spot_type.value
        status_value = spot.spots_status.value
        spot.spot_type = type_value
        spot.spots_status = status_value
        parsed_img_url = spot.preview_img.rsplit("/", 1)[-1]
        presigned_img_url = create_presigned_url(parsed_img_url)
        spot.preview_img = presigned_img_url

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
        parsed_img_url = spot.preview_img.rsplit("/", 1)[-1]
        presigned_img_url = create_presigned_url(parsed_img_url)
        spot.preview_img = presigned_img_url
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
    parsed_img_url = spot.preview_img.rsplit("/", 1)[-1]
    presigned_img_url = create_presigned_url(parsed_img_url)
    spot.preview_img = presigned_img_url

    return spot.to_dict()


# Create a new Spot
@spot_routes.route('/create', methods=['POST'])
@login_required
def create_spot():
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
        
        db.session.add(new_spot)
        db.session.commit()

        type_value = new_spot.spot_type.value
        status_value = new_spot.spots_status.value
        new_spot.spot_type = type_value
        new_spot.spots_status = status_value

        parsed_img_url = new_spot.preview_img.rsplit("/", 1)[-1]
        presigned_img_url = create_presigned_url(parsed_img_url)
        new_spot.preview_img = presigned_img_url

        return new_spot.to_dict(), 201

    return {'errors': form.errors}


# Update a Spot by Spot ID
@spot_routes.route('<int:spotId>', methods=['POST'])
@login_required
def update_spot(spotId):
    spot = Spot.query.get(spotId)
    if not spot:
        return {
            "message": "Spot couldn't be found",
            "statusCode": 404
        }

    if spot.owner != current_user.id:
        return {
            "message": "Forbidden",
            "statusCode": 403
        }

    form = SpotForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user.id == spot.owner and form.validate_on_submit():
        spot.name = form.data['name']
        spot.desc = form.data['desc']
        spot.latitude = float(form.data['latitude'])
        spot.longitude = float(form.data['longitude'])
        spot.address = form.data['address']
        spot.spot_type = form.data['spot_type']
        spot.spots_status = form.data['spots_status']
        spot.preview_img = form.data['preview_img']

        db.session.commit()

        type_value = spot.spot_type.value
        status_value = spot.spots_status.value
        spot.spot_type = type_value
        spot.spots_status = status_value
        parsed_img_url = spot.preview_img.rsplit("/", 1)[-1]
        presigned_img_url = create_presigned_url(parsed_img_url)
        spot.preview_img = presigned_img_url

        return spot.to_dict()

    return {'errors': form.errors}, 400


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

    if spot.owner != current_user.id:
        return {
            "message": "Forbidden",
            "statusCode": 403
        }

    db.session.delete(spot)
    db.session.commit()

    return {
        "id": spot.id,
        "message": "Successfully deleted",
        "statusCode": 200
    }
