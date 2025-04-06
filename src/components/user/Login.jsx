import { Button, Card, Form, Image, Input } from "antd";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  loadPermissionById,
  loginUser,
} from "../../redux/rtk/features/auth/authSlice";
import {
  getSetting,
  getProfile,
} from "./../../redux/rtk/features/setting/settingSlice";
import { addUser } from "@/redux/rtk/features/user/userSlice";
import { MdOutlineEmail } from "react-icons/md";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [imageError, setImageError] = useState(false);

  const requestBody = {
    email: email,
    password: password,
    role: "merchant",
  };

  const onFinish = async (values) => {
    setLoader(true);
    const response = await dispatch(addUser(requestBody));
    if (response?.payload?.message === "success") {
      dispatch(getSetting());
      dispatch(getProfile());
      // dispatch(loadPermissionById(response.payload?.data?.body.roleId));
      setLoader(false);
      navigate("/admin");
    } else {
      setLoader(false);
    }
  };

  const onFinishFailed = () => {
    setLoader(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card bordered={false} className="w-full max-w-[24rem] mt-[30px] mx-auto">
        {/* {data && !loading && ( */}
        <div
          className={`w-[180px] h-[70px] mx-auto flex items-center justify-center  `}
        >
          <Image
            src="https://i.postimg.cc/brQfZ68w/3XG-Logo.png"
            alt="logo"
            width={120}
            height={150}
            preview={false}
          />
        </div>
        {/* <div>
          <div className={`w-[180px] h-[70px] mx-auto flex flex-col gap-1 `}>
            <h1 className="bg-slate-200 h-4 rounded  w-full  animate-pulse"></h1>
            <h1 className="bg-slate-200 h-4 rounded w-full  animate-pulse"></h1>
            <h1 className="bg-slate-200 h-4 rounded  w-full animate-pulse"></h1>
          </div>
        </div> */}

        <h1 className="font-Popins font-semibold text-xl text-center mt-12 pb-4">
          Welcome Back..
        </h1>
        <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            className="mb-6"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "The input is not a valid email!",
              },
            ]}
          >
            <Input
              prefix={<MdOutlineEmail className="ml-1" />}
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            className="mb-6"
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
              onChange={(e) => setPassword(e.target.value)}
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
            Don&apos;t have an account ?{" "}
            <Link
              to={"/admin/auth/register"}
              className="text-orange-500 font-bold"
            >
              Sign Up Here
            </Link>
          </h6>

          <div className="text-center mt-6">
            {" "}
            <Link
              to={"/admin/auth/forgetPassword"}
              className="text-black-500 font-bold"
            >
              Forget password
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
