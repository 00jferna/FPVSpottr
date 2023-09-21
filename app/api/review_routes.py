from flask import Blueprint, jsonify, session, request
from app.models import User, db, Spot, Review
from app.forms import ReviewForm
from flask_login import current_user, login_required

review_routes = Blueprint('reviews', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Get Reviews by Spot ID
@review_routes.route('/spot/<int:spotId>')
def get_spot_reviews(spotId):
    spot = Spot.query.get(spotId)
    if not spot:
        return {
            "message": "Spot couldn't be found",
            "statusCode": 404
        }

    reviews = Review.query.filter_by(spot_id=spotId).all()

    return {
        "SpotReviews": [review.to_dict() for review in reviews]
    }


# Create a new Review
@review_routes.route('/create', methods=['POST'])
@login_required
def create_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = Review(
            reviewer=current_user.id,
            spot_id=form.data['spot_id'],
            review=form.data['review']
        )

        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict()

    return {'errors': form.errors}, 401


# Update a Review by Review ID
@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def update_review(reviewId):
    review = Review.query.get(reviewId)
    if not review:
        return {
            "message": "Review couldn't be found",
            "statusCode": 404
        }

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user.id == review.reviewer and form.validate_on_submit():
        review.spot_id = form.data['spot_id']
        review.review = form.data['review']

        db.session.commit()

        return review.to_dict()

    return {'errors': form.errors}, 401


# Delete a Review by specified Review ID
@review_routes.route('<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(reviewId):
    review = Review.query.get(reviewId)
    if not review:
        return {
            "message": "Review couldn't be found",
            "statusCode": 404
        }
    db.session.delete(review)
    db.session.commit()

    return {
        "id": review.id,
        "message": "Successfully deleted",
        "statusCode": 200
    }