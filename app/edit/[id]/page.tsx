'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
}

function isPastDate(inputDate: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

  const selectedDate = new Date(inputDate);
  return selectedDate < today;
}

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const found = tasks.find((t: Task) => t.id === id);
    if (found) {
      setTask(found);
    } else {
      alert('Task not found!');
      router.push('/home');
    }
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!task) return;

    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!task) return;

  // Check if due date is in the past
  const isPastDate = (inputDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(inputDate);
    return selectedDate < today;
  };

  if (isPastDate(task.dueDate)) {
    alert("You cannot set a task with a past due date.");
    return;
  }

  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const updatedTasks = tasks.map((t: Task) => (t.id === task.id ? task : t));

  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  alert('Task updated!');
  router.push('/home');
};


  if (!task) return <div className="p-6">Loading...</div>;
return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-8 space-y-6 animate-fade-in-up"
      >
        <h1 className="text-4xl font-extrabold text-black drop-shadow-lg text-center">
          Edit Task
        </h1>

        <div className="space-y-4 text-black/90">
          <div>
            <label className="block text-black/70 mb-1">Title</label>
            <input
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label className="block text-black/70 mb-1">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Task details..."
            ></textarea>
          </div>

          <div>
            <label className="block text-black/70 mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-black/70 mb-1">Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="block text-black/70 mb-1">Status</label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full p-3 bg-white/10 border border-white/30 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-xl shadow-lg transition-all transform hover:scale-105"
        >
          💾 Save Changes
        </button>

        <button
          type="button"
          onClick={() => router.push('/home')}
          className="w-full py-2 mt-3 bg-white/20 hover:bg-white/30 text-black rounded-xl transition-all transform hover:scale-105"
        >
          ← Back to Home
        </button>
      </form>
    </div>
  );
}