import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LeftNavMenuItems from "./LeftNavMenuItems";
import { categories } from "../utils/constants";
import { Context, context } from "../context/contextApi";

const LeftNav = () => {
  const { selectCategories, setSelectCategories, mobileMenu } =
    useContext(context);
  const navigate = useNavigate();
  const handleClick = (name, type) => {
    switch (type) {
      case "category":
        return setSelectCategories(name);
      case "home":
        return setSelectCategories(name);
      case "Menu":
        return false;
    }
  };
  return (
    <div className="md:block w-[240px] overflow-y-auto h-full  py-4 bg-black absolute md:relative z-10 translate-x-[-240] md:translate-x-0 transition-all">
      <div className="flex flex-col px-5">
        {categories.map((item) => (
          <>
            <LeftNavMenuItems
              key={item.name}
              text={item.type === "home" ? "Home" : item.name}
              icon={item.icon}
              action={() => {
                handleClick(item.name, item.type);
                navigate("/");
              }}
              className={`${
                selectCategories === item.name
                  ? "bg-white/[0.15] rounded-lg"
                  : ""
              }`}
            />
            {item.divider && <hr className="my-5 border-white/[0.2]" />}
          </>
        ))}
        <hr className="text-white/[0.2] " />t
        <div className="text-white/[0.5] text-[20px]">
          youtube clone project
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
