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
import { forgetPassword } from "@/redux/rtk/features/user/userSlice";
import { MdOutlineEmail } from "react-icons/md";
const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [loader, setLoader] = useState(false);

  const requestBody = {
    email: email,
  };

  // ... existing code ...
  const onFinish = async (values) => {
    setLoader(true);
    const response = await dispatch(forgetPassword(requestBody));
    if (response?.payload?.status === "success") {
      setLoader(false);
      navigate("/admin/auth/login");
    } else {
      setLoader(false);
    }
  };
  // ... existing code ...

  const onFinishFailed = () => {
    setLoader(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card bordered={false} className="w-full max-w-[24rem] mt-[30px] mx-auto">
        <h1 className="font-Popins font-semibold text-xl text-center mb-8">
          Forget Password
        </h1>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="w-full"
        >
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
              className="h-10"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-md font-Popins h-10"
              loading={loader}
            >
              Submit
            </Button>
          </Form.Item>

          <h6 className="text-center mt-4">
            Have an account?{" "}
            <Link
              to={"/admin/auth/login"}
              className="text-orange-500 font-bold"
            >
              Login Here
            </Link>
          </h6>
        </Form>
      </Card>
    </div>
  );
};

export default ForgetPassword;
