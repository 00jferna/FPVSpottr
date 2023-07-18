from flask_wtf import FlaskForm
from wtforms import StringField, FileField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError
from app.models import Spot


def spot_exists(form, field):
    spot_name = field.data
    spot = Spot.query.filter(Spot.name == spot_name).first()
    if spot:
        raise ValidationError('Spot already exists.')


def lat_validate(form, field):
    value = field.data
    if abs(value) > 90:
        raise ValidationError('Latitude must be between -90 and 90')


def long_validate(form, field):
    value = field.data
    if abs(value) > 180:
        raise ValidationError('Longitude must be between -180 and 180')


class SpotForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), spot_exists])
    desc = StringField('desc')
    latitude = FloatField("latitude", validators=[
                          DataRequired(), lat_validate])
    longitude = FloatField("longitude", validators=[
                           DataRequired(), long_validate])
    address = StringField('address')
    spot_type = StringField('spot_type', validators=[DataRequired()])
    spots_status = StringField('spots_status', validators=[DataRequired()])
    preview_img = FileField('preview_img')


class UpdateSpotForm(FlaskForm):
    id = IntegerField('id')
    name = StringField('name', validators=[DataRequired()])
    desc = StringField('desc')
    latitude = FloatField("latitude", validators=[
                           DataRequired(), lat_validate])
    longitude = FloatField("longitude", validators=[
                            DataRequired(), long_validate])
    address = StringField('address')
    spot_type = StringField('spot_type', validators=[DataRequired()])
    spots_status = StringField('spots_status', validators=[DataRequired()])
    preview_img = FileField('preview_img')
