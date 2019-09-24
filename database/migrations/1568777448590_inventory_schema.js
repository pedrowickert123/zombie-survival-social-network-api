'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InventorySchema extends Schema {
  up () {
    this.create('inventories', (table) => {
      table.increments()
      table.string('item', 255).notNullable()
      table.integer('quantity').notNullable()
      table.integer('survivor_id').notNullable().unsigned()
      table.foreign('survivor_id').references('survivors.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('inventories')
  }
}

module.exports = InventorySchema
