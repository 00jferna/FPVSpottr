from .aws import (if_allowed_image, file_unique_name,
                  upload_S3, create_presigned_url, delete_S3)
from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import User, db
from app.forms import UpdateForm

user_routes = Blueprint('users', __name__)

# Upload to AWS


@user_routes.route('/upload', methods=["POST"])
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


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    parsed_img_url = user.profile_img.rsplit("/", 1)[-1]
    presigned_img_url = create_presigned_url(parsed_img_url)
    user.profile_img = presigned_img_url

    return user.to_dict()


@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def updateUser(id):
    user = User.query.get(id)

    form = UpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.callsign = form.data['callsign']
        if form.data['profile_img']:
            user.profile_img = form.data['profile_img']

        db.session.commit()

        parsed_img_url = user.profile_img.rsplit("/", 1)[-1]
        presigned_img_url = create_presigned_url(parsed_img_url)
        user.profile_img = presigned_img_url

        return user.to_dict(), 201

    return {
        'errors': form.errors,
        "statusCode": 400
    }
