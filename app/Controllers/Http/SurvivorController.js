'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Survivor = use('App/Models/Survivor');
const Inventory = use('App/Models/Inventory');

/**
 * Resourceful controller for interacting with survivors
 */
class SurvivorController {
  /**
   * Show a list of all survivors.
   * GET survivors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new survivor.
   * GET survivors/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {

  }

  /**
   * Create/save a new survivor.
   * POST survivors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
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

  /**
   * Display a single survivor.
   * GET survivors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing survivor.
   * GET survivors/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update survivor details.
   * PUT or PATCH survivors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a survivor with id.
   * DELETE survivors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = SurvivorController
