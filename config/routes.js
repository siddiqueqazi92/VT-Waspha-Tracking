/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const corsPolicyAll = {
  allRoutes: true,
  allowOrigins: [
    "http://localhost:8000",
    "https://www.kiffgo.com",
    "https://kiffgo-website-staging.firebaseapp.com",
    "https://kiffgo-business-dev.firebaseapp.com",
  ],
  allowCredentials: true,
  allowRequestMethods: "GET, POST, PUT, DELETE, OPTIONS, HEAD",
  allowRequestHeaders: "dataType,content-type,Authorization",
};
module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "POST /driver/test": { action: "driver/test" },
  "GET /ping": { action: "driver/test" },
  "POST /app/tracking": {
    controller: "TrackController",
    action: "location",
  },
  "POST /stos/get-location": {
    action: "user/get-current-location",
    csrf: false,
    cors: corsPolicyAll,
  },
  "POST /stos/task-delay": {
    action: "task/delay",
    csrf: false,
    cors: corsPolicyAll,
  },
  "POST /stos/task-added": {
    action: "task/new-task-added",
    csrf: false,
    cors: corsPolicyAll,
  },
  "POST /stos/task-updated": {
    action: "task/task-updated",
    csrf: false,
    cors: corsPolicyAll,
  },
  "POST /stos/emit-data": {
    action: "emit/emit-data",
    csrf: false,
    cors: corsPolicyAll,
  },
  "POST /stos/get-route": {
    action: "task/route",
    csrf: false,
    cors: corsPolicyAll,
  },
  "POST /stos/get-driver-list": {
    action: "driver/get-drivers",
    csrf: false,
    cors: corsPolicyAll,
  },
  "POST /stos/get-single-driver": {
    action: "driver/single-driver",
    csrf: false,
    cors: corsPolicyAll,
  },

  "POST /stos/get-recent-drivers": {
    action: "driver/get-recent-drivers",
    csrf: false,
    cors: corsPolicyAll,
  },
  "POST /stos/eta-driver-list": {
    action: "driver/eta-driver-list",
    csrf: false,
    cors: corsPolicyAll,
  },
};
