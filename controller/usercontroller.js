import prisma from "../config/prisma.js";
import { z } from "zod";

// Zod schema for train query validation
const GetTrainsSchema = z.object({
  source: z.string().min(1, "Source must be a non-empty string"),
  destination: z.string().min(1, "Destination must be a non-empty string"),
});

const gettrains = async (req, res) => {
  try {
    // Validate query parameters
    const validatedQuery = GetTrainsSchema.safeParse(req.query);
    const { source, destination } = validatedQuery.data;
    console.log(typeof destination);

    // Find trains matching the source and destination
    const trains = await prisma.train.findMany({
      where: {
        source: { equals: source, mode: "insensitive" },
        destination: { equals: destination, mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
        availableSeats: true,
        source: true,
        destination: true,
      },
    });

    // If no trains found, return appropriate response
    if (trains.length === 0) {
      return res.status(404).json({
        message: "No trains found for the given source and destination",
        source: source,
        destination: destination,
      });
    }

    res.status(200).json({
      trains,
    });
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Invalid input",
        details: error.errors,
      });
    }

    // Log and handle other errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// here we will use transaction to handle the race condition - if one person is booking then other persons cant do it
const bookTicket = async (req, res) => {
  const { trainId, seatsBooked } = req.body;
  const userId = req.user.id; // Extracted from JWT middleware

  try {
    // Use Prisma's $transaction for atomic operations
    await prisma.$transaction(async (tx) => {
      // Lock the train record for update using findUniqueOrThrow()
      const train = await tx.train.findUniqueOrThrow({
        where: { id: trainId },
        select: { id: true, availableSeats: true },
      });

      if (train.availableSeats < seatsBooked) {
        throw new Error("Not enough seats available");
      }

      // Create booking
      await tx.booking.create({
        data: {
          userId,
          trainId,
          seatsBooked,
        },
      });

      // Update available seats
      await tx.train.update({
        where: { id: train.id },
        data: {
          availableSeats: train.availableSeats - seatsBooked,
        },
      });
    });

    res.status(201).json({ message: "Booking successful" });
  } catch (error) {
    if (error.message === "Not enough seats available") {
      return res.status(400).json({ error: error.message });
    }
    console.log(error);

    res.status(500).json({ error: "An error occurred while booking" });
  }
};

const getbooking = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from JWT middleware
    const bookingId = parseInt(req.params.id);

    const booking = await prisma.booking.findFirst({
      where: { id: bookingId, userId },
      include: { Train: true },
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { gettrains, bookTicket, getbooking };
