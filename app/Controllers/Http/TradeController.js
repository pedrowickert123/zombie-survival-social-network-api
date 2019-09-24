'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Survivor = use('App/Models/Survivor');
const Trade = use('App/Models/Trade');
const Inventory = use('App/Models/Inventory');

class TradeController {
  
  async store({ request, response }) {
    const { from, to } = request.only(['from', 'to']);

    const fromSurvivor = await Survivor.query().where('id', from.survivor_id).first();
    const toSurvivor = await Survivor.query().where('id', to.survivor_id).first();

    if (!fromSurvivor.infected && !toSurvivor.infected) {

      let validateFromSurvivor = await Trade.validateSurvivorInventory(from, fromSurvivor);
      let validateToSurvivor = await Trade.validateSurvivorInventory(to, toSurvivor);
      if(validateFromSurvivor != true) {
        return validateFromSurvivor;
      } else if(validateToSurvivor != true) {
        return validateToSurvivor;
      }

      let fromPoints = await Trade.countItemsPoints(from);
      let toPoints = await Trade.countItemsPoints(to);
      
      if(fromPoints == toPoints) {
        let fromSurvivorInventory = await Trade.formatInventory(from, to);
        let toSurvivorInventory = await Trade.formatInventory(to, from);

        await Inventory.query().where('survivor_id', from.survivor_id).delete();
        await Inventory.query().where('survivor_id', to.survivor_id).delete();

        for (let i = 0; i < fromSurvivorInventory.length; i++) {
          await Inventory.create({
            item: fromSurvivorInventory[i].item,
            quantity: fromSurvivorInventory[i].quantity,
            survivor_id: from.survivor_id,
          });
        }

        for (let i = 0; i < toSurvivorInventory.length; i++) {
          await Inventory.create({
            item: toSurvivorInventory[i].item,
            quantity: toSurvivorInventory[i].quantity,
            survivor_id: to.survivor_id,
          });
        }

        return `Trade succesfully`;
      } else {
        return `The trade can't be occur because the points is not equals`;        
      }

    } else {
      if (!fromSurvivor.infected && !toSurvivor.infected) {
        return `The trade can't occur because ${fromSurvivor.name} and ${fromSurvivor.name} are infected`;
      } else if (!fromSurvivor.infected) {
        return `The trade can't occur because ${fromSurvivor.name} is infected`;
      } else if (!fromSurvivor.infected) {
        return `The trade can't occur because ${toSurvivor.name} is infected`;
      }
    }
  }

}

module.exports = TradeController
