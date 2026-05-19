import type { Request, Response } from "express";
import { UserModel } from "@/models/User";
import { AppError } from "@/utils/appError";
import { asyncHandler } from "@/utils/asyncHandler";
import { generateToken } from "@/utils/jwt";
import { comparePassword, hashPassword } from "@/utils/password";
import { UserRole } from "@/types/user";

interface RegisterPayload {
  email: string;
  password: string;
  role?: UserRole;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, role } = req.body as RegisterPayload;
  const normalizedEmail = email.toLowerCase();

  const existing = await UserModel.findOne({ email: normalizedEmail });
  if (existing) {
    throw new AppError("Email already registered", 409);
  }

  const passwordHash = await hashPassword(password);
  const user = await UserModel.create({
    email: normalizedEmail,
    passwordHash,
    role: role ?? UserRole.Sales
  });

  const token = generateToken({
    userId: user._id.toString(),
    role: user.role
  });

  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: {
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role
      }
    }
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginPayload;
  const normalizedEmail = email.toLowerCase();

  const user = await UserModel.findOne({ email: normalizedEmail });
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isValid = await comparePassword(password, user.passwordHash);
  if (!isValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = generateToken({
    userId: user._id.toString(),
    role: user.role
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role
      }
    }
  });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  const user = await UserModel.findById(req.user.userId).select("email role");
  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "User profile",
    data: {
      id: user._id.toString(),
      email: user.email,
      role: user.role
    }
  });
});
