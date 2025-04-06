import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import ProductBrand from "@/components/productBrand/productBrand";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default function BrandRoutes() {
  return (
    <Routes>
      <Route
        path="/product-brand"
        exact
        element={
          <PermissionChecker permission={"readAll-productBrand"}>
            <ProductBrand />
          </PermissionChecker>
        }
      />
    </Routes>
  );
}
