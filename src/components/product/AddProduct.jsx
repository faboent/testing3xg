import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload , Tabs} from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  loadProduct,
} from "../../redux/rtk/features/product/productSlice";
import { loadAllProductBrand } from "../../redux/rtk/features/productBrand/productBrandSlice";
import { loadAllProductCategory } from "../../redux/rtk/features/productCategory/productCategorySlice";
import { loadAllProductSubCategory } from "../../redux/rtk/features/productSubCategory/productSubCategorySlice";

import queryGenerator from "@/utils/queryGenarator";
import axios from "axios";
import { loadColorPaginated } from "../../redux/rtk/features/color/colorSlice";
import { loadAllDiscount } from "../../redux/rtk/features/eCommerce/discount/discountSlice";
import { loadAllProductAttribute } from "../../redux/rtk/features/eCommerce/productAttribute/productAttribute";
import { loadAllUom } from "../../redux/rtk/features/uom/uomSlice";
import { loadAllVatTax } from "../../redux/rtk/features/vatTax/vatTaxSlice";
import ShopForm from "./Form/ShopForm";

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

const AddProduct = () => {
  const [activeTab, setActiveTab] = useState("Shop");
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadAllProductCategory({ page: 1, count: 100, status: true }));
    dispatch(loadAllProductSubCategory({ page: 1, count: 100, status: true }));
    dispatch(loadAllProductBrand({ page: 1, count: 100, status: true }));
    dispatch(loadColorPaginated({ count: 50 }));
    dispatch(loadAllProductAttribute());
    dispatch(loadAllDiscount());
    dispatch(loadAllVatTax());
    dispatch(loadAllUom());
  }, [dispatch]);

  return (
    <>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Shop" key="Shop">
          <ShopForm />
        </TabPane>
        <TabPane tab="Deals" key="Deals">
          {/* Deals Form */}
        </TabPane>
        <TabPane tab="Luxury" key="Luxury">
          {/* Luxury Form */}
        </TabPane>
        <TabPane tab="Bulk Purchase" key="Bulk Purchase">
          {/* Bulk Purchase Form */}
        </TabPane>
        <TabPane tab="Health & Supplies" key="Health & Supplies">
          {/* Health & Supplies Form */}
        </TabPane>
      </Tabs>
    </>
  );
};

export default AddProduct;
