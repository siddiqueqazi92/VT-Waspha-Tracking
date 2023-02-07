var moment = require("moment");
module.exports = {
  friendlyName: "Single driver",

  description: "",

  inputs: {
    businessId: {
      type: "number",
      required: true,
    },
    driverId: {
      type: "number",
      required: true,
    },
  },

  exits: {
    invalid: {
      responseType: "badRequest",
      description: "Invalid Business Id",
    },
  },

  fn: async function ({ businessId, driverId }, exits) {
    sails.log.debug("Calling get-drivers action of businessId:" + businessId);
    let driver = [];
    try {
      let now = moment();
      var start = now.startOf("day").valueOf();
      var end = now.endOf("day").valueOf();

      // Get list of all Drivers on connection (only for kiffgo admins)
      var db = Track.getDatastore().manager;
      driver = await db
        .collection(Track.tableName)
        .aggregate([
          {
            $match: {
              createdAt: {
                $gte: start,
                $lte: end,
              },
              businessId: businessId,
              driverId: driverId,
            },
          },
          {
            $sort: {
              createdAt: 1,
            },
          },
          {
            $group: {
              _id: "$driverId",
              location: { $last: "$location" },
              driverId: { $last: "$driverId" },
              taskId: { $last: "$taskId" },
              businessId: { $last: "$businessId" },
              driverDetails: { $last: "$driverDetails" },
              createdAt: { $last: "$createdAt" },
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
            },
          },
        ])
        .toArray();

      return exits.success({
        status: true,
        data: { driverLocation: driver },
        message: "Driver Latest Location",
      });
    } catch (err) {
      sails.log.error("could not send driver ", err.message || err);
    }
    return exits.success({
      status: true,
      data: { driverLocation: driver },
      message: "Driver Latest Location",
    });
  },
};
