from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Group

def group_exists(form, field):
    group_name = field.data
    group = Group.query.filter(Group.name == group_name).first()
    if group:
        raise ValidationError('Group already exists.')

class GroupForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), group_exists])
    desc = StringField('desc')
    visibility = BooleanField("visibility", validators=[DataRequired()])
    group_type = StringField("group_type", validators=[DataRequired()])
    preview_img = StringField('preview_img')
