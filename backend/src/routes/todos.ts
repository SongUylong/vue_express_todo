import express, { Request, Response } from "express";
import db from "../db";
const router = express.Router();

router.get("/", async (_: Request, res: Response) => {
  try {
    const sql = "SELECT * FROM todos";
    const [rows] = await db.query(sql);
    console.log("data", rows);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch todos" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "Task is required" });

  try {
    const [result] = await db.execute("INSERT INTO todos (task) VALUES (?)", [
      task,
    ]);
    res.status(201).json({
      id: (result as any).insertId,
      task,
      completed: false,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});
router.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM todos WHERE id = ?", [id]);
    const todo = (rows as any[])[0];
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    const newStatus = !todo.completed;
    await db.execute("UPDATE todos SET completed = ? WHERE id = ?", [
      newStatus,
      id,
    ]);
    res.json({ ...todo, completed: newStatus }); //override the completed with newStatus
  } catch (error) {
    console.error("update error:", error);
    res.status(500).json({ error: "failed to update todos" });
  }
});
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM todos WHERE id = ?", [id]);
    const { affectedRows } = result as any;
    if (affectedRows === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Delete Error: ", error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});
export default router;
