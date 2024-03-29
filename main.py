#!/usr/bin/python3
from models import storage
from models.state import State
from models.city import City
from models.user import User
from models.place import Place
from models.review import Review
from models.amenity import Amenity

# Set environment variables (assuming you're not already setting them)
import os
os.environ['HBNB_MYSQL_USER'] = 'hbnb_dev'
os.environ['HBNB_MYSQL_PWD'] = 'hbnb_dev_pwd'
os.environ['HBNB_MYSQL_HOST'] = 'localhost'
os.environ['HBNB_MYSQL_DB'] = 'hbnb_dev_db'
os.environ['HBNB_TYPE_STORAGE'] = 'db'

# Create User
user = User()
user.username = "john_doe"
user.email = "john@example.com"
user.password = "password"
storage.new(user)
storage.save()

# Create State
state = State()
state.name = "Qatar"

storage.new(state)
storage.save()

# Create Amenity
amenity = Amenity()
amenity.name = "WiFi"

storage.new(amenity)
storage.save()

# Create Place
city = City()
place = Place()
place.name = "Cozy Apartment"
place.city_id = city.id
place.user_id = user.id
place.amenities.append(amenity)

# Create City

city.name = "new city"
city.state_id = state.id
city.places.append(place)
state.cities.append(city)

storage.new(city)
storage.save()







print(amenity.id)

storage.new(place)
storage.save()

# Create Review
review = Review()
review.text = "Great place to stay!"
review.place_id = place.id
review.user_id = user.id

storage.new(review)
storage.save()


