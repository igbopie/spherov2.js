[![npm version](https://img.shields.io/npm/v/spherov2.js.svg?style=flat)](https://www.npmjs.org/package/spherov2.js)
[![Build Status](https://travis-ci.org/igbopie/spherov2.js.svg?branch=master)](https://travis-ci.org/igbopie/spherov2.js)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5c57b5d2addf2ea48c34/test_coverage)](https://codeclimate.com/github/igbopie/spherov2.js/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/5c57b5d2addf2ea48c34/maintainability)](https://codeclimate.com/github/igbopie/spherov2.js/maintainability)
# Sphero API V2

Work in progress. Some commands are functional but not ready for prime time.

## Supported Robots

TODO

## Contributors - Special Thanks!

TODO

## Examples

### Sphero Mini - Let the main LED blink in different colors

```javascript
const { Scanner, Utils } = require('spherov2.js');

const makeItBlink = async () => {
  const sphero = await Scanner.findSpheroMini();
  
  if (!sphero) return console.log('sphero mini not available!');
  
  while (true) {
    await sphero.setMainLedColor(255, 0, 0);
    await Utils.wait(200);
    await sphero.setMainLedColor(255, 255, 0);
    await Utils.wait(200);
    await sphero.setMainLedColor(0, 255, 0);
    await Utils.wait(200);
    await sphero.setMainLedColor(0, 255, 255);
    await Utils.wait(200);
    await sphero.setMainLedColor(0, 0, 255);
    await Utils.wait(200);
    await sphero.setMainLedColor(255, 0, 255);
    await Utils.wait(200);
  }
};

makeItBlink();
```

### Sphero Mini - Roll ahead for 2 seconds
```javascript
const { Scanner, Utils } = require('spherov2.js');

const makeItRoll = async () => {
  const sphero = await Scanner.findSpheroMini();
  
  if (!sphero) return console.log('sphero mini not available!');
  
  const speed = 100;
  const headingInDegrees = 0;
  const timeToRollInMilliseconds = 2000;
  const flags = [];
  
  await sphero.rollTime(speed, headingInDegrees, timeToRollInMilliseconds, flags);
};

makeItRoll();
```