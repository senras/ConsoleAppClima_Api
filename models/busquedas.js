const { default: axios } = require("axios");

class Busquedas {
  historial = ["Tegucigalpa", "Madrid", "San jose"];

  constructor() {
    // TODO: leer DB si existe
  }

  async ciudad(lugar = "") {
    //peticion http
    // console.log("ciudad", lugar);
    const resp = await axios.get(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/wakay.json?types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1Ijoic2VucmFzIiwiYSI6ImNsMDVndWhhOTAydDIzY256cHl4Y2hmZzQifQ.nY7YL6mkOCm8Pbi5kYfE3w"
    );
    console.log(resp.data);
    return [];
  }
}

module.exports = Busquedas;
