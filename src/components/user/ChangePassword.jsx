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
import { updatePassword } from "@/redux/rtk/features/user/userSlice";
import { MdOutlineEmail } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

const ChangePassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  // Now you can use this token in your component
  // console.log("Reset token:", token);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loader, setLoader] = useState(false);

  const requestBody = {
    password: password,
    token: token,
  };

  const onFinish = async (values) => {
    setLoader(true);
    const response = await dispatch(updatePassword(requestBody));
    if (response?.payload?.status === "success") {
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
        <h1 className="font-Popins font-semibold text-xl text-center mb-8">
          Reset Password
        </h1>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="w-full"
        >
          <Form.Item
            label=""
            name="password"
            className="customer-login-password"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
          >
            <Input.Password
              className="md:py-1 px-1"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-md font-Popins h-10"
              loading={loader}
            >
              Reset Password
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

export default ChangePassword;
