'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Survivor = use('App/Models/Survivor')
const Inventory = use('App/Models/Inventory')

class ReportController {

  async infected ({ request, response, view }) {
    const allSurvivors = await Survivor.getCount();
    const survivorsInfected = await Survivor.query().where('infected', 1).getCount();

    if(survivorsInfected != 0) {
      return `There are ${(survivorsInfected * 100) / allSurvivors}% survivors infected`;
    } else {
      return `There're 0% survivors infected`;
    }
    
  }

  async nonInfected ({ request, response, view }) {
    const allSurvivors = await Survivor.getCount();
    const survivorsNonInfected = await Survivor.query().where('infected', 0).getCount();
    
    return `There're ${(survivorsNonInfected * 100) / allSurvivors}% survivors non-infected`;
  }

  async average ({ request, response, view }) {
    const allSurvivors = await Survivor.getCount();
    const water = JSON.parse(JSON.stringify(await Inventory.query().where('item', 'Water').sum('quantity AS quantity')));
    const food = JSON.parse(JSON.stringify(await Inventory.query().where('item', 'Food').sum('quantity AS quantity')));
    const medication = JSON.parse(JSON.stringify(await Inventory.query().where('item', 'Medication').sum('quantity AS quantity')));
    const ammunition = JSON.parse(JSON.stringify(await Inventory.query().where('item', 'Ammunition').sum('quantity AS quantity')));

    return `There're ${water[0].quantity / allSurvivors}, ${food[0].quantity / allSurvivors}, ${medication[0].quantity / allSurvivors}, ${ammunition[0].quantity / allSurvivors} per survivor`;
  }

  async pointsLostByInfected ({ request, response, view }) {
    const water = await Inventory.query().leftJoin('survivors', 'inventories.survivor_id', 'survivors.id').where('survivors.infected', 1).where('inventories.item', 'Water').sum('inventories.quantity AS quantity');
    const food = JSON.parse(JSON.stringify(await Inventory.query().leftJoin('survivors', 'inventories.survivor_id', 'survivors.id').where('survivors.infected', 1).where('item', 'Food').sum('quantity AS quantity')));
    const medication = JSON.parse(JSON.stringify(await Inventory.query().leftJoin('survivors', 'inventories.survivor_id', 'survivors.id').where('survivors.infected', 1).where('item', 'Medication').sum('quantity AS quantity')));
    const ammunition = JSON.parse(JSON.stringify(await Inventory.query().leftJoin('survivors', 'inventories.survivor_id', 'survivors.id').where('survivors.infected', 1).where('item', 'Ammunition').sum('quantity AS quantity')));
    

    water[0].quantity = (!water[0].quantity) ? 0 : water[0].quantity;
    food[0].quantity = (!food[0].quantity) ? 0 : food[0].quantity;
    medication[0].quantity = (!medication[0].quantity) ? 0 : medication[0].quantity;
    ammunition[0].quantity = (!ammunition[0].quantity) ? 0 : ammunition[0].quantity;

    let points = 0;
    
    points += (water[0].quantity * 4);
    points += (food[0].quantity * 3);
    points += (medication[0].quantity * 2);
    points += (ammunition[0].quantity * 1);

    return `${points} points lost by infected survivors`;
  }

}

module.exports = ReportController
