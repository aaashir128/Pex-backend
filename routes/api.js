var express = require('express')
var router = express.Router()

require('../controllers/api/user')(router)
require('../controllers/api/wallet')(router)
require('../controllers/api/deposit')(router)
require('../controllers/api/active_trade')(router)
require('../controllers/api/trade_history')(router)
require('../controllers/api/notification')(router)


module.exports = router