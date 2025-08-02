
  //... rest of your code (no changes needed to task logic)
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Task = {
  id: string;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed";
  createdBy: string; // New field to track the task owner
};


export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
  const currentUser = sessionStorage.getItem("currentUser");
  if (!currentUser) {
    alert("Please log in first!");
    router.push("/login");
    return;
  }

  const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  // Only show tasks created by the logged-in user
  const userTasks = storedTasks.filter((task: Task) => task.createdBy === currentUser);
  
  setTasks(userTasks);
}, [router]);

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-6 font-sans">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-extrabold text-black drop-shadow-lg animate-fade-in-up">
          Task Manager 
        </h2>
        <button
          onClick={() => router.push("/create")}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-black py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
        >
          + Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
        {categories.map((category) => (
          <div key={category} className="space-y-4">
            <h2 className="text-2xl font-semibold text-black/90 mb-4 underline decoration-white/50">
              {category}
            </h2>
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === category)
                .map((task) => (
                  <div
                    key={task.id}
                    onClick={() => router.push(`/task/${task.id}`)}
                    className="bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] cursor-pointer group"
                  >
                    <h3 className="text-xl font-bold text-black group-hover:text-black-100 transition-all">
                      {task.title}
                    </h3>
                    <p className="text-sm text-black/70 mt-2 line-clamp-2">
                      {task.description}
                    </p>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/edit/${task.id}`);
                        }}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm px-4 py-1.5 rounded-full shadow transition-all hover:scale-105"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTask(task.id);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-black text-sm px-4 py-1.5 rounded-full shadow transition-all hover:scale-105"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}

              {tasks.filter((task) => task.status === category).length === 0 && (
                <p className="text-black/60 text-sm italic animate-pulse">
                  No tasks in this category.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}