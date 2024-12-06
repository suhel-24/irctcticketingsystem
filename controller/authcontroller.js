import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

const addnewuser = async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
    });

    const token=generateToken({id: user.id,role: user.role})

    res.status(201).json({ message: "User registered successfully", user, jwttoken: token  });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error)
  }
};

const finduser =  async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: data.email } });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({id: user.id,role: user.role})

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };

export {addnewuser,finduser};
