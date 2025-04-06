import { Button, Card, Form, Input, Image } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resendOtp, verifyOtp } from "../../redux/rtk/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state?.setting) || {};
  const [loader, setLoader] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const email = localStorage.getItem("otp-email");

  console.log(email);

  const requestBody = {
    email: email,
    otp: otp.join(""),
  };

  const onFinish = async (values) => {
    setLoader(true);
    const response = await dispatch(verifyOtp(requestBody));
    if (response?.payload?.message === "success") {
      setLoader(false);
      navigate("/admin/auth/login");
    } else {
      setLoader(false);
    }
  };

  const onFinishFailed = () => {
    setLoader(false);
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    try {
      const response = await dispatch(resendOtp(email));
      if (response?.payload?.message === "success") {
        console.log("OTP resent successfully");
      } else {
        console.log("Failed to resend OTP");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
    } finally {
      setResendLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card bordered={false} className="w-full max-w-[24rem] mt-[30px] mx-auto">
        {data && !loading && (
          <div
            className={`w-[180px] h-[70px] mx-auto flex items-center justify-center`}
          >
            <Image
              src="https://i.postimg.cc/brQfZ68w/3XG-Logo.png"
              alt="logo"
              width={120}
              height={150}
              onError={() => setImageError(true)}
            />
          </div>
        )}
        {loading && (
          <div>
            <div className={`w-[180px] h-[70px] mx-auto flex flex-col gap-1`}>
              <h1 className="bg-slate-200 h-4 rounded w-full animate-pulse"></h1>
              <h1 className="bg-slate-200 h-4 rounded w-full animate-pulse"></h1>
              <h1 className="bg-slate-200 h-4 rounded w-full animate-pulse"></h1>
            </div>
          </div>
        )}

        <h1 className="font-Popins font-semibold text-xl text-center mt-12 pb-4">
          Confirm OTP
        </h1>
        <Form onFinish={onFinish}>
          <div className="flex justify-between mb-4">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-input-${index}`}
                value={digit}
                maxLength={1}
                className="otp-input w-12 h-12 text-center text-lg"
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full rounded-md font-Poppins"
            >
              Confirm OTP
            </Button>
          </Form.Item>

          <h6 className="text-center mt-2">
            Didn't receive an OTP?{" "}
            <Button type="link" onClick={() => handleResendOtp()}>
              Resend OTP
            </Button>
          </h6>
        </Form>
      </Card>
    </div>
  );
};

export default VerifyOtp;
