import jwt from "jsonwebtoken";

const createToken = (user) => jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
  expiresIn: "1d",
});

export default createToken;