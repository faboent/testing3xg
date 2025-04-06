import { useEffect, useState } from "react";

import { Button, Image, Skeleton } from "antd";

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { BiSolidGridAlt } from "react-icons/bi";
import { RiFullscreenExitLine, RiFullscreenLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

import BreadcrumbCustom from "./BreadcrumbCustom";
import { IoHelp } from "react-icons/io5";
const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>,
];

function Header({ onPress, data, loading }) {
  useEffect(() => window.scrollTo(0, 0));
  const user = localStorage.getItem("user") || {};
  const isLogged = localStorage.getItem("isLogged");
  const userId = localStorage.getItem("userId");
  const businessName = localStorage.getItem("businessName");
  const fullName = localStorage.getItem("fullName");
  const [isDarkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const [fullScreen, setFullScreen] = useState(false);
  const [imageError, setImageError] = useState();

  const element = document.documentElement;

  const handleFullScreenClick = () => {
    setFullScreen(true);
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };
  const handleExitFullScreenClick = () => {
    setFullScreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  useEffect(() => {
    if (isDarkMode) document.body.className = "dark-theme dark";
    if (!isDarkMode) document.body.className = "light-theme light";
  }, [isDarkMode]);

  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
      } else {
        setFullScreen(false);
      }
    });
  }, []);
  return (
    <>
      <div className="sticky top-0 z-10 flex w-full justify-between items-center py-2 pl-4 bg-headerBg dark:bg-[#1C1B20] border-b md:border-none">
        <div className="relative flex items-center">
          {isLogged && <BreadcrumbCustom />}
          <div className="md:hidden">
            <img
              src="https://i.postimg.cc/brQfZ68w/3XG-Logo.png"
              alt="logo"
              className="w-[50px] h-[70px]"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span>
              <b>{businessName || "3XG Africa"}</b>
            </span>
          </div>
        </div>

        <div className="flex items-center mr-[1rem] gap-1 md:gap-4">
          <button
            onClick={() => navigate("/admin/pos")}
            className="hidden md:flex bg-[#E7906B] py-1 px-2 text-white items-center gap-1"
          >
            <BiSolidGridAlt size={20} /> <span>POS</span>
          </button>
          {isLogged && (
            <div>
              {fullScreen ? (
                <RiFullscreenExitLine
                  onClick={handleExitFullScreenClick}
                  size={22}
                  className="cursor-pointer dark:text-white"
                />
              ) : (
                <RiFullscreenLine
                  onClick={handleFullScreenClick}
                  size={22}
                  className="cursor-pointer dark:text-white"
                />
              )}
            </div>
          )}

          {isLogged && (
            <Button
              type="link"
              className="block md:hidden"
              onClick={() => onPress()}
              style={{ boxShadow: "none" }}
            >
              {toggler}
            </Button>
          )}

          {isLogged && (
            <span className="pb-1 relative group">
              <UserOutlined className="text-xl" />
              <div className="hidden z-[9999] absolute -right-3  p-2 group-hover:block w-[200px]">
                <div className="bg-white shadow-lg select-none  p-1  min-w-[150px] rounded-lg">
                  {/* Displaying the user's first and last name */}
                  <p className="flex items-center gap-1 px-3 py-2 hover:bg-slate-200 rounded-lg">
                    <UserOutlined style={{ fontSize: "16px" }} />

                    <span className="logout-text uppercase font-weight-bold me-2 ms-1">
                      {businessName}
                    </span>
                  </p>
                  <Link
                    to="/admin/help"
                    className="flex items-center gap-1 px-3 py-2 hover:bg-slate-200 rounded-lg"
                  >
                    <IoHelp />
                    <p>Help</p>
                  </Link>
                  <Link
                    to="/admin/auth/login"
                    className="flex items-center gap-1 px-3 py-2 hover:bg-slate-200 rounded-lg"
                    onClick={() => {
                      localStorage.clear();
                    }}
                  >
                    <LogoutOutlined className="text-red-500" />
                    <span className="logout-text font-weight-bold">
                      Log Out
                    </span>
                  </Link>
                </div>
              </div>
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
