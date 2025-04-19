import React from "react";
import { useIsMobile } from '../../hooks/useIsMobile';

export default function OrderStatusCard({ title, count = 0, background , icon = null }) {
  const isMobile = useIsMobile();

  return (
    <div
      className={`p-4 md:p-5 rounded-lg flex justify-between items-center ${background} text-white relative overflow-hidden`}
      style={{ height: isMobile ? "100px" : "120px" }}
    >
      <div className="z-10">
        <h3 className="text-base md:text-lg font-medium mb-1 md:mb-2">
          {title}
        </h3>
        <p className="text-3xl md:text-5xl font-bold">
          {String(count).padStart(2, "0")}
        </p>
      </div>
      {icon && (
        <div className="absolute right-5 bottom-0 opacity-20">
          {icon}
        </div>
      )}
    </div>
  );
}
