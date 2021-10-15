'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  app.route("/api/convert").get((req, res) => {
    let convertHandler = new ConvertHandler()
    let input = req.query.input
    let initNum = convertHandler.getNum(input)
    let initUnit = convertHandler.getUnit(input)
    let returnedNum = convertHandler.convert(initNum, initUnit)
    let returnedUnit = convertHandler.getReturnUnit(initUnit)
    let result = convertHandler.getString(initNum, initUnit, returnedNum, returnedUnit)
    res.json(result)
  })
};