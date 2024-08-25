import { db } from "../db/db.js";
import { users } from "../db/schema.js";

const createUser = async (username, password, role) => {
  try {
    const result = await db
      .insert(users)
      .values({ username, password, role })
      .returning();

    return result;
  } catch (error) {
    console.error("Error during createUser:", error);
    throw error;
  }
};

const findUserByUsername = async (username) => {
  try {
    return await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, username),
    });
  } catch (error) {
    throw error;
  }
};

export default {
  createUser,
  findUserByUsername,
};
