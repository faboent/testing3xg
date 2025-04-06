import PermissionChecker from "@/components/PrivacyComponent/PermissionChecker";
import Checkout from "@/components/subscription/Checkout";
import Subscription from "@/components/subscription/Subscription";
import { Route, Routes } from "react-router-dom";

export default function SubscriptionRoutes() {
  return (
    <Routes>
      <Route
        path="/subscription"
        exact
        element={
          <PermissionChecker permission={"readAll-subscription"}>
            <Subscription />
          </PermissionChecker>
        }
      />
      <Route
        path="/checkout"
        exact
        element={
          <PermissionChecker permission={"create-checkout"}>
            <Checkout />
          </PermissionChecker>
        }
      />
    </Routes>
  );
}
