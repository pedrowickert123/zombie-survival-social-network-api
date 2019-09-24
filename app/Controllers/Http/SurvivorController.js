'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Survivor = use('App/Models/Survivor');
const Inventory = use('App/Models/Inventory');

class SurvivorController {

  async store({ request }) {
    const survivorData = request.only(['name', 'age', 'gender', 'latitude', 'longitude']);
    const { inventory } = request.only(['inventory']);

    const survivor = await Survivor.create({ name: survivorData.name, age: survivorData.age, gender: survivorData.gender });

    const inventoryFormated = Survivor.formatSurvivorInventory(inventory, survivor.id);

    for(let i = 0; i < inventoryFormated.length; i++) {
      await Inventory.create({
        item: inventory[i].item,
        quantity: inventory[i].quantity,
        survivor_id: survivor.id,
      });
    };

    return survivor;
  }

}

module.exports = SurvivorController
