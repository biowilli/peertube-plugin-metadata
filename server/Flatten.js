/**
 * Flatten JSON/JS object
 * @param {Object|Array} data JSON/JS object
 * @param {null|Array|String} path Path prefix
 * @returns Object
 */
function flatten(data, path = null) {
  const container = {};
  if (path === null) {
    path = [];
  }
  if (!Array.isArray(path)) {
    path = [path];
  }
  flattenParser(container, path, data);
  return container;
}

/**
 * Recursive function for flatten parser
 * @param {Object} container Collecting container
 * @param {Array} path Path to current value
 * @param {Any} data Current value
 * @returns void
 */
function flattenParser(container, path, data) {
  const dataT = typeof data;
  if (dataT === "undefined") {
    return;
  }
  if (dataT === "object" && data === null) {
    container[path.join(".")] = null;
    return;
  }
  if (dataT === "object") {
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        flattenParser(container, path.concat(`__${i}__`), data[i]);
      }
      return;
    }
    for (const key of Object.keys(data)) {
      flattenParser(container, path.concat(key), data[key]);
    }
    return;
  }
  container[path.join(".")] = data;
}

module.exports = {
  flatten,
};
