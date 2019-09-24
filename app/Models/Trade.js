'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Inventory = use('App/Models/Inventory')


class Trade extends Model {
    static async countItemsPoints(survivorRequest) {
        let water = survivorRequest.items.find(element => element.item == 'Water');
        let food = survivorRequest.items.find(element => element.item == 'Food');
        let medication = survivorRequest.items.find(element => element.item == 'Medication');
        let ammunition = survivorRequest.items.find(element => element.item == 'Ammunition');

        let points = 0;

        if (water) {
            points += (water.quantity * 4);
        }
        if (food) {
            points += (food.quantity * 3);
        }
        if (medication) {
            points += (medication.quantity * 2);
        }
        if (ammunition) {
            points += ammunition.quantity;
        }

        return points;
    }

    static async validateSurvivorInventory(survivorRequest, survivor) {
        let water = survivorRequest.items.find(element => element.item == 'Water');
        let food = survivorRequest.items.find(element => element.item == 'Food');
        let medication = survivorRequest.items.find(element => element.item == 'Medication');
        let ammunition = survivorRequest.items.find(element => element.item == 'Ammunition');

        if (water) {
            let { quantity } = await Inventory.query().where('item', 'Water').where('survivor_id', survivor.id).first();
            if (quantity < water.quantity) {
                return `${survivor} has no all Water that he is tranding`;
            }
        }
        if (food) {
            let { quantity } = await Inventory.query().where('item', 'Food').where('survivor_id', survivor.id).first();
            if (quantity < food.quantity) {
                return `${survivor.name} has no all Food that he is tranding`;
            }
        }
        if (medication) {
            let { quantity } = await Inventory.query().where('item', 'Medication').where('survivor_id', survivor.id).first();
            if (quantity < medication.quantity) {
                return `${survivor.name} has no all Medication that he is tranding`;
            }
        }
        if (ammunition) {
            let { quantity } = await Inventory.query().where('item', 'Ammunition').where('survivor_id', survivor.id).first();
            if (quantity < ammunition.quantity) {
                return `${survivor.name} has no all Ammunition that he is tranding`;
            }
        }

        return true;
    }

    static async formatInventory(fromSurvivorRequest, toSurvivorRequest) {
        let fromSurvivorInventory = await Inventory.query().where('survivor_id', fromSurvivorRequest.survivor_id).fetch();
        fromSurvivorInventory = fromSurvivorInventory.toJSON();
        
        for (let i = 0; i < fromSurvivorInventory.length; i++) {
            for (let a = 0; a < fromSurvivorRequest.items.length; a++) {
                if (fromSurvivorInventory[i].item == fromSurvivorRequest.items[a].item) {
                    fromSurvivorInventory[i].quantity = fromSurvivorInventory[i].quantity - fromSurvivorRequest.items[a].quantity;
                }
            }
            for (let b = 0; b < toSurvivorRequest.items.length; b++) {
                if (fromSurvivorInventory[i].item == toSurvivorRequest.items[b].item) {
                    fromSurvivorInventory[i].quantity = fromSurvivorInventory[i].quantity + toSurvivorRequest.items[b].quantity;
                }
            }
        }

        return fromSurvivorInventory;
    }
}

module.exports = Trade
