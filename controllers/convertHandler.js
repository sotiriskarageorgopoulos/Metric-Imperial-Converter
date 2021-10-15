function ConvertHandler() {

  this.getNum = function (input) {
    let result

    if (input === null || input === undefined || input === '') {
      result = 1
    } else {
      let slashArray = input.match(/[\/]/g)
      if (slashArray !== null) {
        slashTimes = slashArray.length
        if (slashTimes === 2) {
          throw new Error("Error: double-fraction")
        }
      }

      if (input.includes("/") && input.includes(".")) {
        let splitString = input.split("/")
        let numerator = Number(splitString[0])
        let matches = splitString[1].match(/([\d.]+)|(\d+)/)
        let denominator = Number(matches[0])

        if (!isNaN(numerator) && !isNaN(denominator)) {
          result = numerator / denominator
        } else {
          result = 1
        }
      } else if (input.includes("/")) {
        let splitString = input.split("/")
        let numerator = Number(splitString[0])
        let matches = splitString[1].match(/(\d+)/)

        if (matches) {
          let denominator = Number(matches[0])
          result = numerator / denominator
        } else {
          result = 1
        }
      } else if (input.includes(".")) {
        let matches = input.match(/[\d.]+/)
        if (matches) {
          if (matches[0] !== '.') {
            result = Number(matches[0])
          } else {
            result = 1
          }
        } else {
          result = 1
        }
      } else {
        let matches = input.match(/(\d+)/)
        if (matches) {
          result = Number(matches[0])
        } else {
          result = 1
        }
      }
    }

    return result;
  };

  this.getUnit = function (input) {
    let resultArray = input.match(/gal|L|mi|km|lbs|kg/)
    if (!resultArray) {
      throw new Error("This is an invalid input!")
    }
    return resultArray[0]
  };

  this.getReturnUnit = function (initUnit) {
    const units = {
      gal: "L",
      mi: "km",
      lbs: "kg"
    }
    let result
    if (units.hasOwnProperty(initUnit)) {
      result = units[initUnit]
    } else if (Object.values(units).includes(initUnit)) {
      for (let key in units) {
        if (units[key] === initUnit) {
          result = key
          break;
        }
      }
    }
    return result
  };

  this.spellOutUnit = function (unit) {
    const units = {
      "gal": "gallons",
      "L": "liters",
      "mi": "miles",
      "km": "kilometers",
      "lbs": "libras",
      "kg": "kilograms"
    }

    return units[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let returnedUnit = this.getReturnUnit(initUnit)
    let result

    if (returnedUnit === 'L') {
      result = initNum * galToL
    } else if (returnedUnit === 'gal') {
      result = initNum / galToL
    }

    if (returnedUnit === 'kg') {
      result = initNum * lbsToKg
    } else if (returnedUnit === 'lbs') {
      result = initNum / lbsToKg
    }

    if (returnedUnit === 'km') {
      result = initNum * miToKm
    } else if (returnedUnit === 'mi') {
      result = initNum / miToKm
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let string = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    let result = JSON.stringify({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
    return result;
  };

}

module.exports = ConvertHandler;