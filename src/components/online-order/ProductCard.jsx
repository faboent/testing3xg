import { Fragment, useEffect, useState } from "react";
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
  loadProduct,
  loadProductCard,
} from "@/redux/rtk/features/product/productSlice";
import { loadAllProductSubCategory } from "@/redux/rtk/features/productSubCategory/productSubCategorySlice";
import { loadAllProductBrand } from "@/redux/rtk/features/productBrand/productBrandSlice";
import { stringShorter } from "@/utils/functions";
import Shop from "./All";
import Deals from "./Deals";
import Luxury from "./Luxury";
import BulkPurchase from "./BulkPurchase";
import HealthSupply from "./HealthSupply";
export default function ProductCard() {
  const dispatch = useDispatch();

  const [isTab1, setIsTab1] = useState(1);
  const handleTab1 = (i) => {
    setIsTab1(i);
  };

  const { list, loading, total, card } = useSelector((state) => state.products);
  const { list: brandList, loading: brandLoading } = useSelector(
    (state) => state.productBrands
  );
  const { list: SubCategoryList, loading: SubLoading } = useSelector(
    (state) => state.productSubCategories
  );
  const handleOnError = (e) => {
    e.target.src = "/images/default.jpg";
  };
  const allProducts = [
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
  ];
  const dealColumns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "50px",
      render: (id) => <Link to={`/admin/product/deals/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Image",
      dataIndex: "productThumbnailImageUrl",
      render: (productThumbnailImageUrl) => (
        <div className="w-[2.5rem] h-[1.375rem] relative">
          <img
            className="absolute object-cover w-full h-full"
            alt="product"
            onError={handleOnError}
            src={productThumbnailImageUrl || "/images/default.jpg"}
          />
        </div>
      ),
      key: "image",
      width: "70px",
      csvOff: true,
    },
    {
      id: 3,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => (
        <Link title={name} to={`/admin/product/deals/${id}`}>
          {name}
        </Link>
      ),
      width: "150px",
      renderCsv: (name) => name,
      tdClass: "whitespace-normal",
    },
    {
      id: 4,
      title: "Deal Type",
      dataIndex: "dealType",
      key: "dealType",
      render: (dealType) => <span>{dealType}</span>,
    },
    {
      id: 5,
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => <span>{discount}%</span>,
    },
    {
      id: 6,
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      id: 7,
      title: "Brand",
      dataIndex: "productBrand",
      key: "productBrand",
      render: (productBrand) => productBrand?.name,
      renderCsv: (productBrand) => productBrand?.name,
    },
    {
      id: 8,
      title: "Sub Category",
      dataIndex: "productSubCategory",
      key: "productSubCategory",
      render: (productSubCategory) => productSubCategory?.name,
      renderCsv: (productSubCategory) => productSubCategory?.name,
    },
    {
      id: 9,
      title: "Purchase Price",
      dataIndex: "productPurchasePrice",
      key: "productPurchasePrice",
      render: (price) => <span>${price}</span>,
    },
    {
      id: 10,
      title: "Sale Price",
      dataIndex: "productSalePrice",
      key: "productSalePrice",
      render: (price) => <span>${price}</span>,
    },
    {
      id: 11,
      title: "Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      id: 12,
      title: "Reorder QTY",
      dataIndex: "reorderQuantity",
      key: "reorderQuantity",
    },
  ];

  const luxuryColumns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "50px",
      render: (id) => <Link to={`/admin/product/luxury/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Image",
      dataIndex: "productThumbnailImageUrl",
      render: (productThumbnailImageUrl) => (
        <div className="w-[2.5rem] h-[1.375rem] relative">
          <img
            className="absolute object-cover w-full h-full"
            alt="product"
            onError={handleOnError}
            src={productThumbnailImageUrl || "/images/default.jpg"}
          />
        </div>
      ),
      key: "image",
      width: "70px",
      csvOff: true,
    },
    {
      id: 3,
      title: "Luxury Type",
      dataIndex: "luxuryType",
      key: "luxuryType",
      render: (luxuryType) => <span>{luxuryType}</span>,
    },
    {
      id: 4,
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>${price}</span>,
    },
    {
      id: 5,
      title: "Brand",
      dataIndex: "productBrand",
      key: "productBrand",
      render: (productBrand) => productBrand?.name,
      renderCsv: (productBrand) => productBrand?.name,
    },
    {
      id: 6,
      title: "Sub Category",
      dataIndex: "productSubCategory",
      key: "productSubCategory",
      render: (productSubCategory) => productSubCategory?.name,
      renderCsv: (productSubCategory) => productSubCategory?.name,
    },
    {
      id: 7,
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      id: 8,
      title: "Purchase Price",
      dataIndex: "productPurchasePrice",
      key: "productPurchasePrice",
      render: (productPurchasePrice) => <span>${productPurchasePrice}</span>,
      responsive: ["md"],
    },
    {
      id: 9,
      title: "VAT",
      dataIndex: "productVat",
      key: "productVat",
      render: (productVat) => (
        <span>{productVat ? `${productVat?.percentage}%` : "0%"}</span>
      ),
      renderCsv: (productVat) =>
        `${productVat?.percentage ? productVat?.percentage : 0}%`,
    },
    {
      id: 10,
      title: "Sale Price",
      dataIndex: "productSalePrice",
      key: "productSalePrice",
      render: (productSalePrice) => <span>${productSalePrice}</span>,
      responsive: ["md"],
    },
    {
      id: 11,
      title: "Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      id: 12,
      title: "UoM",
      key: "uomValue",
      render: ({ uom, uomValue }) =>
        `${uomValue || ""}${uom?.name ? `/${uom.name}` : ""}`,
      renderCsv: ({ uom, uomValue }) =>
        `${uomValue || ""}${uom?.name ? `/${uom.name}` : ""}`,
    },
    {
      id: 13,
      title: "Reorder QTY",
      dataIndex: "reorderQuantity",
      key: "reorderQuantity",
    },
    {
      id: 14,
      title: "Action",
      key: "action",
      render: ({ id }) => [
        {
          label: (
            <ViewBtn title={"View"} path={`/admin/product/luxury/${id}`} />
          ),
          key: "view",
        },
        {
          label: (
            <UserPrivateComponent permission={"update-product"}>
              <Link
                to={`/admin/product/luxury/${id}/update`}
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

  const bulkPurchaseColumns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "50px",
      render: (id) => <Link to={`/admin/product/bulk/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Image",
      dataIndex: "productThumbnailImageUrl",
      render: (productThumbnailImageUrl) => (
        <div className="w-[2.5rem] h-[1.375rem] relative">
          <img
            className="absolute object-cover w-full h-full"
            alt="product"
            onError={handleOnError}
            src={productThumbnailImageUrl || "/images/default.jpg"}
          />
        </div>
      ),
      key: "image",
      width: "70px",
      csvOff: true,
    },
    {
      id: 3,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => (
        <Link title={name} to={`/admin/product/bulk/${id}`}>
          {stringShorter(name, 45)}
        </Link>
      ),
      width: "150px",
      renderCsv: (name) => name,
      tdClass: "whitespace-normal",
    },
    {
      id: 4,
      title: "Brand",
      dataIndex: "productBrand",
      key: "productBrand",
      render: (productBrand) => productBrand?.name,
      renderCsv: (productBrand) => productBrand?.name,
    },
    {
      id: 5,
      title: "Sub Category",
      dataIndex: "productSubCategory",
      key: "productSubCategory",
      render: (productSubCategory) => productSubCategory?.name,
      renderCsv: (productSubCategory) => productSubCategory?.name,
    },
    {
      id: 6,
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      id: 7,
      title: "Bulk Quantity",
      dataIndex: "bulkQuantity",
      key: "bulkQuantity",
      render: (bulkQuantity) => <span>{bulkQuantity}</span>,
    },
    {
      id: 8,
      title: "Price per Unit",
      dataIndex: "pricePerUnit",
      key: "pricePerUnit",
      render: (pricePerUnit) => <span>${pricePerUnit}</span>,
    },
    {
      id: 9,
      title: "Purchase Price",
      dataIndex: "productPurchasePrice",
      key: "productPurchasePrice",
      responsive: ["md"],
    },
    {
      id: 10,
      title: "Vat",
      dataIndex: "productVat",
      key: "productVat",
      render: (productVat) => (
        <span>{productVat ? `${productVat?.percentage}%` : "0%"}</span>
      ),
      renderCsv: (productVat) =>
        `${productVat?.percentage ? productVat?.percentage : 0}%`,
    },
    {
      id: 11,
      title: "Sale Price",
      dataIndex: "productSalePrice",
      key: "productSalePrice",
      responsive: ["md"],
    },
    {
      id: 12,
      title: "UoM",
      key: "uomValue",
      render: ({ uom, uomValue }) =>
        `${uomValue || ""}${uom?.name ? `/${uom.name}` : ""}`,
      renderCsv: ({ uom, uomValue }) =>
        `${uomValue || ""}${uom?.name ? `/${uom.name}` : ""}`,
    },
    {
      id: 13,
      title: "Reorder Quantity",
      dataIndex: "reorderQuantity",
      key: "reorderQuantity",
    },
    {
      id: 14,
      title: "",
      key: "action",
      render: ({ id }) => [
        {
          label: <ViewBtn title={"View"} path={`/admin/product/bulk/${id}`} />,
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
  const healthAndSuppliesColumns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "50px",
      render: (id) => <Link to={`/admin/product/health/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Image",
      dataIndex: "productThumbnailImageUrl",
      render: (productThumbnailImageUrl) => (
        <div className="w-[2.5rem] h-[1.375rem] relative">
          <img
            className="absolute object-cover w-full h-full"
            alt="product"
            onError={handleOnError}
            src={productThumbnailImageUrl || "/images/default.jpg"}
          />
        </div>
      ),
      key: "image",
      width: "70px",
      csvOff: true,
    },
    {
      id: 3,
      title: "Category",
      dataIndex: "healthCategory",
      key: "healthCategory",
      render: (healthCategory) => <span>{healthCategory}</span>,
    },
    {
      id: 4,
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (expiryDate) => <span>{expiryDate}</span>,
    },
    {
      id: 5,
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (brand) => <span>{brand}</span>,
    },
    {
      id: 6,
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>${price}</span>,
    },
    {
      id: 7,
      title: "Stock QTY",
      dataIndex: "productQuantity",
      key: "productQuantity",
      render: (productQuantity) => <span>{productQuantity}</span>,
    },
    {
      id: 8,
      title: "UoM",
      key: "uomValue",
      render: ({ uom, uomValue }) =>
        `${uomValue || ""}${uom?.name ? `/${uom.name}` : ""}`,
      renderCsv: ({ uom, uomValue }) =>
        `${uomValue || ""}${uom?.name ? `/${uom.name}` : ""}`,
    },
    {
      id: 9,
      title: "Reorder QTY",
      dataIndex: "reorderQuantity",
      key: "reorderQuantity",
      render: (reorderQuantity) => <span>{reorderQuantity}</span>,
    },
    {
      id: 10,
      title: "Action",
      key: "action",
      render: ({ id }) => [
        {
          label: (
            <Link to={`/admin/product/${id}`} className="flex items-center">
              View
            </Link>
          ),
          key: "view",
        },
        {
          label: (
            <Link
              to={`/admin/product/${id}/update`}
              className="flex items-center"
            >
              Edit
            </Link>
          ),
          key: "edit",
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

  const filters = [
    {
      key: "productSubCategoryId",
      label: "Sub Category",
      type: "select",
      options: SubCategoryList?.map((item) => ({
        label: item?.name,
        value: item?.id,
      })),
      className: "min-w-[123px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
    {
      key: "productBrandId",
      label: "Brand",
      type: "select",
      options: brandList?.map((item) => ({
        label: item?.name,
        value: item?.id,
      })),
      className: "min-w-[100px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Show", value: "true" },
        { label: "Hide", value: "false" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
  ];

  useEffect(() => {
    dispatch(loadProductCard());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadProduct(pageConfig));
  }, [dispatch, pageConfig]);

  useEffect(() => {
    dispatch(loadAllProductSubCategory({ query: "all" }));
    dispatch(loadAllProductBrand({ query: "all" }));
  }, [dispatch]);

  return (
    <Fragment>
      <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-6 mt-5 mb-5">
        <div onClick={() => handleTab1(1)}>
          <div
            className={`ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 ${
              isTab1 === 1 ? "bg-orange-500 text-white" : "bg-white"
            } shadow-custom2 cursor-pointer rounded-lg`}
          >
            <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
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
            <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
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
            <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              Luxury
            </span>
          </div>
        </div>
        <div onClick={() => handleTab1(4)}>
          <div
            className={`ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 ${
              isTab1 === 4 ? "bg-orange-500 text-white" : "bg-white"
            } shadow-custom2 cursor-pointer rounded-lg`}
          >
            <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              Bulk Purchase
            </span>
          </div>
        </div>
        <div onClick={() => handleTab1(5)}>
          <div
            className={`ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 ${
              isTab1 === 5 ? "bg-orange-500 text-white" : "bg-white"
            } shadow-custom2 cursor-pointer rounded-lg`}
          >
            <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              Health & Supplies
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
              ? "Shop"
              : isTab1 === 2
              ? "Deals"
              : isTab1 === 3
              ? "Luxury"
              : isTab1 === 4
              ? "Bulk Purchase"
              : "Health & Supplies"
          }`}
          extra={
            <CreateDrawer
              permission={"create-product"}
              title={"Create Product"}
              width={60}
            >
              <AddProd />
            </CreateDrawer>
          }
        >
          <UserPrivateComponent permission={"readAll-product"}>
            <div style={{ display: `${isTab1 === 1 ? "block" : "none"}` }}>
              <Shop
                list={list}
                total={total}
                loading={loading}
                columns={allProducts}
                filters={filters}
                setPageConfig={setPageConfig}
                title="Shop"
                isSearch
              />
            </div>
            <div style={{ display: `${isTab1 === 2 ? "block" : "none"}` }}>
              <Deals
                list={list}
                total={total}
                loading={loading}
                columns={dealColumns}
                filters={filters}
                setPageConfig={setPageConfig}
                title="Deals"
                isSearch
              />
            </div>
            <div style={{ display: `${isTab1 === 3 ? "block" : "none"}` }}>
              <Luxury
                list={list}
                total={total}
                loading={loading}
                columns={luxuryColumns}
                filters={filters}
                setPageConfig={setPageConfig}
                title="Luxury"
                isSearch
              />
            </div>
            <div style={{ display: `${isTab1 === 4 ? "block" : "none"}` }}>
              <BulkPurchase
                list={list}
                total={total}
                loading={loading}
                columns={bulkPurchaseColumns}
                filters={filters}
                setPageConfig={setPageConfig}
                title="Bulk Purchase"
                isSearch
              />
            </div>
            <div style={{ display: `${isTab1 === 5 ? "block" : "none"}` }}>
              <HealthSupply
                list={list}
                total={total}
                loading={loading}
                columns={healthAndSuppliesColumns}
                filters={filters}
                setPageConfig={setPageConfig}
                title="Health & Supplies"
                isSearch
              />
            </div>
          </UserPrivateComponent>
        </Card>
      </div>
    </Fragment>
  );
}
