import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Rota teste
app.get("/", (req, res) => {
  res.send("Backend rodando 🚀");
});

// =====================
// GET - listar usuários
// =====================
app.get("/usuarios", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// =====================
// POST - criar usuário
// =====================
app.post("/usuarios", async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios" });
  }

  try {
    const emailExists = await prisma.user.findUnique({
      where: { email },
    });

    if (emailExists) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        age,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// =====================
// PUT - atualizar usuário
// =====================
app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // 🔒 verifica se o email já existe em OUTRO usuário
    if (email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      });

      if (emailExists && emailExists.id !== id) {
        return res
          .status(400)
          .json({ error: "Esse email já está em uso por outro usuário" });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        age,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});


// =====================
// DELETE - deletar usuário
// =====================
app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
