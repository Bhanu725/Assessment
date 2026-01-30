import { Request, Response } from "express";
import prisma from "../../config/prisma";
import fs from "fs";
import path from "path";

/* CREATE TASK */
export const createTask = async (req: Request, res: Response) => {
  const task = await prisma.task.create({ data: req.body });
  res.status(201).json(task);
};

/* BULK CREATE */
export const bulkCreateTasks = async (req: Request, res: Response) => {
  const tasks = await prisma.task.createMany({
    data: req.body.tasks
  });
  res.json(tasks);
};

/* GET TASKS (FILTER + PAGINATION) */
export const getTasks = async (req: Request, res: Response) => {
  const {
    status,
    priority,
    search,
    page = 1,
    limit = 10
  } = req.query as any;

  const where: any = { isDeleted: false };

  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (search) where.title = { contains: search, mode: "insensitive" };

  const tasks = await prisma.task.findMany({
    where,
    skip: (+page - 1) * +limit,
    take: +limit,
    orderBy: { createdAt: "desc" }
  });

  res.json(tasks);
};

/* GET SINGLE TASK */
export const getTaskById = async (req: Request, res: Response) => {
  const task = await prisma.task.findUnique({
    where: { id: req.params.id },
    include: { comments: true, files: true }
  });

  res.json(task);
};

/* UPDATE TASK */
export const updateTask = async (req: Request, res: Response) => {
  const task = await prisma.task.update({
    where: { id: req.params.id },
    data: req.body
  });

  res.json(task);
};

/* SOFT DELETE */
export const deleteTask = async (req: Request, res: Response) => {
  await prisma.task.update({
    where: { id: req.params.id },
    data: { isDeleted: true }
  });

  res.json({ success: true });
};

/* FILE UPLOAD */
export const uploadFiles = async (req: any, res: Response) => {
  const files = req.files.map((file: any) => ({
    filename: file.originalname,
    path: file.path,
    taskId: req.params.id
  }));

  await prisma.file.createMany({ data: files });

  res.json({ uploaded: files.length });
};
