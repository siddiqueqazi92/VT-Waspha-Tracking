var moment = require("moment");
module.exports = {
  friendlyName: "Get recent drivers",

  description: "",

  inputs: {},

  exits: {
    invalid: {
      responseType: "badRequest",
      description: "Invalid Business Id",
    },
  },

  fn: async function (inputs, exits) {
    sails.log.debug("Calling get-recent-drivers action");
    let drivers = [];
    try {
      let now = moment();
      var start = now.valueOf();
      var end = now.subtract(6, "hours").valueOf();

      sails.log.debug({ startTime: start, endTime: end });

      // Get list of all Drivers on connection (only for kiffgo admins)
      var db = Track.getDatastore().manager;
      drivers = await db
        .collection(Track.tableName)
        .aggregate([
          {
            $match: {
              createdAt: {
                $gte: end,
                $lte: start,
              },
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
              driverId: { $last: "$driverId" },
              businessId: { $last: "$businessId" },
            },
          },
          {
            $project: {
              _id: "$driverId",
              driverId: "$driverId",
              businessId: "$businessId",
            },
          },
        ])
        .toArray();

      console.log({ listOfRecentDrivers: drivers });

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
