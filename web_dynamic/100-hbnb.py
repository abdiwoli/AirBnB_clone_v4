#!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
import os
from os import environ
from flask import Flask, render_template
import uuid
from api.v1.app import app

app.template_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                   'templates')
app.static_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                 'static')
@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.route('/100-hbnb', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place).values()
    places = sorted(places, key=lambda k: k.name)
    return render_template('100-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=str(uuid.uuid4()))


if __name__ == "__main__":
    """ Main Function """
    port = int(environ.get('HBNB_API_PORT', 5000))
    app.run(host='0.0.0.0', port=port)
