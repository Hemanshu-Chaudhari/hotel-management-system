export default function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admin only" });
  }
  next();
}
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  // only admin can create room-type
});
