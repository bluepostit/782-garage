import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["carsList"]

  connect() {
    console.log("hello from garage controller!")

    // fetch - url
    // parse JSON
    // find all cars. iterate:
    //   get name, brand, owner, plate
    //   add to target: HTML snippet containing this info

    this.garageId = 'best-cars';
    const url = `https://wagon-garage-api.herokuapp.com/${this.garageId}/cars`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        data.forEach((car) => {
          console.log(car.brand, car.model, car.plate, car.owner);
          this.insertCarIntoList(car);
        })
      });
  }

  createCar(event) {
    // fetch url:
    // method: POST
    // needs a header
    // needs a body
    // body: JSON object:
    //  - brand, model, owner, plate
    // get this info from the form (targets)
    event.preventDefault();

    const url = `https://wagon-garage-api.herokuapp.com/${this.garageId}/cars`;

    const form = event.currentTarget;
    const bodyValue = Object.fromEntries(new FormData(form));

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyValue)
    }).then(response => response.json())
      .then(data => {
        // clear the form!
        form.reset();
        this.insertCarIntoList(data);
      });
  }

  buildCarHtml(car) {
    const html = `
      <div class="car">
        <div class="car-image">
          <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
        </div>
        <div class="car-info">
          <h4>${car.brand} ${car.model}</h4>
          <p><strong>Owner:</strong> ${car.owner}</p>
          <p><strong>Plate:</strong> ${car.plate}</p>
        </div>
      </div>
      `;
    return html;
  }

  insertCarIntoList(car) {
    const html = this.buildCarHtml(car);
    this.carsListTarget.insertAdjacentHTML('beforeend', html);
  }
}
