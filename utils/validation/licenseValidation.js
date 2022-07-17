/**
 * licenseValidation.js
 * @description :: validate each post and put request as per license model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of license */
exports.schemaKeys = joi.object({
  serialKey: joi.string().allow(null).allow(''),
  productId: joi.string().allow(null).allow(''),
  validFrom: joi.string().allow(null).allow(''),
  validTill: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of license for updation */
exports.updateSchemaKeys = joi.object({
  serialKey: joi.string().allow(null).allow(''),
  productId: joi.string().allow(null).allow(''),
  validFrom: joi.string().allow(null).allow(''),
  validTill: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of license for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      serialKey: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      productId: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      validFrom: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      validTill: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
