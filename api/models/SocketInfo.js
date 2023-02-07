/**
 * SocketInfo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    socketId: {
      type: "string",
      required: true,
    },
    userId: {
      type: "number",
      required: true,
    },
    roomName: {
      type: "string",
      required: true,
    },
  },
};
