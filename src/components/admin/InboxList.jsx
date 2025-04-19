import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function InboxList({ items, group }) {
    return (
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold">Inbox</h2>
              {group && <p className="text-sm text-gray-500">Group: {group}</p>}
            </div>
            <button className="text-blue-600 text-sm font-medium flex items-center">
              View details
            </button>
          </div>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between py-3 border-b border-gray-100">
                <p className="text-gray-700">{item.message}</p>
                <span className="text-sm text-gray-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      );
}

