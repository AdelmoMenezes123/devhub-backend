export default {
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: "15m",
  },

  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET!,
    expiresIn: "7d",
  },
};
