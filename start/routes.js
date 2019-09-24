'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/survivor/store', 'SurvivorController.store');
Route.post('/infected-notification/store', 'InfectedNotificationController.store');
Route.post('/trade/store', 'TradeController.store');
Route.get('/report/infected', 'ReportController.infected');
Route.get('/report/non-infected', 'ReportController.nonInfected');
Route.get('/report/average', 'ReportController.average');
Route.get('/report/points-lost', 'ReportController.pointsLostByInfected');