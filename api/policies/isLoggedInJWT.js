/**
 * isLoggedInJWT
 *
 * @module      :: Policy
 * @description :: Checks that user is logged in and adds user to input
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

module.exports = async (req, res, next) => {
  sails.log.debug("policy JWT");
  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.forbidden();

  let user;

  try {
    user = await sails.helpers.jwt.verifyToken.with({ token });
  } catch (e) {
    sails.log.error(e);
    return res.forbidden();
  }
  if (user) {
    sails.log.debug(`policy isLoggedIn user_id: ${user.id} path: ${req.path}`);
    req.body.user = user;
    return next();
  }

  return res.unauthorized();
};
