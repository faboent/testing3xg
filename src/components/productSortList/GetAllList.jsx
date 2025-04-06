import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Input, message } from "antd";
import Card from "../../UI/Card";
import {
  loadProduct,
  loadProductCard,
} from "@/redux/rtk/features/product/productSlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddPurchaseOrder from "../PurchaseOrderList/AddPurchaseOrder";
import TableComponent from "./TableComponent";
import { stringShorter } from "@/utils/functions";
import { BiToggleLeft, BiToggleRight } from "react-icons/bi";
import { CiBarcode } from "react-icons/ci";
import { loadShortProduct } from "@/redux/rtk/features/product/productSlice";
import axios from "axios";
import config from "../../config/config";

const GetAllList = () => {
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const [isTab1, setIsTab1] = useState(1);

  const handleTab1 = (i) => {
    setIsTab1(i);
  };

  const { list, loading, total, card } = useSelector((state) => state.products);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });

  const handleOnError = (e) => {
    e.target.src = "/images/default.jpg";
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");
  const userId = localStorage.getItem("userId");

  const handleUpdateStock = async () => {
    try {
      await axios.patch(
        `${config.apiBaseUrl}/api/v1/merchants/products/shortage/update/${selectedProduct.id}`,
        {
          quantity: parseInt(newQuantity),
          userId: userId,
        }
      );

      message.success("Stock updated successfully");
      setIsModalVisible(false);
      dispatch(loadShortProduct()); // Refresh the list
    } catch (error) {
      message.error(error?.response?.data?.message || "Failed to update stock");
    }
  };

  const columns = [
    {
      id: 1,
      title: "Product ID",
      dataIndex: "erpSKUNumber",
      key: "erpSKUNumber",
      width: "200px",
      render: (erpSKUNumber, record) => (
        <Link to={`/admin/product/${record.id}`}>{erpSKUNumber}</Link>
      ),
      renderCsv: (erpSKUNumber) => erpSKUNumber,
    },
    {
      id: 2,
      title: "Image",
      dataIndex: "images",
      render: (images) => {
        const imageUrl = images?.[0]?.url || "/images/default.jpg";
        return (
          <div className="w-[2.5rem] h-[1.375rem] relative">
            <img
              className="absolute object-cover w-full h-full"
              alt="product"
              onError={handleOnError}
              src={imageUrl}
            />
          </div>
        );
      },
      key: "images",
      width: "170px",
      csvOff: true,
    },
    {
      id: 4,
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (productName, { id }) => (
        <Link title={productName} to={`/admin/product/${id}`}>
          {stringShorter(productName, 45)}
        </Link>
      ),
      width: "250px",
      renderCsv: (productName) => productName,
      tdClass: "whitespace-normal",
    },
    {
      id: 10,
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (brand) => brand,
      renderCsv: (brand) => brand,
    },
    {
      id: 9,
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category?.parent?.name,
      renderCsv: (category) => category?.parent?.name,
    },
    {
      id: 6,
      title: "Update Stock",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <span
          className="cursor-pointer text-blue-600 hover:text-blue-800"
          onClick={() => {
            setSelectedProduct(record);
            setNewQuantity(quantity.toString());
            setIsModalVisible(true);
          }}
        >
          {quantity}
        </span>
      ),
      renderCsv: (quantity) => quantity,
    },
    {
      id: 14,
      title: "Live",
      dataIndex: "status",
      key: "status",
      render: (status) => status,
      renderCsv: (status) => status,
    },
  ];

  useEffect(() => {
    dispatch(loadShortProduct());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-5 mb-5">
          <div onClick={() => handleTab1(1)}>
            <div
              className={`ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 ${
                isTab1 === 1 ? "bg-orange-500 text-white" : "bg-white"
              } shadow-custom2 cursor-pointer rounded-lg`}
            >
              <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100">
                Shop
              </span>
            </div>
          </div>
          <div onClick={() => handleTab1(2)}>
            <div
              className={`ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 ${
                isTab1 === 2 ? "bg-orange-500 text-white" : "bg-white"
              } shadow-custom2 cursor-pointer rounded-lg`}
            >
              <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100">
                Deals
              </span>
            </div>
          </div>
          <div onClick={() => handleTab1(3)}>
            <div
              className={`ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 ${
                isTab1 === 3 ? "bg-orange-500 text-white" : "bg-white"
              } shadow-custom2 cursor-pointer rounded-lg`}
            >
              <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100">
                Bulk Purchase
              </span>
            </div>
          </div>
        </div>
      </div>

      <Card
        className="max-md:border-0 max-md:bg-white"
        bodyClass="max-md:p-0"
        headClass="border-none"
        title={`${
          isTab1 === 1 ? "Shop" : isTab1 === 2 ? "Deals" : "Bulk Purchase"
        } Shortage List`}
      >
        <div style={{ display: `${isTab1 === 1 ? "block" : "none"}` }}>
          <TableComponent
            list={list}
            loading={loading}
            columns={columns}
            csvFileName="Shop Product List"
            paginatedThunk={loadProduct}
            setProductList={setProductList}
            productList={productList}
            isSearch
          />
        </div>
        <div style={{ display: `${isTab1 === 2 ? "block" : "none"}` }}>
          {/* <TableComponent
            list={list}
            loading={loading}
            columns={columns}
            csvFileName="Deals Product List"
            paginatedThunk={loadProduct}
            setProductList={setProductList}
            productList={productList}
            isSearch
          /> */}
        </div>
        <div style={{ display: `${isTab1 === 3 ? "block" : "none"}` }}>
          {/* <TableComponent
            list={list}
            loading={loading}
            columns={columns}
            csvFileName="Bulk Purchase List"
            paginatedThunk={loadProduct}
            setProductList={setProductList}
            productList={productList}
            isSearch
          /> */}
        </div>
      </Card>

      <Modal
        title="Update Stock"
        open={isModalVisible}
        onOk={handleUpdateStock}
        onCancel={() => setIsModalVisible(false)}
      >
        <div className="mb-4">
          <p className="mb-2">Product: {selectedProduct?.productName}</p>
          <p className="mb-4">Current Stock: {selectedProduct?.quantity}</p>
          <Input
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            placeholder="Enter new stock quantity"
          />
        </div>
      </Modal>
    </div>
  );
};

export default GetAllList;
