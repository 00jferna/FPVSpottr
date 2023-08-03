from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Favorite


def favorite_exists(form, field):
    favorite_name = field.data
    favorite = Favorite.query.filter(Favorite.name == favorite_name).first()
    if favorite:
        raise ValidationError('Favorite already exists.')


class FavoriteForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), favorite_exists])
    desc = StringField('desc', validators=[DataRequired()])
    visibility = BooleanField('visibility')
