var moment = require("moment");
module.exports = {
  friendlyName: "Get eta drivers location list",

  description: "",

  inputs: {
    driverList: {
      type: "ref",
      required: false,
    },
  },

  exits: {
    invalid: {
      responseType: "badRequest",
      description: "Invalid data",
    },
  },

  fn: async function ({ driverList = null }, exits) {
    sails.log.debug("Calling eta-driver-list action");
    let drivers = [];
    try {
      let now = moment();
      var start = now.startOf("day").valueOf();
      var end = now.endOf("day").valueOf();

      // Get list of all Drivers on connection (only for kiffgo admins)
      var db = Track.getDatastore().manager;
      drivers = await db
        .collection(Track.tableName)
        .aggregate([
          {
            $match: {
              taskId: { $exists: true },
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
