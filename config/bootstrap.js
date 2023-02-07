/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
var moment = require("moment");
module.exports.bootstrap = async function () {
  now = moment();
  var start = now.startOf("day").valueOf();
  var end = now.endOf("day").valueOf();

  sails.io.on("connect", async (socket) => {
    sails.log("sails.io.on(connect) started");
    socket.on("business", async (soc) => {
      sails.log("socket.on(business) started");
      console.log(soc.userID);
      console.log(soc);
      var check = await SocketInfo.find({ userId: soc.userID });
      if (check) {
        await SocketInfo.destroy({ userId: soc.userID });
      }

      sails.sockets.join(socket.id, "business-" + soc.userID);
      await SocketInfo.create({
        socketId: socket.id,
        userId: soc.userID,
        roomName: "business-" + soc.userID,
      });

      sails.log.debug(
        "Business Socket",
        JSON.stringify({ business_socketID: socket.id })
      );
      sails.log("socket.on(business) ended");
    });
    socket.on("express_driver", async (soc) => {
      sails.log("socket.on(express_driver) started");
      console.log(soc.userID);
      console.log(soc);
      var check = await DriverSocketInfo.find({ userId: soc.userID });
      if (check) {
        await DriverSocketInfo.destroy({ userId: soc.userID });
      }

      sails.sockets.join(socket.id, "driver-" + soc.userID);
      await DriverSocketInfo.create({
        socketId: socket.id,
        userId: soc.userID,
        roomName: "driver-" + soc.userID,
      });

      sails.log.debug(
        "Driver Socket",
        JSON.stringify({ driver_socketID: socket.id })
      );
      sails.log("socket.on(express_driver) ended");
    });

    // handle get All drivers
    // socket.on("getAllDrivers", async (soc, callback) => {
    //   // Get list of all Drivers on connection (only for kiffgo admins)
    //   console.log({ BusinessUserID: soc.userID, start: start, end: end });
    //   var db = Track.getDatastore().manager;
    //   const drivers = await db
    //     .collection(Track.tableName)
    //     .aggregate([
    //       {
    //         $match: {
    //           createdAt: {
    //             $gte: start,
    //             $lte: end,
    //           },
    //           businessId: soc.userID,
    //         },
    //       },
    //       {
    //         $sort: {
    //           createdAt: 1,
    //         },
    //       },
    //       {
    //         $group: {
    //           _id: "$driverId",
    //           location: { $last: "$location" },
    //           driverId: { $last: "$driverId" },
    //           taskId: { $last: "$taskId" },
    //           businessId: { $last: "$businessId" },
    //           driverDetails: { $last: "$driverDetails" },
    //           createdAt: { $last: "$createdAt" },
    //         },
    //       },
    //       {
    //         $project: {
    //           _id: "$driverId",
    //           location: "$location",
    //           driverId: "$driverId",
    //           taskId: "$taskId",
    //           businessId: "$businessId",
    //           driverDetails: "$driverDetails",
    //           createdAt: "$createdAt",
    //         },
    //       },
    //     ])
    //     .toArray();
    //   console.log({ listOfDrivers: drivers });
    //   callback({ driverList: drivers });
    // });
    sails.log("sails.io.on(connect) ended");
  });
};
