'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InventorySchema extends Schema {
  up () {
    this.create('infected_notifications', (table) => {
      table.increments()
      table.integer('from_survivor_id').notNullable().unsigned()
      table.foreign('from_survivor_id').references('survivors.id')
      table.integer('to_survivor_id').notNullable().unsigned()
      table.foreign('to_survivor_id').references('survivors.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('infected_notifications')
  }
}

module.exports = InventorySchema