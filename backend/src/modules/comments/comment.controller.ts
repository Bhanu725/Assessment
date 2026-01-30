import { Request, Response } from "express";
import prisma from "../../config/prisma";

/* ADD COMMENT */
export const addComment = async (req: any, res: Response) => {
  const comment = await prisma.comment.create({
    data: {
      content: req.body.content,
      taskId: req.params.taskId,
      userId: req.user.id
    }
  });

  res.status(201).json(comment);
};

/* GET COMMENTS */
export const getComments = async (req: Request, res: Response) => {
  const comments = await prisma.comment.findMany({
    where: { taskId: req.params.taskId },
    include: { user: true }
  });

  res.json(comments);
};

/* UPDATE COMMENT */
export const updateComment = async (req: Request, res: Response) => {
  const comment = await prisma.comment.update({
    where: { id: req.params.id },
    data: { content: req.body.content }
  });

  res.json(comment);
};

/* DELETE COMMENT */
export const deleteComment = async (req: Request, res: Response) => {
  await prisma.comment.delete({
    where: { id: req.params.id }
  });

  res.json({ success: true });
};
