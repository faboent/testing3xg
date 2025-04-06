import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadOnlineOrder } from "@/redux/rtk/features/online-order/onlineOrderSlice";

const LatestOrder = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.onlineOrders);

  useEffect(() => {
    dispatch(loadOnlineOrder("all"));
  }, [dispatch]);

  const handleOnError = (e) => {
    e.target.src = "/images/default.jpg";
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-[#F6F5F6] shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold">Latest Order</h2>
        <Link to="/admin/online-order" className="bg-[#E7906B] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base">
          See All Orders
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 text-gray-600 w-[10%]">Order ID</th>
              <th className="text-left py-3 text-gray-600 w-[20%]">Product Name</th>
              <th className="text-left py-3 text-gray-600 w-[10%]">Image</th>
              <th className="text-left py-3 text-gray-600 w-[15%]">Amount</th>
              <th className="text-left py-3 text-gray-600 w-[15%]">Shipping Partner</th>
              <th className="text-left py-3 text-gray-600 w-[12%]">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array(6).fill(null).map((_, index) => (
                <tr key={index} className="border-b animate-pulse">
                  <td className="py-4">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="py-4">
                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                  </td>
                  <td className="py-4">
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  </td>
                  <td className="py-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="py-4">
                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                  </td>
                  <td className="py-4">
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </td>
                </tr>
              ))
            ) : (
              list?.slice(0, 6).map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-4">
                    <Link to={`/admin/online-order/${item?.order?.id}`}>
                      {item?.orderItemCode}
                    </Link>
                  </td>
                  <td className="py-4">{item?.product?.productName || "N/A"}</td>
                  <td className="py-4">
                    <div className="w-12 h-12 relative">
                      <img
                        src={item?.product?.images?.[0]?.url || "/images/default.jpg"}
                        alt="product"
                        onError={handleOnError}
                        className="absolute object-cover w-full h-full rounded"
                      />
                    </div>
                  </td>
                  <td className="py-4">
                    {(() => {
                      const discountedPrice = parseFloat(item?.discountedPrice);
                      const actualPrice = item?.price;
                      const price = discountedPrice > 0 ? discountedPrice : actualPrice;
                      return price ? `₦${Math.floor(price).toLocaleString()}` : "N/A";
                    })()}
                  </td>
                  <td className="py-4">{item?.order?.shippingPartner || "Itranxit"}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      item?.status === "pending" ? 'bg-blue-100 text-blue-600' :
                      item?.status === "delivered" ? 'bg-green-100 text-green-600' :
                      item?.status === "shipped" ? 'bg-orange-100 text-orange-600' :
                      item?.status === "returned" ? 'bg-red-100 text-red-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {item?.status?.toUpperCase() || "N/A"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestOrder;