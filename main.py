from models import storage
from models.state import State
from models.city import City
from models.user import User
from models.place import Place
from models.amenity import Amenity
from models.review import Review

# Create dummy data for State
state1 = State(name="New York")
state2 = State(name="California")

# Add states to the session and commit changes
storage.new(state1)
storage.new(state2)
storage.save()

# Create dummy data for City with relationships to State
city1 = City(name="New York City", state_id=state1.id)
city2 = City(name="San Francisco", state_id=state2.id)

# Add cities to the session and commit changes
storage.new(city1)
storage.new(city2)
storage.save()

# Create dummy data for User
user1 = User(name="John Doe", email="john@example.com", password="password123")
user2 = User(name="Jane Doe", email="jane@example.com", password="pass456")

# Add users to the session and commit changes
storage.new(user1)
storage.new(user2)
storage.save()

# Create dummy data for Place with relationships to City and User
place1 = Place(city_id=city1.id, user_id=user1.id, name="Cozy Apartment",
               description="A comfortable place to stay", number_rooms=2,
               number_bathrooms=1, max_guest=4, price_by_night=100,
               latitude=40.7128, longitude=-74.0060)

place2 = Place(city_id=city2.id, user_id=user2.id, name="Luxury Villa",
               description="A luxurious villa with a pool", number_rooms=4,
               number_bathrooms=3, max_guest=8, price_by_night=300,
               latitude=37.7749, longitude=-122.4194)

# Add places to the session and commit changes
storage.new(place1)
storage.new(place2)
storage.save()

# Create dummy data for Amenity
amenity1 = Amenity(name="WiFi", description="Wireless Internet")
amenity2 = Amenity(name="Pool", description="Swimming pool")

# Add amenities to the session and commit changes
storage.new(amenity1)
storage.new(amenity2)
storage.save()

# Create dummy data for Review with relationships to Place
review1 = Review(place_id=place1.id, user_id=user1.id, text="Great place!")
review2 = Review(place_id=place2.id, user_id=user2.id, text="Amazing villa!")

# Add reviews to the session and commit changes
storage.new(review1)
storage.new(review2)
storage.save()
