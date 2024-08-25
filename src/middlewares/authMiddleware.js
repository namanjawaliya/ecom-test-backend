import jwt from "jsonwebtoken";

// Middleware factory to create a route-specific authentication handler
const authenticateToken = (requiredRoles = []) => {
  return (req, res, next) => {
    const token = req.cookies.session;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "Access denied. No token provided." });
    }

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;

      // If specific roles are required, check if the user's role is in the array
      if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        return res.status(401).json({
          success: false,
          error: "Unauthorized access! You do not have the required role.",
        });
      }

      // If no specific role is required or the user's role matches, proceed
      next();
    } catch (error) {
      res
        .status(403)
        .json({ success: false, error: "Invalid or expired token" });
    }
  };
};

export default authenticateToken;
