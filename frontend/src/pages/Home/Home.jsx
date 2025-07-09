import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { backendUrl, useAuthContext } from '../../context/AuthContext';
import { socket } from '../../socket';

axios.defaults.withCredentials = true;

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUserTasks, setCurrentUserTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Todo',
    assignedTo: '',
  });
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/task/all`);
      setTasks(Array.isArray(res.data.tasks) ? res.data.tasks : []);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/alluser`);
      setUsers(Array.isArray(res.data.users) ? res.data.users : []);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const fetchMyTasks = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/task/my-tasks`);
      setCurrentUserTasks(Array.isArray(res.data.tasks) ? res.data.tasks : []);
    } catch (err) {
      console.error("Failed to fetch assigned tasks", err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/user/logout`);
      localStorage.removeItem('Kanban-app');
      setAuthUser(null);
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
    fetchMyTasks();
  }, []);

  useEffect(() => {
    socket.on('taskCreated', (task) => {
      setTasks((prev) => [task, ...prev]);
      fetchMyTasks();
    });

    socket.on('taskUpdated', (updated) => {
      setTasks((prev) =>
        prev.map((task) => (task._id === updated._id ? updated : task))
      );
      fetchMyTasks();
    });

    socket.on('taskDeleted', ({ _id }) => {
      setTasks((prev) => prev.filter((task) => task._id !== _id));
      setCurrentUserTasks((prev) => prev.filter((task) => task._id !== _id));
    });

    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/task/create`, formData);
      setFormData({ title: '', description: '', status: 'Todo', assignedTo: '' });
    } catch (err) {
      console.error('Failed to create task', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/task/delete/${id}`);
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleUpdate = (task) => {
    setEditData(task);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${backendUrl}/api/task/edit/${editData._id}`, editData);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const groupedTasks = {
    Todo: tasks.filter((t) => t.status === 'Todo'),
    'In Progress': tasks.filter((t) => t.status === 'In Progress'),
    Done: tasks.filter((t) => t.status === 'Done'),
  };

  return (
    <div className="p-4 relative">
     
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

  <button
    onClick={() => navigate('/logs')}
    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full md:w-auto"
  >
    View Logs
  </button>

  
  <h1 className="text-2xl font-bold text-center w-full md:w-auto">
    Kanban Task Board
  </h1>

 
  <button
    onClick={handleLogout}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full md:w-auto"
  >
    Logout
  </button>
</div>

     
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 pt-3 mb-6">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded w-full md:w-1/4"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 rounded w-full md:w-1/3"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <select
          className="border p-2 rounded w-full md:w-1/5"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <select
          className="border p-2 rounded w-full md:w-1/5"
          value={formData.assignedTo}
          onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
          required
        >
          <option value="">Assign to User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.fullName}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </form>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Todo', 'In Progress', 'Done'].map((status) => (
          <div key={status} className="bg-gray-100 p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">{status}</h2>
            {(groupedTasks[status] || []).map((task) => (
              <div key={task._id} className="bg-white p-3 mb-4 rounded shadow">
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleUpdate(task)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

     
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">Tasks Assigned to Me</h2>
        <div className="flex gap-4 overflow-x-auto">
          {currentUserTasks.length === 0 ? (
            <p className="text-gray-600">No tasks assigned to you.</p>
          ) : (
            currentUserTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 rounded shadow min-w-[250px]"
              >
                <h3 className="font-bold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-xs text-gray-400">Status: {task.status}</p>
              </div>
            ))
          )}
        </div>
      </div>

     
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-100 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Update Task</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
              />
              <select
                className="w-full p-2 border rounded"
                value={editData.status}
                onChange={(e) =>
                  setEditData({ ...editData, status: e.target.value })
                }
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;

