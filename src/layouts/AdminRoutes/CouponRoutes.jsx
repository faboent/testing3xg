// import DetailCoupon from '@/components/Coupon/DetailCoupon';
import GetAllCoupon from "@/components/Coupon/GetAllCoupon";
import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default function CouponRoutes() {
  return (
    <Routes>
      {" "}
      <Route
        path="/coupon"
        element={
          <PermissionChecker permission={"readAll-coupon"}>
            <GetAllCoupon />
          </PermissionChecker>
        }
      />
      <Route
        path="/coupon/:id"
        element={
          <PermissionChecker permission={"readSingle-coupon"}>
            {/* <DetailCoupon /> */}
          </PermissionChecker>
        }
      />
    </Routes>
  );
}
