import express, { NextFunction, Response, Request } from "express";
import dependencies from "../../../infrastructure/dependencies";
import { register, login } from "../../../controllers/auth";

const router = express.Router();

router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await register(dependencies)({ name, email, password, role });
    res.status(201).json({
      message: "User registered successfully",
      user: { id: result._id, name: result.name, email: result.email, role: result.role }
    });
  } catch (error) {
    console.log(`Error in registering user: ${JSON.stringify((error as Error).message)}`);
    res.status(400).json({
      message: `${(error as Error).message}`
    });
  }
});

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await login(dependencies)({ email, password });
    res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: result.user
    });
  } catch (error) {
    console.log(`Error in login: ${JSON.stringify((error as Error).message)}`);
    res.status(401).json({
      message: `${(error as Error).message}`
    });
  }
});

export = router;