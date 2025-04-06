import React, { useState } from "react";
import { Form, Input, Button, Select, Steps, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  WarningOutlined,
  NumberOutlined,
  BankFilled,
} from "@ant-design/icons";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { CgNametag } from "react-icons/cg";

const { Option } = Select;

const SignupForm = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [businessType, setBusinessType] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const handleBusinessTypeChange = (value) => {
    setBusinessType(value);
    if (value === "Product") {
      setCategoryOptions(["Electronics", "Fashion", "Groceries"]);
    } else if (value === "Service") {
      setCategoryOptions(["Consulting", "Cleaning", "Repairs"]);
    }
  };

  const handleNext = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (error) {
      message.error("Please fill all required fields.");
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form Values:", values);
      localStorage.setItem("userEmail", values.email);
      message.success("Signup successful! Email stored in local storage.");
    } catch (error) {
      message.error("Please fill all required fields before submitting.");
    }
  };

  const steps = [
    {
      title: "User Information",
      content: (
        <>
          <Form.Item
            className="mb-6 w-96"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="ml-1" />}
              placeholder="Enter first name"
            />
          </Form.Item>
          <Form.Item
            className="mb-6 w-96"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="ml-1" />}
              placeholder="Enter last name"
            />
          </Form.Item>
          <Form.Item
            className="mb-6 w-96"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input
              prefix={<FiPhoneCall className="ml-1" />}
              placeholder="Phone Number"
            />
          </Form.Item>
          <Form.Item
            className="mb-6 w-96"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<MdOutlineEmail className="ml-1" />}
              placeholder="Enter email"
            />
          </Form.Item>
          <Form.Item
            className="mb-6 w-96"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="ml-1" />}
              placeholder="Enter password"
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Business Information",
      content: (
        <>
          <Form.Item
            className="mb-4 w-96"
            name="business_name"
            rules={[
              { required: true, message: "Please input your business name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="ml-1" />}
              placeholder="Enter business name"
            />
          </Form.Item>
          <Form.Item
            className="mb-4 w-96"
            name="businessType"
            rules={[
              { required: true, message: "Please select a business type!" },
            ]}
          >
            <Select
              className="p-[6px]"
              placeholder="Select Business Type"
              onChange={handleBusinessTypeChange}
            >
              <Option value="Product">Products</Option>
              <Option value="Service">Services</Option>
            </Select>
          </Form.Item>
          {businessType && (
            <Form.Item
              className="mb-4 w-96"
              name="category"
              rules={[{ required: true, message: "Please select a category!" }]}
            >
              <Select className="p-[10px]" placeholder="Select Category">
                {categoryOptions.map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </>
      ),
    },
    {
      title: "Bank Account Information",
      content: (
        <>
          <Form.Item className="mb-6 w-96" name="account_name">
            <Input
              prefix={<CgNametag className="ml-1" />}
              placeholder="Enter account name"
            />
          </Form.Item>
          <Form.Item className="mb-6 w-96" name="bank_name">
            <Input
              prefix={<BankFilled className="ml-1" />}
              placeholder="Enter bank name"
            />
          </Form.Item>
          <Form.Item className="mb-6 w-96" name="account_number">
            <Input
              prefix={<NumberOutlined className="ml-1" />}
              placeholder="Enter account number"
            />
          </Form.Item>
          <div className="flex flex-row items-center justify-center gap-2 text-red-500 font-bold">
            <WarningOutlined size={28} />
            <span>You may decide to fill this later</span>
          </div>
        </>
      ),
    },
  ];

  return (
    <Form form={form} layout="vertical">
      <Steps current={currentStep}>
        {steps.map((item, index) => (
          <Steps.Step key={index} title={item.title} />
        ))}
      </Steps>
      <div className="mt-8">{steps[currentStep].content}</div>
      <div className="mt-4 flex justify-between">
        {currentStep > 0 && <Button onClick={handlePrevious}>Previous</Button>}
        {currentStep < steps.length - 1 ? (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </Form>
  );
};

export default SignupForm;
