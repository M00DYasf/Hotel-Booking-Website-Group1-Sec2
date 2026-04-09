import express, { NextFunction, Response, Request } from "express";
import { authenticateToken, adminOnly } from "../../../middleware/auth";

const router = express.Router();

router.get("/bookings", authenticateToken, adminOnly, async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ message: "Protected admin route working" });
  } catch (error) {
    console.log(`Error: ${JSON.stringify((error as Error).message)}`);
    res.status(500).json({ message: `${(error as Error).message}` });
  }
});


export = router;