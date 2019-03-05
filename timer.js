"use strict";

function timer(callback) {
  setTimeout(() => {
    callback && callback();
  }, 1000);
}

module.exports = timer;
