import React from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function SalesChart({ data, title, date }) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm h-full">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="flex items-center">
          <span className="w-4 h-1 bg-blue-600 rounded-full mr-2" />
          <span className="text-xs text-gray-500">Today</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-1 bg-gray-300 rounded-full mr-2" />
          <span className="text-xs text-gray-500">Yesterday</span>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line
              type="monotone"
              dataKey="today"
              stroke="#4285F4"
              strokeWidth={3}
              dot={{
                stroke: "#4285F4",
                strokeWidth: 2,
                fill: "#FFF",
                r: 4,
              }}
              activeDot={{
                stroke: "#4285F4",
                strokeWidth: 2,
                fill: "#FFF",
                r: 6,
              }}
            />
            <Line
              type="monotone"
              dataKey="yesterday"
              stroke="#E0E0E0"
              strokeWidth={3}
              dot={false}
            />
            <Tooltip />
            <YAxis domain={["dataMin - 10", "dataMax + 10"]} hide />
            <XAxis dataKey="date" hide />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
