'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Survivor = use('App/Models/Survivor');
const Trade = use('App/Models/Trade');
const Inventory = use('App/Models/Inventory');

/**
 * Resourceful controller for interacting with trades
 */
class TradeController {
  /**
   * Show a list of all trades.
   * GET trades
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new trade.
   * GET trades/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new trade.
   * POST trades
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
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

  /**
   * Display a single trade.
   * GET trades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing trade.
   * GET trades/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update trade details.
   * PUT or PATCH trades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a trade with id.
   * DELETE trades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = TradeController
