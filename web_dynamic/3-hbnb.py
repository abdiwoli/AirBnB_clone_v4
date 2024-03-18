#!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ, path
from flask import Flask, render_template
import uuid
from api.v1.app import app


app.template_folder = path.join(path.dirname(path.abspath(__file__)),
                                   'templates')
app.static_folder = path.join(path.dirname(path.abspath(__file__)),
                                 'static')

                                 
@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/3-hbnb', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)

    return render_template('3-hbnb.html',
                           states=states,
                           amenities=amenities,
                           places=places,
                           cache_id=str(uuid.uuid4()))


if __name__ == "__main__":
    """ Main Function """
    host = environ.get('HBNB_API_HOST')
    port = environ.get('HBNB_API_PORT')
    if not host:
        host = '0.0.0.0'
    if not port:
        port = '5000'
    app.run(host=host, port=port)
