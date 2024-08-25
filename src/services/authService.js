import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";
import userRepository from "../repositories/userRepository.js";

// Validation schemas
const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("buyer", "seller").required(),
});

const signup = async (payload) => {
  const { error } = signupSchema.validate(payload);
  if (error) {
    return { success: false, error: error.details[0].message };
  }

  const { username, password, role } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser(username, hashedPassword, role);
  return { success: true, message: "User created successfully", user };
};

const login = async (payload, res) => {
  const { username, password } = payload;
  console.log({ username, password });
  const user = await userRepository.findUserByUsername(username);

  console.log({ user });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { success: false, error: "Invalid credentials" };
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  delete user["password"];

  res.cookie("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return { success: true, user };
};

export default { signup, login };
