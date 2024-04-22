/**
 * Libraries
 */

const fs = require("fs");
const { exec } = require("child_process");

/**
 * Patterns
 */

//const mediainfo_bin = "/usr/bin/mediainfo";
const mediainfo_bin = "mediainfo";

/**
 * Patterns
 */

// const re_true = new RegExp('^(?:true|yes|ja|y|j|1)$', 'i');
// const re_false = new RegExp('^(?:false|no|nein|n|0)$', 'i');
// const re_none = new RegExp('^(?:none|null)$', 'i');
// const re_negated = new RegExp('^\s*!\s*', 'i');

// const re_number = new RegExp('^-?\d+(?:\.\d+)?$', 'i');
// const re_number_wComma = new RegExp('^-?\d+(?:,\d+)?$', 'i');
// const re_number_wComma2 = new RegExp('^-?\d+(?:\.\d{3})*(?:,\d+)?$', 'i');
// const re_int = new RegExp('^-?\d+$', 'i');
// const re_float = new RegExp('^-?\d+\.\d+$', 'i');
// const re_float_wComma = new RegExp('^-?\d+,\d+$', 'i');
// const re_float_wComma2 = new RegExp('^-?\d+(?:\.\d{3})*,\d+$', 'i');
// const re_float_wComma3 = new RegExp('^-?\d+(?:,\d{3})+\.\d+$', 'i');

// const re_ratio = new RegExp('^(-?\d+(?:\.\d+)?)\s*[:/]\s*(-?\d+(?:\.\d+)?)$', 'i');

// const re_primitive = new RegExp('^(?:(?:-?\d+(?:\.\d+)?)|true|yes|ja|y|j|false|no|nein|n|none|null)$', 'i');

// const re_fraction = new RegExp('^(\d+)(?:/|:)(\d+)$', 'i');
// const re_fraction_split = new RegExp('[/:]', 'i');

// const re_json_objectStart = new RegExp('^\s*\{', 'i');
// const re_json_objectEnd = new RegExp('\}\s*$', 'i');
// const re_json_arrayStart = new RegExp('^\s*\[', 'i');
// const re_json_arrayEnd = new RegExp('\]\s*$', 'i');

// const re_comma_separator = new RegExp('\s*,\s*', 'i');
// const re_comma_trailing = new RegExp(',\s*$', 'i');

// const re_newline_single = new RegExp('[\n\r]', 'i');
// const re_newline_multi = new RegExp('[\n\r]+', 'i');
// const re_whitespace = new RegExp('[\s\n\r]+', 'i');
// const re_whitespace_start = new RegExp('^[\s\n\r]+', 'i');
// const re_whitespace_end = new RegExp('[\s\n\r]+$', 'i');

// const re_hhmm = new RegExp('^(\d+):(\d{1,2})$', 'i');
// const re_hhmmss = new RegExp('^(\d+):(\d{1,2}):(\d{1,2})$', 'i');
// const re_hhmmss_strict = new RegExp('^(\d+):(\d{2}):(\d{2})$', 'i');
// const re_hhmmssms = new RegExp('^(\d+):(\d{1,2}):(\d{1,2})[:\.](\d{1,6})$', 'i');
// const re_hhmmssms_alt = new RegExp('^_(\d{2,6})_(\d{2})_(\d{2})_(\d{3,6})$', 'i');
// const re_hhmmssms_strict = new RegExp('^(\d+):(\d{2}):(\d{2})\.(\d{1,6})$', 'i');

// const re_date_f1 = new RegExp('^(\d{4})\s*[/\.-]\s*(\d{2})\s*[/\.-]\s*(\d{2})$', 'i');
// const re_date_f2 = new RegExp('^(\d{1,2})\s*[/\.-]\s*(\d{1,2})\s*[/\.-]\s*(\d{4})$', 'i');

// const re_time_f1 = new RegExp('^(\d{1,2})\s*[\.:]\s*(\d{1,2})$', 'i');
// const re_time_f2 = new RegExp('^(\d{1,2})\s*[\.:]\s*(\d{1,2})\s*[\.:]\s*(\d{1,2})$', 'i');
// const re_time_f3 = new RegExp('^(\d{1,2})\s*[\.:]\s*(\d{1,2})\s*[\.:]\s*(\d{1,2})\.(\d{1,6})$', 'i');

// const re_datetime_f01 = new RegExp('^(UTC|GMT) (\d{4})-(\d{2})-(\d{2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$', 'i');
// const re_datetime_f11 = new RegExp('^(\d{4})\s*[/\.-]\s*(\d{2})\s*[/\.-]\s*(\d{2})(?:\s+|T|-)(\d{1,2})\s*[\.:]\s*(\d{1,2})$', 'i');
// const re_datetime_f12 = new RegExp('^(\d{4})\s*[/\.-]\s*(\d{2})\s*[/\.-]\s*(\d{2})(?:\s+|T|-)(\d{1,2})\s*[\.:]\s*(\d{1,2})\s*[\.:]\s*(\d{1,2})$', 'i');
// const re_datetime_f13 = new RegExp('^(\d{4})\s*[/\.-]\s*(\d{2})\s*[/\.-]\s*(\d{2})(?:\s+|T|-)(\d{1,2})\s*[\.:]\s*(\d{1,2})\s*[\.:]\s*(\d{1,2})\.(\d{1,6})$', 'i');
// const re_datetime_f21 = new RegExp('^(\d{1,2})\s*[/\.-]\s*(\d{1,2})\s*[/\.-]\s*(\d{4})(?:\s+|T|-)(\d{1,2})\s*[\.:]\s*(\d{1,2})$', 'i');
// const re_datetime_f22 = new RegExp('^(\d{1,2})\s*[/\.-]\s*(\d{1,2})\s*[/\.-]\s*(\d{4})(?:\s+|T|-)(\d{1,2})\s*[\.:]\s*(\d{1,2})\s*[\.:]\s*(\d{1,2})$', 'i');
// const re_datetime_f23 = new RegExp('^(\d{1,2})\s*[/\.-]\s*(\d{1,2})\s*[/\.-]\s*(\d{4})(?:\s+|T|-)(\d{1,2})\s*[\.:]\s*(\d{1,2})\s*[\.:]\s*(\d{1,2})\.(\d{1,6})$', 'i');

// const re_startswith_slash = new RegExp('\s*/', 'i');
// const re_startswith_tilde = new RegExp('\s*~', 'i');

// const re_surround_types = new RegExp('^(\d{1,2}\.\d|mono|stereo|quad)(?:\(\w+\))?$', 'i');

const re_true = new RegExp("^(?:true|yes|ja|y|j|1)$", "i");
const re_false = new RegExp("^(?:false|no|nein|n|0)$", "i");
const re_none = new RegExp("^(?:none|null)$", "i");
const re_negated = new RegExp("^[ \t]*![ \t]*", "i");

const re_number = new RegExp("^-?[0-9]+(?:.[0-9]+)?$", "i");
const re_number_wComma = new RegExp("^-?[0-9]+(?:,[0-9]+)?$", "i");
const re_number_wComma2 = new RegExp(
  "^-?[0-9]+(?:.[0-9]{3})*(?:,[0-9]+)?$",
  "i"
);
const re_int = new RegExp("^-?[0-9]+$", "i");
const re_float = new RegExp("^-?[0-9]+.[0-9]+$", "i");
const re_float_wComma = new RegExp("^-?[0-9]+,[0-9]+$", "i");
const re_float_wComma2 = new RegExp("^-?[0-9]+(?:.[0-9]{3})*,[0-9]+$", "i");
const re_float_wComma3 = new RegExp("^-?[0-9]+(?:,[0-9]{3})+.[0-9]+$", "i");

const re_ratio = new RegExp(
  "^(-?[0-9]+(?:.[0-9]+)?)[ \t]*[:/][ \t]*(-?[0-9]+(?:.[0-9]+)?)$",
  "i"
);

const re_primitive = new RegExp(
  "^(?:(?:-?[0-9]+(?:.[0-9]+)?)|true|yes|ja|y|j|false|no|nein|n|none|null)$",
  "i"
);

const re_fraction = new RegExp("^([0-9]+)(?:/|:)([0-9]+)$", "i");
const re_fraction_split = new RegExp("[/:]", "i");

const re_json_objectStart = new RegExp("^[ \t]*{", "i");
const re_json_objectEnd = new RegExp("}[ \t]*$", "i");
const re_json_arrayStart = new RegExp("^[ \t]*\\[", "i");
const re_json_arrayEnd = new RegExp("][ \t]*$", "i");

const re_comma_separator = new RegExp("[ \t]*,[ \t]*", "i");
const re_comma_trailing = new RegExp(",[ \t]*$", "i");

const re_newline_single = new RegExp("[\n\r]", "i");
const re_newline_multi = new RegExp("[\n\r]+", "i");
const re_whitespace = new RegExp("[[ \t]\n\r]+", "i");
const re_whitespace_start = new RegExp("^[[ \t]\n\r]+", "i");
const re_whitespace_end = new RegExp("[[ \t]\n\r]+$", "i");

const re_hhmm = new RegExp("^([0-9]+):([0-9]{1,2})$", "i");
const re_hhmmss = new RegExp("^([0-9]+):([0-9]{1,2}):([0-9]{1,2})$", "i");
const re_hhmmss_strict = new RegExp("^([0-9]+):([0-9]{2}):([0-9]{2})$", "i");
const re_hhmmssms = new RegExp(
  "^([0-9]+):([0-9]{1,2}):([0-9]{1,2})[:.]([0-9]{1,6})$",
  "i"
);
const re_hhmmssms_alt = new RegExp(
  "^_([0-9]{2,6})_([0-9]{2})_([0-9]{2})_([0-9]{3,6})$",
  "i"
);
const re_hhmmssms_strict = new RegExp(
  "^([0-9]+):([0-9]{2}):([0-9]{2}).([0-9]{1,6})$",
  "i"
);

const re_date_f1 = new RegExp(
  "^([0-9]{4})[ \t]*[/.-][ \t]*([0-9]{2})[ \t]*[/.-][ \t]*([0-9]{2})$",
  "i"
);
const re_date_f2 = new RegExp(
  "^([0-9]{1,2})[ \t]*[/.-][ \t]*([0-9]{1,2})[ \t]*[/.-][ \t]*([0-9]{4})$",
  "i"
);

const re_time_f1 = new RegExp(
  "^([0-9]{1,2})[ \t]*[.:][ \t]*([0-9]{1,2})$",
  "i"
);
const re_time_f2 = new RegExp(
  "^([0-9]{1,2})[ \t]*[.:][ \t]*([0-9]{1,2})[ \t]*[.:][ \t]*([0-9]{1,2})$",
  "i"
);
const re_time_f3 = new RegExp(
  "^([0-9]{1,2})[ \t]*[.:][ \t]*([0-9]{1,2})[ \t]*[.:][ \t]*([0-9]{1,2}).([0-9]{1,6})$",
  "i"
);

const re_datetime_f01 = new RegExp(
  "^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2}).([0-9]{3})(Z|(?:[+-][0-9]{2}:[0-9]{2}))$",
  "i"
);
const re_datetime_f02 = new RegExp(
  "^(UTC|GMT) ([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})$",
  "i"
);
const re_datetime_f11 = new RegExp(
  "^([0-9]{4})[ \t]*[/.-][ \t]*([0-9]{2})[ \t]*[/.-][ \t]*([0-9]{2})(?:[ \t]+|T|-)([0-9]{1,2})[ \t]*[.:][ \t]*([0-9]{1,2})$",
  "i"
);
const re_datetime_f12 = new RegExp(
  "^([0-9]{4})[ \t]*[/.-][ \t]*([0-9]{2})[ \t]*[/.-][ \t]*([0-9]{2})(?:[ \t]+|T|-)([0-9]{1,2})[ \t]*[.:][ \t]*([0-9]{1,2})[ \t]*[.:][ \t]*([0-9]{1,2})$",
  "i"
);
const re_datetime_f13 = new RegExp(
  "^([0-9]{4})[ \t]*[/.-][ \t]*([0-9]{2})[ \t]*[/.-][ \t]*([0-9]{2})(?:[ \t]+|T|-)([0-9]{1,2})[ \t]*[.:][ \t]*([0-9]{1,2})[ \t]*[.:][ \t]*([0-9]{1,2}).([0-9]{1,6})$",
  "i"
);
const re_datetime_f21 = new RegExp(
  "^([0-9]{1,2})[ \t]*[/.-][ \t]*([0-9]{1,2})[ \t]*[/.-][ \t]*([0-9]{4})(?:[ \t]+|T|-)([0-9]{1,2})[ \t]*[.:][ \t]*([0-9]{1,2})$",
  "i"
);
const re_datetime_f22 = new RegExp(
  "^([0-9]{1,2})[ \t]*[/.-][ \t]*([0-9]{1,2})[ \t]*[/.-][ \t]*([0-9]{4})(?:[ \t]+|T|-)([0-9]{1,2})[ \t]*[.:][ \t]*([0-9]{1,2})[ \t]*[.:][ \t]*([0-9]{1,2})$",
  "i"
);
const re_datetime_f23 = new RegExp(
  "^([0-9]{1,2})[ \t]*[/.-][ \t]*([0-9]{1,2})[ \t]*[/.-][ \t]*([0-9]{4})(?:[ \t]+|T|-)([0-9]{1,2})[ \t]*[.:][ \t]*([0-9]{1,2})[ \t]*[.:][ \t]*([0-9]{1,2}).([0-9]{1,6})$",
  "i"
);

const re_startswith_slash = new RegExp("[ \t]*/", "i");
const re_startswith_tilde = new RegExp("[ \t]*~", "i");

const re_surround_types = new RegExp(
  "^([0-9]{1,2}.[0-9]|mono|stereo|quad)(?:(w+))?$",
  "i"
);

/**
 * toBool
 * Convert to boolean
 *
 * @param {any} val
 * @param {bool} def
 * @returns bool
 */
function toBool(val, def = false) {
  const valT = typeof val;
  if (valT === "boolean") {
    return val;
  }
  if (valT === "number") {
    return val > 0;
  }
  if (valT !== "string") {
    return def;
  }
  if (re_true.test(val)) {
    return true;
  }
  if (re_false.test(val)) {
    return false;
  }
  return def;
}

/**
 * toInt
 * Convert to integer
 *
 * @param {any} val
 * @param {integer} def
 * @returns integer
 */
function toInt(val, def = 0) {
  const valT = typeof val;
  if (valT === "number") {
    return parseInt(val);
  }
  if (valT === "boolean") {
    return val ? 1 : 0;
  }
  if (valT !== "string") {
    return def;
  }
  if (re_number.test(val)) {
    return parseInt(val);
  }
  if (re_number_wComma.test(val)) {
    val = val.replace(",", ".");
    return parseInt(val);
  }
  if (re_number_wComma2.test(val)) {
    val = val.replace(".", "");
    val = val.replace(",", ".");
    return parseInt(val);
  }
  if (re_number_wComma3.test(val)) {
    val = val.replace(",", "");
    return parseInt(val);
  }
  return def;
}

/**
 * toFloat
 * Convert to float
 *
 * @param {any} val
 * @param {float} def
 * @returns float
 */
function toFloat(val, def = 0.0) {
  const valT = typeof val;
  if (valT === "number") {
    return parseFloat(val);
  }
  if (valT === "boolean") {
    return val ? 1.0 : 0.0;
  }
  if (valT !== "string") {
    return def;
  }
  if (re_number.test(val)) {
    return parseFloat(val);
  }
  if (re_number_wComma.test(val)) {
    val = val.replace(",", ".");
    return parseFloat(val);
  }
  if (re_number_wComma2.test(val)) {
    val = val.replace(".", "");
    val = val.replace(",", ".");
    return parseFloat(val);
  }
  if (re_number_wComma3.test(val)) {
    val = val.replace(",", "");
    return parseFloat(val);
  }
  return def;
}

/**
 * toArray
 * Convert to array.
 * Val can be a string or an array.
 * If val is an array it will be returned as is,
 * if it is a string it will be testet if it is a
 * JSON array, if not it will be split by the given
 * separator.
 *
 * @param {any} val
 * @param {array | null} def
 * @param {string | null} sep
 * @returns array | null
 */
function toArray(val, def = null, sep = null) {
  if (Array.isArray(val)) {
    return val;
  }
  if (typeof val !== "string") {
    return def;
  }
  if (
    (re_json_objectStart.test(val) && re_json_objectEnd.test(val)) ||
    (re_json_arrayStart.test(val) && re_json_arrayEnd.test(val))
  ) {
    try {
      const result = JSON.parse(val);
      if (Array.isArray(result)) {
        return result;
      }
      return def;
    } catch (e) {
      return def;
    }
  }
  if (sep) {
    sep = new RegExp("s*" + sep + "s*", "i");
  } else {
    sep = re_comma_separator;
  }
  return val.split(sep);
}

/**
 * toDurationString
 * Convert to duration string
 *
 * @param {any} val
 * @returns string | null
 */
function toDurationString(val) {
  if (val instanceof Date) {
    const h = (val.getDate() * 24 + val.getHours()).toString();
    const m = getMinutes().toString().padStart(2, "0");
    const s = getSeconds().toString().padStart(2, "0");
    const ms = getMilliseconds().toString().padStart(3, "0");
    if (ms === "000") {
      return `${h}:${m}:${s}`;
    }
    return `${h}:${m}:${s}.${ms}`;
  }
  if (typeof val !== "string") {
    return null;
  }
  if (re_hhmmss_strict.test(val)) {
    return val;
  }
  if (re_hhmmssms_strict.test(val)) {
    let hhmmss,
      ms = val.split(".");
    ms = (ms + "000").substring(0, 3);
    return `${hhmmss}.${ms}`;
  }
  let result = re_hhmmssms.exec(val);
  if (result) {
    const h = result[1];
    const m = result[2].padStart(2, "0");
    const s = result[3].padStart(2, "0");
    const ms = (result[4] + "000").substring(0, 3);
    return `${h}:${m}:${s}.${ms}`;
  }
  result = re_hhmmss.exec(val);
  if (result) {
    const h = result[1];
    const m = result[2].padStart(2, "0");
    const s = result[3].padStart(2, "0");
    return `${h}:${m}:${s}`;
  }
  result = re_hhmmssms_alt.exec(val);
  if (result) {
    const h = result[1];
    const m = result[2].padStart(2, "0");
    const s = result[3].padStart(2, "0");
    const ms = (result[4] + "000").substring(0, 3);
    return `${h}:${m}:${s}.${ms}`;
  }
  return null;
}

/**
 * toDate
 * Convert to Date object.
 *
 * @param {any} val
 * @returns Date | null
 */
function toDate(val) {
  if (val instanceof Date) {
    return val;
  }
  if (typeof val !== "string") {
    return null;
  }
  if (re_datetime_f01.test(val)) {
    return new Date(Date.parse(val));
  }

  let result = re_datetime_f02.exec(val);
  if (result) {
    const d = new Date(parseInt(result[2]), parseInt(result[3]) - 1);
    if (result[1] === "UTC") {
      d.setUTCDate(parseInt(result[4]));
      d.setUTCHours(parseInt(result[5]));
      d.setUTCMinutes(parseInt(result[6]));
      d.setUTCSeconds(parseInt(result[7]));
      d.setUTCMilliseconds(0);
      return d;
    }
    d.setDate(parseInt(result[4]));
    d.setHours(parseInt(result[5]));
    d.setMinutes(parseInt(result[6]));
    d.setSeconds(parseInt(result[7]));
    d.setMilliseconds(0);
    return d;
  }

  result = re_datetime_f11.exec(val);
  if (result) {
    return new Date(
      parseInt(result[1]),
      parseInt(result[2]) - 1,
      parseInt(result[3]),
      parseInt(result[4]),
      parseInt(result[5]),
      0,
      0
    );
  }
  result = re_datetime_f12.exec(val);
  if (result) {
    return new Date(
      parseInt(result[1]),
      parseInt(result[2]) - 1,
      parseInt(result[3]),
      parseInt(result[4]),
      parseInt(result[5]),
      parseInt(result[6]),
      0
    );
  }
  result = re_datetime_f13.exec(val);
  if (result) {
    return new Date(
      parseInt(result[1]),
      parseInt(result[2]) - 1,
      parseInt(result[3]),
      parseInt(result[4]),
      parseInt(result[5]),
      parseInt(result[6]),
      parseInt((result[7] + "000").substring(0, 3))
    );
  }

  result = re_datetime_f21.exec(val);
  if (result) {
    return new Date(
      parseInt(result[3]),
      parseInt(result[2]) - 1,
      parseInt(result[1]),
      parseInt(result[4]),
      parseInt(result[5]),
      0,
      0
    );
  }
  result = re_datetime_f22.exec(val);
  if (result) {
    return new Date(
      parseInt(result[3]),
      parseInt(result[2]) - 1,
      parseInt(result[1]),
      parseInt(result[4]),
      parseInt(result[5]),
      parseInt(result[6]),
      0
    );
  }
  result = re_datetime_f23.exec(val);
  if (result) {
    return new Date(
      parseInt(result[3]),
      parseInt(result[2]) - 1,
      parseInt(result[1]),
      parseInt(result[4]),
      parseInt(result[5]),
      parseInt(result[6]),
      parseInt((result[7] + "000").substring(0, 3))
    );
  }

  result = re_date_f1.exec(val);
  if (result) {
    return new Date(
      parseInt(result[1]),
      parseInt(result[2]) - 1,
      parseInt(result[3]),
      0,
      0,
      0,
      0
    );
  }
  result = re_date_f2.exec(val);
  if (result) {
    return new Date(
      parseInt(result[3]),
      parseInt(result[2]) - 1,
      parseInt(result[1]),
      0,
      0,
      0,
      0
    );
  }

  result = re_time_f1.exec(val);
  if (result) {
    const d = new Date(Date.now());
    d.setHours(parseInt(result[1]));
    d.setMinutes(parseInt(result[2]));
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
  }
  result = re_time_f2.exec(val);
  if (result) {
    const d = new Date(Date.now());
    d.setHours(parseInt(result[1]));
    d.setMinutes(parseInt(result[2]));
    d.setSeconds(parseInt(result[3]));
    d.setMilliseconds(0);
    return d;
  }
  result = re_time_f3.exec(val);
  if (result) {
    const d = new Date(Date.now());
    d.setHours(parseInt(result[1]));
    d.setMinutes(parseInt(result[2]));
    d.setSeconds(parseInt(result[3]));
    d.setMilliseconds((result[4] + "000").substring(0, 3));
    return d;
  }
  return null;
}

/**
 * toNumerator
 * Convert to numerator
 *
 * @param {any} val
 * @param {int | float | null} def
 * @returns int | float | null
 */
function toNumerator(val, def = null) {
  const valT = typeof val;
  if (valT === "number") {
    return val;
  }
  if (valT === "boolean") {
    return val ? 1.0 : 0.0;
  }
  if (valT !== "string") {
    return def;
  }
  let result = re_fraction.exec(val);
  if (!result) {
    return def;
  }
  return parseFloat(result[1]);
}

/**
 * toDenominator
 * Convert to denominator
 *
 * @param {any} val
 * @param {int | float | null} def
 * @returns int | float | null
 */
function toDenominator(val, def = null) {
  const valT = typeof val;
  if (valT === "number") {
    return val;
  }
  if (valT === "boolean") {
    return val ? 1.0 : 0.0;
  }
  if (valT !== "string") {
    return def;
  }
  let result = re_fraction.exec(val);
  if (!result) {
    return def;
  }
  return parseFloat(result[2]);
}

/**
 * Transformers
 */
// INFO_STREAM_PROPERTY_TRANSFORMERS
const infoStreamPropertyTransformers = [
  { source: "UniqueID", target: "uuid", transformer: (val) => val },

  {
    source: "StreamCount",
    target: "streamCount",
    transformer: (val) => toInt(val),
  },
  {
    source: "VideoCount",
    target: "videoCount",
    transformer: (val) => toInt(val),
  },
  {
    source: "AudioCount",
    target: "audioCount",
    transformer: (val) => toInt(val),
  },
  {
    source: "TextCount",
    target: "textCount",
    transformer: (val) => toInt(val),
  },
  {
    source: "MenuCount",
    target: "menuCount",
    transformer: (val) => toInt(val),
  },

  {
    source: "Video_Format_List",
    target: "videoFormat",
    transformer: (val) => toArray(val, null, "/"),
  },
  {
    source: "Video_Codec_List",
    target: "videoCodec",
    transformer: (val) => toArray(val, null, "/"),
  },
  {
    source: "Video_Language_List",
    target: "videoLanguage",
    transformer: (val) => toArray(val, null, "/"),
  },

  {
    source: "Audio_Format_List",
    target: "audioFormat",
    transformer: (val) => toArray(val, null, "/"),
  },
  {
    source: "Audio_Codec_List",
    target: "audioCodec",
    transformer: (val) => toArray(val, null, "/"),
  },
  {
    source: "Audio_Language_List",
    target: "audioLanguage",
    transformer: (val) => toArray(val, null, "/"),
  },

  {
    source: "Text_Format_List",
    target: "textFormat",
    transformer: (val) => toArray(val, null, "/"),
  },
  {
    source: "Text_Codec_List",
    target: "textCodec",
    transformer: (val) => toArray(val, null, "/"),
  },
  {
    source: "Text_Language_List",
    target: "textLanguage",
    transformer: (val) => toArray(val, null, "/"),
  },

  { source: "CompleteName", target: "filePath", transformer: (val) => val },
  { source: "FolderName", target: "folderName", transformer: (val) => val },
  { source: "FileName", target: "fileName", transformer: (val) => val },
  {
    source: "FileExtension",
    target: "fileExtension",
    transformer: (val) => val,
  },

  { source: "Format", target: "format", transformer: (val) => val },
  {
    source: "Format_Extensions",
    target: "formatExtensions",
    transformer: (val) => toArray(val, null, " "),
  },
  {
    source: "Format_Profile",
    target: "formatProfile",
    transformer: (val) => val,
  },
  {
    source: "InternetMediaType",
    target: "internetMediaType",
    transformer: (val) => val,
  },
  { source: "CodecID", target: "codecID", transformer: (val) => val },
  { source: "CodecID_Url", target: "codecIDUrl", transformer: (val) => val },
  {
    source: "CodecID_Compatible",
    target: "codecIDCompatible",
    transformer: (val) => val,
  },

  { source: "FileSize", target: "fileSize", transformer: (val) => toInt(val) },
  {
    source: "FileSize_String",
    target: "fileSizeFormated",
    transformer: (val) => val,
  },

  {
    source: "Duration",
    target: "duration",
    transformer: (val) => toFloat(val),
  },
  {
    source: "Duration_String3",
    target: "durationFormated",
    transformer: (val) => val,
  },
  {
    source: "Duration_String4",
    target: "durationSMTP",
    transformer: (val) => val,
  },

  {
    source: "OverallBitRate_Mode",
    target: "overallBitRateMode",
    transformer: (val) => val,
  },
  {
    source: "OverallBitRate",
    target: "overallBitRate",
    transformer: (val) => toInt(val),
  },

  {
    source: "FrameRate",
    target: "frameRate",
    transformer: (val) => toFloat(val),
  },
  {
    source: "FrameCount",
    target: "frameCount",
    transformer: (val) => toInt(val),
  },
  {
    source: "StreamSize",
    target: "streamSize",
    transformer: (val) => toInt(val),
  },
  {
    source: "HeaderSize",
    target: "headerSize",
    transformer: (val) => toInt(val),
  },
  { source: "DataSize", target: "dataSize", transformer: (val) => toInt(val) },
  {
    source: "FooterSize",
    target: "footerSize",
    transformer: (val) => toInt(val),
  },
  {
    source: "IsStreamable",
    target: "isStreamable",
    transformer: (val) => toBool(val),
  },

  { source: "Title", target: "title", transformer: (val) => val },
  { source: "Movie", target: "movie", transformer: (val) => val },
  { source: "Performer", target: "performer", transformer: (val) => val },
  { source: "Genre", target: "genre", transformer: (val) => val },

  {
    source: "Encoded_Date",
    target: "encodedDate",
    transformer: (val) => toDate(val),
  },
  {
    source: "Tagged_Date",
    target: "taggedDate",
    transformer: (val) => toDate(val),
  },
  {
    source: "File_Modified_Date",
    target: "fileModifiedDate",
    transformer: (val) => toDate(val),
  },
];
//EBUCORE_INFO_STREAM_PROPERTY_TRANSFORMERS
const ebucoreInfoStreamPropertyTransformers = {
  "ebucore:format__ebucore:containerFormat__ebucore:containerEncoding__@formatLabel":
    [{ type: "info", target: "containerEncoding", transformer: (val) => val }],
  "ebucore:format__ebucore:containerFormat__@containerFormatName": [
    { type: "info", target: "containerFormatName", transformer: (val) => val },
  ],
  "ebucore:format__ebucore:containerFormat__@containerFormatVersionId": [
    {
      type: "info",
      target: "containerFormatVersionId",
      transformer: (val) => val,
    },
  ],
  "ebucore:format__ebucore:containerFormat__@containerFormatId": [
    { type: "info", target: "containerFormatId", transformer: (val) => val },
  ],

  "ebucore:format__ebucore:containerFormat__ebucore:technicalAttributeString__@typeLabel:WritingApplication__#value":
    [
      {
        type: "info",
        target: "containerWritingApplication",
        transformer: (val) => val,
      },
    ],
  "ebucore:format__ebucore:containerFormat__ebucore:technicalAttributeString__@typeLabel:WritingLibrary__#value":
    [
      {
        type: "info",
        target: "containerWritingLibrary",
        transformer: (val) => val,
      },
    ],

  "ebucore:format__ebucore:duration__ebucore:normalPlayTime__#value": [
    { type: "info", target: "durationEBUCore", transformer: (val) => val },
  ],

  "ebucore:format__ebucore:fileSize__#value": [
    { type: "info", target: "fileSize", transformer: (val) => toInt(val) },
  ],
  "ebucore:format__ebucore:fileName__#value": [
    { type: "info", target: "fileName", transformer: (val) => val },
  ],
  "ebucore:format__ebucore:locator__#value": [
    { type: "info", target: "filePath", transformer: (val) => val },
  ],

  "ebucore:format__ebucore:technicalAttributeInteger__@typeLabel:OverallBitRate__@unit":
    [{ type: "info", target: "overallBitRateUnit", transformer: (val) => val }],
  "ebucore:format__ebucore:technicalAttributeInteger__@typeLabel:OverallBitRate__#value":
    [
      {
        type: "info",
        target: "overallBitRate",
        transformer: (val) => toInt(val),
      },
    ],

  "ebucore:format__ebucore:dateCreated__@startDate": [
    { type: "info", target: "dateCreatedDate", transformer: (val) => val },
  ],
  "ebucore:format__ebucore:dateCreated__@startTime": [
    { type: "info", target: "dateCreatedTime", transformer: (val) => val },
  ],
};

// COMMON_STREAM_PROPERTY_TRANSFORMERS
const commonStreamPropertyTransformers = [
  { source: "UniqueID", target: "uuid", transformer: (val) => val },
  { source: "ID", target: "id", transformer: (val) => toInt(val) },
  {
    source: "StreamCount",
    target: "streamCount",
    transformer: (val) => toInt(val),
  },
  {
    source: "StreamOrder",
    target: "streamOrder",
    transformer: (val) => toInt(val),
  },
  {
    source: "@typeorder",
    target: "typeOrder",
    transformer: (val) => toInt(val),
  },
];

// COMMON_MEDIA_STREAM_PROPERTY_TRANSFORMERS
const commonMediaStreamPropertyTransformers = [
  { source: "Format", target: "format", transformer: (val) => val },
  { source: "CodecID", target: "codecID", transformer: (val) => val },

  {
    source: "Duration",
    target: "duration",
    transformer: (val) => toFloat(val),
  },
  {
    source: "Duration_String3",
    target: "durationFormated",
    transformer: (val) => val,
  },

  { source: "BitRate", target: "bitRate", transformer: (val) => toInt(val) },

  {
    source: "FrameRate",
    target: "frameRate",
    transformer: (val) => toFloat(val),
  },
  {
    source: "FrameCount",
    target: "frameCount",
    transformer: (val) => toInt(val),
  },

  {
    source: "StreamSize",
    target: "streamSize",
    transformer: (val) => toInt(val),
  },

  { source: "Language", target: "languageCode", transformer: (val) => val },
  {
    source: "Language_String3",
    target: "languageCode3",
    transformer: (val) => val,
  },
  { source: "Language_String", target: "language", transformer: (val) => val },

  { source: "Default", target: "default", transformer: (val) => toBool(val) },
  { source: "Forced", target: "forced", transformer: (val) => toBool(val) },
];

// VIDEO_STREAM_PROPERTY_TRANSFORMERS
const videoStreamPropertyTransformers = [
  {
    source: "Format_Commercial",
    target: "codecIDName",
    transformer: (val) => val,
  },

  { source: "Format_Url", target: "formatUrl", transformer: (val) => val },
  {
    source: "Format_Profile",
    target: "formatProfile",
    transformer: (val) => val,
  },
  { source: "Format_Level", target: "formatLevel", transformer: (val) => val },
  { source: "Format_Tier", target: "formatTier", transformer: (val) => val },

  {
    source: "Format_Settings",
    target: "formatSettings",
    transformer: (val) => val,
  },
  {
    source: "Format_Settings_CABAC",
    target: "formatSettingsCABAC",
    transformer: (val) => toBool(val),
  },
  {
    source: "Format_Settings_RefFrames",
    target: "formatSettingsRefFrames",
    transformer: (val) => toInt(val),
  },
  {
    source: "Format_Settings_GOP",
    target: "formatSettingsGOP",
    transformer: (val) => val,
  },

  {
    source: "InternetMediaType",
    target: "internetMediaType",
    transformer: (val) => val,
  },

  { source: "FileName", target: "fileName", transformer: (val) => val },
  {
    source: "FileExtension",
    target: "fileExtension",
    transformer: (val) => val,
  },

  {
    source: "Duration_String4",
    target: "durationSMTP",
    transformer: (val) => val,
  },

  { source: "Delay", target: "delay", transformer: (val) => toFloat(val) },
  {
    source: "Delay_String3",
    target: "delayFormated",
    transformer: (val) => val,
  },
  { source: "Delay_Source", target: "delaySource", transformer: (val) => val },

  { source: "Width", target: "width", transformer: (val) => toInt(val) },
  { source: "Height", target: "height", transformer: (val) => toInt(val) },
  {
    source: "Stored_Height",
    target: "storedHeight",
    transformer: (val) => toInt(val),
  },
  {
    source: "Sampled_Width",
    target: "sampledWidth",
    transformer: (val) => toInt(val),
  },
  {
    source: "Sampled_Height",
    target: "sampledHeight",
    transformer: (val) => toInt(val),
  },

  {
    source: "PixelAspectRatio",
    target: "pixelAspectRatio",
    transformer: (val) => toFloat(val),
  },
  {
    source: "DisplayAspectRatio",
    target: "displayAspectRatio",
    transformer: (val) => toFloat(val),
  },
  {
    source: "DisplayAspectRatio_String",
    target: "displayAspectRatioString",
    transformer: (val) => val,
  },
  {
    source: "DisplayAspectRatio_String",
    target: "displayAspectRatioNum",
    transformer: (val) => toNumerator(val),
  },
  {
    source: "DisplayAspectRatio_String",
    target: "displayAspectRatioDen",
    transformer: (val) => toDenominator(val),
  },

  {
    source: "Rotation",
    target: "rotation",
    transformer: (val) => toFloat(val),
  },

  {
    source: "FrameRate_Mode",
    target: "frameRateMode",
    transformer: (val) => val,
  },
  {
    source: "FrameRate_Num",
    target: "frameRateBase",
    transformer: (val) => parseInt(toFloat(val) * 0.001),
  },
  {
    source: "FrameRate_Num",
    target: "frameRateNum",
    transformer: (val) => 1000,
  },
  {
    source: "FrameRate_Den",
    target: "frameRateDen",
    transformer: (val) => toInt(val),
  },

  { source: "ColorSpace", target: "colorSpace", transformer: (val) => val },
  {
    source: "ChromaSubsampling",
    target: "chromaSubsampling",
    transformer: (val) => val,
  },
  { source: "BitDepth", target: "bitDepth", transformer: (val) => toInt(val) },
  { source: "ScanType", target: "scanType", transformer: (val) => val },

  {
    source: "colour_description_present",
    target: "colorDescriptionPresent",
    transformer: (val) => toBool(val),
  },
  { source: "colour_range", target: "colorRange", transformer: (val) => val },
  {
    source: "colour_primaries",
    target: "colorPrimaries",
    transformer: (val) => val,
  },
  {
    source: "transfer_characteristics",
    target: "transferCharacteristics",
    transformer: (val) => val,
  },
  {
    source: "matrix_coefficients",
    target: "matrixCoefficients",
    transformer: (val) => val,
  },

  {
    source: "Encoded_Library_Name",
    target: "encodedLibraryName",
    transformer: (val) => val,
  },
  {
    source: "Encoded_Library_Version",
    target: "encodedLibraryVersion",
    transformer: (val) => val,
  },

  {
    source: "Encoded_Date",
    target: "encodedDate",
    transformer: (val) => toDate(val),
  },
  {
    source: "Tagged_Date",
    target: "taggedDate",
    transformer: (val) => toDate(val),
  },
];
// EBUCORE_VIDEO_STREAM_PROPERTY_TRANSFORMERS
const ebucoreVideoStreamPropertyTransformers = {
  "ebucore:format__ebucore:videoFormat": [
    {
      type: "video",
      target: "create_container",
      transformer: (val) => {
        return {};
      },
    },
  ],
  "ebucore:format__ebucore:videoFormat__@videoFormatName": [
    { type: "video", target: "format", transformer: (val) => val },
  ],

  "ebucore:format__ebucore:videoFormat__ebucore:width__@unit": [
    { type: "video", target: "widthUnit", transformer: (val) => val },
  ],
  "ebucore:format__ebucore:videoFormat__ebucore:width__#value": [
    { type: "video", target: "width", transformer: (val) => toInt(val) },
  ],

  "ebucore:format__ebucore:videoFormat__ebucore:height__@unit": [
    { type: "video", target: "heightUnit", transformer: (val) => val },
  ],
  "ebucore:format__ebucore:videoFormat__ebucore:height__#value": [
    { type: "video", target: "height", transformer: (val) => toInt(val) },
  ],

  "ebucore:format__ebucore:videoFormat__ebucore:frameRate__@factorNumerator": [
    { type: "video", target: "frameRateNum", transformer: (val) => toInt(val) },
  ],
  "ebucore:format__ebucore:videoFormat__ebucore:frameRate__@factorDenominator":
    [
      {
        type: "video",
        target: "frameRateDen",
        transformer: (val) => toInt(val),
      },
    ],
  "ebucore:format__ebucore:videoFormat__ebucore:frameRate__#value": [
    {
      type: "video",
      target: "frameRateBase",
      transformer: (val) => toInt(val),
    },
  ],

  "ebucore:format__ebucore:videoFormat__ebucore:aspectRatio__@typeLabel": [
    { type: "video", target: "aspectRatioType", transformer: (val) => val },
  ],
  "ebucore:format__ebucore:videoFormat__ebucore:aspectRatio__@typeLabel:display__ebucore:factorNumerator__#value":
    [
      {
        type: "video",
        target: "aspectRatioNum",
        transformer: (val) => toInt(val),
      },
    ],
  "ebucore:format__ebucore:videoFormat__ebucore:aspectRatio__@typeLabel:display__ebucore:factorDenominator__#value":
    [
      {
        type: "video",
        target: "aspectRatioDen",
        transformer: (val) => toInt(val),
      },
    ],

  "ebucore:format__ebucore:videoFormat__ebucore:videoEncoding__@typeLabel": [
    { type: "video", target: "encoding", transformer: (val) => val },
  ],
  "ebucore:format__ebucore:videoFormat__ebucore:codec__ebucore:codecIdentifier__dc:identifier__#value":
    [{ type: "video", target: "codecID", transformer: (val) => val }],
  "ebucore:format__ebucore:videoFormat__ebucore:codec__ebucore:name__#value": [
    { type: "video", target: "codecIDName", transformer: (val) => val },
  ],

  "ebucore:format__ebucore:videoFormat__ebucore:bitRate__#value": [
    { type: "video", target: "bitRate", transformer: (val) => toInt(val) },
  ],
  "ebucore:format__ebucore:videoFormat__ebucore:videoTrack__@trackId": [
    { type: "video", target: "id", transformer: (val) => toInt(val) },
  ],

  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:ColorSpace__#value":
    [{ type: "video", target: "colorSpace", transformer: (val) => val }],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:ChromaSubsampling__#value":
    [{ type: "video", target: "chromaSubsampling", transformer: (val) => val }],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:colour_primaries__#value":
    [{ type: "video", target: "colorPrimaries", transformer: (val) => val }],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:transfer_characteristics__#value":
    [
      {
        type: "video",
        target: "transferCharacteristics",
        transformer: (val) => val,
      },
    ],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:matrix_coefficients__#value":
    [
      {
        type: "video",
        target: "matrixCoefficients",
        transformer: (val) => val,
      },
    ],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:colour_range__#value":
    [{ type: "video", target: "colorRange", transformer: (val) => val }],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:WritingLibrary__#value":
    [
      {
        type: "video",
        target: "encodedLibraryName",
        transformer: (val) => val.split(" ", 1)[0],
      },
      {
        type: "video",
        target: "encodedLibraryVersion",
        transformer: (val) =>
          val.split(" ", 1).length > 1 ? val.split(" ", 1)[1] : null,
      },
    ],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:Default__#value":
    [{ type: "video", target: "default", transformer: (val) => toBool(val) }],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeString__@typeLabel:Forced__#value":
    [{ type: "video", target: "forced", transformer: (val) => toBool(val) }],

  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeInteger__@typeLabel:BitDepth__@unit":
    [{ type: "video", target: "bitDepthUnit", transformer: (val) => val }],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeInteger__@typeLabel:BitDepth__#value":
    [{ type: "video", target: "bitDepth", transformer: (val) => toInt(val) }],

  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeInteger__@typeLabel:StreamSize__@unit":
    [{ type: "video", target: "streamSizeUnit", transformer: (val) => val }],
  "ebucore:format__ebucore:videoFormat__ebucore:technicalAttributeInteger__@typeLabel:StreamSize__#value":
    [{ type: "video", target: "streamSize", transformer: (val) => toInt(val) }],
};

// AUDIO_STREAM_PROPERTY_TRANSFORMERS
const audioStreamPropertyTransformers = [
  {
    source: "Format_Commercial",
    target: "codecIDName",
    transformer: (val) => val,
  },

  { source: "Format_Url", target: "formatUrl", transformer: (val) => val },
  {
    source: "Format_AdditionalFeatures",
    target: "formatAdditionalFeatures",
    transformer: (val) => val,
  },
  {
    source: "Format_Settings_Endianness",
    target: "formatSettingsEndianness",
    transformer: (val) => val,
  },

  {
    source: "Duration_String4",
    target: "durationSMTP",
    transformer: (val) => val,
  },

  {
    source: "Source_Duration",
    target: "sourceDuration",
    transformer: (val) => toFloat(val),
  },
  {
    source: "Source_Duration_String3",
    target: "sourceDurationFormated",
    transformer: (val) => val,
  },

  { source: "Delay", target: "delay", transformer: (val) => toFloat(val) },
  {
    source: "Delay_String3",
    target: "delayFormated",
    transformer: (val) => val,
  },
  { source: "Delay_Source", target: "delaySource", transformer: (val) => val },

  {
    source: "Video_Delay",
    target: "videoDelay",
    transformer: (val) => toFloat(val),
  },
  {
    source: "Video_Delay_String3",
    target: "videoDelayFormated",
    transformer: (val) => val,
  },

  { source: "BitRate_Mode", target: "bitRateMode", transformer: (val) => val },
  {
    source: "BitRate_Maximum",
    target: "bitRateMaximum",
    transformer: (val) => toInt(val),
  },

  { source: "Channels", target: "channels", transformer: (val) => toInt(val) },
  {
    source: "ChannelPositions",
    target: "channelPositions",
    transformer: (val) => val,
  },
  {
    source: "ChannelPositions_String2",
    target: "channelPositionsFormated",
    transformer: (val) => val,
  },
  {
    source: "ChannelLayout",
    target: "channelLayout",
    transformer: (val) => val,
  },

  {
    source: "SamplesPerFrame",
    target: "samplesPerFrame",
    transformer: (val) => toInt(val),
  },
  {
    source: "SamplingRate",
    target: "samplingRate",
    transformer: (val) => toInt(val),
  },
  {
    source: "SamplingCount",
    target: "samplingCount",
    transformer: (val) => toInt(val),
  },

  {
    source: "Source_FrameCount",
    target: "sourceFrameCount",
    transformer: (val) => toInt(val),
  },
  {
    source: "Compression_Mode",
    target: "compressionMode",
    transformer: (val) => val,
  },
  {
    source: "Source_StreamSize",
    target: "sourceStreamSize",
    transformer: (val) => toInt(val),
  },
  { source: "ServiceKind", target: "serviceKind", transformer: (val) => val },

  {
    source: "Encoded_Date",
    target: "encodedDate",
    transformer: (val) => toDate(val),
  },
  {
    source: "Tagged_Date",
    target: "taggedDate",
    transformer: (val) => toDate(val),
  },
];
// EBUCORE_AUDIO_STREAM_PROPERTY_TRANSFORMERS
const ebucoreAudioStreamPropertyTransformers = {
  "ebucore:format__ebucore:audioFormat": [
    {
      type: "audio",
      target: "create_container",
      transformer: (val) => {
        return {};
      },
    },
  ],
  "ebucore:format__ebucore:audioFormat__@audioFormatName": [
    { type: "audio", target: "format", transformer: (val) => val },
  ],

  "ebucore:format__ebucore:audioFormat__ebucore:audioEncoding__@typeLabel": [
    { type: "audio", target: "encoding", transformer: (val) => val },
  ],
  "ebucore:format__ebucore:audioFormat__ebucore:audioEncoding__@typeLink": [
    { type: "audio", target: "encodingUrl", transformer: (val) => val },
  ],
  "ebucore:format__ebucore:audioFormat__ebucore:codec__ebucore:codecIdentifier__dc:identifier__#value":
    [{ type: "audio", target: "codecID", transformer: (val) => val }],
  "ebucore:format__ebucore:audioFormat__ebucore:codec__ebucore:name__#value": [
    { type: "audio", target: "codecIDName", transformer: (val) => val },
  ],

  "ebucore:format__ebucore:audioFormat__ebucore:samplingRate__#value": [
    { type: "audio", target: "samplingRate", transformer: (val) => toInt(val) },
  ],
  "ebucore:format__ebucore:audioFormat__ebucore:bitRate__#value": [
    { type: "audio", target: "bitRate", transformer: (val) => toInt(val) },
  ],
  "ebucore:format__ebucore:audioFormat__ebucore:bitRateMode__#value": [
    {
      type: "audio",
      target: "bitRateMode",
      transformer: (val) => (val.toLowerCase() === "constant" ? "CBR" : "VBR"),
    },
  ],

  "ebucore:format__ebucore:audioFormat__ebucore:audioTrack__@trackId": [
    { type: "audio", target: "id", transformer: (val) => toInt(val) },
  ],
  "ebucore:format__ebucore:audioFormat__ebucore:audioTrack__@trackLanguage": [
    { type: "audio", target: "languageCode", transformer: (val) => val },
  ],

  "ebucore:format__ebucore:audioFormat__ebucore:channels__#value": [
    { type: "audio", target: "channels", transformer: (val) => toInt(val) },
  ],

  "ebucore:format__ebucore:audioFormat__ebucore:technicalAttributeString__@typeLabel:ChannelPositions__#value":
    [{ type: "audio", target: "channelPositions", transformer: (val) => val }],
  "ebucore:format__ebucore:audioFormat__ebucore:technicalAttributeString__@typeLabel:ChannelLayout__#value":
    [{ type: "audio", target: "channelLayout", transformer: (val) => val }],
  "ebucore:format__ebucore:audioFormat__ebucore:technicalAttributeString__@typeLabel:Endianness__#value":
    [
      {
        type: "audio",
        target: "formatSettingsEndianness",
        transformer: (val) => val,
      },
    ],

  "ebucore:format__ebucore:audioFormat__ebucore:technicalAttributeInteger__@typeLabel:StreamSize__@unit":
    [{ type: "audio", target: "streamSizeUnit", transformer: (val) => val }],
  "ebucore:format__ebucore:audioFormat__ebucore:technicalAttributeInteger__@typeLabel:StreamSize__#value":
    [{ type: "audio", target: "streamSize", transformer: (val) => toInt(val) }],
};

// TEXT_STREAM_PROPERTY_TRANSFORMERS
const textStreamPropertyTransformers = [
  { source: "CodecID_Info", target: "codecIDName", transformer: (val) => val },
  {
    source: "ElementCount",
    target: "elementCount",
    transformer: (val) => toInt(val),
  },
  { source: "Title", target: "title", transformer: (val) => val },
];
//EBUCORE_TEXT_STREAM_PROPERTY_TRANSFORMERS
const ebucoreTextStreamPropertyTransformers = {
  "ebucore:format__ebucore:dataFormat": [
    {
      type: "text",
      target: "create_container",
      transformer: (val) => {
        return {};
      },
    },
  ],
  "ebucore:format__ebucore:dataFormat__@dataFormatName": [
    { type: "text", target: "format", transformer: (val) => val },
  ],
  "ebucore:format__ebucore:dataFormat__@dataTrackId": [
    { type: "text", target: "id", transformer: (val) => toInt(val) },
  ],

  "ebucore:format__ebucore:dataFormat__ebucore:captioningFormat__@language": [
    { type: "text", target: "languageCode", transformer: (val) => val },
  ],
  "ebucore:format__ebucore:dataFormat__ebucore:captioningFormat__@typeLabel": [
    { type: "text", target: "typeLabel", transformer: (val) => val },
  ],

  "ebucore:format__ebucore:dataFormat__ebucore:codec__ebucore:codecIdentifier__dc:identifier__#value":
    [{ type: "text", target: "codecID", transformer: (val) => val }],
};

// MENU_STREAM_PROPERTY_TRANSFORMERS
const menuStreamPropertyTransformers = [
  {
    source: "Chapters_Pos_Begin",
    target: "chaptersPosBegin",
    transformer: (val) => toInt(val),
  },
  {
    source: "Chapters_Pos_End",
    target: "chaptersPosEnd",
    transformer: (val) => toInt(val),
  },
];

/**
 * Templates
 */
// INFO_STREAM_TEMPLATE
const infoStreamTemplate = {
  uuid: null,

  streamCount: null,
  videoCount: 0,
  audioCount: 0,
  textCount: 0,
  menuCount: 0,

  videoFormat: null,
  videoCodec: null,
  videoLanguage: null,

  audioFormat: null,
  audioCodec: null,
  audioLanguage: null,

  textFormat: null,
  textCodec: null,
  textLanguage: null,

  filePath: null,
  folderName: null,
  fileName: null,
  fileExtension: null,

  format: null,
  formatExtensions: null,
  formatProfile: null,
  internetMediaType: null,
  codecID: null,
  codecIDUrl: null,
  codecIDCompatible: null,

  fileSize: 0,
  fileSizeFormated: null,

  duration: 0.0,
  durationFormated: null,
  durationSMTP: null,
  durationEBUCore: null,

  overallBitRateMode: null,
  overallBitRate: null,
  overallBitRateUnit: "bps",

  frameRate: 0.0,
  frameCount: 0,
  streamSize: 0,
  headerSize: 0,
  dataSize: 0,
  footerSize: 0,
  isStreamable: false,

  title: null,
  movie: null,
  performer: null,
  genre: null,

  encodedDate: null,
  taggedDate: null,
  fileModifiedDate: null,
};

// COMMON_STREAM_TEMPLATE
const commonStreamTemplate = {
  uuid: null,
  id: null,
  streamCount: null,
  streamOrder: 0,
  typeOrder: 0,
};

// COMMON_MEDIA_STREAM_TEMPLATE
const commonMediaStreamTemplate = {
  format: null,
  codecID: null,

  duration: 0.0,
  durationFormated: null,

  bitRate: null,

  frameRate: 0.0,
  frameCount: 0,

  streamSize: 0,
  streamSizeUnit: "byte",

  languageCode: null,
  languageCode3: null,
  language: null,

  default: false,
  forced: false,
};

// VIDEO_STREAM_TEMPLATE
const videoStreamTemplate = {
  codecIDName: null,
  encoding: null,
  encodingUrl: null,

  formatUrl: null,
  formatProfile: null,
  formatLevel: null,
  formatTier: null,

  formatSettings: null,
  formatSettingsCABAC: false,
  formatSettingsRefFrames: null,
  formatSettingsGOP: null,

  internetMediaType: null,

  fileName: null,
  fileExtension: null,

  durationSMTP: null,
  durationEBUCore: null,

  delay: 0.0,
  delayFormated: null,
  delaySource: null,

  width: null,
  widthUnit: "pixel",
  height: null,
  heightUnit: "pixel",
  storedHeight: null,
  sampledWidth: null,
  sampledHeight: null,

  pixelAspectRatio: null,
  displayAspectRatio: null,
  displayAspectRatioString: null,
  displayAspectRatioNum: null,
  displayAspectRatioDen: null,

  rotation: 0.0,

  frameRateMode: null,
  frameRateBase: null,
  frameRateNum: null,
  frameRateDen: null,

  colorSpace: null,
  chromaSubsampling: null,
  bitDepth: 0,
  bitDepthUnit: "bit",
  scanType: null,

  colorDescriptionPresent: false,
  colorRange: null,
  colorPrimaries: null,
  transferCharacteristics: null,
  matrixCoefficients: null,

  encodedLibraryName: null,
  encodedLibraryVersion: null,

  encodedDate: null,
  taggedDate: null,
};

// AUDIO_STREAM_TEMPLATE
const audioStreamTemplate = {
  codecIDName: null,
  encoding: null,
  encodingUrl: null,

  formatUrl: null,
  formatAdditionalFeatures: null,
  formatSettingsEndianness: null,

  durationSMTP: null,
  durationEBUCore: null,

  sourceDuration: 0.0,
  sourceDurationFormated: null,

  delay: 0.0,
  delayFormated: null,
  delaySource: null,

  videoDelay: 0.0,
  videoDelayFormated: null,

  bitRateMode: null,
  bitRateMaximum: 0,

  channels: 0,
  channelPositions: null,
  channelPositionsFormated: null,
  channelLayout: null,

  samplesPerFrame: 0,
  samplingRate: 0,
  samplingCount: 0,

  sourceFrameCount: 0,
  compressionMode: null,
  sourceStreamSize: 0,
  serviceKind: null,

  encodedDate: null,
  taggedDate: null,
};

// TEXT_STREAM_TEMPLATE
const textStreamTemplate = {
  codecIDName: null,
  elementCount: 0,
  title: null,
  typeLabel: null,
};

// MENU_STREAM_TEMPLATE
const menuStreamTemplate = {
  chaptersPosBegin: 0,
  chaptersPosEnd: 0,
  extra: null,
};

/**
 * Parsers
 */

/**
 * Parse info stream
 * @param {Object} stream
 * @returns {Object}
 */
function parseInfoStream(stream) {
  const container = Object.assign({}, infoStreamTemplate);
  for (const t of infoStreamPropertyTransformers) {
    if (t.source in stream) {
      container[t.target] = t.transformer(stream[t.source]);
    }
  }
  return container;
}

/**
 * Parse video stream
 * @param {Object} stream
 * @returns Object
 */
function parseVideoStream(stream) {
  const container = Object.assign(
    {},
    commonStreamTemplate,
    commonMediaStreamTemplate,
    videoStreamTemplate
  );
  for (const t of commonStreamPropertyTransformers.concat(
    commonMediaStreamPropertyTransformers,
    videoStreamPropertyTransformers
  )) {
    if (t.source in stream) {
      container[t.target] = t.transformer(stream[t.source]);
    }
  }
  return container;
}

/**
 * Parse audio stream
 * @param {Object} stream
 * @returns Object
 */
function parseAudioStream(stream) {
  const container = Object.assign(
    {},
    commonStreamTemplate,
    commonMediaStreamTemplate,
    audioStreamTemplate
  );
  for (const t of commonStreamPropertyTransformers.concat(
    commonMediaStreamPropertyTransformers,
    audioStreamPropertyTransformers
  )) {
    if (t.source in stream) {
      container[t.target] = t.transformer(stream[t.source]);
    }
  }
  return container;
}

/**
 * Parse text stream
 * @param {Object} stream
 * @returns Object
 */
function parseTextStream(stream) {
  const container = Object.assign(
    {},
    commonStreamTemplate,
    commonMediaStreamTemplate,
    textStreamTemplate
  );
  for (const t of commonStreamPropertyTransformers.concat(
    commonMediaStreamPropertyTransformers,
    textStreamPropertyTransformers
  )) {
    if (t.source in stream) {
      container[t.target] = t.transformer(stream[t.source]);
    }
  }
  return container;
}

/**
 * Parse menu stream
 * @param {Object} stream
 * @returns Object
 */
function parseMenuStream(stream) {
  const container = Object.assign({}, commonStreamTemplate, menuStreamTemplate);
  for (const t of commonStreamPropertyTransformers.concat(
    menuStreamPropertyTransformers
  )) {
    if (t.source in stream) {
      container[t.target] = t.transformer(stream[t.source]);
    }
  }
  if (stream.extra) {
    container.extra = {};
    for (const [ts, val] of Object.entries(stream.extra)) {
      const ts2 = toDuration(ts);
      if (ts2) {
        container.extra[ts2] = val;
      }
    }
  }
  return container;
}

/**
 * Parse ebuCore data.
 * This is a recursive function.
 * @param {Object} data The EBUCORE data
 * @param {Object} container The target container
 * @param {Object | null} cache An intermediary object
 * @param {Object} transformers Collection of transformers
 * @param {Array} path Path to the current data as array
 * @returns void
 */
function parseEbucore(data, container, cache, transformers, path) {
  // Create new cache container
  const p = path.join("__");
  if (p in transformers) {
    if (!cache || Object.keys(cache).length > 0) {
      for (const t of transformers[p]) {
        if (!(t.type in container)) {
          continue;
        }
        if (t.target !== "create_container") {
          continue;
        }
        cache = t.transformer(data);
        container[t.type].push(cache);
        break;
      }
    }
  }

  const isArray = Array.isArray(data);
  const isObject = data !== null && !isArray && typeof data === "object";

  // Parse dict
  if (isObject) {
    for (const [key, val] of Object.entries(data)) {
      const p = path.concat(key);
      const k = p.join("__");
      if (key === "@typeLabel" && !(k in transformers)) {
        const d = Object.assign({}, data);
        delete d["@typeLabel"];
        parseEbucore(
          d,
          container,
          cache,
          transformers,
          path.concat(`@typeLabel:${val}`)
        );
        return;
      }
      parseEbucore(val, container, cache, transformers, p);
    }
    return;
  }

  // Parse list
  if (isArray) {
    for (const val of data) {
      parseEbucore(val, container, cache, transformers, path);
    }
    return;
  }

  // Parse scalar
  if (p in transformers) {
    for (const t of transformers[p]) {
      if (!(t.type in container)) {
        continue;
      }
      if (t.type === "info") {
        container["info"][t.target] = t.transformer(data);
        continue;
      }
      if (!cache) {
        continue;
      }
      cache[t.target] = t.transformer(data);
    }
  }
}

/**
 * Parse metadata.
 * This function takes the raw mediainfo
 * JSON and EBUCore data and parses and merges it.
 * @param {Object} metadata The JSON and EBUCORE data
 * @returns Object
 */
function parseMetadata(metadata) {
  let info = metadata.info;

  // Check if info is valid
  if (
    !info ||
    !info.media ||
    !info.media.track ||
    info.media.track.length === 0
  ) {
    return null;
  }
  info = info.media.track;

  let ebucore = metadata.ebucore;
  const container = {
    hasInfo: false,
    hasStreams: false,
    hasAudio: false,
    hasVideo: false,
    hasText: false,
    hasMenu: false,

    info: null,
    audio: [],
    video: [],
    text: [],
    menu: [],

    default: {
      audio: null,
      video: null,
      text: null,
      menu: null,
    },
  };

  // Parse data
  for (const stream of info) {
    // Check if stream is valid
    if (!stream || !stream["@type"]) {
      continue;
    }

    const streamType = stream["@type"].toLowerCase();

    // Process info stream
    if (streamType === "general") {
      container.info = parseInfoStream(stream);
      container.hasInfo = true;
      continue;
    }

    // Process video stream
    if (streamType === "video") {
      const obj = parseVideoStream(stream);
      const pos = container.video.length;
      container.video.push(obj);
      if (!container.hasVideo || obj["default"]) {
        container.default.video = pos;
      }
      container.hasStreams = true;
      container.hasVideo = true;
      continue;
    }

    // Process audio stream
    if (streamType === "audio") {
      const obj = parseAudioStream(stream);
      const pos = container.audio.length;
      container.audio.push(obj);
      if (!container.hasAudio || obj["default"]) {
        container.default.audio = pos;
      }
      container.hasStreams = true;
      container.hasAudio = true;
      continue;
    }

    // Process text stream
    if (streamType === "text") {
      const obj = parseTextStream(stream);
      const pos = container.text.length;
      container.text.push(obj);
      if (!container.hasText || obj["default"]) {
        container.default.text = pos;
      }
      container.hasStreams = true;
      container.hasText = true;
      continue;
    }

    // Process menu stream
    if (streamType === "menu") {
      const obj = parseMenuStream(stream);
      const pos = container.menu.length;
      container.menu.push(obj);
      if (!container.hasMenu || obj["default"]) {
        container.default.menu = pos;
      }
      container.hasStreams = true;
      container.hasMenu = true;
      continue;
    }
  }

  // Parse ebucore
  if (!ebucore["ebucore:ebuCoreMain"]) {
    return container;
  }
  ebucore = ebucore["ebucore:ebuCoreMain"];

  if (!ebucore["ebucore:coreMetadata"]) {
    return container;
  }
  ebucore = ebucore["ebucore:coreMetadata"];
  const ebucoreContainer = {
    info: {},
    audio: [],
    video: [],
    text: [],
    menu: [],
  };
  const ebucoreTransformers = Object.assign(
    {},
    ebucoreInfoStreamPropertyTransformers,
    ebucoreVideoStreamPropertyTransformers,
    ebucoreAudioStreamPropertyTransformers,
    ebucoreTextStreamPropertyTransformers
  );

  parseEbucore(ebucore, ebucoreContainer, null, ebucoreTransformers, []);

  // Update parsed data
  for (const [t, c] of Object.entries(ebucoreContainer)) {
    if (!(t in container)) {
      continue;
    }
    if (t === "info") {
      Object.assign(container.info, c);
      continue;
    }
    for (const obj of c) {
      if (!obj.id) {
        continue;
      }
      for (const stream of container[t]) {
        if (stream.id === obj.id) {
          Object.assign(stream, obj);
          break;
        }
      }
    }
  }

  // Post processing
  if (container.hasInfo) {
    container.info.audioCount = container.audio.length;
    container.info.videoCount = container.video.length;
    container.info.textCount = container.text.length;
    container.info.menuCount = container.menu.length;

    container.info.streamCount =
      container.info.audioCount +
      container.info.videoCount +
      container.info.textCount +
      container.info.menuCount;
  }

  return container;
}

/**
 * Get metadata.
 * Pass path to media file as argument.
 * Returns a promise.
 * Resolves with metadata object.
 * @returns Promise<Object>
 */
async function getMetadata(filePath) {
  return new Promise((resolve, reject) => {
    fs.existsSync(filePath) || reject("File not found");
    let container = {};
    exec(
      `${mediainfo_bin} --Full --Output=JSON "${filePath}"`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        if (stderr) {
          reject(stderr);
        }
        try {
          container.info = JSON.parse(stdout);
          exec(
            `${mediainfo_bin} --Full --Output=EBUCore_JSON "${filePath}"`,
            (error, stdout, stderr) => {
              if (error) {
                reject(error);
              }
              if (stderr) {
                reject(stderr);
              }
              try {
                container.ebucore = JSON.parse(stdout);
                container = parseMetadata(container);
                if (!container) {
                  reject("Metadata parsing failed");
                }
                resolve(container);
              } catch (e) {
                reject(e);
              }
            }
          );
        } catch (e) {
          reject(e);
        }
      }
    );
  });
}

/**
 * Module exports
 */
module.exports = {
  getMetadata,

  toBool,
  toInt,
  toFloat,
  toArray,
  toDurationString,
  toDate,
  toNumerator,
  toDenominator,
};
