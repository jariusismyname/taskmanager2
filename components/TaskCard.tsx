'use client';

import { useRouter } from 'next/navigation';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
}

export default function TaskCard({ task, onDelete }: { task: Task; onDelete: (id: string) => void; }) {
  const router = useRouter();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    router.push(`/edit/${task.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onDelete(task.id);
  };

  return (
    <div
      onClick={() => router.push(`/task/${task.id}`)}
      className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border border-gray-200 relative"
    >
      <h2 className="text-lg font-bold text-gray-800">{task.title}</h2>
      <p className="text-gray-500 text-sm line-clamp-2">{task.description}</p>

      <div className="mt-2 text-xs text-gray-400 flex justify-between">
        <span>{task.status}</span>
        <span>{task.priority}</span>
      </div>

      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          onClick={handleEdit}
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
