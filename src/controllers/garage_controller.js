import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["carsList"]

  connect() {
    console.log("hello from garage controller!")
  }
}
