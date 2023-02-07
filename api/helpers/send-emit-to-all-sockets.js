var moment = require("moment");
module.exports = {
  friendlyName: "Send emit to all sockets",

  description: "",

  inputs: {},

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      // let socketRooms = [];
      // const roomInfo = await SocketInfo.find();
      // for (let i = 0; i < roomInfo.length; i++) {
      //   socketRooms.push(roomInfo[i].roomName);
      // }
      // sails.sockets.broadcast("business-33", "stillConnected", {
      //   msg: "socket is still connected",
      //   time: moment().format("HH:mm DD-MM-YYYY"),
      // });
      sails.log("script run");
      sails.sockets.blast("stillConnected", {
        msg: "socket is still connected",
      });
    } catch (e) {
      sails.log(e);
    }
    return exits.success();
  },
};
