/**
 * TrackController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { exists } = require("grunt");

module.exports = {
  location: async (req, res) => {
    sails.log.debug("TrackController.location function Started");
    // await Track.destroy({ _id: { "!=": null } });
    // await SocketInfo.destroy({ _id: { "!=": null } });
    // await DriverSocketInfo.destroy({ _id: { "!=": null } });
    // return res.ok();
    const location = req.param("location");
    const driverId = req.param("driverId");
    const isOnline = req.param("isOnline");
    const businessId = req.param("businessId") ? req.param("businessId") : null;
    const taskId = req.param("jobId") || req.param("taskId");
    const hasFixedZone = req.param("hasFixedZone");
    const driverDetails = req.param("driverDetails");
    const isBeat = req.param("is_beat") ? req.param("is_beat") : false;
    const deviceInfo = req.param("deviceInfo");
    const appVersion = req.param("appVersion");

    try {
      data = null;
      // const data = await sails.helpers.redis.find("user_" + driverId);
      if (!_.isEmpty(data) && data.length > 0) {
        sails.log.debug("TrackController.location Driver is offline");
        return res.ok();
      }
      // This is for onJob tracking
      let rec = {
        location: location,
        driverId: driverId,
        isOnline: isOnline,
        taskId: taskId,
        driverDetails: driverDetails,
        hasFixedZone: hasFixedZone,
      };
      if (businessId) {
        rec.businessId = businessId;
      }
      const insertion = await Track.create(rec);

      const socketRooms = await sails.helpers.joinRoom(businessId);

      sails.sockets.broadcast(socketRooms, "trackingInfo", {
        location: location,
        driverId: driverId,
        taskId: taskId,
        businessId: businessId,
        driverDetails: driverDetails,
        isBeat: isBeat,
        deviceInfo: deviceInfo,
        appVersion: appVersion,
        isOnline: isOnline,
        hasFixedZone: hasFixedZone,
      });
      const driverSocketRooms = await sails.helpers.joinRoom.with({
        driverId: driverId,
      });
      sails.sockets.broadcast(driverSocketRooms, "expressDriverInfo", {
        location: location,
        driverId: driverId,
        taskId: taskId,
        businessId: businessId,
        driverDetails: driverDetails,
        isBeat: isBeat,
        deviceInfo: deviceInfo,
        appVersion: appVersion,
        isOnline: isOnline,
        hasFixedZone: hasFixedZone,
      });
      sails.log.debug({
        location: location,
        driverId: driverId,
        taskId: taskId,
        businessId: businessId,
        driverDetails: driverDetails,
        isBeat: isBeat,
        deviceInfo: deviceInfo,
        appVersion: appVersion,
        isOnline: isOnline,
        hasFixedZone: hasFixedZone,
      });
    } catch (err) {
      sails.log.error({ errorInTrackingController: err });
      sails.log.error(
        "TrackingController.location Tracking.add error: ",
        err.message || err
      );
    }
    sails.log.debug("TrackController.location function Ended");
    return res.ok();
  },

  geofence: async (req, res) => {
    sails.log.debug(
      "TrackingController.geofence req.body: ",
      JSON.stringify(req.body)
    );
    return res.json({ success: true });
  },

  odometer: async (req, res) => {
    sails.log.debug(
      "TrackingController.odometer req.body: ",
      JSON.stringify(req.body)
    );
    return res.json({ success: true });
  },
  subscribe: function (req, res) {
    if (!req.isSocket) {
      return res.badRequest();
    }

    sails.sockets.join(req.socket, "track");

    return res.ok();
  },
};
