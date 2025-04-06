import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrderStats } from "../../../redux/rtk/features/dashboard/orderStatsSlice";
import shoes from "../../../assets/images/shoe.png";
import watch from "../../../assets/images/watch.png";
import shirt from "../../../assets/images/cloth.png";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.orderStats);

  useEffect(() => {
    dispatch(loadOrderStats());
  }, [dispatch]);

  const processingOrders = stats?.data?.find(stat => stat.status === "processing") || { count: 0, percentage: 0 };
  const pendingOrders = stats?.data?.find(stat => stat.status === "pending") || { count: 0, percentage: 0 };
  const shippedOrders = stats?.data?.find(stat => stat.status === "shipped") || { count: 0, percentage: 0 };
  const deliveredOrders = stats?.data?.find(stat => stat.status === "delivered") || { count: 0, percentage: 0 };
  
  const totalOrders = (processingOrders.count + pendingOrders.count + shippedOrders.count + deliveredOrders.count) || 0;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg border border-[#F6F5F6] shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-gray-600 mb-2">Processing Orders</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold">{processingOrders.percentage.toFixed(1)}%</span>
              <span className="text-gray-500">{processingOrders.count}/{totalOrders} Orders</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${processingOrders.percentage}%` }}></div>
            </div>
          </div>

          <div>
            <h3 className="text-gray-600 mb-2">Pending Orders</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold">{pendingOrders.percentage.toFixed(1)}%</span>
              <span className="text-gray-500">{pendingOrders.count}/{totalOrders} Orders</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-[#FFA500] rounded-full" style={{ width: `${pendingOrders.percentage}%` }}></div>
            </div>
          </div>

          <div>
            <h3 className="text-gray-600 mb-2">Shipped Orders</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold">{shippedOrders.percentage.toFixed(1)}%</span>
              <span className="text-gray-500">{shippedOrders.count}/{totalOrders} Orders</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-purple-600 rounded-full" style={{ width: `${shippedOrders.percentage}%` }}></div>
            </div>
          </div>

          <div>
            <h3 className="text-gray-600 mb-2">Delivered Orders</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold">{deliveredOrders.percentage.toFixed(1)}%</span>
              <span className="text-gray-500">{deliveredOrders.count}/{totalOrders} Orders</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-green-500 rounded-full" style={{ width: `${deliveredOrders.percentage}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg border border-[#F6F5F6] shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Top Selling Product
          </h2>
          <button className="bg-[#E7906B] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base w-full sm:w-auto">
           View All
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4 flex-1">
              <img
                src={shoes}
                alt="Red Tape Sports Shoes"
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-[14px] truncate sm:text-clip max-w-[120px] sm:max-w-full">
                  Red Tape Sports Shoes for Men
                </h3>
                <p className="text-gray-600 text-[12px]">12,429 Sales</p>
              </div>
            </div>
            <div className="text-right min-w-[100px] sm:min-w-[150px]">
              <span className="text-green-600 flex items-center gap-1 justify-end text-[10px]">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Available
              </span>
              <span className="text-sm text-gray-500 text-[8px] whitespace-nowrap">
                135 Stocks Remaining
              </span>
            </div>
          </div>

      
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4 flex-1">
              <img
                src={watch}
                alt="Fastrack Smartwatch"
                className="w-14 h-14 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-[14px] truncate sm:text-clip max-w-[120px] sm:max-w-full">
                  Fastrack FS1 Pro Smartwatch
                </h3>
                <p className="text-gray-600 text-[12px]">1,543 Sales</p>
              </div>
            </div>
            <div className="text-right min-w-[100px] sm:min-w-[150px]">
              <span className="text-green-600 flex items-center gap-1 justify-end text-[10px]">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                Available
              </span>
              <span className="text-sm text-gray-500 text-[8px] whitespace-nowrap">
                76 Stocks Remaining
              </span>
            </div>
          </div>


          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4 flex-1">
              <img
                src={shirt}
                alt="Leriya Fashion Shirt"
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-[14px] truncate sm:text-clip max-w-[120px] sm:max-w-full">
                  Leriya Fashion Men's Shirt
                </h3>
                <p className="text-gray-600 text-[12px]">7,222 Sales</p>
              </div>
            </div>
            <div className="text-right min-w-[100px] sm:min-w-[150px]">
              <span className="text-red-600 flex items-center gap-1 justify-end text-[10px]">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                Out of Stock
              </span>
              <span className="text-sm text-gray-500 text-[8px] whitespace-nowrap">
                0 Stocks Remaining
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
