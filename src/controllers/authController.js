import authService from "../services/authService.js";

const signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);
    if (!result.success) {
      return res.status(400).json(result);
    }
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body, res);
    if (!result.success) {
      return res.status(401).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const status = async (req, res) => {
  if (req.user) {
    res
      .status(200)
      .json({ success: true, isAuthenticated: true, user: req.user });
  } else {
    return res
      .status(401)
      .json({ success: false, error: "Access denied. No token provided." });
  }
};

const logout = (req, res) => {
  res.clearCookie("session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ success: true, message: "Logout successful" });
};

export default { signup, login, status, logout };
