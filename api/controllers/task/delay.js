module.exports = {
  friendlyName: "Task delay",

  description: "sends the task delayed in minutes",

  inputs: {
    delayedTasks: {
      type: "ref",
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    sails.log.debug("delay action Started");
    try {
      const tasks = inputs.delayedTasks;
      for (let i = 0; i < tasks.length; i++) {
        const socketRooms = await sails.helpers.joinRoom(tasks[i].businessId);
        sails.sockets.broadcast(socketRooms, "taskDelay", {
          task: tasks[i].task,
        });
      }
    } catch (err) {
      sails.log.error(
        "delay action:  Task could not be updated due to this err: ",
        err.message || err
      );
    }

    // Send response.
    sails.log.debug("delay action Ended");
    return exits.success({
      status: true,
      message: "Task Update",
    });
  },
};
