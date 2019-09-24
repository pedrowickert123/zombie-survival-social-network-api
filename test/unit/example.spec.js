'use strict'

const { test, trait } = use('Test/Suite')('Test')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Survivor = use('App/Models/Survivor')
const Inventory = use('App/Models/Inventory')

trait('Test/ApiClient');

test('Create survivors', async ({ assert, client }) => {
  const gender = ["MALE", "FEMALE"];
  const response = await client.post('survivor/store').send({
    name: `Survivor ${Math.floor(Math.random() * (Math.floor(80) - Math.ceil(1))) + Math.ceil(1)}`,
    age: Math.floor(Math.random() * (Math.floor(80) - Math.ceil(1))) + Math.ceil(1),
    gender: gender[Math.floor(Math.random() * (Math.floor(1) - Math.ceil(0))) + Math.ceil(0)],
    inventory: [{
      item: "Water",
      quantity: Math.floor(Math.random() * (Math.floor(50) - Math.ceil(0))) + Math.ceil(0)
    }, {
      item: "Food",
      quantity: Math.floor(Math.random() * (Math.floor(50) - Math.ceil(0))) + Math.ceil(0)
    }, {
      item: "Medication",
      quantity: Math.floor(Math.random() * (Math.floor(50) - Math.ceil(0))) + Math.ceil(0)
    }, {
      item: "Ammunition",
      quantity: Math.floor(Math.random() * (Math.floor(50) - Math.ceil(0))) + Math.ceil(0)
    }]
  }).end();
});

test('Infected Notification', async ({ assert, client }) => {
  const response = await client.post('infected-notification/store').send({
    "from_survivor_id": Math.floor(Math.random() * (Math.floor(15) - Math.ceil(1))) + Math.ceil(1),
    "to_survivor_id": Math.floor(Math.random() * (Math.floor(15) - Math.ceil(1))) + Math.ceil(1)
  }).end();
});

test('Trade', async ({ assert, client }) => {
  const response = await client.post('trade/store').send({
    "from": {
      "survivor_id": Math.floor(Math.random() * (Math.floor(15) - Math.ceil(1))) + Math.ceil(1),
      "items": [{
        item: "Water",
        quantity: Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0))) + Math.ceil(0)
      }, {
        item: "Food",
        quantity: Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0))) + Math.ceil(0)
      }, {
        item: "Medication",
        quantity: Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0))) + Math.ceil(0)
      }, {
        item: "Ammunition",
        quantity: Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0))) + Math.ceil(0)
      }]
    },
    "to": {
      "survivor_id": Math.floor(Math.random() * (Math.floor(15) - Math.ceil(1))) + Math.ceil(1),
      "items": [{
        item: "Water",
        quantity: Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0))) + Math.ceil(0)
      }, {
        item: "Food",
        quantity: Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0))) + Math.ceil(0)
      }, {
        item: "Medication",
        quantity: Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0))) + Math.ceil(0)
      }, {
        item: "Ammunition",
        quantity: Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0))) + Math.ceil(0)
      }]
    }
  }).end();
});

test('Report Infected', async ({ assert, client }) => {
  await client.get('report/infected').send().end();
});

test('Report Non-Infected', async ({ assert, client }) => {
  await client.get('report/infected').send().end();
});

test('Report Average', async ({ assert, client }) => {
  await client.get('report/infected').send().end();
});

test('Report Points Lost', async ({ assert, client }) => {
  await client.get('report/infected').send().end();
});