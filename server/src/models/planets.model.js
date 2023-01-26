const fs = require('fs');
const path = require('path')
const { parse } = require('csv-parse');

const planets = require('./planets.mongo');


//filter the planets that could be habitable from the file kepler_data.csv by some critirias 
//Criteria: light and size compared to earth
function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 //how much light it get compared to earth
    && planet['koi_prad'] < 1.6; // size compared to earth
  }
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, '..', '..', 'data','kepler_data.csv'))
    // pipe is meant to connect a readeble stream source to a writeble stream destination
    .pipe(parse({
      comment: '#', //all the lines that start with # will be considered comments
      columns: true,
    })) 
    .on('data', async (data) => {
      if(isHabitablePlanet(data)) { //if the planet matches the critiria from the function above push it in the arrat of habitable planets
        savePlanet(data);
      }
    })
    .on('error', (err) => { //if the file cant be read show the error
      console.log(err);
      reject(err);
    })
    .on('end', async () => {
      const countPlanetsFound = (await getAllPlanets()).length;
      console.log(`${countPlanetsFound} habitable planets found`);
      resolve();
    });
  });
}

async function getAllPlanets(){
  return await planets.find({}, {
    '__v': 0, '_id' :0,
  });
  // return habitablePlanets;
}

async function savePlanet(planet){
  try {
    await planets.updateOne({
      keplerName: planet.kepler_name,
    }, {
      keplerName: planet.kepler_name,
    }, {
      upsert: true,
    });
  } catch (err){
    console.error(`Could not save a planet ${err}`)
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
}