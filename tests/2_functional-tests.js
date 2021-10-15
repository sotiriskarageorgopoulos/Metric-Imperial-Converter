const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test("Convert a valid input such as 10L with GET request to /api/convert", () => {
    chai
      .request(server)
      .get('/api/convert?input=10gal')
      .end((err, res) => {
        let result = {
          initNum: 10,
          initUnit: "gal",
          returnNum: 37.8541,
          returnUnit: "L",
          string: "10 gallons converts to 37.8541 liters"
        }
        assert.equal(res.status, 200, 'Response status should be 200')
        assert.deepEqual(JSON.parse(res.body), result, 'The JSON must be valid')
      })
  })

  test("Convert an invalid input such as 32g with GET request to /api/convert.", () => {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end((err, res) => {
        assert.equal(res.status, 500, "Invalid unit")
      })
  })

  test("Convert an invalid number such as 3/7.2/4kg with GET request to /api/convert", () => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end((err, res) => {
        assert.equal(res.status, 500, "Invalid Number")
      })
  })

  test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram with GET request to /api/convert.", () => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end((err, res) => {
        assert.equal(res.status, 500, "Invalid number and unit")
      })
  })

  test("Convert with no number such as kg: GET request to /api/convert.", () => {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end((err, res) => {
        let result = {
          initNum: 1,
          initUnit: "kg",
          returnNum: 2.2046244201837775,
          returnUnit: "lbs",
          string: "1 kilograms converts to 2.2046244201837775 libras"
        }
        assert.equal(res.status, 200, "Response status should be 200")
        assert.deepEqual(JSON.parse(res.body), result, "The JSON must be valid")
      })
  })
});