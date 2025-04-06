import { Button, Card, Form, Input, Select, Steps } from "antd";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/rtk/features/user/userSlice";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { loadPermissionById } from "../../redux/rtk/features/auth/authSlice";
import { getSetting } from "../../redux/rtk/features/setting/settingSlice";
import dayjs from "dayjs";

const OnboardMerchant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state?.setting) || {};
  const [imageError, setImageError] = useState();
  const [loader, setLoader] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    setLoader(true);
    const resp = await dispatch(addUser(values));
    if (resp.payload.message === "success") {
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

  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };

  // Handle previous step
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle form submission at the last step
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onFinish(values);
      })
      .catch((info) => {
        onFinishFailed(info);
      });
  };

  const { Option } = Select;
  const { Step } = Steps;

  const [businessType, setBusinessType] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const handleBusinessTypeChange = (value) => {
    setBusinessType(value);
    if (value === "Product") {
      setCategoryOptions([
        "Gadget",
        "Groceries",
        "Fashion",
        "Home Appliance",
        "Luxury",
      ]);
    } else if (value === "Service") {
      setCategoryOptions([
        "Beauty",
        "Food",
        "Laundry",
        "SPA",
        "Fitness",
        "Automobile",
      ]);
    }
  };

  // Check if all fields are valid and filled
  const handleFormChange = (_, allFields) => {
    const allFieldsValid = allFields.every(
      (field) => field.errors.length === 0 && field.value
    );
    setIsFormValid(allFieldsValid);
  };

  const steps = [
    {
      title: "Business Type",
      content: (
        <Form.Item
          className="mb-4"
          name="businessType"
          rules={[
            { required: true, message: "Please select a business type!" },
          ]}
        >
          <Select
            className="w-full"
            placeholder="Select Business Type"
            optionFilterProp="children"
            onChange={handleBusinessTypeChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="Product">Product</Option>
            <Option value="Service">Service</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Category",
      content: businessType && (
        <div className="flex flex-col gap-4">
          {/* <div className="flex-grow 2xl:overflow-y-auto 2xl:overflow-x-hidden  pl-2">  */}
          {/* Business Type Select */}
          <Form.Item
            className="mb-4 z-50"
            name="businessType"
            rules={[
              { required: true, message: "Please select a business type!" },
            ]}
          >
            <Select
              className="w-full bg-white z-50"
              placeholder="Select Business Type"
              optionFilterProp="children"
              onChange={handleBusinessTypeChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              <Option value="Product">Product</Option>
              <Option value="Service">Service</Option>
            </Select>
          </Form.Item>

          {/* Category Select (changes based on business type) */}
          {businessType && (
            <Form.Item
              className="mb-4 z-30"
              name="category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select className="w-full bg-white z-30" placeholder="Select Category">
                {categoryOptions.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </div>
      ),
    },
    {
      title: "Finish",
      content: isFormValid && (
        <Form.Item className="">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full rounded-md"
            loading={loader}
          >
            Submit
          </Button>
        </Form.Item>
      ),
    },
  ];
  return (
    <div className="flex justify-center items-center gap-5 h-screen">
      <Card bordered={false} className="w-full max-w-[24rem] mt-[30px] mx-auto">
        {data && !loading && (
          <div
            className={`w-[180px] h-[70px] mx-auto flex items-center justify-center`}
          >
            {data?.logo ? (
              <img
                className="text-white text-center mt-2 mb-1"
                alt="logo"
                src={data.logo}
                style={{ width: "180px", height: "70px" }}
                onError={() => setImageError(true)}
              />
            ) : (
              <h2 className="text-center flex items-center justify-center gap-2 text-[30px]">
                OS{" "}
                <strong style={{ color: "#55F", fontWeight: "bold" }}>
                  Inventory
                </strong>
              </h2>
            )}
          </div>
        )}
        {loading && (
          <div className={`w-[180px] h-[70px] mx-auto flex flex-col gap-1`}>
            <h1 className="bg-slate-200 h-4 rounded w-full animate-pulse"></h1>
            <h1 className="bg-slate-200 h-4 rounded w-full animate-pulse"></h1>
            <h1 className="bg-slate-200 h-4 rounded w-full animate-pulse"></h1>
          </div>
        )}

        <h1 className="font-Popins font-semibold text-xl text-center mt-3 pb-4">
          Merchant Onboarding
        </h1>

        <Form className="z-50"
          form={form}
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onFieldsChange={handleFormChange}
          layout="vertical"
          size="large"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          autoComplete="off"
          initialValues={{
            discount: 0,
            date: dayjs(),
            vatId: [],
            saleInvoiceProduct: [{}],
            paymentType: 1,
          }}
        >
          <Steps current={currentStep}>
            {steps.map((step, index) => (
              <Step key={index} title={step.title} />
            ))}
          </Steps>

          <div className="steps-content mt-4">{steps[currentStep].content}</div>

          <div className="steps-action mt-4">
            {currentStep > 0 && (
              <Button style={{ marginRight: 8 }} onClick={handlePrev}>
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" onClick={handleSubmit} loading={loader}>
                Submit
              </Button>
            )}
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default OnboardMerchant;
