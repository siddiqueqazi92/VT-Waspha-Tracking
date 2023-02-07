/**
 * isTokenValid
 *
 * @module      :: Policy
 * @description :: Check endpoint is called with cyfe private key
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
const moment = require("moment");
const crypto = require("crypto");
module.exports = async (req, res, next) => {
  return next();
  // csrf token should contain only uppercase letter, lowercase letters, digits and '-' character
  sails.log.debug({
    driverId: req.param("userId"),
  });
  if (req.param("secretKey") === global.secretKey) {
    if (req.param("token")) {
      var decipher = crypto.createDecipher("aes-256-cbc", "d6F3Efeq");
      var decrypted = decipher.update(req.param("token"), "hex", "utf8");
      decrypted += decipher.final("utf8");
      var splited = decrypted.split("$");
      if (req.param("userId") !== undefined || req.param("userId") !== null) {
        if (
          moment(splited[1]).diff(moment()) > 0 &&
          req.param("userId") == splited[2]
        ) {
          return next();
        }
      } else {
        sails.log.error({
          msg: "policy violated",
          status: false,
          err: "Missing Param",
        });
        return res.badRequest({ status: false, err: "Missing Param" });
      }
      sails.log.error({
        msg: "policy violated",
        status: false,
        err: "Token invalid",
      });
      return res.badRequest({ status: false, err: "Token invalid" });
    } else {
      sails.log.error({
        msg: "policy violated",
        status: false,
        err: "token required",
      });
      return res.badRequest({ status: false, err: "token required" });
    }
  } else {
    sails.log.error({
      msg: "policy violated",
      status: false,
      err: "unauthorized user",
    });
    return res.badRequest({ status: false, err: "unauthorized user" });
  }
};
