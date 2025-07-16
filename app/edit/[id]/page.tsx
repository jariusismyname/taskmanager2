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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center">Edit Task</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
         
         
            <input
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Due Date</label>
            
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>To Do</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition shadow-md"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
