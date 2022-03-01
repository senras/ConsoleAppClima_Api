const { default: axios } = require('axios');

class Busquedas {
  historial = ['Tegucigalpa', 'Madrid', 'San jose'];

  constructor() {
    // TODO: leer DB si existe
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY || '',
      limit: 5,
      language: 'es',
    };
  }
  async ciudad(lugar = '') {
    //peticion http
    // console.log("ciudad", lugar);
    const instance = axios.create({
      baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
      params: this.paramsMapbox,
    });
    const resp = await instance.get();
    return resp.data.features.map((lugar) => ({
      id: lugar.id,
      nombre: lugar.place_name,
      lng: lugar.center[0],
      lat: lugar.center[1],
    }));
  }

  get paramsOpenweather() {
    return {
      appid: process.env.OPENWEATHER_KEY || '',
      units: 'metric',
      language: 'es',
    };
  }

  async climaLugar(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
          appid: process.env.OPENWEATHER_KEY || '',
          units: 'metric',
          language: 'es',
          lat,
          lon,
        },
        // params: { ...this.paramsOpenweather, lat, lon },
      });
      const resp = await instance.get();
      const { weather, main } = resp.data;
      return {
        desc: weather.description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Busquedas;
