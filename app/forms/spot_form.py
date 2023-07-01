from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Spot

def spot_exists(form, field):
    spot_name = field.data
    spot = Spot.query.filter(Spot.name == spot_name).first()
    if spot:
        raise ValidationError('Spot already exists.')

class SpotForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), spot_exists])
    desc = StringField('desc')
    latitude = StringField("latitude", validators=[DataRequired()])
    longitude = StringField("longitude", validators=[DataRequired()])
    address = StringField('address')
    spot_type = StringField('spot_type', validators=[DataRequired()])
    spots_status = StringField('spots_status', validators=[DataRequired()])
    preview_img = StringField('preview_img')
