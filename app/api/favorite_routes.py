from .aws import (if_allowed_image, file_unique_name,
                  upload_S3, create_presigned_url)
from flask import Blueprint, jsonify, session, request
from app.models import User, db, Spot, Favorite, FavoriteSpot
from app.forms import FavoriteForm, UpdateFavoriteForm
from flask_login import current_user, login_required

favorite_routes = Blueprint('favorites', __name__)


def is_owner(favoriteId):
    owner = current_user.id
    favorite = Favorite.query.get(favoriteId)
    if owner == favorite.owner:
        return True
    else:
        return False


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Get all Favorites
@favorite_routes.route('/')
def get_all_favorites():
    favorites = Favorite.query.all()

    for favorite in favorites:
        for spot in favorite.favorite_spots:
            spot.spots.spot_type = spot.spots.spot_type.to_value()
            spot.spots.spots_status = spot.spots.spots_status.to_value()

            parsed_img_url = spot.spots.preview_img.rsplit("/", 1)[-1]
            presigned_img_url = create_presigned_url(parsed_img_url)
            spot.spots.preview_img = presigned_img_url

    return {
        "Favorites": [favorite.to_dict() for favorite in favorites]
    }


# Get Favorites by User ID
@favorite_routes.route('/user/<int:userId>')
def get_favorites_by_user(userId):
    user = User.query.get(userId)
    if not user:
        return{
            "message": "User couldn't be found",
            "statusCode": 404
        }

    favorites = Favorite.query.filter_by(owner=userId).all()

    for favorite in favorites:
        for spot in favorite.favorite_spots:
            spot.spots.spot_type = spot.spots.spot_type.to_value()
            spot.spots.spots_status = spot.spots.spots_status.to_value()

            parsed_img_url = spot.spots.preview_img.rsplit("/", 1)[-1]
            presigned_img_url = create_presigned_url(parsed_img_url)
            spot.spots.preview_img = presigned_img_url

    return {
        "UserFavorites": [favorite.to_dict() for favorite in favorites]
    }


# Get a Favorite by Favorite ID
@favorite_routes.route('/<int:favoriteId>')
def get_favorites_by_id(favoriteId):
    favorite = Favorite.query.get(favoriteId)
    if not favorite:
        return{
            "message": "Favorite couldn't be found",
            "statusCode": 404
        }
    for spot in favorite.favorite_spots:
        spot.spots.spot_type = spot.spots.spot_type.to_value()
        spot.spots.spots_status = spot.spots.spots_status.to_value()

        parsed_img_url = spot.spots.preview_img.rsplit("/", 1)[-1]
        presigned_img_url = create_presigned_url(parsed_img_url)
        spot.spots.preview_img = presigned_img_url

    return favorite.to_dict()


# Create a new Favorite
@favorite_routes.route('/create', methods=['POST'])
@login_required
def create_favorite():
    form = FavoriteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_favorite = Favorite(
            owner=current_user.id,
            name=form.data['name'],
            desc=form.data['desc'],
            visibility=form.data['visibility']
        )

        db.session.add(new_favorite)
        db.session.commit()

        return new_favorite.to_dict(), 201

    return {'errors': form.errors}


# Update a Favorite by Favorite ID
@favorite_routes.route('/<int:favoriteId>', methods=['PUT'])
@login_required
def update_favorite(favoriteId):
    favorite = Favorite.query.get(favoriteId)
    if not favorite:
        return {
            "message": "Favorite couldn't be found",
            "statusCode": 404
        }
    if not is_owner(favoriteId):
        return {
            "message": "Forbidden",
            "statusCode": 403
        }

    form = UpdateFavoriteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user.id == favorite.owner and form.validate_on_submit():
        favorite.name = form.data['name']
        favorite.desc = form.data['desc']
        favorite.visibility = form.data['visibility']

        db.session.commit()

        for spot in favorite.favorite_spots:
            spot.spots.spot_type = spot.spots.spot_type.to_value()
            spot.spots.spots_status = spot.spots.spots_status.to_value()

            parsed_img_url = spot.spots.preview_img.rsplit("/", 1)[-1]
            presigned_img_url = create_presigned_url(parsed_img_url)
            spot.spots.preview_img = presigned_img_url

        return favorite.to_dict()

    return {'errors': form.errors}


# Delete a Favorite by Favorite ID
@favorite_routes.route('<int:favoriteId>', methods=['DELETE'])
@login_required
def delete_favorite(favoriteId):
    favorite = Favorite.query.get(favoriteId)
    if not favorite:
        return {
            "message": "Favorite couldn't be found",
            "statusCode": 404
        }
    if not is_owner(favoriteId):
        return {
            "message": "Forbidden",
            "statusCode": 403
        }

    db.session.delete(favorite)
    db.session.commit()

    return {
        "id": favorite.id,
        "message": "Successfully deleted",
        "statusCode": 200
    }


# Add a Spot to a Favorite
@favorite_routes.route('/<int:favoriteId>/add/<int:spotId>', methods=['POST'])
@login_required
def add_spot(favoriteId, spotId):
    if not is_owner(favoriteId):
        return {
            "message": "Forbidden",
            "statusCode": 403
        }
    favorite = Favorite.query.get(favoriteId)
    if not favorite:
        return {
            "message": "Favorites couldn't be found",
            "statusCode": 404
        }
    spot = Spot.query.get(spotId)
    if not spot:
        return {
            "message": "Spot couldn't be found",
            "statusCode": 404
        }

    new_favortite_spot = FavoriteSpot(
        favorite_id=favoriteId,
        spot_id=spotId
    )

    db.session.add(new_favortite_spot)
    db.session.commit()

    return new_favortite_spot.to_dict()


# Delete a Spot from a Favorite
@favorite_routes.route('/spot/<int:spotId>', methods=['DELETE'])
@login_required
def remove_spot(spotId):

    favorite_spot = FavoriteSpot.query.get(spotId)
    if not favorite_spot:
        return {
            "message": "Spot/Favorite Combination couldn't be found",
            "statusCode": 404
        }

    if not is_owner(favorite_spot.favorite_id):
        return {
            "message": "Forbidden",
            "statusCode": 403
        }

    db.session.delete(favorite_spot)
    db.session.commit()

    return {
        "id": favorite_spot.id,
        "message": "Successfully deleted",
        "statusCode": 200
    }
