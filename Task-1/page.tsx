"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle, Trash2 } from "lucide-react";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<{ id: number; text: string; done: boolean }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("todo_tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("todo_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: task, done: false }]);
    setTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-#f9f5f5-900 via-purple-900 to-#945656 flex items-center justify-center p-8">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-xl rounded-3xl shadow-2xl glass p-8 border border-white/20"
      >
        <h1 className="text-4xl font-extrabold text-center text-white mb-8 drop-shadow-xl">
          To-Do App📝
        </h1>

        {/* Input Row */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-300 
            border border-white/20 focus:ring-2 focus:ring-purple-400 transition outline-none"
          />

          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.9 }}
            onClick={addTask}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl 
            font-semibold shadow-lg hover:shadow-purple-700/40 transition"
          >
            Add
          </motion.button>
        </div>

        {/* List */}
        <ul className="mt-6 space-y-4">
          <AnimatePresence>
            {tasks.map((t) => (
              <motion.li
                key={t.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between p-4 bg-white/10 
                backdrop-blur-xl rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition"
              >
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => toggleTask(t.id)}
                >
                  {t.done ? (
                    <CheckCircle className="text-green-400" size={28} />
                  ) : (
                    <Circle className="text-gray-300" size={28} />
                  )}

                  <span
                    className={`text-lg max-w-[260px] transition ${
                      t.done ? "line-through text-green-300" : "text-white"
                    }`}
                  >
                    {t.text}
                  </span>
                </div>

                <Trash2
                  className="text-red-400 hover:text-red-600 cursor-pointer transition"
                  size={25}
                  onClick={() => deleteTask(t.id)}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </motion.div>

      {/* Glassmorphism */}
      <style jsx>{`
        .glass {
          background: rgba(232, 225, 225, 0.1);
          backdrop-filter: blur(16px);
        }
      `}</style>
    </div>
  );
}