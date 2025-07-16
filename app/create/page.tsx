'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
const isPastDate = (inputDate: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight for comparison
  const selectedDate = new Date(inputDate);
  return selectedDate < today;
};

export default function CreateTask() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("To Do");

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (isPastDate(dueDate)) {
    alert("You cannot create a task with a past due date.");
    return;
  }

  const currentUser = sessionStorage.getItem("currentUser");

  const newTask = {
    id: uuidv4(),
    title,
    description,
    dueDate,
    priority,
    status,
    createdAt: new Date().toISOString(),
    createdBy: currentUser!,
  };

  const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  localStorage.setItem("tasks", JSON.stringify([...existingTasks, newTask]));

  router.push("/home");
};

 return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-3xl shadow-2xl p-10 w-full max-w-xl space-y-6 animate-fade-in-up"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 text-center drop-shadow-md">
          Create New Task
        </h1>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-4 bg-white/50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-4 bg-white/50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="w-full p-4 bg-white/50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-800 font-medium mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-4 bg-white/50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-gray-800 font-medium mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-4 bg-white/50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold rounded-xl shadow-md transition-all transform hover:scale-105"
        >
          ➕ Create Task
        </button>
      </form>
    </div>
  );
}