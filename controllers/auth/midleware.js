const expressJwt = require("express-jwt");
exports.security = "JCNRUAD";
exports.authenticated = expressJwt({ secret: this.security });
