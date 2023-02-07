var moment = require("moment");
module.exports = {
  friendlyName: "Get drivers",

  description: "",

  inputs: {
    businessId: {
      type: "number",
      required: false,
    },
    hasFixedZone: {
      type: "boolean",
      required: false,
    },
  },

  exits: {
    invalid: {
      responseType: "badRequest",
      description: "Invalid Business Id",
    },
  },

  fn: async function ({ businessId = null, hasFixedZone = false }, exits) {
    sails.log.debug(
      `Calling get-drivers action of businessId:${businessId},hasFixedZone:${hasFixedZone}`
    );
    let drivers = [];

    try {
      // let now = moment();
      // var start = now.startOf("day").valueOf();
      // var end = now.endOf("day").valueOf();
      let where = {};
      if (businessId) {
        where.businessId = businessId;
      }
      if (hasFixedZone) {
        where.hasFixedZone = hasFixedZone;
      }
      // Get list of all Drivers on connection (only for kiffgo admins)
      var db = Track.getDatastore().manager;
      drivers = await db
        .collection(Track.tableName)
        .aggregate([
          {
            $match: where,
          },
          {
            $sort: {
              createdAt: 1,
            },
          },
          {
            $group: {
              _id: "$driverId",
              createdAt: { $last: "$createdAt" },
              location: { $last: "$location" },
              driverId: { $last: "$driverId" },
              taskId: { $last: "$taskId" },
              businessId: { $last: "$businessId" },
              driverDetails: { $last: "$driverDetails" },
              isOnline: { $last: "$isOnline" },
            },
          },
          {
            $project: {
              _id: "$driverId",
              location: "$location",
              driverId: "$driverId",
              taskId: "$taskId",
              businessId: "$businessId",
              driverDetails: "$driverDetails",
              createdAt: "$createdAt",
              isOnline: "$isOnline",
            },
          },
        ])
        .toArray();

      return exits.success({
        status: true,
        data: { listOfDrivers: drivers },
        message: "Driver List",
      });
    } catch (err) {
      sails.log.error("could not send drivers ", err.message || err);
    }
    return exits.success({
      status: true,
      data: { listOfDrivers: drivers },
      message: "Driver List",
    });
  },
};
