from flask_wtf import FlaskForm
from wtforms import StringField, EmailField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_emaiil_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    callsign = StringField('callsign', validators=[DataRequired()])
    email = EmailField('email', validators=[DataRequired(),Email(), user_emaiil_exists])
    profile_img = StringField('profile_img')
    password = StringField('password', validators=[DataRequired()])

class UpdateForm(FlaskForm):
    callsign = StringField('callsign', validators=[DataRequired()])
    profile_img = StringField('profile_img')