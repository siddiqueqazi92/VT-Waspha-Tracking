module.exports = {
  friendlyName: "Join room",

  description: "",

  inputs: {
    businessId: {
      type: "number",
    },
    driverId: {
      type: "number",
    },
  },

  exits: {
    success: {
      description: "Joined",
    },
  },

  fn: async function (inputs, exits) {
    sails.log.debug("join-room helper started");
    let socketRooms = ["waspha"];

    const kiffgoRoomInfo = await SocketInfo.find({
      roomName: "waspha",
    });
    if (kiffgoRoomInfo) {
      for (let i = 0; i < kiffgoRoomInfo.length; i++) {
        sails.sockets.join(
          kiffgoRoomInfo[i].socketId,
          kiffgoRoomInfo[i].roomName
        );
      }
    }
    if (inputs.businessId) {
      const roomInfo = await SocketInfo.find({
        userId: inputs.businessId,
      }).limit(1);
      if (!_.isEmpty(roomInfo) && roomInfo[0].roomName !== "waspha") {
        socketRooms.push(roomInfo[0].roomName);
        sails.sockets.join(roomInfo[0].socketId, roomInfo[0].roomName);
      }
    }
    if (inputs.driverId) {
      const roomInfo = await DriverSocketInfo.find({
        userId: inputs.driverId,
      }).limit(1);
      if (!_.isEmpty(roomInfo) && roomInfo[0].roomName !== "waspha") {
        socketRooms.push(roomInfo[0].roomName);
        sails.sockets.join(roomInfo[0].socketId, roomInfo[0].roomName);
      }
    }
    sails.log.debug("join-room helper ended");
    return exits.success(socketRooms);
  },
};
