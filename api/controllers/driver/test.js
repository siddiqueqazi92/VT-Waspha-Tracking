module.exports = {
  friendlyName: "Test",

  description: "Test driver.",

  inputs: {
    test_param: {
      type: "string",
      required: false,
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    sails.log("calling action driver/test");
    sails.log({ envprocess: process.env.JWT_ACCESS_TOKEN });
    return exits.success();
    let obj = {
      location: {
        event: "motionchange",
        is_moving: true,
        uuid: "409405a8-48d8-4432-ad6d-461b7dc2821e",
        timestamp: "2020-11-09T15:49:38.606Z",
        odometer: 6439049.5,
        mock: true,
        coords: {
          latitude: 53.7614,
          longitude: -1.74514,
          accuracy: 0,
          speed: 13.89,
          heading: 0,
          altitude: 0,
        },
        activity: {
          type: "still",
          confidence: 100,
        },
        battery: {
          is_charging: false,
          level: 0.36,
        },
        extras: {},
      },
      driverId: 23,
      businessId: 2999,
      driverDetails: {
        name: "Abbas",
        phone: "923152147269",
        vehicleSize: "",
      },
      taskId: null,
    };
    const insertion = await Track.create(obj);

    var db = sails.getDatastore().manager;
    db.collection("track").find().toArray(console.log);
    return exits.success({
      status: true,
      message: "Testing API",
      data: inputs.test_param,
    });
  },
};
