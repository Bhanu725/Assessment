import { Request, Response } from "express";
import prisma from "../../config/prisma";
import fs from "fs";

/* OVERVIEW */
export const overview = async (_: Request, res: Response) => {
  const byStatus = await prisma.task.groupBy({
    by: ["status"],
    _count: true
  });

  const byPriority = await prisma.task.groupBy({
    by: ["priority"],
    _count: true
  });

  res.json({ byStatus, byPriority });
};

/* USER PERFORMANCE */
export const userPerformance = async (_: Request, res: Response) => {
  const data = await prisma.task.groupBy({
    by: ["assignedToId"],
    _count: true
  });

  res.json(data);
};

/* TRENDS */
export const trends = async (_: Request, res: Response) => {
  const tasks = await prisma.task.findMany({
    select: { createdAt: true }
  });

  res.json(tasks);
};

/* EXPORT CSV */
export const exportCSV = async (_: Request, res: Response) => {
  const tasks = await prisma.task.findMany();

  const csv =
    "id,title,status,priority\n" +
    tasks.map(t =>
      `${t.id},${t.title},${t.status},${t.priority}`
    ).join("\n");

  fs.writeFileSync("tasks.csv", csv);

  res.download("tasks.csv");
};
