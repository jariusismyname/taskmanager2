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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">{task.title}</h1>

        <div className="space-y-4 text-gray-600">
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-1">Description:</label>
            <p>{task.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-gray-500">Status:</label>
              <p>{task.status}</p>
            </div>
            <div>
              <label className="block text-gray-500">Priority:</label>
              <p>{task.priority}</p>
            </div>
            <div>
              <label className="block text-gray-500">Due Date:</label>
              <p>{task.dueDate}</p>
            </div>
            <div>
              <label className="block text-gray-500">Created At:</label>
              <p>{new Date(task.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleEdit}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-xl shadow-lg transition"
          >
            Edit Task
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl shadow-lg transition"
          >
            Delete Task
          </button>
        </div>

        <button
          onClick={() => router.push("/home")}
          className="mt-6 w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-xl transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
