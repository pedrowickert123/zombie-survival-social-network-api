'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Survivor extends Model {

    static formatSurvivorInventory(inventory, survivor_id = null) {
        // Remove items that is not in trade items accepted or add survivor_id in each item
        for (let i = 0; i < inventory.length; i++) {
            if (['Water', 'Food', 'Medication', 'Ammunition'].indexOf(inventory[i].item) == -1) {
                inventory.splice(i, 1);
                i--;
            } else {
                inventory[i].survivor_id = survivor_id;
            }
        }

        // Add items with quantity 0 if is not in trade items accepted
        if(!inventory.find(element => element.item == 'Water')) inventory.push({item: 'Water', quantity: 0, survivor_id: survivor_id});
        if(!inventory.find(element => element.item == 'Food')) inventory.push({item: 'Food', quantity: 0, survivor_id: survivor_id});
        if(!inventory.find(element => element.item == 'Medication')) inventory.push({item: 'Medication', quantity: 0, survivor_id: survivor_id});
        if(!inventory.find(element => element.item == 'Ammunition')) inventory.push({item: 'Ammunition', quantity: 0, survivor_id: survivor_id});

        return inventory;
    }

}

module.exports = Survivor