const prismaC = require("@prisma/client");
const prisma = new prismaC.PrismaClient();

module.exports = {
  async createUser(req, res) {
    const { name, email, password } = req.body;
    try {
      let user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (user) {
        return res.json({ message: "Usuário já existe" });
      }

      user = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      return res.json({ user });
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
};
