import {
  CloseCircleFilled,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { loadAllCurrency } from "../../redux/rtk/features/eCommerce/currency/currencySlice";
import {
  getSetting,
  getMerchantSetting,
  updateSetting,
} from "../../redux/rtk/features/setting/settingSlice";
import fileConfig from "../../utils/fileConfig";
import Loader from "../loader/loader";
import { BiPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { IoCloseCircle } from "react-icons/io5";
import KycForm from "./kycForm";
//Update Invoice API REQ

const AddDetails = () => {
  const [kycVisible, setKycVisible] = useState(false);
  const { Title } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [footer, setFooter] = useState("");

  const data = useSelector((state) => state?.setting?.data) || null;
  const merchantData = useSelector((state) => state?.setting?.merchantData) || null;
  const { list, loading } = useSelector((state) => state?.currency) || null;
  const loader = useSelector((state) => state?.setting?.loading) || false;

  console.log(JSON.stringify(data) + " App setting data");

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
      dispatch(getMerchantSetting());
    }
    dispatch(loadAllCurrency());
  }, [dispatch, data]);

  const handelImageChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const textEditorFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
  ];
  const textEditorModule = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };
  const footerHandler = (val) => {
    setFooter(val);
  };
  return (
    <Fragment>
      <Row className="mr-top relative" justify="center">
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={16}
          xl={16}
          className="border rounded column-design"
        >
          <Card bordered={false}>
            <Title level={4} className="m-2 text-center mb-4">
              Company Setting
            </Title>
            {data ? (
              <Form
                initialValues={{
                  ...data,
                }}
                form={form}
                name="basic"
                labelCol={{
                  span: 7,
                }}
                labelWrap
                wrapperCol={{
                  span: 16,
                }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Company Name" }]}
                  label="Company Name"
                  name="businessName"
                  rules={[
                    {
                      required: true,
                      message: "Please input Company name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                {/* <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Company Name" }]}
                  label='Dashboard Type'
                  name='dashboardType'
                  rules={[
                    {
                      required: true,
                      message: "Please input dashboardType!",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option key={"Both"} value={"both"}>
                      Both
                    </Select.Option>
                    <Select.Option key={"e-commerce"} value={"e-commerce"}>
                      E-Commerce
                    </Select.Option>
                    <Select.Option key={"inventory"} value={"inventory"}>
                      Inventory
                    </Select.Option>
                  </Select>
                </Form.Item> */}
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  fields={[{ name: "Tagline" }]}
                  label="Tagline"
                  name="tagLine"
                  rules={[
                    {
                      required: true,
                      message: "Please input Tagline!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Address"
                  name="businessAddress"
                  rules={[
                    {
                      required: true,
                      message: "Please input Address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Phone Number"
                  name="businessPhone"
                  rules={[
                    {
                      required: true,
                      message: "Please input Phone Number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Email Address"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input Email Address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Currency"
                  name="currencyId"
                  rules={[
                    {
                      required: true,
                      message: "Please input Currency!",
                    },
                  ]}
                >
                  <Select label="Currency" name="currencyId" loading={loading}>
                    {list?.map((item, index) => (
                      <Select.Option value={item.id} key={item.id}>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.currencySymbol,
                          }}
                        ></span>{" "}
                        &#160;
                        <span>{item.currencyName}</span>
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: "10px" }}
                  label="Website"
                  name="website"
                  rules={[
                    {
                      required: true,
                      message: "Please input Website!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item label="Upload Logo" valuePropName="fileList">
                  <Upload
                    listType="picture-card"
                    beforeUpload={() => false}
                    name="image"
                    fileList={fileList}
                    maxCount={1}
                    onChange={handelImageChange}
                  >
                    <div>
                      <UploadOutlined />
                      <div
                        style={{
                          marginTop: 8,
                        }}
                      >
                        Upload
                      </div>
                    </div>
                  </Upload>
                  <p className="font-semibold text-rose-500">
                    Required image size 180x70 px & transparent png format
                  </p>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "40px" }}
                  label="Footer"
                  name="footer"
                  className="z-30"
                  rules={[
                    {
                      required: true,
                      message: "Please input Footer!",
                    },
                  ]}
                >
                  <ReactQuill
                    value={footer}
                    onChange={footerHandler}
                    modules={textEditorModule}
                    formats={textEditorFormats}
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "10px" }}
                  className="flex justify-center mt-[24px]"
                >
                  <Button
                    type="primary"
                    disabled={loading}
                    htmlType="submit"
                    shape="round"
                    loading={loader}
                  >
                    Update Details
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <Loader />
            )}
          </Card>
        </Col>
        {/* <button
          className="flex flex-row items-center justify-center absolute bg-orange-500 text-white font-bold text-base p-2 rounded-md top-8 right-2"
          onClick={() => setKycVisible(!kycVisible)}
        >
          <BiPlus size={27} /> Add Business
        </button> */}
      </Row>
      {kycVisible && (
        <div className="fixed inset-0 w-full h-full bg-black/25 flex justify-center items-center z-[1000] backdrop-blur-sm">
          <div
            className="absolute top-10 right-10 cursor-pointer"
            onClick={() => setKycVisible(!kycVisible)}
          >
            <IoCloseCircle size={50} color="#fff" />
          </div>
          <KycForm />
        </div>
      )}
    </Fragment>
  );
};

export default AddDetails;
