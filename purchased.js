const moment = require ('moment');

module.exports = {
    totalcash: 95,
    purchases: [
        {
        "id": 1,
        "item": "Corn chips",
        "cost": 65,
        "time": moment('2017-06-06 5:45:12').format('MM/DD/YYYY h:mm a')
    },
    {
        "id": 2,
        "description": "Gum",
        "cost": 35,
        "time": moment('2017-06-06 5:45:12').format('MM/DD/YYYY h:mm a')
    }
    ]
}