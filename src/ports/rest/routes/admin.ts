import express, { NextFunction, Response, Request } from "express";
import { authenticateToken, adminOnly } from "../../../middleware/auth";
import dependencies from "../../../infrastructure/dependencies";
import { acceptBooking, declineBooking, editBooking } from "../../../controllers/booking";

const router = express.Router();

router.get("/bookings", authenticateToken, adminOnly, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: "Protected admin route working" });
  } catch (error) {
    console.log(`Error: ${JSON.stringify((error as Error).message)}`);
    res.status(500).json({ message: `${(error as Error).message}` });
  }
});

router.put("/bookings/:id/accept", authenticateToken, adminOnly, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await acceptBooking(dependencies)(String(req.params.id));
    res.status(200).json({ message: "Booking accepted", booking });
  } catch (error) {
    console.log(`Error: ${JSON.stringify((error as Error).message)}`);
    res.status(400).json({ message: `${(error as Error).message}` });
  }
});

router.put("/bookings/:id/decline", authenticateToken, adminOnly, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await declineBooking(dependencies)(String(req.params.id));
    res.status(200).json({ message: "Booking declined", booking });
  } catch (error) {
    console.log(`Error: ${JSON.stringify((error as Error).message)}`);
    res.status(400).json({ message: `${(error as Error).message}` });
  }
});

router.put("/bookings/:id/edit", authenticateToken, adminOnly, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await editBooking(dependencies)(String(req.params.id), req.body);
    res.status(200).json({ message: "Booking updated", booking });
  } catch (error) {
    console.log(`Error: ${JSON.stringify((error as Error).message)}`);
    res.status(400).json({ message: `${(error as Error).message}` });
  }
});

export = router;