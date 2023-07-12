from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Review, Spot

def spot_exists(form, field):
    spot_id = field.data
    spot = Spot.query.get(spot_id)
    if not spot:
        raise ValidationError('Spot does not exists.')

class ReviewForm(FlaskForm):
    reviewer = IntegerField('reviewer', validators=[DataRequired()])
    review = StringField("review", validators=[DataRequired()])