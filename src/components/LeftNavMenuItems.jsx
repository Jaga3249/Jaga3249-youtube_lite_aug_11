import React from "react";

const LeftNavMenuItems = ({ text, icon, action, className }) => {
  return (
    <div
      className={
        "text-white text-sm cursor-pointer h-10 flex items-center px-3 mb-[4px] hover:bg-white/[0.5] rounded-lg " +
        className
      }
      onClick={action}
    >
      <span className="text-lg mr-5">{icon}</span>
      {text}
    </div>
  );
};

export default LeftNavMenuItems;
