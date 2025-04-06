import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import ProductColor from "@/components/productColor/productColor";
import UpdateProductColor from "@/components/productColor/updateProductColor";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default function ColorRoutes() {
  return (
    <Routes>
      <Route
        path="/product-color"
        element={
          <PermissionChecker permission={"readAll-color"}>
            <ProductColor />
          </PermissionChecker>
        }
      />
      <Route
        path="/product-color/:id"
        element={
          <PermissionChecker permission={"readSingle-color"}>
            {/* <DetailProductColor /> */}
          </PermissionChecker>
        }
      />
      <Route
        path="/product-color/:id/update"
        element={
          <PermissionChecker permission={"update-color"}>
            <UpdateProductColor />
          </PermissionChecker>
        }
      />
    </Routes>
  );
}
