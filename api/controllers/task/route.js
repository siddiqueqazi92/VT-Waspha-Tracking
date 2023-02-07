module.exports = {
  friendlyName: "Route",

  description: "Route task.",

  inputs: {
    driverId: {
      type: "number",
      required: true,
    },
    taskId: {
      type: "number",
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    // All done.
    return;
  },
};
