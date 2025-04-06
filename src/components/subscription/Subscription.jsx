import React from "react";
import { BsRocketTakeoffFill } from "react-icons/bs";
import { FaPaperPlane, FaPlane, FaRocket } from "react-icons/fa";
import { PiAirplaneTiltFill } from "react-icons/pi";

const Subscription = () => {
  const pricingOptions = [
    {
      icon: <FaPaperPlane size={60} />,
      title: "Basic",
      price: 0,
      features: [
        "Dashboard",
        "Online Order",
        "Inventory System",
        "Sales",
        "Accounting System",
        "Report",
      ],
      gradient: "from-fuchsia-500 to-blue-400",
    },
    {
      icon: <PiAirplaneTiltFill size={60} />,
      title: "Standard",
      price: 20000,
      features: [
        "Dashboard",
        "Online Order",
        "Inventory System",
        "Sales",
        "Accounting System",
        "Report",
        "POS System",
      ],
      gradient: "from-yellow-400 to-fuchsia-500",
    },
    {
      icon: <BsRocketTakeoffFill size={60} />,
      title: "Premium",
      price: 50000,
      features: [
        "Dashboard",
        "Online Order",
        "Inventory System",
        "Sales",
        "Accounting System",
        "Report",
        "POS System",
        "Human Resource Management",
      ],
      gradient: "from-green-400 to-purple-500",
    },
  ];

  return (
    <section className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex items-center justify-between gap-8">
        {pricingOptions.map((option, index) => (
          <div
            key={index}
            className={`max-w-xs w-[40rem] bg-gradient-to-br ${option.gradient} rounded-lg p-8 shadow-lg transform transition duration-500 hover:scale-105`}
          >
            <div className="flex flex-col items-center text-white">
              <div className="bg-white bg-opacity-10 p-4 rounded-full shadow-lg mb-4">
                {option.icon}
              </div>
              <h2 className="text-2xl font-semibold">{option.title}</h2>
            </div>
            <div className="text-center text-white mt-4">
              <h4 className="text-4xl font-bold">
                <sup className="text-2xl">₦</sup>
                {option.price.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{" "}
                /
              </h4>
            </div>
            <div className="text-white mt-6">
              <ul className="space-y-2">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <span>{feature.includes("No") ? "✗" : "✓"}</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="/admin/checkout"
              className="block bg-white text-black rounded-full py-2 px-6 mt-8 text-center font-semibold hover:shadow-lg transition-shadow duration-300"
            >
              Select Plan
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Subscription;
