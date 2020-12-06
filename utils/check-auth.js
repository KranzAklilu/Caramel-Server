const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

module.exports = ({ req }) => {
  const authHeaders = req.headers.authorization;
  if (authHeaders) {
    const token = authHeaders.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expiration token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]'");
  }
  throw new Error("Authorizetion header must be provided");
};
