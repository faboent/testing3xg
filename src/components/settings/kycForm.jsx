import { InboxOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Steps,
  message,
} from "antd";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCurrency } from "../../redux/rtk/features/eCommerce/currency/currencySlice";
import {
  getSetting,
  updateSetting,
} from "../../redux/rtk/features/setting/settingSlice";
import fileConfig from "../../utils/fileConfig";
import Loader from "../loader/loader";
import { BiPlus } from "react-icons/bi";
import Dragger from "antd/es/upload/Dragger";
//Update Invoice API REQ

const KycForm = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [footer, setFooter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const data = useSelector((state) => state?.setting?.data) || null;
  const { list, loading } = useSelector((state) => state?.currency) || null;
  const loader = useSelector((state) => state?.setting?.loading) || false;

  const onFinish = async (values) => {
    //convert values to formData to send to server
    const formData = new FormData();
    formData.append("companyName", values.companyName);
    // values.dashboardType &&
    //   formData.append("dashboardType", values.dashboardType);
    formData.append("tagLine", values.tagLine);
    formData.append("address", values.address);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("website", values.website);
    formData.append("footer", values.footer);
    formData.append("currencyId", values.currencyId);

    if (fileList.length) {
      if (fileConfig() === "laravel") {
        formData.append("images[]", fileList[0].originFileObj);
      } else {
        formData.append("images", fileList[0].originFileObj);
      }
    }
    formData.append("_method", "PUT");
    try {
      const resp = await dispatch(updateSetting(formData));
      if (resp.payload.message === "success") {
        toast.success("Company Updated Successfully");
        dispatch(getSetting());
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (data == null) {
      dispatch(getSetting());
    }
    dispatch(loadAllCurrency());
  }, [dispatch, data]);

  const handelImageChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = (values) => {
    console.log("Form submitted: ", values);
    message.success("KYC form submitted successfully!");
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

  const [isFormValid, setIsFormValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

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
        "Health & Supplies",
        "Kiddies",
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

  const handleCategoryTypeChange = (value) => {
    setSelectedCategory(value);
    form.setFieldsValue({ businessCategory: value });
  };

  const handleFormChange = (_, allFields) => {
    const allFieldsValid = allFields.every(
      (field) => field.errors.length === 0 && field.value
    );
    setIsFormValid(allFieldsValid);
  };

  return (
    <Fragment>
      <Row
        className="mr-top relative w-[70%] overflow-y-scroll"
        justify="center"
      >
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={16}
          xl={16}
          className="border rounded column-design"
        >
          <Card bordered={false}>
            <Form>
              <Form.Item
                style={{ marginBottom: "10px" }}
                fields={[{ name: "Business Name" }]}
                label="Business Name"
                name="businessName"
                rules={[
                  {
                    required: true,
                    message: "Please input Business Name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Business Type"
                className="mb-4 bg-white z-50"
                name="businessType"
                rules={[
                  { required: true, message: "Please select a business type!" },
                ]}
              >
                <Select
                  className="p-[6px] bg-white"
                  placeholder="Select Business Type"
                  onChange={(value) => {
                    handleBusinessTypeChange(value);
                    form.setFieldsValue({ businessType: value });
                  }}
                >
                  <Option>-- Select Type --</Option>
                  <Option value="Product">Products</Option>
                  <Option value="Service">Services</Option>
                </Select>
              </Form.Item>

              {businessType && (
                <>
                  <Form.Item
                    className="mb-4 bg-white z-10"
                    label="Business Category"
                    name="businessCategory"
                    rules={[
                      { required: true, message: "Please select a category!" },
                    ]}
                  >
                    <Select
                      className="p-[10px]"
                      placeholder="Select Category"
                      onChange={(value) => {
                        handleCategoryTypeChange(value);
                        form.setFieldsValue({ category: value });
                      }}
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
              {selectedCategory === "Luxury" && (
                <>
                  <hr />
                  <Title level={4} className="m-2 text-center mb-4">
                    KYC Form for Luxury
                  </Title>
                  <Form.Item
                    label="Business Owner"
                    name="businessOwner"
                    rules={[
                      {
                        required: true,
                        message: "Please input Business Owner Name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Business Address"
                    name="businessAddress"
                    rules={[
                      {
                        required: true,
                        message: "Please input Business Address!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="certificate"
                    label="Upload (NIN, CAC, License to Trade) certificates"
                    valuePropName="file"
                    rules={[
                      {
                        required: true,
                        message: "Please upload your certificates!",
                      },
                    ]}
                  >
                    <Dragger {...uploadProps}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for a single upload. Accepts PDF, JPG, JPEG,
                        PNG.
                      </p>
                    </Dragger>
                  </Form.Item>
                </>
              )}

              {selectedCategory === "Health & Supplies" && (
                <>
                  <hr />
                  <Title level={4} className="m-2 text-center mb-4">
                    KYC Form for Health & Supplies
                  </Title>
                  <Form.Item
                    label="Business Owner"
                    name="businessOwner"
                    rules={[
                      {
                        required: true,
                        message: "Please input Business Owner Name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Business Address"
                    name="businessAddress"
                    rules={[
                      {
                        required: true,
                        message: "Please input Business Address!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="certificate"
                    label="Upload (NIN, CAC, License to Practice) certificates"
                    valuePropName="file"
                    rules={[
                      {
                        required: true,
                        message: "Please upload required certificates!",
                      },
                    ]}
                  >
                    <Dragger {...uploadProps}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for a single upload. Accepts PDF, JPG, JPEG,
                        PNG.
                      </p>
                    </Dragger>
                  </Form.Item>
                </>
              )}

              <Form.Item className="flex justify-center mt-[64px]">
                <Button
                  type="primary"
                  loading={loading}
                  htmlType="submit"
                  shape="round"
                  // block
                  // loading={loader}
                >
                  Submit New Business
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default KycForm;
