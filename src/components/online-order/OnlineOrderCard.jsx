import { Fragment, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@/UI/Card";
import CreateDrawer from "../CommonUi/CreateDrawer";
import AddProd from "./AddProduct";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import { useDispatch, useSelector } from "react-redux";
import ViewBtn from "../Buttons/ViewBtn";
import { EditOutlined } from "@ant-design/icons";
import { CiBarcode } from "react-icons/ci";
import {
  loadOnlineOrder,
  updateOrderItemImei,
} from "@/redux/rtk/features/online-order/onlineOrderSlice";
import { loadAllProductSubCategory } from "@/redux/rtk/features/productSubCategory/productSubCategorySlice";
import { loadAllProductBrand } from "@/redux/rtk/features/productBrand/productBrandSlice";
import { stringShorter } from "@/utils/functions";
import All from "./All";
import New from "./New";
import Shipped from "./Shipped";
import Delivered from "./Delivered";
import Returned from "./Returned";
import Arbitration from "./Arbitration";
import Canceled from "./Canceled";
import { Modal, Input, message } from "antd";
import axios from "axios";
import config from "../../config/config";
export default function OnlineOrder() {
  // const [list, setOrders] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [isTab1, setIsTab1] = useState(1);
  const handleTab1 = (i) => {
    setIsTab1(i);
    let status;
    switch (i) {
      case 1:
        status = "all";
        break;
      case 2:
        status = "pending";
        break;
      case 3:
        status = "shipped";
        break;
      case 4:
        status = "delivered";
        break;
      case 5:
        status = "returned";
        break;
      case 6:
        status = "arbitration";
        break;
      case 7:
        status = "canceled";
        break;
      default:
        status = "all";
    }
    dispatch(loadOnlineOrder(status));
  };

  const { list, loading, total } = useSelector((state) => state.onlineOrders);
  const [isShipmentModalVisible, setIsShipmentModalVisible] = useState(false);
  const [imeiNumber, setImeiNumber] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [shipmentCode, setShipmentCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this state

  const handleCreateShipment = async () => {
    try {
      if (!shipmentCode) {
        message.error("Shipment code is required");
        return;
      }

      if (selectedOrder?.product?.hasWarranty && !imeiNumber) {
        message.error("IMEI number is required for warranty products");
        return;
      }

      setIsSubmitting(true);
      const token = localStorage.getItem("access-token");
      await axios.patch(
        `${config.apiBaseUrl}/api/v1/merchants/orders/items/${selectedOrder.id}/add-imei`,
        {
          imeiNumber: selectedOrder?.product?.hasWarranty ? imeiNumber : null,
          shipmentCode: shipmentCode,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          withCredentials: true,
        }
      );

      message.success("Shipment created successfully");
      setIsShipmentModalVisible(false);
      setImeiNumber("");
      setShipmentCode("");
      dispatch(loadOnlineOrder()); // Refresh the list
    } catch (error) {
      message.error(error?.message || "Failed to create shipment");
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  const handleSendShipment = async (item) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to create shipment without IMEI?"
      );
      if (!confirmed) return;

      await dispatch(
        updateOrderItemImei({
          orderItemId: item.id,
          imeiNumber: null,
        })
      ).unwrap();

      message.success("Shipment created successfully");
      dispatch(loadOnlineOrder()); // Refresh the list
    } catch (error) {
      message.error(error?.message || "Failed to create shipment");
    }
  };

  // const getOrders = useCallback(async () => {
  //   setLoading(true);
  //   setError("");
  //   try {
  //     // const merchantId = JSON.parse(localStorage.getItem("user"))?.body?.merchantId;
  //     const response = await axios.get(
  //       `http://localhost:5003/api/v1/orders/all-by-merchant/f406f3c6-3779-4538-9b06-236124ed7717`,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );

  //     if (response.data) {
  //       console.log("Orders fetched successfully:", response.data);
  //       setOrders(response.data.message.body);
  //     } else {
  //       throw new Error("Invalid response structure.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching orders:", error.message);
  //     setError("Failed to fetch orders. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   getOrders();
  // }, [getOrders]);

  const handleOnError = (e) => {
    e.target.src = "/images/default.jpg";
  };

  const allTabs = [
    {
      id: 1,
      title: "Item Order ID",
      dataIndex: "id",
      key: "id",
      width: "100px",
      render: (_, item) => {
        return (
          <Link to={`/admin/online-order/${item?.order?.id}`}>
            {item?.orderItemCode}
          </Link>
        );
      },
      renderCsv: (orderId) => orderId,
    },
    {
      id: 2,
      title: "Amount",
      dataIndex: "product",
      key: "product",
      render: (_, item) => {
        const discountedPrice = parseFloat(item?.discountedPrice);
        const actualPrice = item?.price;
        const price = discountedPrice > 0 ? discountedPrice : actualPrice;
        return price ? Math.floor(price).toLocaleString() : "N/A";
      },
      renderCsv: (_, item) => {
        const discountedPrice = parseFloat(item?.discountedPrice);
        const actualPrice = item?.price;
        const price = discountedPrice > 0 ? discountedPrice : actualPrice;
        return price ? Math.floor(price).toLocaleString() : "N/A";
      },
    },
    {
      id: 3,
      title: "Products Name",
      dataIndex: "product",
      key: "product",
      render: (_, item) => item?.product?.productName || "N/A",
      renderCsv: (_, item) => item?.product?.productName || "N/A",
    },
    {
      id: 4,
      title: "Image",
      dataIndex: "product",
      key: "image",
      width: "70px",
      render: (_, item) => (
        <div className="w-[2.5rem] h-[1.375rem] relative">
          <img
            className="absolute object-cover w-full h-full"
            alt="product"
            onError={handleOnError}
            src={item?.product?.images?.[0]?.url || "/images/default.jpg"}
          />
        </div>
      ),
      csvOff: true,
    },
    {
      id: 5,
      title: "Warranty",
      dataIndex: "product",
      key: "warranty",
      render: (_, item) => (item?.product?.hasWarranty ? "Yes" : "No"),
      renderCsv: (_, item) => (item?.product?.hasWarranty ? "Yes" : "No"),
    },
    // {
    //   id: 5,
    //   title: "Shipping fee",
    //   dataIndex: "order",
    //   key: "shipping_fee",
    //   render: (_, item) =>
    //     item?.order?.shippingFee ? `${item.order.shippingFee}` : "0",
    //   renderCsv: (_, item) =>
    //     item?.order?.shippingFee ? `${item.order.shippingFee}` : "0",
    // },
    {
      id: 6,
      title: "Shipping partner",
      dataIndex: "order",
      key: "shipping_partner",
      render: (_, item) => item?.order?.shippingPartner || "Itranxit",
      renderCsv: (_, item) => item?.order?.shippingPartner || "Itranxit",
    },
    {
      id: 18,
      title: "Delivery Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span className={`status-${item?.status?.toLowerCase()}`}>
          {item?.status?.toUpperCase() || "N/A"}
        </span>
      ),
      renderCsv: (_, item) => item?.status?.toUpperCase() || "N/A",
    },
    // {
    //   id: 7,
    //   title: "Business unit",
    //   dataIndex: "order",
    //   key: "business_unit",
    //   render: (_, item) => item?.order?.businessUnit || "Not Assigned",
    //   renderCsv: (_, item) => item?.order?.businessUnit || "Not Assigned",
    // },

    {
      id: 8,
      title: "",
      dataIndex: "product",
      key: "warranty",
      render: (_, item) =>
        item?.status !== "shipped" &&
        item?.status !== "delivered" && (
          <button
            onClick={() => {
              setSelectedOrder(item);
              setIsShipmentModalVisible(true);
            }}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Handle Shipment.
          </button>
        ),
      csvOff: true,
    },
    // {
    //   id: 10,
    //   title: "",
    //   key: "action",
    //   render: (_, item) => [
    //     {
    //       label: (
    //         <ViewBtn
    //           title={"View"}
    //           path={`/admin/online-order/${item?.order?.id}`}
    //         />
    //       ),
    //       key: "view",
    //     },
    //     {
    //       label: (
    //         <UserPrivateComponent permission={"update-product"}>
    //           <Link
    //             to={`/admin/online-order/${item?.order?.id}/update`}
    //             className="flex items-center gap-2 cursor-pointer"
    //           >
    //             <EditOutlined className=" p-1 rounded-md" />
    //             Edit
    //           </Link>
    //         </UserPrivateComponent>
    //       ),
    //       key: "edit",
    //     },
    //     {
    //       label: (
    //         <Link
    //           to={`/admin/print-barcode/${item?.order?.id}`}
    //           className="flex items-center gap-2 rounded"
    //         >
    //           <CiBarcode className="text-[1rem]" />
    //           Barcode
    //         </Link>
    //       ),
    //       key: "barcode",
    //     },
    //   ],
    //   csvOff: true,
    // },
  ];

  const newTabs = [
    {
      id: 1,
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      width: "100px",
      render: (_, item) => {
        return (
          <Link to={`/admin/online-order/${item?.order?.id}`}>
            {item?.orderItemCode}
          </Link>
        );
      },
      renderCsv: (orderId) => orderId,
    },
    {
      id: 2,
      title: "Amount",
      dataIndex: "product",
      key: "product",
      render: (_, item) => {
        const discountedPrice = parseFloat(item?.discountedPrice);
        const actualPrice = item?.price;
        const price = discountedPrice > 0 ? discountedPrice : actualPrice;
        return price ? Math.floor(price).toLocaleString() : "N/A";
      },
      renderCsv: (_, item) => {
        const discountedPrice = parseFloat(item?.discountedPrice);
        const actualPrice = item?.price;
        const price = discountedPrice > 0 ? discountedPrice : actualPrice;
        return price ? Math.floor(price).toLocaleString() : "N/A";
      },
    },
    {
      id: 3,
      title: "Products Name",
      dataIndex: "product",
      key: "product",
      render: (_, item) => item?.product?.productName || "N/A",
      renderCsv: (_, item) => item?.product?.productName || "N/A",
    },
    {
      id: 12,
      title: "Image",
      dataIndex: "product",
      key: "image",
      width: "70px",
      render: (_, item) => (
        <div className="w-[2.5rem] h-[1.375rem] relative">
          <img
            className="absolute object-cover w-full h-full"
            alt="product"
            onError={handleOnError}
            src={item?.product?.images?.[0]?.url || "/images/default.jpg"}
          />
        </div>
      ),
      csvOff: true,
    },
    {
      id: 5,
      title: "Warranty",
      dataIndex: "product",
      key: "warranty",
      render: (_, item) => (item?.product?.hasWarranty ? "Yes" : "No"),
      renderCsv: (_, item) => (item?.product?.hasWarranty ? "Yes" : "No"),
    },
    {
      id: 6,
      title: "Shipping partner",
      dataIndex: "order",
      key: "shipping_partner",
      render: (_, item) => item?.order?.shippingPartner || "Itranxit",
      renderCsv: (_, item) => item?.order?.shippingPartner || "Itranxit",
    },

    // {
    //   id: 5,
    //   title: "Shipping Fee",
    //   dataIndex: "shipping_fee",
    //   key: "date",
    //   render: (shipping_fee) => shipping_fee,
    //   renderCsv: (shipping_fee) => shipping_fee,
    // },
    // {
    //   id: 6,
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (status) => status,
    //   renderCsv: (status) => status,
    // },
    // {
    //   id: 7,
    //   title: "Payment",
    //   dataIndex: "paymentStatus",
    //   key: "paymentStatus",
    //   render: (paymentStatus) => (
    //     <span className={`status-${paymentStatus.toLowerCase()}`}>
    //       {paymentStatus}
    //     </span>
    //   ),
    //   renderCsv: (paymentStatus) => paymentStatus,
    // },
    {
      id: 8,
      title: "Delivery Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span className={`status-${item?.status?.toLowerCase()}`}>
          {item?.status?.toUpperCase() || "N/A"}
        </span>
      ),
      renderCsv: (_, item) => item?.status?.toUpperCase() || "N/A",
    },
    {
      id: 9,
      title: "",
      dataIndex: "product",
      key: "warranty",
      render: (_, item) =>
        item?.status !== "shipped" &&
        item?.status !== "delivered" && (
          <button
            onClick={() => {
              setSelectedOrder(item);
              setIsShipmentModalVisible(true);
            }}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Handle Shipment.
          </button>
        ),
      csvOff: true,
    },
  ];

  const shippedTabs = [
    {
      id: 1,
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      width: "100px",
      render: (_, item) => {
        return (
          <Link to={`/admin/online-order/${item?.order?.id}`}>
            {item?.orderItemCode}
          </Link>
        );
      },
      renderCsv: (orderId) => orderId,
    },
    {
      id: 2,
      title: "Amount",
      dataIndex: "product",
      key: "product",
      render: (_, item) => {
        const discountedPrice = parseFloat(item?.discountedPrice);
        const actualPrice = item?.price;
        const price = discountedPrice > 0 ? discountedPrice : actualPrice;
        return price ? Math.floor(price).toLocaleString() : "N/A";
      },
      renderCsv: (_, item) => {
        const discountedPrice = parseFloat(item?.discountedPrice);
        const actualPrice = item?.actual_price;
        const price = discountedPrice > 0 ? discountedPrice : actualPrice;
        return price ? Math.floor(price).toLocaleString() : "N/A";
      },
    },
    {
      id: 3,
      title: "Products Name",
      dataIndex: "product",
      key: "product",
      render: (_, item) => item?.product?.productName || "N/A",
      renderCsv: (_, item) => item?.product?.productName || "N/A",
    },
    {
      id: 12,
      title: "Image",
      dataIndex: "product",
      key: "image",
      width: "70px",
      render: (_, item) => (
        <div className="w-[2.5rem] h-[1.375rem] relative">
          <img
            className="absolute object-cover w-full h-full"
            alt="product"
            onError={handleOnError}
            src={item?.product?.images?.[0]?.url || "/images/default.jpg"}
          />
        </div>
      ),
      csvOff: true,
    },
    {
      id: 5,
      title: "Warranty",
      dataIndex: "product",
      key: "warranty",
      render: (_, item) => (item?.product?.hasWarranty ? "Yes" : "No"),
      renderCsv: (_, item) => (item?.product?.hasWarranty ? "Yes" : "No"),
    },
    {
      id: 6,
      title: "Shipping partner",
      dataIndex: "order",
      key: "shipping_partner",
      render: (_, item) => item?.order?.shippingPartner || "Itranxit",
      renderCsv: (_, item) => item?.order?.shippingPartner || "Itranxit",
    },
    {
      id: 8,
      title: "Delivery Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span className={`status-${item?.status?.toLowerCase()}`}>
          {item?.status?.toUpperCase() || "N/A"}
        </span>
      ),
      renderCsv: (_, item) => item?.status?.toUpperCase() || "N/A",
    },
  ];

  // const deliveredTabs = [
  //   {
  //     id: 1,
  //     title: "Order ID",
  //     dataIndex: "orderId",
  //     key: "orderId",
  //     width: "100px",
  //     render: (orderId) => (
  //       <Link to={`/admin/order/${orderId}`}>{orderId}</Link>
  //     ),
  //     renderCsv: (orderId) => orderId,
  //   },
  //   {
  //     id: 2,
  //     title: "Image",
  //     dataIndex: "productImageUrl",
  //     key: "image",
  //     width: "70px",
  //     render: (productImageUrl) => (
  //       <div className="w-[2.5rem] h-[1.375rem] relative">
  //         <img
  //           className="absolute object-cover w-full h-full"
  //           alt="product"
  //           onError={handleOnError}
  //           src={productImageUrl || "/images/default.jpg"}
  //         />
  //       </div>
  //     ),
  //     csvOff: true,
  //   },
  //   {
  //     id: 3,
  //     title: "Return Policy",
  //     dataIndex: "returnPolicy",
  //     key: "returnPolicy",
  //     render: (returnPolicy) => returnPolicy || "N/A",
  //     renderCsv: (returnPolicy) => returnPolicy || "N/A",
  //   },
  //   {
  //     id: 4,
  //     title: "Fulfilled By",
  //     dataIndex: "fulfilledBy",
  //     key: "fulfilledBy",
  //     render: (fulfilledBy) => fulfilledBy || "Not Assigned",
  //     renderCsv: (fulfilledBy) => fulfilledBy || "Not Assigned",
  //   },
  //   {
  //     id: 5,
  //     title: "Date",
  //     dataIndex: "date",
  //     key: "date",
  //     render: (date) => new Date(date).toLocaleDateString(),
  //     renderCsv: (date) => new Date(date).toISOString().split("T")[0],
  //   },
  //   {
  //     id: 6,
  //     title: "Amount",
  //     dataIndex: "amount",
  //     key: "amount",
  //     render: (amount) => `$${amount.toFixed(2)}`,
  //     renderCsv: (amount) => `$${amount.toFixed(2)}`,
  //   },
  //   {
  //     id: 7,
  //     title: "Payment",
  //     dataIndex: "paymentStatus",
  //     key: "paymentStatus",
  //     render: (paymentStatus) => (
  //       <span className={`status-${paymentStatus.toLowerCase()}`}>
  //         {paymentStatus}
  //       </span>
  //     ),
  //     renderCsv: (paymentStatus) => paymentStatus,
  //   },
  //   {
  //     id: 8,
  //     title: "Delivery Status",
  //     dataIndex: "deliveryStatus",
  //     key: "deliveryStatus",
  //     render: (deliveryStatus) => (
  //       <span className={`status-${deliveryStatus.toLowerCase()}`}>
  //         {deliveryStatus}
  //       </span>
  //     ),
  //     renderCsv: (deliveryStatus) => deliveryStatus,
  //   },
  //   {
  //     id: 13,
  //     title: "",
  //     key: "action",
  //     render: ({ id }) => [
  //       {
  //         label: <ViewBtn title={"View"} path={`/admin/product/${id}`} />,
  //         key: "view",
  //       },
  //       {
  //         label: (
  //           <UserPrivateComponent permission={"update-product"}>
  //             <Link
  //               to={`/admin/product/${id}/update`}
  //               className="flex items-center gap-2 cursor-pointer"
  //             >
  //               <EditOutlined className=" p-1 rounded-md" />
  //               Edit
  //             </Link>
  //           </UserPrivateComponent>
  //         ),
  //         key: "edit",
  //       },
  //       {
  //         label: (
  //           <Link
  //             to={`/admin/print-barcode/${id}`}
  //             className="flex items-center gap-2 rounded"
  //           >
  //             <CiBarcode className="text-[1rem]" />
  //             Barcode
  //           </Link>
  //         ),
  //         key: "barcode",
  //       },
  //     ],
  //     csvOff: true,
  //   },
  // ];
  const returnedTabs = [
    {
      id: 1,
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      width: "100px",
      render: (orderId) => (
        <Link to={`/admin/order/${orderId}`}>{orderId}</Link>
      ),
      renderCsv: (orderId) => orderId,
    },
    {
      id: 2,
      title: "Image",
      dataIndex: "productImageUrl",
      key: "image",
      width: "70px",
      render: (productImageUrl) => (
        <div className="w-[2.5rem] h-[1.375rem] relative">
          <img
            className="absolute object-cover w-full h-full"
            alt="product"
            onError={handleOnError}
            src={productImageUrl || "/images/default.jpg"}
          />
        </div>
      ),
      csvOff: true,
    },
    {
      id: 3,
      title: "Return Policy",
      dataIndex: "returnPolicy",
      key: "returnPolicy",
      render: (returnPolicy) => returnPolicy || "N/A",
      renderCsv: (returnPolicy) => returnPolicy || "N/A",
    },
    {
      id: 4,
      title: "Fulfilled By",
      dataIndex: "fulfilledBy",
      key: "fulfilledBy",
      render: (fulfilledBy) => fulfilledBy || "Not Assigned",
      renderCsv: (fulfilledBy) => fulfilledBy || "Not Assigned",
    },
    {
      id: 5,
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
      renderCsv: (date) => new Date(date).toISOString().split("T")[0],
    },
    {
      id: 6,
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount.toFixed(2)}`,
      renderCsv: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      id: 7,
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus) => (
        <span className={`status-${paymentStatus.toLowerCase()}`}>
          {paymentStatus}
        </span>
      ),
      renderCsv: (paymentStatus) => paymentStatus,
    },
    {
      id: 8,
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
      render: (deliveryStatus) => (
        <span className={`status-${deliveryStatus.toLowerCase()}`}>
          {deliveryStatus}
        </span>
      ),
      renderCsv: (deliveryStatus) => deliveryStatus,
    },
    {
      id: 13,
      title: "",
      key: "action",
      render: ({ id }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/product/${id}`} />,
          key: "view",
        },
        {
          label: (
            <UserPrivateComponent permission={"update-product"}>
              <Link
                to={`/admin/product/${id}/update`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <EditOutlined className=" p-1 rounded-md" />
                Edit
              </Link>
            </UserPrivateComponent>
          ),
          key: "edit",
        },
        {
          label: (
            <Link
              to={`/admin/print-barcode/${id}`}
              className="flex items-center gap-2 rounded"
            >
              <CiBarcode className="text-[1rem]" />
              Barcode
            </Link>
          ),
          key: "barcode",
        },
      ],
      csvOff: true,
    },
  ];

  const arbitrationTabs = [
    {
      id: 1,
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      width: "100px",
      render: (orderId) => (
        <Link to={`/admin/order/${orderId}`}>{orderId}</Link>
      ),
      renderCsv: (orderId) => orderId,
    },
    {
      id: 2,
      title: "Image",
      dataIndex: "productImageUrl",
      key: "image",
      width: "70px",
      render: (productImageUrl) => (
        <div className="w-[2.5rem] h-[1.375rem] relative">
          <img
            className="absolute object-cover w-full h-full"
            alt="product"
            onError={handleOnError}
            src={productImageUrl || "/images/default.jpg"}
          />
        </div>
      ),
      csvOff: true,
    },
    {
      id: 3,
      title: "Return Policy",
      dataIndex: "returnPolicy",
      key: "returnPolicy",
      render: (returnPolicy) => returnPolicy || "N/A",
      renderCsv: (returnPolicy) => returnPolicy || "N/A",
    },
    {
      id: 4,
      title: "Fulfilled By",
      dataIndex: "fulfilledBy",
      key: "fulfilledBy",
      render: (fulfilledBy) => fulfilledBy || "Not Assigned",
      renderCsv: (fulfilledBy) => fulfilledBy || "Not Assigned",
    },
    {
      id: 5,
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
      renderCsv: (date) => new Date(date).toISOString().split("T")[0],
    },
    {
      id: 6,
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount.toFixed(2)}`,
      renderCsv: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      id: 7,
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus) => (
        <span className={`status-${paymentStatus.toLowerCase()}`}>
          {paymentStatus}
        </span>
      ),
      renderCsv: (paymentStatus) => paymentStatus,
    },
    {
      id: 8,
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
      render: (deliveryStatus) => (
        <span className={`status-${deliveryStatus.toLowerCase()}`}>
          {deliveryStatus}
        </span>
      ),
      renderCsv: (deliveryStatus) => deliveryStatus,
    },
    {
      id: 13,
      title: "",
      key: "action",
      render: ({ id }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/product/${id}`} />,
          key: "view",
        },
        {
          label: (
            <UserPrivateComponent permission={"update-product"}>
              <Link
                to={`/admin/product/${id}/update`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <EditOutlined className=" p-1 rounded-md" />
                Edit
              </Link>
            </UserPrivateComponent>
          ),
          key: "edit",
        },
        {
          label: (
            <Link
              to={`/admin/print-barcode/${id}`}
              className="flex items-center gap-2 rounded"
            >
              <CiBarcode className="text-[1rem]" />
              Barcode
            </Link>
          ),
          key: "barcode",
        },
      ],
      csvOff: true,
    },
  ];

  const deliveredTabs = [
    {
      id: 1,
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      width: "100px",
      render: (_, item) => {
        return (
          <Link to={`/admin/online-order/${item?.order?.id}`}>
            {item?.orderItemCode}
          </Link>
        );
      },
      renderCsv: (orderId) => orderId,
    },
    {
      id: 2,
      title: "Amount",
      dataIndex: "product",
      key: "product",
      render: (_, item) => {
        const discountedPrice = parseFloat(item?.discountedPrice);
        const actualPrice = item?.price;
        const price = discountedPrice > 0 ? discountedPrice : actualPrice;
        return price ? Math.floor(price).toLocaleString() : "N/A";
      },
      renderCsv: (_, item) => {
        const discountedPrice = parseFloat(item?.discountedPrice);
        const actualPrice = item?.actual_price;
        const price = discountedPrice > 0 ? discountedPrice : actualPrice;
        return price ? Math.floor(price).toLocaleString() : "N/A";
      },
    },
    {
      id: 3,
      title: "Products Name",
      dataIndex: "product",
      key: "product",
      render: (_, item) => item?.product?.productName || "N/A",
      renderCsv: (_, item) => item?.product?.productName || "N/A",
    },
    {
      id: 12,
      title: "Image",
      dataIndex: "product",
      key: "image",
      width: "70px",
      render: (_, item) => (
        <div className="w-[2.5rem] h-[1.375rem] relative">
          <img
            className="absolute object-cover w-full h-full"
            alt="product"
            onError={handleOnError}
            src={item?.product?.images?.[0]?.url || "/images/default.jpg"}
          />
        </div>
      ),
      csvOff: true,
    },
    {
      id: 5,
      title: "Warranty",
      dataIndex: "product",
      key: "warranty",
      render: (_, item) => (item?.product?.hasWarranty ? "Yes" : "No"),
      renderCsv: (_, item) => (item?.product?.hasWarranty ? "Yes" : "No"),
    },
    {
      id: 6,
      title: "Shipping partner",
      dataIndex: "order",
      key: "shipping_partner",
      render: (_, item) => item?.order?.shippingPartner || "Itranxit",
      renderCsv: (_, item) => item?.order?.shippingPartner || "Itranxit",
    },
    {
      id: 8,
      title: "Delivery Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span className={`status-${item?.status?.toLowerCase()}`}>
          {item?.status?.toUpperCase() || "N/A"}
        </span>
      ),
      renderCsv: (_, item) => item?.status?.toUpperCase() || "N/A",
    },
  ];

  const canceledTabs = [
    {
      id: 1,
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      width: "100px",
      render: (orderId) => (
        <Link to={`/admin/order/${orderId}`}>{orderId}</Link>
      ),
      renderCsv: (orderId) => orderId,
    },
    {
      id: 2,
      title: "Image",
      dataIndex: "productImageUrl",
      key: "image",
      width: "70px",
      render: (productImageUrl) => (
        <div className="w-[2.5rem] h-[1.375rem] relative">
          <img
            className="absolute object-cover w-full h-full"
            alt="product"
            onError={handleOnError}
            src={productImageUrl || "/images/default.jpg"}
          />
        </div>
      ),
      csvOff: true,
    },
    {
      id: 3,
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (payment_method) => payment_method || "N/A",
      renderCsv: (payment_method) => payment_method || "N/A",
    },
    {
      id: 4,
      title: "Fulfilled By",
      dataIndex: "fulfilledBy",
      key: "fulfilledBy",
      render: (fulfilledBy) => fulfilledBy || "Not Assigned",
      renderCsv: (fulfilledBy) => fulfilledBy || "Not Assigned",
    },
    {
      id: 5,
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
      renderCsv: (date) => new Date(date).toISOString().split("T")[0],
    },
    {
      id: 6,
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount.toFixed(2)}`,
      renderCsv: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      id: 7,
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (paymentStatus) => (
        <span className={`status-${paymentStatus.toLowerCase()}`}>
          {paymentStatus}
        </span>
      ),
      renderCsv: (paymentStatus) => paymentStatus,
    },
    {
      id: 8,
      title: "Delivery Status",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
      render: (deliveryStatus) => (
        <span className={`status-${deliveryStatus.toLowerCase()}`}>
          {deliveryStatus}
        </span>
      ),
      renderCsv: (deliveryStatus) => deliveryStatus,
    },
    {
      id: 13,
      title: "",
      key: "action",
      render: ({ id }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/product/${id}`} />,
          key: "view",
        },
        {
          label: (
            <UserPrivateComponent permission={"update-product"}>
              <Link
                to={`/admin/product/${id}/update`}
                className="flex items-center gap-2 cursor-pointer"
              >
                <EditOutlined className=" p-1 rounded-md" />
                Edit
              </Link>
            </UserPrivateComponent>
          ),
          key: "edit",
        },
        {
          label: (
            <Link
              to={`/admin/print-barcode/${id}`}
              className="flex items-center gap-2 rounded"
            >
              <CiBarcode className="text-[1rem]" />
              Barcode
            </Link>
          ),
          key: "barcode",
        },
      ],
      csvOff: true,
    },
  ];

  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });

  useEffect(() => {
    // For All tab, pass 'all' as the status
    dispatch(loadOnlineOrder("all"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadAllProductSubCategory({ query: "all" }));
    dispatch(loadAllProductBrand({ query: "all" }));
  }, [dispatch]);

  return (
    <Fragment>
      <div className="grid sm:grid-cols-2 xl:grid-cols-7 gap-6 mt-5 mb-5">
        <div onClick={() => handleTab1(1)}>
          <div
            className={`ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 ${
              isTab1 === 1 ? "bg-[#FF800F] text-white" : "bg-white"
            } shadow-custom2 cursor-pointer rounded-lg`}
          >
            <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              All
            </span>
          </div>
        </div>
        <div onClick={() => handleTab1(2)}>
          <div
            className={`ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 ${
              isTab1 === 2 ? "bg-[#FF800F] text-white" : "bg-white"
            } shadow-custom2 cursor-pointer rounded-lg`}
          >
            <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              New
            </span>
          </div>
        </div>
        <div onClick={() => handleTab1(3)}>
          <div
            className={`ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 ${
              isTab1 === 3 ? "bg-[#FF800F] text-white" : "bg-white"
            } shadow-custom2 cursor-pointer rounded-lg`}
          >
            <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              Shipped
            </span>
          </div>
        </div>
        <div onClick={() => handleTab1(4)}>
          <div
            className={`ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 ${
              isTab1 === 4 ? "bg-[#FF800F] text-white" : "bg-white"
            } shadow-custom2 cursor-pointer rounded-lg`}
          >
            <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100">
              Delivered
            </span>
          </div>
        </div>
        <div onClick={() => handleTab1(5)}>
          <div
            className={`ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 ${
              isTab1 === 5 ? "bg-[#FF800F] text-white" : "bg-white"
            } shadow-custom2 cursor-pointer rounded-lg`}
          >
            <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              Returned
            </span>
          </div>
        </div>
        {/* <div onClick={() => handleTab1(6)}>
          <div
            className={`ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 ${
              isTab1 === 6 ? "bg-[#FF800F] text-white" : "bg-white"
            } shadow-custom2 cursor-pointer rounded-lg`}
          >
            <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              Arbitration
            </span>
          </div>
        </div> */}
        <div onClick={() => handleTab1(7)}>
          <div
            className={`ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 ${
              isTab1 === 7 ? "bg-[#FF800F] text-white" : "bg-white"
            } shadow-custom2 cursor-pointer rounded-lg`}
          >
            <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              Cancelled
            </span>
          </div>
        </div>
      </div>
      <div>
        <Card
          className="max-md:border-0 max-md:bg-white"
          bodyClass="max-md:p-0 "
          headClass="border-none"
          title={`${
            isTab1 === 1
              ? "All"
              : isTab1 === 2
              ? "New"
              : isTab1 === 3
              ? "Shipped"
              : isTab1 === 4
              ? "Delivered"
              : isTab1 === 5
              ? "Returned"
              : isTab1 === 6
              ? "Arbitration"
              : "Canceled"
          }`}
        >
          {/* <UserPrivateComponent permission={"readAll-product"}> */}
          <div style={{ display: `${isTab1 === 1 ? "block" : "none"}` }}>
            <All
              list={list}
              loading={loading}
              columns={allTabs}
              setPageConfig={setPageConfig}
              title="All"
              isSearch
            />
          </div>
          <div style={{ display: `${isTab1 === 2 ? "block" : "none"}` }}>
            <New
              list={list}
              total={total}
              loading={loading}
              columns={newTabs}
              // filters={filters}
              setPageConfig={setPageConfig}
              title="New"
              isSearch
            />
          </div>
          <div style={{ display: `${isTab1 === 3 ? "block" : "none"}` }}>
            <Shipped
              list={list}
              total={total}
              loading={loading}
              columns={shippedTabs}
              // filters={filters}
              setPageConfig={setPageConfig}
              title="Shipped"
              isSearch
            />
          </div>
          <div style={{ display: `${isTab1 === 4 ? "block" : "none"}` }}>
            <Delivered
              list={list}
              total={total}
              loading={loading}
              columns={deliveredTabs}
              // filters={filters}
              setPageConfig={setPageConfig}
              title="Delivered"
              isSearch
            />
          </div>
          <div style={{ display: `${isTab1 === 5 ? "block" : "none"}` }}>
            <Returned
              list={list}
              total={total}
              loading={loading}
              columns={returnedTabs}
              // filters={filters}
              setPageConfig={setPageConfig}
              title="Returned"
              isSearch
            />
          </div>
          <div style={{ display: `${isTab1 === 6 ? "block" : "none"}` }}>
            <Arbitration
              list={list}
              total={total}
              loading={loading}
              columns={arbitrationTabs}
              // filters={filters}
              setPageConfig={setPageConfig}
              title="Arbitration"
              isSearch
            />
          </div>
          <div style={{ display: `${isTab1 === 7 ? "block" : "none"}` }}>
            <Canceled
              list={list}
              total={total}
              loading={loading}
              columns={canceledTabs}
              // filters={filters}
              setPageConfig={setPageConfig}
              title="Canceled"
              isSearch
            />
          </div>
          {/* </UserPrivateComponent> */}
        </Card>
      </div>
      <Modal
        title="Create Shipment"
        open={isShipmentModalVisible}
        onOk={handleCreateShipment}
        onCancel={() => {
          setIsShipmentModalVisible(false);
          setImeiNumber("");
          setShipmentCode("");
        }}
        confirmLoading={isSubmitting}
      >
        <div className="mb-4">
          <p className="mb-2">Order ID: {selectedOrder?.orderItemCode}</p>

          {selectedOrder?.product?.hasWarranty && (
            <Input
              type="text"
              value={imeiNumber}
              onChange={(e) => setImeiNumber(e.target.value)}
              placeholder="Enter IMEI Number"
              className="mt-2"
              required
            />
          )}

          <Input
            type="text"
            value={shipmentCode}
            onChange={(e) => setShipmentCode(e.target.value)}
            placeholder="Enter Shipment Code"
            className="mt-2"
            required
          />

          {selectedOrder?.product?.hasWarranty ? (
            <p className="text-gray-500 mt-2">
              This product requires both IMEI number and shipment code.
            </p>
          ) : (
            <p className="text-gray-500 mt-2">
              This product only requires shipment code.
            </p>
          )}
        </div>
      </Modal>
    </Fragment>
  );
}
