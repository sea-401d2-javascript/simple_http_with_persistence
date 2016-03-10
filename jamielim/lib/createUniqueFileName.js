"use strict";

function createUniqueFileName() {
  const uuid = require("uuid");
  return uuid.v1() + ".json";
}

module.exports = createUniqueFileName;