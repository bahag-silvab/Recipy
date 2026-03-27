import User from "../models/User.js";
export const checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role !== "admin") return res.status(403).json({ message: "Forbidden: Admins only" });
    next();
  } catch (err) {
    res.status(500).json({ message: "Error checking admin role" });
  }
};