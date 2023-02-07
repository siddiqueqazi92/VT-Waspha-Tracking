module.exports = {
  friendlyName: "Emit data",

  description: "",

  inputs: {
    emitData: {
      type: "ref",
      required: true,
    },
    event: {
      type: "string",
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    sails.log.debug("emit-data action Started");

    try {
      let socketRooms = null;
      for (obj of inputs.emitData) {
        let filter = {};
        if (!_.isUndefined(obj.driverId)) {
          filter.driverId = obj.driverId;
        } else if (!_.isUndefined(obj.businessId)) {
          filter.businessId = obj.businessId;
        }
        sails.log({ filter });
        socketRooms = await sails.helpers.joinRoom.with(filter);
        sails.sockets.broadcast(socketRooms, inputs.event, obj);
      }
      // sails.log.debug("roomsList");
      // sails.log.debug(socketRooms);

      // sails.log.debug({ data: inputs.emitData });
      // sails.sockets.blast(inputs.event + "-blast", {
      //   data: inputs.emitData,
      // });
      // var clients = sails.io.sockets.clients(socketRooms[1]);
      // sails.log.debug(clients.sockets); // all users from room `room`
    } catch (err) {
      sails.log.error(
        "emit-data action:  Task could not be updated due to this err: ",
        err.message || err
      );
    }

    sails.log.debug("emit-data action Ended");
    return exits.success({
      status: true,
      message: "Emited",
    });
  },
};
