import _ from "lodash"
require('dotenv').config()
console.log(process.env.OBJECT_VAL)
const objectval = JSON.parse(process.env.OBJECT_VAL);
console.log(objectval)
const defaultConfig = objectval['development'];
const environment='development';
// const environment = "production"

const environmentConfig = objectval[environment];
// console.log(environmentConfig);

const finalConfig = _.merge(defaultConfig, environmentConfig);
global.gConfig = finalConfig;