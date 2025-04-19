import React from "react";
import { ExternalLink, CheckCircle, Circle, AlertCircle } from "lucide-react";

export default function RecentActivity({ items }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "urgent":
        return (
          <span className="bg-urgent text-white px-3 py-1 rounded-full text-xs font-medium">
            URGENT
          </span>
        );
      case "new":
        return (
          <span className="bg-new text-white px-3 py-1 rounded-full text-xs font-medium">
            NEW
          </span>
        );
      case "default":
        return (
          <span className="bg-default text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
            DEFAULT
          </span>
        );
      default:
        return null;
    }
  };

  const getIcon = (iconType) => {
    switch (iconType) {
      case "check":
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case "circle":
        return <Circle className="h-5 w-5 text-gray-400" />;
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
    }
  };
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <button className="text-blue-600 text-sm font-medium flex items-center">
          View all
        </button>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <span className="mr-3">{getIcon(item.icon)}</span>
              <p className="text-gray-700">{item.message}</p>
            </div>
            <div>{getStatusBadge(item.status)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
