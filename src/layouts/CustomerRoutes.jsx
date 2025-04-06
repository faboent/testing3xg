import ForgetPassword from "@/CustomerUI/ForgetPassword";
import Login from "../components/user/Login";
import User from "@/CustomerUI/User";
import PasswordChange from "@/eCommerce/CommonSection/PasswordChange";
import Order from "@/eCommerce/Order/Order";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

export default function CustomerRoutes() {
  const isLoggedIn = localStorage.getItem("isLogged");
  return (
    <Routes>
      {isLoggedIn && (
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
      )}
      <Route path="/" element={<Login />} />

      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/forget-password/:token" element={<PasswordChange />} />
      <Route element={<PrivateRoute />}>
        <Route path="/user" element={<User />} />
        <Route path="/order/:id" element={<Order />} />
      </Route>
      {/* <Route path='/search' element={<MainSearch />} />
      <Route path='/products/:id' element={<SingleProduct />} />
      <Route path='/category/:name' element={<CategorySingle />} />
      <Route path='/brand/:name' element={<BrandSingle />} />
       */}
      {/* <Route element={<PrivateRoute />}>
        <Route path='/user' element={<UserDashboard />}>
          <Route path='/user' element={<MyAccount />} />
          <Route path='address' element={<Address />} />
          <Route path='my-order' element={<MyOrder />} />
          <Route path='my-returns' element={<MyReturns />} />
          <Route path='wishlist' element={<Wishlist />} />
        </Route>

        <Route path='/order/:id' element={<Order />} />
        <Route path='/review-rating/:id' element={<ReviewRating />} />
        <Route path='/proceed-to-checkout' element={<ProceedToCheckout />} />
        <Route path='/proceed-to-checkout/payment' element={<Payment />} />
        <Route
          path='proceed-to-checkout/payment/:name'
          element={<ProceedSuccess />}
        />
      </Route> */}
    </Routes>
  );
}
