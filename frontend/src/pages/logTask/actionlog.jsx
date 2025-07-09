

import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../../context/AuthContext";


const ActionLogBoard = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/logs/all`, { withCredentials: true });
        setLogs(res.data.logs || []);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Action Logs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="py-2 px-4">User</th>
              <th className="py-2 px-4">Action</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-t">
                <td className="py-2 px-4">{log.user?.fullName || "Unknown"}</td>
                <td className="py-2 px-4">{log.actionType}</td>
                <td className="py-2 px-4">{log.description}</td>
                <td className="py-2 px-4">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActionLogBoard;
