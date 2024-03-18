function updatePlaces(places) {
    var placesSection = document.querySelector('.places');
    placesSection.innerHTML = '';

    places.forEach(function(place) {
        var article = document.createElement('article');
        
        var titleBox = document.createElement('div');
        titleBox.classList.add('title_box');
        
        var nameHeading = document.createElement('h2');
        nameHeading.textContent = place.name;

        var priceByNightDiv = document.createElement('div');
        priceByNightDiv.classList.add('price_by_night');
        priceByNightDiv.textContent = '$' + place.price_by_night;

        titleBox.appendChild(nameHeading);
        titleBox.appendChild(priceByNightDiv);

        article.appendChild(titleBox);

        var informationDiv = document.createElement('div');
        informationDiv.classList.add('information');

        var maxGuestDiv = document.createElement('div');
        maxGuestDiv.classList.add('max_guest');
        maxGuestDiv.textContent = place.max_guest + ' Guest';

        var numberRoomsDiv = document.createElement('div');
        numberRoomsDiv.classList.add('number_rooms');
        numberRoomsDiv.textContent = place.number_rooms + ' Bedroom';

        var numberBathroomsDiv = document.createElement('div');
        numberBathroomsDiv.classList.add('number_bathrooms');
        numberBathroomsDiv.textContent = place.number_bathrooms + ' Bathroom';

        informationDiv.appendChild(maxGuestDiv);
        informationDiv.appendChild(numberRoomsDiv);
        informationDiv.appendChild(numberBathroomsDiv);

        article.appendChild(informationDiv);


        if (place.user) {
            var userDiv = document.createElement('div');
            userDiv.classList.add('user');
            var ownerText = document.createElement('b');
            ownerText.textContent = 'Owner:';
            userDiv.appendChild(ownerText);
            var ownerName = document.createTextNode(' ' + place.user.first_name + ' ' + place.user.last_name);
            userDiv.appendChild(ownerName);
            article.appendChild(userDiv);
        } else {
            var userDiv = document.createElement('div');
            userDiv.classList.add('user');
            userDiv.textContent = 'Owner: Unknown';
            article.appendChild(userDiv);
        }

        var descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('description');
        descriptionDiv.innerHTML = place.description;
        article.appendChild(descriptionDiv);

        placesSection.appendChild(article);
    });
}
