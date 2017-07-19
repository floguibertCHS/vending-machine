const request = require('supertest');
const assert = require("assert");
const bodyParser = require("body-parser");

const application = require("./app");

describe('GET /api/customer/items', function () {
  it("returns list of current items with cost and quantity", function (done) {
    request(application)
    .get('/api/customer/items')
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(response => {
        assert.deepEqual(response.body, {
          "status": "success",
          "data": [
        {
          "id": 1,
          "description": "Corn chips",
          "cost": 65,
          "quantity": 4
        },
        {
          "id": 2,
          "description": "Gum",
          "cost": 35,
          "quantity": 10
        },
        {
          "id": 3,
          "description": "Oreo",
          "cost": 55,
          "quantity": 8
        },
        {
          "id": 4,
          "description": "MMs",
          "cost": 25,
          "quantity": 15
        }]   
      });
    })
    .end(done);
  });
});

describe('POST /api/customer/items/:itemId/purchases', function () {
  it("returns fails when not enough money is given", function (done) {
    request(application)
    .post('/api/customer/items/:itemId/purchases')
    .send({id: 1, cost: 65, quantity: 1, money_given: 55})
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(response => {
        assert.deepEqual(response.body, {
          "status": "fail",
          "data": 
          {
            "money_given": 55,
            "money_required": 65
          } 
        });
      })
    .end(done)
  });
});

describe('GET /api/vendor/purchases', function () {
  it("returns list of all purchases with item and date/time", function (done) {
    request(application)
    .get('/api/vendor/purchases')
    .expect(200)
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(response => {
        assert.deepEqual(response.body, {
          "status": "success",
          "data": [
        {
            "id": 1,
            "item": "Corn chips",
            "cost": 65,
            "time": '06/06/2017 5:45 am'
        },
        {
            "id": 2,
            "description": "Gum",
            "cost": 35,
            "time": '06/06/2017 5:45 am'
        }
        ]  
      });
    })
    .end(done);
  });
});

describe('GET /api/vendor/money', function () {
it(' should get total amount of money accepted by the machine', (done) => {
    request(application)
      .get('/api/vendor/money')
      .expect(200)
      .expect(response => {
        assert.deepEqual(response.body, {
          "status": "success",
          "data": 95
        });
      })
    .end(done);
  });
});

describe('POST /api/vendor/items', function () {
it('should return new item', (done) => {
    request(application)
      .post('/api/vendor/items')
      .expect(200)
      .send({"id": 4, "description": "Gatorade", "cost": 25, "quantity": 5 })
      .expect(response => {
        assert.deepEqual(response.body, {
          "status": "success",
          "data":
          {
            "id": 4,
            "description": "Gatorade",
            "cost": 25,
            "quantity": 5
          }
        });
      })
      .end(done);
  });
});

describe('PUT api/vendor/items/:itemId', function () {
  it('should return updated item', (done) => {
    request(application)
      .put('/api/vendor/items/:itemId')
      .expect(200)
      .send({"id": 4, "description": "candy", "cost": 25, "quantity": 1 })
      .expect(response => {
        assert.deepEqual(response.body, {
          "status": "success",
          "data": 
            {
              "id": 4,
              "description": "candy",
              "cost": 25,
              "quantity": 1
            }
        });
      })
      .end(done);
  });
});