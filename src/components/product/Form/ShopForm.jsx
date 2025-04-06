import tinycolor from "tinycolor2";
import BigDrawer from "@/components/Drawer/BigDrawer";
import queryGenerator from "@/utils/queryGenarator";
import {
  Form,
  Input,
  Select,
  Upload,
  Tabs,
  Button,
  InputNumber,
  notification,
} from "antd";
import chroma from "chroma-js";

import {
  addProduct,
  loadProduct,
} from "../../../redux/rtk/features/product/productSlice";
// import { createProduct } from "../../../redux/rtk/features/product/testSlice";
import { loadAllProductCategory } from "../../../redux/rtk/features/productCategory/productCategorySlice";
import { loadAllProductSubCategory } from "../../../redux/rtk/features/productSubCategory/productSubCategorySlice";
import { loadAllProductSubSubCategory } from "../../../redux/rtk/features/productSubSubCategory/productSubSubCategorySlice";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ColorDropdown from "../colorDropDown";
import AttributesDropdown from "../attributesDropDown";
import AttributeValueDropdown from "../attributeValueDropdown";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
  NotificationFilled,
  PlusOutlined,
  WarningFilled,
} from "@ant-design/icons";
import AddDiscount from "@/components/eComErp/Discount/AddDiscount";
import AddVatTax from "@/components/vatTax/addVatTax";
import ReactQuill from "react-quill";
import { BiNotification, BiTrash } from "react-icons/bi";
import { CiWarning } from "react-icons/ci";
import { PiWarningBold } from "react-icons/pi";
import { handleBeforeUpload } from "./ImageCompressor";
import { generateSku } from "./sku";
import config from "../../../config/config";

export const textEditorModule = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link", "image"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

const { TabPane } = Tabs;

// Quill formats to specify allowed styles
export const textEditorFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "background",
];

const ShopForm = () => {
  const [activeTab, setActiveTab] = useState("Shop");
  const [specifications, setSpecifications] = useState(false);
  const [features, setFeatures] = useState(false);

  // Redux selectors for fetching necessary data
  const category = useSelector((state) => state.productCategories?.list);
  const subCategory = useSelector((state) => state.productSubCategories?.list);
  const subSubCategory = useSelector(
    (state) => state.productSubSubCategories?.list
  );
  const brand = useSelector((state) => state.productBrands?.list);
  const model = useSelector((state) => state.productModels?.list);
  const attribute = useSelector((state) => state.productAttribute?.list);
  const { list: color } = useSelector((state) => state.colors);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(loadAllProductCategory());
    dispatch(loadAllProductSubCategory());
    dispatch(loadAllProductSubSubCategory());
  }, [dispatch]);

  // Local state management
  const [galleryFileList, setGalleryFileList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [prodCat, setProdCat] = useState(null);
  const [prodSubCat, setProdSubCat] = useState(null);
  const [prodSubSubCat, setProdSubSubCat] = useState(null);
  const [prodBrand, setProdBrand] = useState(null);
  const [prodDescription, setProdDescription] = useState("");
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [selectedWarrantyPeriod, setSelectedWarrantyPeriod] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [availableSubCategories, setAvailableSubCategories] = useState([]);
  const [availableSubSubCategories, setAvailableSubSubCategories] = useState(
    []
  );

  const businessId = localStorage.getItem("businessId");
  const [selectedCommission, setSelectedCommission] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);

  const defaultSpecs = [
    {
      name: "RAM",
      value: "",
      type: "dropdown",
      options: [
        "1 GB",
        "2 GB",
        "3 GB",
        "4 GB",
        "6 GB",
        "8 GB",
        "10 GB",
        "12 GB",
        "16 GB",
        "32GB",
        "64GB",
        "32 MB",
        "64 MB",
        "128 MB",
        "256 MB",
        "512 MB",
        "768 MB",
        "Below 128 MB",
        "None",
      ],
      placeholder: "Select RAM capacity",
    },
    {
      name: "Storage Capacity",
      value: "",
      type: "dropdown",
      options: [
        "1 GB",
        "2 GB",
        "3 GB",
        "4 GB",
        "6 GB",
        "8 GB",
        "16 GB",
        "32 GB",
        "64 GB",
        "128 GB",
        "256 GB",
        "512 GB",
        "1 TB",
        "2 TB",
        "3 TB",
        "4 TB",
        "16 MB",
        "32 MB",
        "64 MB",
        "128 MB",
        "256 MB",
        "512 MB",
        "Below 16 MB",
      ],
      placeholder: "Select storage capacity ",
    },
    {
      name: "Battery Capacity",
      value: "",
      type: "dropdown",
      options: [
        "1000mAh",
        "1200mAh",
        "1300mAh",
        "1450mAh",
        "2000mAh",
        "2200mAh",
        "2300mAh",
        "2450mAh",
        "3000mAh",
        "3200mAh",
        "3300mAh",
        "3450mAh",
        "4000mAh",
        "4200mAh",
        "4300mAh",
        "4450mAh",
        "5000mAh",
        "5200mAh",
        "5300mAh",
        "5450mAh",
        "6000mAh",
        "6200mAh",
        "6300mAh",
        "6450mAh",
        "7000mAh",
        "7200mAh",
        "7300mAh",
        "7450mAh",
        "8000mAh",
        "8200mAh",
        "8300mAh",
        "8450mAh",
        "9000mAh",
        "9200mAh",
        "9300mAh",
        "9450mAh",
        "10000mAh",
        "11000mAh",
        "15000mAh",
        "Less than 1000mAh",
        "Over 15000mAh",
      ],
      placeholder: "Select battery capacity ",
    },
    {
      name: "OS",
      value: "",
      type: "dropdown",
      options: [
        "iOS",
        "Android OS",
        "Java OS",
        "Windows OS",
        "Symbian OS",
        "BlackBerry OS",
      ],
      placeholder: "Select Operating System",
    },
    {
      name: "Model",
      value: "",
      placeholder: "Enter value (e.g., 100%, 90%)",
    },
    {
      name: "Network Supported",
      value: "",
      type: "dropdown",
      options: ["2G", "3G", "4G", "5G", "EDGE", "GPRS"],
      placeholder: "Select Network type",
    },
    {
      name: "Number Of Sim Slots*",
      value: "",
      type: "dropdown",
      options: [
        "Dual Micro SIM",
        "Dual Mini SIM",
        "Dual Nano SIM",
        "Dual SIM",
        "Quatro SIM",
        "Single Micro SIM",
        "Single Nano SIM",
        "Single SIM",
        "Triple SIM",
        "E-SIM",
      ],
      placeholder: "Select Number of slim slots",
    },
    {
      name: "Sim Types Supported*",
      value: "",
      type: "dropdown",
      options: [
        "Dual Micro SIM",
        "Dual Mini SIM",
        "Dual Nano SIM",
        "Dual SIM Nano",
        "Nano SIM",
        "Quatro SIM",
        "Single Micro SIM",
        "Single SIM",
        "Triple SIM",
      ],
      placeholder: "Select sim types",
    },
    {
      name: "Connectivity",
      value: "",
      type: "dropdown",
      options: [
        "Bluetooth Only",
        "Ethernet",
        "USB + Bluetooth + WiFi",
        "USB Only",
        "WiFi + 3G",
        "WiFi + 4G",
        "WiFi + 5G",
        "5G",
        "WiFi Only",
        "Wired",
      ],
      placeholder: "Select connectivity",
    },
    {
      name: "Colour*",
      value: "",
      type: "dropdown",
      options: [
        "Beige",
        "Black",
        "Blue",
        "Bronze",
        "Brown",
        "Gold",
        "Green",
        "Grey",
        "Multicolour",
        "Orange",
        "Pink",
        "Purple",
        "Red",
        "Silver",
        "White",
        "Yellow",
      ],
      placeholder: "Select color",
    },
    {
      name: "Display Size*",
      value: "",
      type: "dropdown",
      options: [
        "1.36 inches",
        "1.4 inches",
        "1.45 inches",
        "1.5 inches",
        "1.52 inches",
        "1.56 inches",
        "1.7 inches",
        "1.77 inches",
        "1.8 inches",
        "2 inches",
        "2.2 inches",
        "2.25 inches",
        "2.3 inches",
        "2.4 inches",
        "2.5 inches",
        "2.6 inches",
        "2.8 inches",
        "2.9 inches",
        "3 inches",
        "3.1 inches",
        "3.2 inches",
        "3.3 inches",
        "3.4 inches",
        "3.5 inches",
        "3.6 inches",
        "3.7 inches",
        "3.8 inches",
        "3.9 inches",
        "4 inches",
        "4.2 inches",
        "4.3 inches",
        "4.4 inches",
        "4.5 inches",
        "4.6 inches",
        "4.7 inches",
        "4.8 inches",
        "4.93 inches",
        "5 inches",
        "5.1 inches",
        "5.2 inches",
        "5.3 inches",
        "5.5 inches",
        "5.6 inches",
        "5.7 inches",
        "5.88 inches",
        "5.9 inches",
        "6 inches",
        "6.1 inches",
        "6.4 inches",
        "7 inches",
        "7.1 inches",
        "7.5 inches",
        "7.85 inches",
        "7.9 inches",
        "8 inches",
        "8.3 inches",
        "9 inches",
        "9.4 inches",
        "9.5 inches",
        "9.6 inches",
        "9.7 inches",
        "10 inches",
        "10.1 inches",
        "10.5 inches",
        "10.6 inches",
        "11 inches",
        "11.6 inches",
        "12 inches",
        "12.1 inches",
        "12.2 inches",
        "12.5 inches",
        "13 inches",
        "13.1 inches",
        "13.3 inches",
        "14 inches",
        "14.1 inches",
        "14.4 inches",
        "14.5 inches",
        "15 inches",
        "15.4 inches",
        "15.5 inches",
        "15.6 inches",
        "17 inches",
        "17.3 inches",
        "17.6 inches",
        "18 inches",
        "18.5 inches",
        "19 inches",
        "19.5 inches",
        "Others",
      ],
      placeholder: "Select display size",
    },
  ];

  const prodCatHandler = (value, option) => {
    setProdCat(option.children);
    const selectedCat = category.find((cat) => cat.name === option.children);
    setSelectedCategory(selectedCat);
    setSelectedCommission(parseFloat(selectedCat?.commision || 0));

    // Set default specifications for Computing and Phones & Tablets
    if (
      option.children === "Computing" ||
      option.children === "Phones & Tablets"
    ) {
      const defaultSpecsWithKeys = defaultSpecs.map((spec) => ({
        ...spec,
        key: spec.name,
        isDefault: true,
      }));
      setProductSpecifications(defaultSpecsWithKeys);

      // Set the form values for specifications
      form.setFieldsValue({
        specifications: defaultSpecsWithKeys.map((spec) => ({
          key: spec.name,
          value: spec.type === "dropdown" ? undefined : "", // Ensure dropdowns use `undefined`
        })),
      });
    } else {
      // Reset form fields for specifications when other categories are selected
      form.setFieldsValue({
        specifications: [{ key: "", value: "" }],
      });
      setProductSpecifications([{ key: Date.now(), name: "", value: "" }]);
    }

    if (selectedCat?.children?.length > 0) {
      setAvailableSubCategories(selectedCat.children);
    } else {
      setAvailableSubCategories([]);
    }

    setProdSubCat(null);
    setProdSubSubCat(null);
    setSelectedSubCategory(null);
    setAvailableSubSubCategories([]);
    form.setFieldsValue({
      sub_category: undefined,
      sub_sub_category: undefined,
    });
  };

  const navigate = useNavigate();

  const prodSubCatHandler = (value, option) => {
    setProdSubCat(option.children);
    const subCat = availableSubCategories.find(
      (sub) => sub.name === option.children
    );
    setSelectedSubCategory(subCat);
    // Update commission if subcategory is selected
    setSelectedCommission(parseFloat(subCat?.commision || 0));

    if (subCat?.children?.length > 0) {
      setAvailableSubSubCategories(subCat.children);
    } else {
      setAvailableSubSubCategories([]);
    }

    setProdSubSubCat(null);
    form.setFieldsValue({ sub_sub_category: undefined });
  };

  const prodBrandHandler = (value, option) => setProdBrand(option.children);
  const prodDescriptionHandler = (val) => setProdDescription(val);
  const warrantyHandler = (val) => {
    setSelectedWarranty(val === "Yes");
  };
  const warrantyPeriodHandler = (val) => setSelectedWarrantyPeriod(val);
  const weightHandler = (val) => setSelectedWeight(val);

  // State for dynamic fields
  const [productSpecifications, setProductSpecifications] = useState([
    { key: Date.now(), name: "", value: "" },
  ]);
  const [productColor, setProductColor] = useState([
    { key: Date.now(), value: "" },
  ]);

  const addProductSpecification = () => {
    setProductSpecifications([
      ...productSpecifications,
      { key: Date.now(), name: "", value: "" },
    ]);
  };

  const handleColorChange = (value, index) => {
    let hex = value;

    if (!chroma.valid(value)) {
      try {
        hex = chroma(value).hex();
      } catch (error) {
        hex = "#ffffff";
      }
    }

    const updatedColors = [...productColor];
    updatedColors[index] = { ...updatedColors[index], name: value, hex };
    setProductColor(updatedColors);
  };

  // const prodCatHandler = (value, option) => {
  //   setProdCat(option.children);
  // };
  // const prodSubCatHandler = (value, option) => {
  //   setProdSubCat(option.children);
  // };
  const prodSubSubCatHandler = (value, option) => {
    setProdSubSubCat(option.children);
    // Update commission if sub-subcategory is selected
    const subSubCat = availableSubSubCategories.find(
      (sub) => sub.name === option.children
    );
    setSelectedCommission(parseFloat(subSubCat?.commision || 0));
  };
  const addProductColor = () => {
    setProductColor([...productColor, { key: Date.now(), value: "" }]);
  };

  const removeSpecification = (key) => {
    setProductSpecifications((prev) =>
      prev.filter((field) => field.key !== key)
    );
  };

  const removeColor = (key) => {
    setProductColor((prev) => prev.filter((field) => field.key !== key));
  };

  const onFinish = async (values) => {
    if (galleryFileList.length < 4) {
      notification.error({
        message: "Missing Images",
        description:
          "Please upload all 4 required product images (Front, Back, Top, and Side views).",
      });
      setLoader(false);
      return;
    }

    // Check if all required image types are present
    const requiredTypes = ["front", "back", "top", "side"];
    const missingTypes = requiredTypes.filter(
      (type) => !galleryFileList.some((file) => file.imageType === type)
    );

    if (missingTypes.length > 0) {
      notification.error({
        message: "Missing Image Views",
        description: `Please upload the following views: ${missingTypes.join(
          ", "
        )}`,
      });
      setLoader(false);
      return;
    }
    setLoader(true);
    try {
      // Create the request body directly as an object instead of FormData
      const requestBody = {
        productName: values.productName,
        categoryId: parseInt(
          prodSubSubCat
            ? availableSubSubCategories.find(
                (cat) => cat.name === prodSubSubCat
              )?.id
            : prodSubCat
            ? availableSubCategories.find((cat) => cat.name === prodSubCat)?.id
            : category.find((cat) => cat.name === prodCat)?.id
        ),
        merchantId: businessId,
        actualPrice: parseFloat(values.actual_price),
        discountedPrice: parseFloat(values.discounted_price) || 0,
        discount: parseFloat(values.discount) || 0,
        images: galleryFileList.map((file) => ({
          url: file.url,
          alt:
            file.imageType === "front"
              ? "Product Thumbnail"
              : `${file.imageType} view of product`,
          type: file.imageType === "front" ? "thumbnail" : undefined,
        })),
        brand: prodBrand,
        description: prodDescription,
        specification: values.specifications
          ? values.specifications
              .filter((spec) => spec.key && spec.value)
              .map((spec) => ({
                key: spec.key,
                value: spec.value,
              }))
          : [],
        model: values.model,
        weight: selectedWeight,
        color: values.color
          ? values.color.map((c) => ({
              color: c.name,
            }))
          : [],
        quantity: parseInt(values.quantity),
        warranty: selectedWarranty ? selectedWarrantyPeriod : null,
      };

      const resp = await dispatch(addProduct(requestBody));

      if (resp.payload.message === "success") {
        form.resetFields();
        setProdDescription("");
        dispatch(loadProduct({ status: "true", page: 1, count: 10 }));
        setLoader(false);
        navigate("/admin/product");
      } else {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };
  const onFinishFailed = () => setLoader(false);

  const imageTypes = [
    { key: "front", label: "Front view" },
    { key: "back", label: "Back view" },
    { key: "top", label: "Top view" },
    { key: "side", label: "Side view" },
  ];

  // Add this function near other handlers
  const uploadImageToServer = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${config.apiBaseUrl}/api/v1/assets/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Upload failed:", errorData);
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      // Return the URL from the response data structure
      return data.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // Update the handelGalleryImageChange function
  const handelGalleryImageChange = async (info, imageType) => {
    const { fileList } = info;
    const updatedFile = fileList[0];

    if (updatedFile) {
      try {
        // Upload the image and get the URL
        const imageUrl = await uploadImageToServer(updatedFile.originFileObj);

        if (imageUrl) {
          setGalleryFileList((prev) => {
            const filtered = prev.filter(
              (file) => file.imageType !== imageType
            );
            return [
              ...filtered,
              {
                ...updatedFile,
                imageType,
                url: imageUrl, // URL for preview
                thumbUrl: imageUrl, // Thumbnail URL for preview
                status: "done",
                originFileObj: updatedFile.originFileObj || updatedFile,
              },
            ];
          });
        }
      } catch (error) {
        console.error("Error handling image upload:", error);
      }
    }
  };

  const handleValuesChange = (changedValues, allValues) => {
    const { actual_price, discounted_price } = allValues;
    // Force re-render when actual_price changes
    if ("actual_price" in changedValues) {
      form.setFieldsValue({ actual_price: changedValues.actual_price });
    }

    if (actual_price) {
      if (discounted_price) {
        const discountPercentage = (
          ((actual_price - discounted_price) / actual_price) *
          100
        ).toFixed(2);
        form.setFieldsValue({ discount: discountPercentage });
      } else {
        // Reset discount to 0 when discounted_price is empty
        form.setFieldsValue({ discount: 0 });
      }
    }
  };

  const [actualPrice, setActualPrice] = useState(0);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSpecifications(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setSpecifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSpecifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSpecifications]);

  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      className="sm:mx-10"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      onValuesChange={handleValuesChange}
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <Form.Item
          style={{ marginBottom: "25px" }}
          label="Product Name"
          name="productName"
          className="w-full"
          rules={[
            {
              required: true,
              message: "Please input Product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Form.Item
          style={{ marginBottom: "25px" }}
          name="category"
          className="w-full sm:w-1/3"
          label={<>Category</>}
        >
          <Select
            name="category"
            loading={!category}
            showSearch
            placeholder="Select Category"
            optionFilterProp="children"
            filterOption={(input, option) => option?.children?.includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.children || "")
                .toLowerCase()
                .localeCompare((optionB?.children || "").toLowerCase())
            }
            onChange={prodCatHandler}
          >
            {category &&
              category.map((cat) => (
                <Select.Option key={cat.id} value={cat.name}>
                  {cat.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "25px" }}
          name="sub_category"
          className="w-full sm:w-1/3"
          label={<>Subcategory</>}
          hidden={!availableSubCategories.length}
        >
          <Select
            name="sub_category"
            showSearch
            placeholder="Select Subcategory"
            optionFilterProp="children"
            filterOption={(input, option) => {
              const words = option?.children
                ?.split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ");
              return words.toLowerCase().includes(input.toLowerCase());
            }}
            onChange={prodSubCatHandler}
          >
            {availableSubCategories.map((subcat) => (
              <Select.Option key={subcat.id} value={subcat.name}>
                {subcat.name
                  .split(" ")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ")}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "25px" }}
          name="sub_sub_category"
          className="w-full sm:w-1/3"
          label={<>Sub Subcategory</>}
          hidden={!availableSubSubCategories.length}
        >
          <Select
            name="sub_sub_category"
            showSearch
            placeholder="Select Sub Subcategory"
            optionFilterProp="children"
            filterOption={(input, option) => {
              const words = option?.children
                ?.split(" ")
                .map((word) => {
                  // Special cases handling
                  if (word.toLowerCase() === "ios") return "IOS";
                  return (
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  );
                })
                .join(" ");
              return words.toLowerCase().includes(input.toLowerCase());
            }}
            onChange={prodSubSubCatHandler}
          >
            {availableSubSubCategories.map((subsubcat) => (
              <Select.Option key={subsubcat.id} value={subsubcat.name}>
                {subsubcat.name
                  .split(" ")
                  .map((word) => {
                    // Special cases handling
                    if (word.toLowerCase() === "ios") return "IOS";
                    return (
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    );
                  })
                  .join(" ")}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Form.Item
          style={{ marginBottom: "25px" }}
          name="brand"
          className="w-full sm:w-1/3"
          label={<>Brand</>}
        >
          <Select
            name="brand"
            loading={!brand}
            showSearch
            placeholder="Select Brand"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            onChange={prodBrandHandler}
          >
            {brand &&
              brand.map((bra) => (
                <Select.Option key={bra.id} value={bra.name}>
                  {bra.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "25px" }}
          label="Model"
          className="w-full sm:w-1/3"
          name="model"
          rules={[
            {
              required: true,
              message: "Please input model",
            },
          ]}
        >
          <Input type="text" />
        </Form.Item>{" "}
        <Form.Item
          style={{ marginBottom: "25px" }}
          label="Weight"
          className="w-full sm:w-1/3"
          name="weight"
          rules={[
            {
              required: true,
              message: "Please input weight",
            },
          ]}
        >
          <Select name="weight" onChange={weightHandler}>
            <Select.Option value="Light">Light</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="Heavy">Heavy</Select.Option>
          </Select>
        </Form.Item>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Form.Item
          style={{ marginBottom: "25px" }}
          label="Actual Price"
          name="actual_price"
          className="w-full sm:w-1/3"
          rules={[
            {
              required: true,
              message: "Please input actual price!",
            },
          ]}
        >
          <Input
            type="number"
            onChange={(e) => setActualPrice(parseFloat(e.target.value) || 0)}
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "25px" }}
          label="Discounted Price"
          name="discounted_price"
          className="w-full sm:w-1/3"
        >
          <Input
            type="number"
            onChange={(e) =>
              setDiscountedPrice(parseFloat(e.target.value) || 0)
            }
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "25px" }}
          label="Discount (%)"
          className="w-full sm:w-1/2"
          name="discount"
        >
          <Input type="number" disabled />
        </Form.Item>
      </div>

      {actualPrice > 0 && (
        <div className="bg-rose-50 rounded-[12px] border border-[#E7906B66] p-4 mb-6">
          <div className="flex items-center gap-2 text-coral-500 mb-2">
            <InfoCircleOutlined />
            <h3 className="text-lg font-medium">Commission Breakdown</h3>
          </div>
          <p className="text-gray-500 mb-4">
            Commission rate may vary based on product category or sales
            performance
          </p>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Product Price:</span>
              <span className="font-medium">
                ₦{discountedPrice > 0 ? discountedPrice : actualPrice}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Platform fee ({selectedCommission}%):</span>
              <span className="text-coral-500">
                -₦
                {(
                  ((discountedPrice > 0 ? discountedPrice : actualPrice) *
                    selectedCommission) /
                  100
                ).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="font-medium">Your Earnings</span>
              <span className="font-medium text-coral-500">
                ₦
                {(
                  (discountedPrice > 0 ? discountedPrice : actualPrice) *
                  (1 - selectedCommission / 100)
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Form.Item
          style={{ marginBottom: "25px" }}
          label="Quantity"
          className={`w-full ${selectedWarranty ? "sm:w-1/3" : "sm:w-1/2"}`}
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please input quantity",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "25px" }}
          label="Warranty"
          className={`w-full ${selectedWarranty ? "sm:w-1/3" : "sm:w-1/2"}`}
          name="warranty"
          rules={[
            {
              required: true,
              message: "Please input warranty",
            },
          ]}
        >
          <Select name="warranty" onChange={warrantyHandler}>
            <Select.Option value="Yes">YES</Select.Option>
            <Select.Option value="No">NO</Select.Option>
          </Select>
        </Form.Item>
        {selectedWarranty && (
          <Form.Item
            style={{ marginBottom: "25px" }}
            label="Warranty Period"
            className="w-full sm:w-1/3"
            name="warrantyPeriod"
          >
            <Select name="warrantyPeriod" onChange={warrantyPeriodHandler}>
              <Select.Option value="3 months">3 Months</Select.Option>
              <Select.Option value="6 months">6 Months</Select.Option>
              <Select.Option value="1 year">1 Year</Select.Option>
              <Select.Option value="2 year">2 Year</Select.Option>
              <Select.Option value="5 year">5 Year</Select.Option>
            </Select>
          </Form.Item>
        )}
      </div>

      {/* <br /> */}
      <h4 className="w-full sm:w-1/2">
        <b>Product Specifications</b>
      </h4>
      <hr />
      <br />

      <div className="relative">
        <Form.Item style={{ marginBottom: "25px" }}>
          {productSpecifications.map((field, index) => (
            <div
              className="flex flex-col sm:flex-row gap-3 items-center"
              key={field.key}
            >
              <Form.Item
                style={{ marginBottom: "15px" }}
                label={`Specification Key ${index + 1}`}
                name={["specifications", index, "key"]}
                className="w-full sm:w-1/2"
                initialValue={field.isDefault ? field.name : undefined}
                rules={[
                  {
                    required: true,
                    message: "Please enter a specification key",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Enter key (e.g., Dimension)"
                  disabled={field.isDefault}
                  defaultValue={field.isDefault ? field.name : undefined}
                />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: "10px" }}
                label={`Specification Value ${index + 1}`}
                name={["specifications", index, "value"]}
                className="w-full sm:w-1/2"
                rules={[
                  {
                    required: true,
                    message: "Please enter a specification value",
                  },
                ]}
              >
                {field.type === "dropdown" ? (
                  <Select
                    placeholder={field.placeholder || "Select a value"}
                    style={{ width: "100%" }}
                  >
                    {field.options?.map((option) => (
                      <Select.Option key={option} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <Input
                    type="text"
                    placeholder={
                      field.isDefault
                        ? field.placeholder
                        : "Enter value (e.g., 123 x 123)"
                    }
                  />
                )}
              </Form.Item>
              {!field.isDefault && (
                <Button
                  type="danger"
                  onClick={() => removeSpecification(field.key)}
                  style={{ marginTop: "25px" }}
                >
                  <BiTrash color="#ffffff" />
                </Button>
              )}
            </div>
          ))}
          <div
            className="flex flex-row items-center justify-center absolute font-bold text-base p-2 rounded-md right-2 cursor-pointer"
            onClick={() => setSpecifications(!specifications)}
          >
            <PiWarningBold size={24} color="red" />
            <small className="text-red-500 cursor-pointer">
              <i>See sample specifications</i>
            </small>
          </div>
          <Button
            type="dashed"
            onClick={addProductSpecification}
            style={{ backgroundColor: "cyan" }}
          >
            + Add Field
          </Button>
          {specifications && (
            <div className="fixed inset-0 flex justify-center items-center z-[1000] bg-black/50">
              <div
                ref={modalRef}
                className="bg-white h-[30%] w-[20%] rounded-lg p-4 relative"
              >
                <div
                  className="absolute top-4 right-4 cursor-pointer"
                  onClick={() => setSpecifications(false)}
                ></div>

                <small>
                  <b>Dimension:</b> 159.9 x 76.7 x 8.25 mm
                </small>
                <br />
                <small>
                  <b>Display Type:</b> 276 x 1290 pixels, 460 ppi
                </small>
                <br />
                <small>
                  <b>Resolution:</b> Always-on display, Ceramic front cover
                </small>
                <br />
                <small>
                  <b>Chipset:</b> A17 Pro Bionic chip
                </small>
                <br />
                <small>
                  <b>CPU:</b> 6-core CPU (2 high performance, 4 high-efficiency
                  core)
                </small>
                <br />
                <small>
                  <b>Internal Memory:</b> 128GB/512GB/1TB
                </small>
                <br />
                <small>
                  <b>RAM:</b> 8GB
                </small>
                <br />
                <small>
                  <b>Battery Type:</b> Built-in rechargeable lithium-ion battery
                </small>
                <br />
                <small>
                  <b>Battery Life:</b> Up to 29 hours video playback
                </small>
                <br />
                <small>
                  <b>Charging:</b> USB-C wired charging
                </small>
                <br />
              </div>
            </div>
          )}
        </Form.Item>
      </div>
      <hr />
      <div className="flex flex-row sm:flex-row gap-3">
        <Form.Item label="COLOR" className="w-full sm:w-2/3">
          {productColor.map((field, index) => (
            <div className="flex flex-row gap-3 items-center" key={field.key}>
              <Form.Item
                label={`Color ${index + 1}`}
                name={["color", index, "name"]}
                className="w-full sm:w-1/4"
                rules={[
                  {
                    required: true,
                    message: "Please enter a color name or hex!",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Enter color name or hex"
                  value={field.hex}
                  onChange={(e) => handleColorChange(e.target.value, index)}
                />
              </Form.Item>
              <div
                className="w-8 h-8 border border-gray-300"
                style={{ backgroundColor: field.name || "#fff" }}
              />
              <Button
                type="danger"
                onClick={() => removeColor(field.key)}
                className="mt-2"
              >
                <BiTrash color="#ffffff" />
              </Button>
            </div>
          ))}
          <Button type="dashed" onClick={addProductColor} className="mt-3">
            + Add Color
          </Button>
        </Form.Item>
      </div>
      <h4 className="w-full sm:w-1/2">
        <b>Product Image</b>
      </h4>
      <hr />
      <small>
        A maximum of four (4) images is required in the following orientation:
      </small>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <p>1. Front view (Main Thumbnail)</p>
        <p>2. Back view</p>
        <p>3. Top view</p>
        <p>4. Side view</p>
      </div>
      <br />
      <div className="flex flex-col gap-4">
        <Form.Item
          label="Images"
          valuePropName="gallery_image"
          className="w-full sm:w-[70%]"
          tooltip="You must upload exactly 4 images: Front view (Thumbnail), Back view, Top view, and Side view. Each image should be less than 2MB."
        >
          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4">
            {imageTypes.map((type, index) => (
              <Upload
                key={type.key}
                listType="picture-card"
                beforeUpload={handleBeforeUpload}
                name={`image_${type.key}`}
                fileList={galleryFileList.filter(
                  (file) => file.imageType === type.key
                )}
                maxCount={1}
                onChange={(info) => handelGalleryImageChange(info, type.key)}
                accept="image/png, image/jpg, image/jpeg"
                onRemove={(file) => {
                  setGalleryFileList((prev) =>
                    prev.filter((item) => item.uid !== file.uid)
                  );
                  return true;
                }}
              >
                {!galleryFileList.some(
                  (file) => file.imageType === type.key
                ) && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>{type.label}</div>
                  </div>
                )}
              </Upload>
            ))}
          </div>
        </Form.Item>
      </div>
      <br />
      <Form.Item style={{ marginBottom: "25px" }} label="Product Description ">
        <ReactQuill
          value={prodDescription}
          onChange={prodDescriptionHandler}
          modules={textEditorModule}
          formats={textEditorFormats}
          style={{ height: "300px" }}
          className="mb-12"
        />
      </Form.Item>
      <Form.Item
        style={{ marginBottom: "25px", width: "100%" }}
        className="mt-[24px]"
      >
        <Button
          type="primary"
          htmlType="submit"
          shape="round"
          loading={loader}
          style={{ width: "100%" }}
        >
          Create Product
        </Button>
      </Form.Item>
      <div className="text-center text-gray-500 italic mb-6">
        All items bought have a 7days return policy
      </div>
    </Form>
  );
};

export default ShopForm;
