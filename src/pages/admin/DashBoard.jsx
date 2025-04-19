import React from "react";
import OrderStatusCard from "../../components/admin/OrderStatusCard";
import { Package, Clock, ShoppingCart } from "lucide-react";
import RecentActivity from "../../components/admin/RecentActivity";
import { useIsMobile } from "../../hooks/useIsMobile";
import InboxList from "../../components/admin/InboxList";
import SalesChart from "../../components/admin/SalesChart";

export default function DashBoard() {
  const isMobile = useIsMobile();
  const activityItems = [
    {
      id: "1",
      message: "Confirm order update",
      status: "urgent",
      icon: "check",
    },
    {
      id: "2",
      message: "Finish shipping update",
      status: "urgent",
      icon: "alert",
    },
    { id: "3", message: "Create new order", status: "new", icon: "circle" },
    {
      id: "4",
      message: "Update payment report",
      status: "default",
      icon: "check",
    },
  ];

  const inboxItems = [
    { id: "1", message: "Waiting for order#12345", time: "4:39" },
    { id: "2", message: "Customer support id#22234", time: "11:07" },
  ];

  const salesData = [
    { date: "1", today: 30, yesterday: 20 },
    { date: "2", today: 35, yesterday: 25 },
    { date: "3", today: 25, yesterday: 30 },
    { date: "4", today: 40, yesterday: 35 },
    { date: "5", today: 55, yesterday: 40 },
    { date: "6", today: 45, yesterday: 45 },
    { date: "7", today: 25, yesterday: 48 },
    { date: "8", today: 40, yesterday: 50 },
  ];

  return (
    <div className="flex-1 overflow-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <OrderStatusCard
          title="Shipped orders"
          count={67}
          background="bg-card-pink"
          icon={<Package size={80} />}
        />
        <OrderStatusCard
          title="Pending orders"
          count={9}
          background="bg-card-pink"
          icon={<Clock size={80} />}
        />
        <OrderStatusCard
          title="New orders"
          count={35}
          background="bg-card-purple"
          icon={<ShoppingCart size={80} />}
        />
      </div>
      <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-4`}>
        <div className="space-y-4">
          <InboxList items={inboxItems} group="Support" />
          <RecentActivity items={activityItems} />
        </div>
        <SalesChart
          data={salesData}
          title="Today's trends"
          date="30 Sept 2021"
        />
      </div>
    </div>
  );
}
