import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./assets/styles/main.css";

import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Page404 from "./components/404/404Page";
import LoaderSpinner from "./components/loader/LoaderSpinner";
import Login from "./components/user/Login";
import { getSetting } from "./redux/rtk/features/setting/settingSlice";
import ServerError from "./components/404/ServerError";
import Register from "./components/user/Register";
import ForgetPassword from "./components/user/ForgetPassword"
import RegisterMerchant from "./components/user/RegisterMerchant";
import OnboardMerchant from "./components/user/OnboardMerchant";
import Subscription from "./components/subscription/Subscription";
import Checkout from "./components/subscription/Checkout";
import CustomerSupport from "./components/chat/CustomerSupport";
import VerifyOtp from "./components/user/VerifyOtp";
import AppGuide from "./components/Dashboard/Graph/AppGuide";
import Help from "./components/Dashboard/Graph/Help";
import ChangePassword from "./components/user/ChangePassword";
const CustomerLayout = lazy(() => import("@/layouts/CustomerLayout"));
const AdminLayout = lazy(() => import("@/layouts/AdminLayout"));

function App() {
  // const { data, loading, error } = useSelector((state) => state?.setting) || {};
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!data && !loading && !error) {
  //     dispatch(getSetting());
  //   }
  // }, [data, dispatch, error, loading]);

  // content render
  // let content = null;
  // if (loading) content = <LoaderSpinner />;
  // else if (data && !loading) {
  //   content = (
  // <Routes>
  //   <Route
  //     path="/*"
  //     element={
  //       <Suspense fallback={<LoaderSpinner />}>
  //         <CustomerLayout />
  //       </Suspense>
  //     }
  //   />
  //   <Route
  //     path="/admin/*"
  //     element={
  //       <Suspense fallback={<LoaderSpinner />}>
  //         <AdminLayout />
  //         <CustomerSupport />
  //       </Suspense>
  //     }
  //   />

  //   <Route path="/admin/auth/login" exact element={<Login />} />
  //   <Route
  //     path="/admin/auth/register"
  //     exact
  //     element={<RegisterMerchant />}
  //   />
  //   <Route path="/admin/auth/onboarding" exact element={<Register />} />
  //   <Route path="/admin/auth/verifyOtp" exact element={<VerifyOtp />} />
  //   <Route path="/*" element={<Page404 />} />
  // </Routes>
  //   );
  // } else if (error) {
  //   content = <ServerError />;
  // }

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/*"
          element={
            <Suspense fallback={<LoaderSpinner />}>
              <CustomerLayout />
            </Suspense>
          }
        />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<LoaderSpinner />}>
              <AdminLayout />
              <CustomerSupport />
            </Suspense>
          }
        />

        <Route path="/admin/auth/login" exact element={<Login />} />
        <Route path="/admin/guide" exact element={<AppGuide />} />
        <Route path="/admin/help" exact element={<Help />} />
        <Route
          path="/admin/auth/register"
          exact
          element={<RegisterMerchant />}
        />
        <Route path="/admin/auth/onboarding" exact element={<Register />} />
        <Route path="/admin/auth/verifyOtp" exact element={<VerifyOtp />} />
        <Route path="/account-recovery/reset" element={<ChangePassword />} />
        <Route path="/admin/auth/forgetPassword" exact element={<ForgetPassword />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
      {/* {content} */}
    </BrowserRouter>
  );
}

export default App;
