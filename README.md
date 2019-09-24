# Zombie Survival Social Network Api

## Installation
* `git clone https://github.com/pedrowickert123/zombie-survival-social-network-api.git` git clone repository
* `cd zombie-survival-social-network-api` change working directory to root project folder
```js
npm i -g @adonisjs/cli
``` 
to install Adonisjs
* `npm install` 
to install dependencies
* Edit *./env.test* and rename *./env.example* to *./env* with MySQL configurations
```js
adonis key:generate
``` 
to generate a key for the api
```js
adonis migration:run
``` 
to run initial database migration

## Run
```js
adonis serve
``` 
to run, or
```js
adonis serve --dev
``` 
to run and observable the files changed

## Tests
Execute unit tests
```js
adonis test
``` 

## API Documentation
### Survivor
```js
POST /survivor/store

* Example
{
	name: "Survivor 1",
	age: 30,
	gender: "MALE",
	inventory : [{
		item: "Water",
		quantity: 40
	}, {
		"item": "Food",
		"quantity": 32
	}, {
		"item": "Medication",
		"quantity": 5
	}, {
		"item": "Ammunition",
		"quantity": 12
	}]
}
```

### Infected Notification
```js
POST /infected-notification/store

* Example
{
	"from_survivor_id": 5,
	"to_survivor_id": 8
}
```

### Trade
```js
POST /trade/store

* Example
{
	"from": {
		"survivor_id": 1,
		"items": [{
			"item": "Water",
			"quantity": 1
		}, {
			"item": "Medication",
			"quantity": 1
		}]
	},
	"to": {
		"survivor_id": 2,
		"items": [{
			"item": "Ammunition",
			"quantity": 6
		}]
	}
}
```

### Reports

#### Infected
```js
GET /report/infected
```
#### Non-Infected
```js
GET /report/infected
```
#### Average
```js
GET /report/average
```
#### Average
```js
GET /report/points-lost
```
