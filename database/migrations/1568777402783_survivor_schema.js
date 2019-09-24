'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SurvivorSchema extends Schema {
  up() {
    this.create('survivors', (table) => {
      table.increments()
      table.string('name', 255).notNullable()
      table.integer('age').notNullable()
      table.string('gender', 20).notNullable()
      table.string('latitude', 50).notNullable()
      table.string('logintude', 50).notNullable()
      table.boolean('infected').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('survivors')
  }
}

module.exports = SurvivorSchema
