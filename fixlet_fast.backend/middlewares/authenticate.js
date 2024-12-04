const { getUser } = require("../service/authenticate.service.js");
// Schema model
const User = require("../model/user.model.js");

// Middleware function to authenticate a logged-in user using a cookie
const checkAuthenticationCookie = (cookieName) => {
  return async (req, res, next) => {
    try {
      const cookie = req.cookies[cookieName];

      // Check if the cookie exists
      if (!cookie) {
        return res.status(401).json({ message: "Unauthorized: No cookie provided." });
      }

      // Validate the cookie and get the user data
      const user = await getUser(cookie);
      if (!user || !user.id) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token." });
      }

      // Retrieve user details from the database (excluding sensitive data)
      const currentUserDetail = await User.findById(user.id).select("-password -salt");
      if (!currentUserDetail) {
        return res.status(404).json({ message: "User not found." });
      }

      // Attach user details to the request object
      req.user = currentUserDetail;
      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      console.error("Authentication error:", error.message || error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };
};

module.exports = {
  checkAuthenticationCookie,
};
