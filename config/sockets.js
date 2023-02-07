/**
 * WebSocket Server Settings
 * (sails.config.sockets)
 *
 * Use the settings below to configure realtime functionality in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/sockets
 */

module.exports.sockets = {
  /***************************************************************************
   *                                                                          *
   * `transports`                                                             *
   *                                                                          *
   * The protocols or "transports" that socket clients are permitted to       *
   * use when connecting and communicating with this Sails application.       *
   *                                                                          *
   * > Never change this here without also configuring `io.sails.transports`  *
   * > in your client-side code.  If the client and the server are not using  *
   * > the same array of transports, sockets will not work properly.          *
   * >                                                                        *
   * > For more info, see:                                                    *
   * > https://sailsjs.com/docs/reference/web-sockets/socket-client           *
   *                                                                          *
   ***************************************************************************/
  transports: ["websocket"],
  /***************************************************************************
   *                                                                          *
   * `beforeConnect`                                                          *
   *                                                                          *
   * This custom beforeConnect function will be run each time BEFORE a new    *
   * socket is allowed to connect, when the initial socket.io handshake is    *
   * performed with the server.                                               *
   *                                                                          *
   * https://sailsjs.com/config/sockets#?beforeconnect                        *
   *                                                                          *
   ***************************************************************************/

  // Being called when connection gets established
  beforeConnect: function (handshake, proceed) {
    console.log("Socket gets connected");
    // console.log(handshake);
    return proceed(undefined, true);
  },

  // onConnect: function (handshake, proceed) {
  //   console.log("Socket is now connected");
  //   console.log(handshake, proceed.socket.id);
  //   return true;
  // },

  // beforeConnect: function(handshake, proceed) {
  //
  //   // `true` allows the socket to connect.
  //   // (`false` would reject the connection)
  //   return proceed(undefined, true);
  //
  // },
  /***************************************************************************
   *                                                                          *
   * `afterDisconnect`                                                        *
   *                                                                          *
   * This custom afterDisconnect function will be run each time a socket      *
   * disconnects                                                              *
   *                                                                          *
   ***************************************************************************/

  // Being called when connection gets detached
  afterDisconnect: async function (session, socket, done) {
    sails.log("socket disconnected for socket id ", socket.id);
    await SocketInfo.destroyOne({ socketId: socket.id });
    return done();
  },

  // afterDisconnect: function(session, socket, done) {
  //
  //   // By default: do nothing.
  //   // (but always trigger the callback)
  //   return done();
  //
  // },
  /***************************************************************************
   *                                                                          *
   * Whether to expose a 'GET /__getcookie' route that sets an HTTP-only      *
   * session cookie.                                                          *
   *                                                                          *
   ***************************************************************************/
  // grant3rdPartyCookie: true,
};
