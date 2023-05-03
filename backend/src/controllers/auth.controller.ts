import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IRefreshToken, IUser, RefreshToken, User } from "../models";
import { config } from "../configs";

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user: IUser = new User({ email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    const userToken: IRefreshToken = await User.findOne({ userId: user._id });
    if (userToken) userToken.token = refreshToken;
    else {
      const refreshTokenDoc = new RefreshToken({
        token: refreshToken,
        userId: user._id,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 1 day
      });
      await refreshTokenDoc.save();
    }

    const { password: userPassword, ...userWithoutPassword } = user.toObject();

    return res.status(200).json({
      accessToken,
      refreshToken,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token is required" });
    }

    const refreshTokenDoc = await RefreshToken.findOne({ token: refreshToken });

    if (!refreshTokenDoc) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const decodedToken: any = jwt.verify(refreshToken, config.secret as string);

    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user._id
    );

    refreshTokenDoc.token = newRefreshToken;
    await refreshTokenDoc.save();

    res.status(200).json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

function generateTokens(userId: string) {
  const accessToken = jwt.sign({ userId }, config.secret, { expiresIn: "1m" });
  const refreshToken = jwt.sign({ userId }, config.secret, { expiresIn: "1d" });
  return { accessToken, refreshToken };
}
