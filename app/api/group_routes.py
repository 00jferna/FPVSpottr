from .aws import (if_allowed_image, file_unique_name,
                  upload_S3, create_presigned_url, delete_S3)
from flask import Blueprint, jsonify, session, request
from app.models import User, db, Group, Member
from app.forms import GroupForm, UpdateGroupForm
from flask_login import current_user, login_required

group_routes = Blueprint('groups', __name__)

default_img = 'https://aa-capstone-project.s3.amazonaws.com/default_spot.jpg'


# Upload to AWS
@group_routes.route('/upload', methods=["POST"])
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


# Get all Groups
@group_routes.route('/')
def get_all_groups():
    groups = Group.query.all()
    for group in groups:
        group.group_type = group.group_type.to_value()

        parsed_img_url = group.preview_img.rsplit("/", 1)[-1]
        presigned_img_url = create_presigned_url(parsed_img_url)
        group.preview_img = presigned_img_url

    return {
        "Groups": [group.to_dict() for group in groups]
    }


# Get Groups by User ID
@group_routes.route('/user/<int:userId>')
def get_all_user_groups(userId):
    user = User.query.get(userId)
    if not user:
        return{
            "message": "User couldn't be found",
            "statusCode": 404
        }

    groups = Member.query.filter_by(member=userId).all()

    for group in groups:
        group.group_type = group.group_type.to_value()

        parsed_img_url = group.preview_img.rsplit("/", 1)[-1]
        presigned_img_url = create_presigned_url(parsed_img_url)
        group.preview_img = presigned_img_url

    return {
        "UserGroups": [group.to_dict() for group in groups]
    }


# Get a Group by Group ID
@group_routes.route('<int:groupId>')
def get_group_by_id(groupId):
    group = Group.query.get(groupId)

    if not group:
        return {
            "message": "Group couldn't be found",
            "statusCode": 404
        }

    group.group_type = group.group_type.to_value()

    parsed_img_url = group.preview_img.rsplit("/", 1)[-1]
    presigned_img_url = create_presigned_url(parsed_img_url)
    group.preview_img = presigned_img_url

    return group.to_dict()


# Create a new Group
@group_routes.route('/create', methods=['POST'])
@login_required
def create_group():
    form = GroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_group = Group(
            owner=current_user.id,
            name=form.data['name'],
            desc=form.data['desc'],
            visibility=form.data['visibility'],
            group_type=form.data['group_type'],
            preview_img=form.data['preview_img']
        )

        if len(form.data['preview_img']) == 0:
            new_group.preview_img = default_img

        db.session.add(new_group)
        db.session.commit()

        new_group.group_type = new_group.group_type.to_value()

        parsed_img_url = new_group.preview_img.rsplit("/", 1)[-1]
        presigned_img_url = create_presigned_url(parsed_img_url)
        new_group.preview_img = presigned_img_url

        return new_group.to_dict()

    return {'errors': form.errors}, 401


# Update a Group by Group ID
@group_routes.route('/<int:groupId>', methods=['PUT'])
@login_required
def update_group(groupId):
    group = Group.query.get(groupId)
    if not group:
        return {
            "message": "Group couldn't be found",
            "statusCode": 404
        }

    if group.owner != current_user.id:
        return {
            "message": "Forbidden",
            "statusCode": 403
        }

    form = UpdateGroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        group.name = form.data['name']
        group.desc = form.data['desc']
        group.visibility = form.data['visibility']
        group.group_type = form.data['group_type']

        if form.data['preview_img']:
            group.preview_img = form.data['preview_img']

        db.session.commit()

        group.group_type = group.group_type.to_value()

        parsed_img_url = group.preview_img.rsplit("/", 1)[-1]
        presigned_img_url = create_presigned_url(parsed_img_url)
        group.preview_img = presigned_img_url

        return group.to_dict()

    return {'errors': form.errors}, 401


# Delete a Group by Group ID
@group_routes.route('<int:groupId>', methods=['DELETE'])
@login_required
def delete_spot(groupId):
    group = Group.query.get(groupId)
    if not group:
        return {
            "message": "Group couldn't be found",
            "statusCode": 404
        }

    if group.owner != current_user.id:
        return {
            "message": "Forbidden",
            "statusCode": 403
        }

    awsRes = None
    if group.preview_img.rsplit("/", 1)[-1] != default_img.rsplit("/", 1)[-1]:
        awsRes = delete_S3(group.preview_img.rsplit("/", 1)[-1])

    db.session.delete(group)
    db.session.commit()

    return {
        "id": group.id,
        "message": "Successfully deleted",
        "statusCode": 200,
        "AWS": awsRes
    }
