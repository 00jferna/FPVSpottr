from flask import Blueprint, jsonify, session, request
from app.models import User, db, Group, Member
from app.forms import GroupForm
from flask_login import current_user, login_required

group_routes = Blueprint('groups', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Get all Groups


@group_routes.route('/')
def get_all_groups():
    groups = Group.query.all()
    for group in groups:
        type_value = group.group_type.value
        group.group_type = type_value

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
        type_value = group.privileges.value
        group.privileges = type_value

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

    type_value = group.group_type.value
    group.group_type = type_value

    return group.to_dict()


# Create a new Group
@group_routes.route('/create', methods=['POST'])
@login_required
def create_group():
    default_img = '/assets/default_spot.png'
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

        type_value = new_group.group_type.value
        new_group.group_type = type_value

        return new_group.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Update a Group by Group ID
@group_routes.route('/<int:groupId>', methods=['PUT'])
@login_required
def update_group(groupId):
    default_img = '/assets/default_spot.png'
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

    form = GroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        group.name = form.data['name']
        group.desc = form.data['desc']
        group.visibility = form.data['visibility']
        group.group_type = form.data['group_type']
        group.preview_img = form.data['preview_img']

        if len(form.data['preview_img']) == 0:
            group.preview_img = default_img

        db.session.commit()

        type_value = group.group_type.value
        group.group_type = type_value

        return group.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

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

    db.session.delete(group)
    db.session.commit()

    return {
        "id": group.id,
        "message": "Successfully deleted",
        "statusCode": 200
    }