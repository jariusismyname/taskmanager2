'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  const deleteTask = (id: string) => {
    const filtered = tasks.filter((task) => task.id !== id);
    setTasks(filtered);
    localStorage.setItem("tasks", JSON.stringify(filtered));
  };

  const categories: ("To Do" | "In Progress" | "Completed")[] = [
    "To Do",
    "In Progress",
    "Completed",
  ];

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Task Manager</h1>
        <button
          onClick={() => router.push("/create")}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow transition"
        >
          + Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {category}
            </h2>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === category)
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-gray-200"
                    onClick={() => router.push(`/task/${task.id}`)}
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{task.description}</p>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                router.push(`/edit/${task.id}`);
                        }}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-3 py-1 rounded transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTask(task.id);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              {tasks.filter((task) => task.status === category).length === 0 && (
                <p className="text-gray-500 text-sm">No tasks in this category.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
