import { prisma } from "../lib/prisma.ts";
async function getUser(req: any, res: any, next: any) {
  const { username, email } = req.body;
  try {
    if (email) {
      const emailFound = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (emailFound) {
        res.status(400).json({
          message: "Your email has been registered",
        });
        return;
      }
    }
    if (username) {
      const usernameFound = await prisma.user.findFirst({
        where: {
          username,
        },
      });
      if (usernameFound) {
        res.status(400).json({
          message: "That username has been registered",
        });
        return;
      }
    }

    next();
  } catch (e) {
    res.status(500).json({
      message: "Something Went Wrong",
    });
  }
}
export default getUser;
