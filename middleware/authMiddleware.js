import jwt from "jsonwebtoken";

export default function (req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token tidak ada",
    });
  }

  const token = authHeader.split(" ")[1];

  try {

    req.user = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    next();

  } catch {

    return res.status(401).json({
      message: "Token tidak valid",
    });

  }

}