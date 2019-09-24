'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const InfectedNotification = use('App/Models/InfectedNotification');
const Survivor = use('App/Models/Survivor');

/**
 * Resourceful controller for interacting with infectednotifications
 */
class InfectedNotificationController {
  /**
   * Show a list of all infectednotifications.
   * GET infectednotifications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new infectednotification.
   * GET infectednotifications/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new infectednotification.
   * POST infectednotifications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { from_survivor_id, to_survivor_id } = request.only(['from_survivor_id', 'to_survivor_id']);

    let message;

    if (from_survivor_id != to_survivor_id) {
      let fromSurvivor = await Survivor.find(from_survivor_id);
      let toSurvivor = await Survivor.find(to_survivor_id);

      if (fromSurvivor && toSurvivor) {
        const notification = await InfectedNotification.query().where('from_survivor_id', from_survivor_id).where('to_survivor_id', to_survivor_id).first();
        if (!notification) {
          const result = await InfectedNotification.create({
            from_survivor_id: from_survivor_id,
            to_survivor_id: to_survivor_id
          });
          const countNotification = await InfectedNotification.query().where('to_survivor_id', to_survivor_id).getCount();
          if(countNotification >= 3) {
            await Survivor.query().where('id', to_survivor_id).update({
              infected: true
            });
          }
        } else {
          message = `${fromSurvivor.name} already notified that ${toSurvivor.name} is infected`;
        }
      } else {
        if (!from_survivor_id && !toSurvivor)
          message = "There's no survivor";
        else if (!from_survivor_id)
          message = "The survivor that is notifying not exist";
        else if (!to_survivor_id)
          message = "The survivor that is notificated as infected not exist";
      }

    } else {
      message = "The survivor can't declared himself as infected";
    }

    return message;
  }

  /**
   * Display a single infectednotification.
   * GET infectednotifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing infectednotification.
   * GET infectednotifications/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update infectednotification details.
   * PUT or PATCH infectednotifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a infectednotification with id.
   * DELETE infectednotifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = InfectedNotificationController
