from .aws import (if_allowed_image, file_unique_name,
                  upload_S3, create_presigned_url, delete_S3)
from flask import Blueprint, jsonify, session, request
from app.models import User, db, Group, Member
from app.forms import GroupForm, UpdateGroupForm, MemberForm
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

    groups = Group.query.filter_by(owner=userId).all()

    for group in groups:
        group.group_type = group.group_type.to_value()

        parsed_img_url = group.preview_img.rsplit("/", 1)[-1]
        presigned_img_url = create_presigned_url(parsed_img_url)
        group.preview_img = presigned_img_url

    return {
        "UserGroups": [group.to_dict() for group in groups]
    }, 200


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

        owner = Member(
            member=current_user.id,
            group_id=new_group.id,
            privileges='owner'
        )

        db.session.add(new_group)
        db.session.commit()

        owner = Member(
            member=current_user.id,
            group_id=new_group.id,
            privileges='owner'
        )

        db.session.add(owner)
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


# Get All Members by Group ID
@group_routes.route('<int:groupId>/member', methods=['GET'])
def get_members(groupId):
    members = Member.query.filter_by(group_id=groupId).all()

    if not members:
        return {
            "message": "Group couldn't be found",
            "statusCode": 404
        }

    for member in members:
        member.privileges = member.privileges.to_value()

        parsed_img_url = member.users.profile_img.rsplit("/", 1)[-1]
        presigned_img_url = create_presigned_url(parsed_img_url)
        member.users.profile_img = presigned_img_url

    return{
        "members": [member.to_dict() for member in members]
    }, 200


# Add Member to Group
@group_routes.route('<int:groupId>/member', methods=['POST'])
@login_required
def add_member(groupId):
    group = Group.query.get(groupId)

    if not group:
        return {
            "message": "Group couldn't be found",
            "statusCode": 404
        }

    if not group.visibility:
        return {
            "message": "Group is private. Contact Group Owner about joining.",
            "statusCode": 403
        }

    curr_member = Member.query.filter(
        db.and_(Member.member == current_user.id, Member.group_id == groupId)).first()

    if curr_member:

        return {
            "message": "Member is already part of Group",
            "statusCode": 404
        }

    new_member = Member(
        member=current_user.id,
        group_id=groupId,
        privileges='member'
    )

    db.session.add(new_member)
    db.session.commit()

    new_member.privileges = new_member.privileges.to_value()

    return {
        'member': new_member.to_dict(),
        'statusCode': 200
    }


# Toggle Member Privilages
@group_routes.route('<int:groupId>/member/<int:userId>', methods=['PUT'])
@login_required
def toggle_member(groupId, userId):
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

    curr_member = Member.query.filter(
        db.and_(Member.member == userId, Member.group_id == groupId)).first()

    if not curr_member:

        return {
            "message": "Member not found",
            "statusCode": 404
        }

    if curr_member.privileges.to_value() == 'owner':

        return {
            "message": "Owners cannot be updated",
            "statusCode": 404
        }

    if curr_member.privileges.to_value() == 'member':
        curr_member.privileges = 'admin'
    else:
        curr_member.privileges = 'member'

    db.session.commit()

    updated_member = Member.query.filter(
        db.and_(Member.member == userId, Member.group_id == groupId)).first()
    updated_member.privileges = updated_member.privileges.to_value()

    return {
        'member': updated_member.to_dict(),
        'statusCode': 200
    }


# Remove Member
@group_routes.route('<int:groupId>/member/<int:userId>', methods=['DELETE'])
@login_required
def remove_member(groupId, userId):
    group = Group.query.get(groupId)
    user = User.query.get(userId)
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

    curr_member = Member.query.filter(
        db.and_(Member.member == userId, Member.group_id == groupId)).first()

    if not curr_member:

        return {
            "message": "Member not found",
            "statusCode": 404
        }

    db.session.delete(curr_member)
    db.session.commit()

    return {
        "id": user.callsign,
        "message": "Successfully removed",
        "statusCode": 200
    }
