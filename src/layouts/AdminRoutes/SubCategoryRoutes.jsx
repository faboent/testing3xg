import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import DetailProductSubCategory from "@/components/ProductSubcategory/detailProductSubcategory";
import ProductSubCategory from "@/components/ProductSubcategory/productSubcategory";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default function SubCategoryRoutes() {
  return (
    <Routes>
      <Route
        path="/product-subcategory"
        exact
        element={
          <PermissionChecker permission={"readAll-productSubCategory"}>
            <ProductSubCategory />
          </PermissionChecker>
        }
      />

      <Route
        path="/product-subcategory/:id"
        element={
          <PermissionChecker permission={"readSingle-productSubCategory"}>
            <DetailProductSubCategory />
          </PermissionChecker>
        }
      />
    </Routes>
  );
}
