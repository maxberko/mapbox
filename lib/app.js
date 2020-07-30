// TODO: Write your JS code in here
import mapboxgl from 'mapbox-gl';

const privateToken = "sk.eyJ1IjoibGFiZXJrcyIsImEiOiJja2Q4bHY2a2UwMnJrMnlyeGZpZGprZWVwIn0.6FmYsVnwmY7JqCOI54o7gg";
const publicToken = "pk.eyJ1IjoibGFiZXJrcyIsImEiOiJja2QwODJ6Y3gwcjBlMnRwZ3Z4ZTlmYTN2In0.6RJpoWsH06lI7Jr1QeM5tw";
const submit = document.querySelector("#submit");
const form = document.querySelector("#form");
const resultBody = document.querySelector("#result-body");

mapboxgl.accessToken = `${publicToken}`;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  center: [5.37639, 43.29667],
  zoom: 6
});

const fetchAdress = (query) => {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${privateToken}`)
    .then(response => response.json())
    .then((data) => {
      data.features.forEach((feature) => {
        console.log(feature);
        // console.log(feature.geometry.coordinates[0]);
        // console.log(feature.geometry.coordinates[1]);
        const place = `<tr id="place" class="mb-4">
        <td id="place_name" class="py-2 px-2">${feature.place_name}</td>
        <td id="place_coordinate_0" class ="py-2 px-2">${feature.geometry.coordinates[0]}, ${feature.geometry.coordinates[1]}</td></tr>`;
        resultBody.insertAdjacentHTML("afterbegin", place);
        new mapboxgl.Marker()
          .setLngLat([`${feature.geometry.coordinates[0]}`, `${feature.geometry.coordinates[1]}`])
          .addTo(map);
      });
    });
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector("#input");
  fetchAdress(input.value);
});
