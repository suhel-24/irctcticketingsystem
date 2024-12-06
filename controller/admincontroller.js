import prisma from "../config/prisma.js";
import { z } from "zod";

const trainSchema = z.object({
  name: z.string(),
  source: z.string(),
  destination: z.string(),
  totalSeats: z.number().positive(),
});

const addtrain = async (req, res) => {
  try {
    const data = trainSchema.parse(req.body);

    const train = await prisma.train.create({
      data: { ...data, availableSeats: data.totalSeats },
    });

    res.status(201).json({ message: "Train added successfully", train });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { addtrain };
