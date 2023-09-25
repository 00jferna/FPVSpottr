from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Group

def group_exists(form, field):
    group_name = field.data
    group = Group.query.filter(Group.name == group_name).first()
    if group:
        raise ValidationError('Group already exists.')

class GroupForm(FlaskForm):
    name = StringField('name', validators=[DataRequired('Group Name is required'), group_exists])
    desc = StringField('desc')
    visibility = BooleanField("visibility")
    group_type = StringField("group_type", validators=[DataRequired('Group Type is required')])
    preview_img = StringField('preview_img')

class UpdateGroupForm(FlaskForm):
    name = StringField('name', validators=[DataRequired('Group Name is required')])
    desc = StringField('desc')
    visibility = BooleanField("visibility")
    group_type = StringField("group_type", validators=[DataRequired('Group Type is required')])
    preview_img = StringField('preview_img')

class MemberForm(FlaskForm):
    member = IntegerField('member', validators=[DataRequired()])
    group_id = IntegerField('group_id', validators=[DataRequired()])
    privileges = StringField('privileges', validators=[DataRequired()])