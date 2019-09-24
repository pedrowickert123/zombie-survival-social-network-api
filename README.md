# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

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
* Edit *./env.test* and *./env.example* with MySQL configurations
```js
adonis migration:run
``` 
to run initial database migration

## Run
```js
adonis serve
``` 
to run
Or
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
### Authentication
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