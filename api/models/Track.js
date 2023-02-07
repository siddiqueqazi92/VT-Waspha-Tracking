/**
 * Track.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    location: {
      type: "ref",
      required: true,
    },

    driverId: {
      type: "number",
      required: true,
    },
    isOnline: {
      type: "boolean",
      required: false,
    },
    hasFixedZone: {
      type: "boolean",
      required: false,
    },

    taskId: {
      type: "string",
      allowNull: true,
    },

    businessId: {
      type: "number",
      required: false,
      allowNull: true,
    },

    driverDetails: {
      type: "ref",
      required: true,
    },
  },

  afterCreate: function (entry, cb) {
    sails.sockets.broadcast("track", "new_entry", entry);
    cb();
  },
};
