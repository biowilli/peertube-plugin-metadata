// Transform functions
function toBool(val) {
  return !!val; //convert to bool
}

function convertNumToTime(number) {
  var seconds = Math.floor(number);
  var ms = Math.floor((number - seconds) * 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = `${Math.floor(minutes / 60)}`;
  time =
    formatDigits(hours.length < 2 ? 2 : hours.length, hours) +
    ":" +
    formatDigits(2, minutes % 60) +
    ":" +
    formatDigits(2, seconds % 60) +
    "." +
    formatDigits(3, ms);
  return time;
}

function formatDigits(digits, number) {
  return `0000000${number}`.slice(digits * -1);
}

function ratioToNumber(val) {
  var ratioArray = val.split(/[\/:]/i);
  if (ratioArray.length < 2) {
    return parseFloat(val);
  }

  if (parseFloat(ratioArray[1]) == 0) {
    return 0;
  }

  return parseFloat(ratioArray[0]) / parseFloat(ratioArray[1]);
}

function toList(val, separator = "/") {
  return val.split(separator);
}

function getNumerator(val, def = null) {
  if (typeof val === "number") {
    return val;
  }
  if (typeof val === "string") {
    let result = val.match(/(\d+)\/(\d+)/);
    if (!result) {
      return def;
    }
    return parseInt(result[1]);
  }
  return def;
}

function getDenominator(val, def = null) {
  if (typeof val === "number") {
    return val;
  }
  if (typeof val === "string") {
    let result = val.match(/(\d+)\/(\d+)/);
    if (!result) {
      return def;
    }
    return parseInt(result[2]);
  }
  return def;
}

const RE_DATETIME_F01 = new RegExp(
  "^(UTC|GMT) (\\d{4})-(\\d{2})-(\\d{2}) (\\d{1,2}):(\\d{1,2}):(\\d{1,2})$",
  "i"
);
const RE_DATETIME_F11 = new RegExp(
  "^(\\d{4})\\s*[\\/.-]\\s*(\\d{2})\\s*[\\/.-]\\s*(\\d{2})(?:\\s+|T|-)(\\d{1,2})\\s*[:.]\\s*(\\d{1,2})$",
  "i"
);
const RE_DATETIME_F12 = new RegExp(
  "^(\\d{4})\\s*[\\/.-]\\s*(\\d{2})\\s*[\\/.-]\\s*(\\d{2})(?:\\s+|T|-)(\\d{1,2})\\s*[:.]\\s*(\\d{1,2})\\s*[:.]\\s*(\\d{1,2})$",
  "i"
);
const RE_DATETIME_F13 = new RegExp(
  "^(\\d{4})\\s*[\\/.-]\\s*(\\d{2})\\s*[\\/.-]\\s*(\\d{2})(?:\\s+|T|-)(\\d{1,2})\\s*[:.]\\s*(\\d{1,2})\\s*[:.]\\s*(\\d{1,2})\\.(\\d{1,6})$",
  "i"
);
const RE_DATETIME_F21 = new RegExp(
  "^(\\d{1,2})\\s*[\\/.-]\\s*(\\d{1,2})\\s*[\\/.-]\\s*(\\d{4})(?:\\s+|T|-)(\\d{1,2})\\s*[:.]\\s*(\\d{1,2})$",
  "i"
);
const RE_DATETIME_F22 = new RegExp(
  "^(\\d{1,2})\\s*[\\/.-]\\s*(\\d{1,2})\\s*[\\/.-]\\s*(\\d{4})(?:\\s+|T|-)(\\d{1,2})\\s*[:.]\\s*(\\d{1,2})\\s*[:.]\\s*(\\d{1,2})$",
  "i"
);
const RE_DATETIME_F23 = new RegExp(
  "^(\\d{1,2})\\s*[\\/.-]\\s*(\\d{1,2})\\s*[\\/.-]\\s*(\\d{4})(?:\\s+|T|-)(\\d{1,2})\\s*[:.]\\s*(\\d{1,2})\\s*[:.]\\s*(\\d{1,2})\\.(\\d{1,6})$",
  "i"
);
// TODO: Datetime check
function toDateTime(val) {
  let result;

  // Handle the GMT/UTC format
  result = RE_DATETIME_F01.exec(val);
  if (result) {
    return new Date(
      `${result[2]}-${result[3]}-${result[4]}T${result[5]}:${result[6]}:${result[7]}Z`
    );
  }

  // Handle other date formats
  result =
    RE_DATETIME_F11.exec(val) ||
    RE_DATETIME_F12.exec(val) ||
    RE_DATETIME_F13.exec(val) ||
    RE_DATETIME_F21.exec(val) ||
    RE_DATETIME_F22.exec(val) ||
    RE_DATETIME_F23.exec(val);
  if (result) {
    // JavaScript Date constructor uses 0-based months
    return new Date(
      result[1],
      result[2] - 1,
      result[3],
      result[4] || 0,
      result[5] || 0,
      result[6] || 0,
      result[7] || 0
    );
  }

  return null;
}

module.exports = {
  toBool,
  convertNumToTime,
  ratioToNumber,
  toList,
  getNumerator,
  getDenominator,
  toDateTime,
};
