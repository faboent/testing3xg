import React from "react";
import { Table, Avatar, Popover, Image } from "antd";
import { BiCrown } from "react-icons/bi";
import { motion } from "framer-motion";

const businessName = localStorage.getItem("businessName");
const Leaderboard = () => {
  return (
    <div className="mb-5">
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0, x: [-10, 10, -10] }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-row items-center justify-center gap-4 mt-2 bg-white shadow-lg rounded-lg p-4 z-50 border border-gray-200"
      >
        <img src="./crown.png" alt="" className="w-10" />

        <div>
          <h1 className="text-lg font-bold">
            Congratulations! {businessName} 🎉🎊👏
          </h1>
          <p className="text-sm text-gray-600">
            Your sales performance ranks in the top 4% of merchants so far, with
            350 items sold this month. Keep up the good work!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
