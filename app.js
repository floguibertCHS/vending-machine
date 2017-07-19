const express = require ('express');
const moment = require ('moment');
const data = require('./data.js');
const purchased = require('./purchased.js');
const bodyParser = require('body-parser');

const application = express();

application.use(bodyParser.json());

////////////   API  ROUTES   /////////////////
///GET /api/customer/items - get a list of items//
application.get('/api/customer/items', function (request, response){
    var model = {
        status: 'success',
        data: data.data
    }
        response.json(model);
});
///POST /api/customer/items/:itemId/purchases - purchase an item
application.post('/api/customer/items/:itemId/purchases', function (request, response){
    var item = request.body
    var quantity = request.body.quantity;
    var money_given = request.body.money_given;
    var money_required = request.body.cost * request.body.quantity;
    var change = money_given - money_required;
    var model = {}
    if (item.quantity === 0) {
      var model = {
        status: "fail",
        data: "out of stock"
      }
    } else {
      if (change < 0) {
        var model = {
          status: "fail",
          data: {
            money_given: money_given,
            money_required: money_required
          } 
        }
      }
      if (change >= 0) {
        var model = {
          status: "success",
          data: {
            money_given: money_given,
            money_required: money_required,
            change: change
          }
        }
      }
    }
    response.json(model);
  });
///GET /api/vendor/purchases - get a list of all purchases with their item and date/timea
application.get('/api/vendor/purchases', function (request, response){
    var model = {
            status: 'success',
            data: purchased.purchases
        }
            response.json(model);
    });
///GET /api/vendor/money - get a total amount of money accepted by the machine
application.get('/api/vendor/money', function (request, response){
    var model = {
            status: 'success',
            data: purchased.totalcash
        }
            response.json(model);
    });
//POST /api/vendor/items - add a new item not previously existing in the machine
application.post('/api/vendor/items', function (request, response){
    var newitem = request.body;
    data.data.push(newitem);
    var model = {
      status: "success",
      data: newitem
    }
    response.json(model);
  });
///PUT /api/vendor/items/:itemId - update item quantity, description, and cost
application.put('/api/vendor/items/:itemId', function (request, response){
    function findItem(item) {
        return item.id === request.body.id;
    }
        var item = data.data.find(findItem);
        item.quantity = request.body.quantity;
        item.description = request.body.description;
        item.cost = request.body.cost;
    var model = {
      status: "success",
      data: item
    }
    response.json(model);
  });

application.listen(3000);

module.exports = application;
