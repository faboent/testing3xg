import { Button, Card, Form, Image, Input } from "antd";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/rtk/features/user/userSlice";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  loadPermissionById,
  loginUser,
} from "../../redux/rtk/features/auth/authSlice";
import { getSetting } from "./../../redux/rtk/features/setting/settingSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state?.setting) || {};
  const [imageError, setImageError] = useState();
  const [loader, setLoader] = useState(false);

  const onFinish = async (values) => {
    setLoader(true);

    let formData = new FormData();

    formData.append("email", values.email);
    formData.append("password", values.password);

    console.log(values + " Hey! This is the form data");

    const resp = await dispatch(loginUser(values));
    if (resp.payload.message === "success") {
      // navigate("/admin");
      setLoader(false);
      dispatch(getSetting());
      dispatch(loadPermissionById(resp.payload?.data?.roleId));
    } else {
      setLoader(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    setLoader(false);
  };

  const user = localStorage.getItem("user");
  console.log(user + " User information");
  // const businessType = String(localStorage.getItem("businessType"));
  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card bordered={false} className="w-full max-w-[24rem] mt-[30px] mx-auto">
        {data && !loading && (
          <div
            className={`w-[180px] h-[70px] mx-auto flex items-center justify-center  `}
          >
            {/* {data?.logo && !imageError ? (
              <img
                className="text-white text-center mt-2 mb-1  "
                alt="logo"
                src={data.logo}
                style={{ width: "180PX", height: "70px" }}
                onError={() => setImageError(true)}
              />
            ) : ( */}
            <Image
              src="https://i.postimg.cc/brQfZ68w/3XG-Logo.png"
              alt="logo"
              width={120}
              height={150}
            />
            {/* )} */}
          </div>
        )}
        {loading && (
          <div>
            {" "}
            <div className={`w-[180px] h-[70px] mx-auto flex flex-col gap-1 `}>
              <h1 className="bg-slate-200 h-4 rounded  w-full  animate-pulse"></h1>
              <h1 className="bg-slate-200 h-4 rounded w-full  animate-pulse"></h1>
              <h1 className="bg-slate-200 h-4 rounded  w-full animate-pulse"></h1>
            </div>
          </div>
        )}

        <h1 className="font-Popins font-semibold text-xl text-center mt-12 pb-4">
          Welcome Back
        </h1>
        <Form
          name="basic"
          onFinish={onFinish}
          // style={{ marginLeft: "20px", marginRight: "20px" }}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            className="mb-4"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="ml-1" />}
              placeholder="Enter email"
              type="email"
            />
          </Form.Item>

          <Form.Item
            className="mb-2"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="ml-1" />}
              placeholder="Enter password"
            />
          </Form.Item>

          <Form.Item className="">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-md font-Popins"
              loading={loader}
            >
              Login
            </Button>
          </Form.Item>

          <h6 className="text-center mt-2">
            Don't have an account ?{" "}
            <Link to={"/admin/auth/register"}>Sign Up Here</Link>
          </h6>

          <div className="text-center mt-6"></div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
