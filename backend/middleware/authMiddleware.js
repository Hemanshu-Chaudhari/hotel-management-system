  import jwt from "jsonwebtoken";
  import User from "../models/User.js";

  const JWT_SECRET = "supersecret123"; // same as authRoutes

  export default async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      // decoded = { id, role, iat, exp }

      const user = await User.findById(decoded.id).select("-password");
      if (!user) return res.status(401).json({ message: "User not found" });

      req.user = user; // req.user.role available
      next();
    } catch (err) {
      console.error("Token error:", err);
      res.status(401).json({ message: "Token invalid" });
    }
  }
