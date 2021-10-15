const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  suite('Testing the number input', () => {
    test('should correctly read a whole number input', () => {
      assert.typeOf(convertHandler.getNum("4gal"), "number", "4 is type number")
      assert.strictEqual(4, convertHandler.getNum("4gal"), "4 === 4")
      assert.notStrictEqual("4", convertHandler.getNum("4gal"), "'4' !== 4")
    })

    test('should correctly read a decimal number input', () => {
      assert.typeOf(convertHandler.getNum("4.5lbs"), "number", "4.5 is type number")
      assert.strictEqual(4.5, convertHandler.getNum("4.5lbs"), "4.5 === 4.5")
      assert.notStrictEqual('4.5', convertHandler.getNum("4.5lbs"), "4.5 !== 4.5")
    })
  })

  test('should correctly read a fractional input', () => {
    assert.typeOf(convertHandler.getNum("1/2km"), "number", "1/2 is type number")
    assert.strictEqual(0.5, convertHandler.getNum("1/2km"), "1/2 === 0.5")
    assert.notStrictEqual('0.5', convertHandler.getNum("1/2km", "'0.5' !== 1/2"))
  })

  test('should correctly read a fractional input with a decimal.', () => {
    assert.typeOf(convertHandler.getNum("5.4/3lbs"), "number", "5.4/3 is type number")
    assert.strictEqual(5.4 / 3, convertHandler.getNum("5.4/3lbs"), "5.4/3 === 5.4/3")
    assert.notStrictEqual('5.4/3', convertHandler.getNum("5.4/3lbs"), "'5.4/3' !== 5.4/3")

    assert.typeOf(convertHandler.getNum("3/5.4lbs"), "number", "3/5.4 is type number")
    assert.strictEqual(3 / 5.4, convertHandler.getNum("3/5.4lbs"), "3/5.4 === 3/5.4")
    assert.notStrictEqual('3/5.4', convertHandler.getNum("3/5.4lbs"), "'3/5.4' !== 3/5.4")
  })

  test('should correctly return an error on a double-fraction (i.e. 3/2/3)', () => {
    assert.throws(() => {
      convertHandler.getNum("3/2/3km")
    }, "Error: double-fraction")
  })

  test('should correctly default to a numerical input of 1 when no numerical input is provided', () => {
    assert.strictEqual(1, convertHandler.getNum(undefined), "Undefined input has result 1")
    assert.strictEqual(1, convertHandler.getNum(null), "Null input has result 1")
    assert.strictEqual(1, convertHandler.getNum("akjdkajd"), "A no numerical input has result 1")
    assert.strictEqual(1, convertHandler.getNum(""), "An empty string has result 1")
    assert.strictEqual(1, convertHandler.getNum("kal/.akka"), "A string with / and . has result 1")
    assert.strictEqual(1, convertHandler.getNum("d/sk"), "A string with / has result 1")
    assert.strictEqual(1, convertHandler.getNum("a.sk"), "A string with . has result 1")
    assert.notEqual(1, convertHandler.getNum("1/2km"), "A numerical input does not have result 1")
  })

  suite('Testing the units', () => {
    test('should correctly read each valid input unit', () => {
      assert.strictEqual("gal", convertHandler.getUnit("1.2gal"), "gal is valid unit")
      assert.strictEqual("L", convertHandler.getUnit("3L"), "L is valid unit")
      assert.strictEqual("mi", convertHandler.getUnit("4mi"), "mi is valid unit")
      assert.strictEqual("km", convertHandler.getUnit("3.3km"), "km is valid unit")
      assert.strictEqual("lbs", convertHandler.getUnit("3lbs"), "lbs is valid unit")
      assert.strictEqual("kg", convertHandler.getUnit("3kg"), "kg is valid unit")
    })
    test('should correctly return an error for an invalid input unit', () => {
      assert.throws(() => {
        convertHandler.getUnit("mm")
      }, "This is an invalid input!")
    })
    test('should return the correct return unit for each valid input unit', () => {
      assert.strictEqual("gal", convertHandler.getReturnUnit("L"), "L to gal")
      assert.strictEqual("km", convertHandler.getReturnUnit("mi"), "mi to km")
      assert.strictEqual("lbs", convertHandler.getReturnUnit("kg"), "kg to lbs")
    })

    test('should correctly return the spelled-out string unit for each valid input unit', () => {
      assert.strictEqual("gallons", convertHandler.spellOutUnit("gal"), "gal is gallons")
      assert.strictEqual("liters", convertHandler.spellOutUnit("L"), "L is liters")
      assert.strictEqual("kilometers", convertHandler.spellOutUnit("km"), "km is kilometers")
      assert.strictEqual("miles", convertHandler.spellOutUnit("mi"), "mi is miles")
      assert.strictEqual("kilograms", convertHandler.spellOutUnit("kg"), "kg is kilograms")
      assert.strictEqual("libras", convertHandler.spellOutUnit("lbs"), "lbs is libras")
    })

  })

  suite('Testing convertions to different units', () => {
    test('should correctly convert gal to L', () => {
      assert.strictEqual(113.56230000000001, convertHandler.convert(30, "gal"))
    })
    test('should correctly convert L to gal', () => {
      assert.strictEqual(7.925165305739669, convertHandler.convert(30, "L"))
    })
    test('should correctly convert mi to km', () => {
      assert.strictEqual(48.2802, convertHandler.convert(30, "mi"))
    })
    test('should correctly convert km to mi', () => {
      assert.strictEqual(18.641182099494202, convertHandler.convert(30, "km"))
    })
    test('should correctly convert lbs to kg', () => {
      assert.strictEqual(13.607759999999999, convertHandler.convert(30, "lbs"))
    })
    test('should correctly convert kg to lbs', () => {
      assert.strictEqual(66.13873260551333, convertHandler.convert(30, "kg"))
    })
  })
});