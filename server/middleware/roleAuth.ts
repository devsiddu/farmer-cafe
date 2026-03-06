import express, { NextFunction, Request, Response } from "express";

export const roleAuth = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.json({ success: false, message: "Unauthorized" })
        }

        if (!roles.includes(req.user.role)) {
            return res.json({ success: false, message: "Access denied" })
        }

        next();
    }
}