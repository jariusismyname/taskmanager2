'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  createdAt: string;
}

export default function TaskDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const currentUser = sessionStorage.getItem("currentUser");
    if (!currentUser) {
      alert("Please log in first!");
      router.push("/login");
      return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const foundTask = tasks.find((t: Task) => t.id === id);

    if (foundTask) {
      setTask(foundTask);
    } else {
      alert("Task not found");
      router.push("/home");
    }
  }, [id, router]);

  const handleDelete = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = tasks.filter((t: Task) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    router.push("/home");
  };

  const handleEdit = () => {
    router.push(`/edit/${id}`);
  };

  if (!task) return null;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-6">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-8 w-full max-w-lg space-y-6 animate-fade-in-up">
        <h1 className="text-4xl font-extrabold text-black drop-shadow-lg text-center">
          {task.title}
        </h1>

        <div className="space-y-4 text-black/90">
          <div>
            <label className="block text-sm font-semibold text-black/70 mb-1">Description:</label>
            <p className="text-base">{task.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-black/60">Status:</label>
              <p className="font-medium">{task.status}</p>
            </div>
            <div>
              <label className="block text-black/60">Priority:</label>
              <p className="font-medium">{task.priority}</p>
            </div>
            <div>
              <label className="block text-black/60">Due Date:</label>
              <p className="font-medium">{task.dueDate}</p>
            </div>
            <div>
              <label className="block text-black/60">Created At:</label>
              <p className="font-medium">{new Date(task.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleEdit}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black py-3 rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            ✏️ Edit
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-black py-3 rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            🗑️ Delete
          </button>
        </div>

        <button
          onClick={() => router.push("/home")}
          className="mt-6 w-full bg-white/20 hover:bg-white/30 text-black py-2 rounded-xl shadow-md transition-all transform hover:scale-105"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}