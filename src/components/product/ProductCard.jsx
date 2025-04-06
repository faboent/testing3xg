import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@/UI/Card";
import CreateDrawer from "../CommonUi/CreateDrawer";
import AddProd from "./AddProduct";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import { useDispatch, useSelector } from "react-redux";
import ViewBtn from "../Buttons/ViewBtn";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CiBarcode } from "react-icons/ci";
import {
  loadProduct,
  loadProductCard,
} from "@/redux/rtk/features/product/productSlice";
import { loadAllProductSubCategory } from "@/redux/rtk/features/productSubCategory/productSubCategorySlice";
import { loadAllProductBrand } from "@/redux/rtk/features/productBrand/productBrandSlice";
import { stringShorter } from "@/utils/functions";
import Shop from "./Shop";
import Deals from "./Deals";
import Luxury from "./Luxury";
import BulkPurchase from "./BulkPurchase";
import HealthSupply from "./HealthSupply";
import { BiToggleLeft, BiToggleRight } from "react-icons/bi";
// import Leaderboard from "./Leaderboard";
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
  const productsColumn = [
    {
      id: 1,
      title: "ID",
      dataIndex: "erpSKUNumber", // Changed from item_code to id
      key: "erpSKUNumber",
      width: "50px",
      render: (id) => <Link to={`/admin/online-order/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Image",
      dataIndex: "images", // Changed from image to images
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
      width: "70px",
      csvOff: true,
    },
    {
      id: 4,
      title: "Product Name",
      dataIndex: "productName", // Changed from product_name to productName
      key: "productName",
      render: (productName, { id }) => (
        <Link title={productName} to={`/admin/product/${id}`}>
          {stringShorter(productName, 45)}
        </Link>
      ),
      width: "150px",
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
      render: (category) => category,
      renderCsv: (category) => category,
    },
    {
      id: 15,
      title: "Sub Category",
      dataIndex: "sub_category",
      key: "sub_category",
      render: (sub_category) => sub_category,
      renderCsv: (sub_category) => sub_category,
    },
    // {
    //   id: 16,
    //   title: "Sub Sub Category",
    //   dataIndex: "sub_sub_category",
    //   key: "sub_sub_category",
    //   render: (sub_sub_category) => sub_sub_category,
    //   renderCsv: (sub_sub_category) => sub_sub_category,
    // },
    // {
    //   id: 3,
    //   title: "Actual Price",
    //   dataIndex: "actual_price",
    //   key: "actual_price",
    //   render: (actual_price) =>
    //     "₦" +
    //     actual_price.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    //   renderCsv: (actual_price) =>
    //     "₦" +
    //     actual_price.toLocaleString(undefined, { maximumFractionDigits: 2 }),
    // },

    // {
    //   id: 7,
    //   title: "Discounted Price",
    //   dataIndex: "discounted_price",
    //   key: "discounted_price",
    //   render: (discounted_price) =>
    //     "₦" +
    //     discounted_price.toLocaleString(undefined, {
    //       maximumFractionDigits: 2,
    //     }),
    //   renderCsv: (discounted_price) =>
    //     "₦" +
    //     discounted_price.toLocaleString(undefined, {
    //       maximumFractionDigits: 2,
    //     }),
    // },
    // {
    //   id: 3,
    //   title: "Discount",
    //   dataIndex: "discount",
    //   key: "discount",
    //   render: (discount) => discount,
    //   renderCsv: (discount) => discount,
    // },
    {
      id: 6,
      title: "Stock QTY",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => quantity,
      renderCsv: (quantity) => quantity,
    },
    {
      id: 14,
      title: "Live",
      dataIndex: "status",
      key: "status",
      render: (status) => status,
      renderCsv: (is_live) => is_live,
    },
    // {
    //   id: 8,
    //   title: "Rating",
    //   dataIndex: "rating",
    //   key: "rating",
    //   render: (rating) => rating,
    //   renderCsv: (rating) => rating,
    // },
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
            <Link
              to={`/admin/product/${id}/update`}
              className="flex items-center gap-2 cursor-pointer"
            >
              <EditOutlined className=" p-1 rounded-md" />
              Edit
            </Link>
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
      title: "Quantity",
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

  const businessCategory = localStorage.getItem("businessCategory");

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-5 mb-5">
          <div onClick={() => handleTab1(1)}>
            <div
              className={`ant-shadow w-full relative p-4 sm:p-2 dark:bg-[#2e2d35] flex flex-col justify-center md:p-6 ${
                isTab1 === 1 ? "bg-orange-500 text-white" : "bg-white"
              } shadow-custom2 cursor-pointer rounded-lg`}
            >
              <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100">
                Shop
              </span>
              <span className="uppercase sm:text-[12px] block font-normal mt-1 dark:text-yellow-100">
                Sell Gadget, Computing & IOT devices
              </span>
            </div>
          </div>
          <div onClick={() => handleTab1(2)}>
            <div
              className={`ant-shadow w-full relative p-4 sm:p-2 dark:bg-[#2e2d35] flex flex-col justify-center md:p-6 ${
                isTab1 === 2 ? "bg-orange-500 text-white" : "bg-white"
              } shadow-custom2 cursor-pointer rounded-lg`}
            >
              <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100">
                Deals
              </span>
              <span className="uppercase sm:text-[12px] block font-normal mt-1 dark:text-yellow-100">
                Special offer and discount
              </span>
            </div>
          </div>
          <div onClick={() => handleTab1(3)}>
            <div
              className={`ant-shadow w-full relative p-4 sm:p-2 dark:bg-[#2e2d35] flex flex-col justify-center md:p-6 ${
                isTab1 === 3 ? "bg-orange-500 text-white" : "bg-white"
              } shadow-custom2 cursor-pointer rounded-lg`}
            >
              <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100">
                Bulk Purchase
              </span>
              <span className="uppercase sm:text-[12px] block font-normal mt-1 dark:text-yellow-100">
                Wholesales and volume pricing
              </span>
            </div>
          </div>

          {/* <div onClick={() => handleTab1(4)}>
          <div
            className={`ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 ${
              isTab1 === 4 ? "bg-orange-500 text-white" : "bg-white"
              } shadow-custom2 cursor-pointer rounded-lg`}
              >
              <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              Luxury
              </span>
              </div>
              </div>
              <div
              onClick={() => businessCategory !== "Luxury" && handleTab1(5)}
              className={`ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 ${
                isTab1 === 5
              ? "bg-orange-500 text-white"
              : businessCategory === "Luxury"
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white"
              } shadow-custom2 rounded-lg`}
              >
              <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              Health & Supplies
              </span>
              </div> */}
        </div>
        {/* <div className="w-[40%]">
          <Leaderboard />
        </div> */}
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
              ? "Bulk Purchase"
              : isTab1 === 4
              ? "Luxury"
              : "Health & Supplies"
          }`}
          extra={
            <div className="flex items-center gap-3">
              <Link
                to="/admin/product/add"
                className={`xs:px-3 px-2 md:text-base py-[6px] lg:px-5 border bg-[#FF800F] hover:bg-[#FF800F]/60 text-white rounded cursor-pointer flex items-center gap-2`}
              >
                <PlusOutlined />
                Add Product
              </Link>

              {/* <CreateDrawer
                permission={"create-product"}
                title={"Create Product"}
                width={60}
                maskClosable={false}
              >
                <AddProd />
              </CreateDrawer> */}
            </div>
          }
        >
          {/* <UserPrivateComponent permission={"readAll-product"}> */}
          <div style={{ display: `${isTab1 === 1 ? "block" : "none"}` }}>
            <Shop
              list={list}
              // total={total}
              loading={loading}
              columns={productsColumn}
              // filters={filters}
              setPageConfig={setPageConfig}
              title="Shop"
              isSearch
            />
          </div>
          {/* <div style={{ display: `${isTab1 === 2 ? "block" : "none"}` }}>
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
            </div> */}
          {/* </UserPrivateComponent> */}
        </Card>
      </div>
    </Fragment>
  );
}
