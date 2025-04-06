import { Autocomplete } from "@react-google-maps/api";
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  message,
  Select,
  Steps,
  Typography,
  Upload,
} from "antd";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  BankFilled,
  InboxOutlined,
  LockOutlined,
  NotificationFilled,
  NotificationOutlined,
  NumberOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import {
  addUser,
  loadPermissionById,
} from "../../redux/rtk/features/auth/authSlice";
import { loadAllBank } from "../../redux/rtk/features/bankList/bankListSlice";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail, MdTitle } from "react-icons/md";
import dayjs from "dayjs";
import { CgNametag } from "react-icons/cg";
import { AiTwotoneNotification } from "react-icons/ai";
import Dragger from "antd/es/upload/Dragger";
import { IoCloseCircle, IoWarning } from "react-icons/io5";
import fileConfig from "../../utils/fileConfig";
import { addMerchant } from "./testSlice";
import { errorHandler } from "@/utils/functions";
import axios from "axios";
import { FaAddressBook } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";
import config from "../../config/config";

const RegisterMerchant = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [kycVisible, setKycVisible] = useState(false);
  const { data, loading } = useSelector((state) => state?.setting) || {};
  const [imageError, setImageError] = useState();
  const [loader, setLoader] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [businessTypeAction, setBusinessTypeAction] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [businessName, setBusinessName] = useState(null);
  const [businessAddress, setBusinessAddress] = useState(null);
  const [businessLocationLat, setBusinessLocationLat] = useState(null);
  const [businessLocationLong, setBusinessLocationLong] = useState(null);
  const [businessType, setBusinessType] = useState(null);
  const [businessCategory, setBusinessCategory] = useState(null);
  const [bankAccountName, setBankAccountName] = useState(null);
  const [bankAccountNumber, setBankAccountNumber] = useState(null);
  const [bankName, setBankName] = useState(null);
  const [businessDocument, setBusinessDocument] = useState(null);
  const [documentPreview, setDocumentPreview] = useState(null);

  const bank = useSelector((state) => state.bankLists?.list);

  useEffect(() => {
    dispatch(loadAllBank());
  }, [dispatch]);

  const formData = new FormData();
  if (fileList.length) {
    if (fileConfig() === "laravel") {
      formData.append("images[]", fileList[0].originFileObj);
    } else {
      formData.append("images", fileList[0].originFileObj);
    }
  }

  // Add bankCode state
  const [bankCode, setBankCode] = useState(null);

  const bankListHandler = (value, option) => {
    setBankName(option.children);
    setBankCode(option.data.code);
    console.log("Selected Bank Details:", {
      bankName: option.children,
      bankCode: option.data.code,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setKycVisible(false);
    }
  };

  const handleDocumentUpload = async (info) => {
    const { status, originFileObj } = info.file;
    if (status !== "uploading") {
      const formData = new FormData();
      formData.append("file", originFileObj);

      try {
        const response = await fetch(
          `${config.apiBaseUrl}/api/v1/assets/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setBusinessDocument(data.data.url);
          setDocumentPreview(URL.createObjectURL(originFileObj));
          message.success(`${info.file.name} uploaded successfully`);
        }
      } catch (error) {
        message.error(`Upload failed`);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoader(true);
    try {
      const userData = {
        firstName,
        lastName,
        email,
        phone,
        password,
        role: "merchant",
        businessName,
        businessAddress,
        businessLocationLat: businessLocationLat?.toString(), // Convert to string
        businessLocationLong: businessLocationLong?.toString(), // Convert to string
        business_type: businessType,
        business_category: businessCategory,
        business_section: businessSection,
        accountName: bankAccountName,
        accountNumber: bankAccountNumber,
        bankName,
        businessDocument,
        bankCode, // Add this line
      };

      console.log("Data being sent:", userData); // Add this line to debug

      localStorage.setItem("otp-email", email);

      const resp = await dispatch(addUser(userData));
      console.log("Response:", resp); // Add this line to debug

      if (resp.payload.message === "success") {
        navigate("/admin/auth/verifyOtp");
        form.resetFields();
        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.error("Error:", error); // Add this line to debug
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

  const { Option } = Select;

  const handleCategoryTypeChange = (values) => {
    setSelectedCategory(values);
    setBusinessCategory(values);
    form.setFieldsValue({ businessCategory: values });
  };

  const handelImageChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // Add this state variable with the other state declarations
  const [businessSection, setBusinessSection] = useState([]);

  const handleBusinessTypeActionChange = (value) => {
    const isProductOrService = value === "products" || value === "services";
    setBusinessTypeAction(isProductOrService);
    setBusinessType(value);

    // Set business section based on business type
    switch (value) {
      case "products":
        setBusinessSection(["shop", "bulk purchase", "deals"]);
        break;
      case "services":
        setBusinessSection(["deals"]);
        break;
      case "luxury":
        setBusinessSection(["shop", "deals"]);
        break;
      case "health-supply":
        setBusinessSection(["shop", "deals"]);
        break;
      default:
        setBusinessSection([]);
    }

    if (value === "products") {
      setCategoryOptions([
        "Gadget",
        "Groceries",
        "Fashion",
        "Home Appliance",
        "Kiddies",
      ]);
    } else if (value === "services") {
      setCategoryOptions([
        "Beauty",
        "Food",
        "Laundry",
        "SPA",
        "Fitness",
        "Automobile",
      ]);
    } else {
      setCategoryOptions([]);
    }
  };

  const businessTypeActionHandler = (val) => setBusinessTypeAction(val);
  const businessCategoryHandler = (val) => setCategoryOptions(val);

  const handleFormChange = (_, allFields) => {
    const allFieldsValid = allFields.every(
      (field) => field.errors.length === 0 && field.value
    );
    setIsFormValid(allFieldsValid);
  };

  const handleUploadChange = (info) => {
    const { status } = info.file;
    if (status === "done") {
      message.success(`${info.file.name} uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    action: "/upload",
    onChange: handleUploadChange,
    accept: ".pdf,.jpg,.jpeg,.png",
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
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input
              prefix={<CgNametag className="ml-1" />}
              type="text"
              placeholder="Enter Business Owner's first name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            className="mb-6 w-96"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
            ]}
          >
            <Input
              prefix={<CgNametag className="ml-1" />}
              type="text"
              placeholder="Enter Business Owner's last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            className="mb-6 w-96"
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
            className="mb-6 w-96"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              prefix={<FiPhoneCall className="ml-1" />}
              type="phone"
              placeholder="Phone number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            className="mb-6 w-96"
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
              type="text"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Business Information",
      content: (
        <div className="flex flex-col gap-4">
          <Form.Item
            className="mb-4 w-96 bg-white relative z-50"
            name="businessName"
            rules={[
              {
                required: true,
                message: "Please input your business name!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="ml-1" />}
              type="text"
              placeholder="Enter business name"
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="businessAddress"
            rules={[
              { required: true, message: "Business address is required!" },
            ]}
          >
            <Autocomplete
              onLoad={(instance) => setAutocomplete(instance)}
              onPlaceChanged={() => {
                if (autocomplete) {
                  const place = autocomplete.getPlace();

                  if (place.geometry) {
                    const location = place.geometry.location;
                    setBusinessLocationLat(location.lat());
                    setBusinessLocationLong(location.lng());
                  }

                  const address = place.formatted_address || "";
                  form.setFieldsValue({ businessAddress: address });
                  setBusinessAddress(address);
                }
              }}
            >
              <Input
                prefix={<MdTitle />}
                type="text"
                placeholder="Enter business address"
                value={form.getFieldValue("businessAddress")}
                onChange={(e) => {
                  const value = e.target.value;
                  form.setFieldsValue({ businessAddress: value });
                  setBusinessAddress(value);
                }}
              />
            </Autocomplete>
          </Form.Item>

          <Form.Item
            className="mb-4 w-96 bg-white relative z-50"
            name="business_type"
            rules={[
              { required: true, message: "Please select a business type!" },
            ]}
          >
            <Select
              className="p-[6px] bg-white z-50"
              placeholder="Select Business Type"
              onChange={handleBusinessTypeActionChange}
            >
              <Option>-- Select Type --</Option>
              <Option value="products">Products</Option>
              <Option value="services">Services</Option>
              <Option value="luxury">Luxury</Option>
              <Option value="health-supply">Health & Supplies</Option>
            </Select>
          </Form.Item>

          {businessTypeAction && (
            <>
              <Form.Item
                className="mb-4 w-96 bg-white z-50"
                name="business_category"
                rules={[
                  { required: true, message: "Please select a category!" },
                ]}
              >
                <Select
                  mode="multiple"
                  value={selectedCategory}
                  className="p-[10px]"
                  placeholder="Select Category"
                  onChange={handleCategoryTypeChange}
                >
                  {categoryOptions.map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          )}
        </div>
      ),
    },
    {
      title: "Bank Account Information",
      content: (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-center gap-2 text-red-500 font-bold">
            <IoWarning size={24} />
            <span>You may decide to provide the information here later</span>
          </div>
          <Form.Item className="mt-2 mb-6 w-96" name="accountName">
            <Input
              prefix={<CgNametag className="ml-1" />}
              type="text"
              placeholder="Enter account name"
              onChange={(e) => setBankAccountName(e.target.value)}
            />
          </Form.Item>
          {/* <Form.Item className="mb-6 w-96" name="bank_name">
            <Input
              prefix={<BsBank className="ml-1" />}
              type="text"
              placeholder="Enter bank name"
              onChange={(e) => setBankName(e.target.value)}
            />
          </Form.Item> */}
          <Form.Item
            style={{ marginBottom: "15px" }}
            name="bank_name"
            className="mb-6 w-96"
          >
            <Select
              name="bankName"
              loading={!bank}
              showSearch
              placeholder="Select bank name"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children)
              }
              onChange={bankListHandler}
            >
              {bank &&
                bank.map((bk) => (
                  <Select.Option
                    key={bk.id}
                    value={bk.name}
                    data={{ code: bk.code }}
                  >
                    {bk.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item className="mb-6 w-96" name="accountNumber">
            <Input
              prefix={<NumberOutlined className="ml-1" />}
              type="number"
              placeholder="Enter account number"
              onChange={(e) => setBankAccountNumber(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Business CAC Document"
            name="businessDocument"
            className=" mb-6 w-96"
          >
            <Upload
              maxCount={1}
              accept=".png,.jpg,.jpeg"
              onChange={handleDocumentUpload}
              showUploadList={false}
            >
              <Button icon={<InboxOutlined />}>Upload CAC Document</Button>
            </Upload>
            {documentPreview && (
              <div className="mt-4">
                <img
                  src={documentPreview}
                  alt="Document preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
          </Form.Item>
        </div>
      ),
    },
  ];

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-[44rem] mt-[30px] mx-auto">
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

        <h1 className="font-Poppins font-semibold text-xl text-center mt-12 pb-4">
          Welcome to 3XG, Merchant Hub
        </h1>
        <Form
          className="flex flex-col items-center justify-center gap-5"
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
            business_address: "",
          }}
        >
          <Steps current={currentStep}>
            {steps.map((step, index) => (
              <Steps key={index} title={step.title} />
            ))}
          </Steps>

          <div className="steps-content mt-4">{steps[currentStep].content}</div>

          <div className="steps-action mt-24">
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
              <Button
                type="primary"
                htmlType="submit"
                shape="round"
                loading={loader}
              >
                Submit
              </Button>
            )}
          </div>
          <h6 className="text-center mt-2">
            Already have an account ?{" "}
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

export default RegisterMerchant;
