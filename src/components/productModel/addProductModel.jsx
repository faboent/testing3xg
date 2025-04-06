import { Button, Card, Form, Input, Typography } from "antd";

import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addProductModel,
  loadAllProductModel,
} from "../../redux/rtk/features/productModel/productModelSlice";
import UploadMany from "../Card/UploadMany";
const AddProductModel = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      const resp = await dispatch(addProductModel(values));

      if (resp.payload.message === "success") {
        setLoading(false);
        form.resetFields();
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    setLoading(false);
  };

  const onClick = () => {
    setLoading(true);
  };

  return (
    <>
      <div className="h-full">
        <Form
          form={form}
          className="sm:mx-10"
          name="basic"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input category name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "10px" }}
            className="flex justify-center mt-[24px]"
          >
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              loading={loading}
              onClick={onClick}
            >
              Create Model
            </Button>
          </Form.Item>
        </Form>

        <Card
          className="mt-5"
          title={<span className="text-center font-bold">Import From CSV</span>}
        >
          <UploadMany
            title={"Demo Model"}
            demoData={[["name"], ["Rich Man"], ["Blue Dream"], ["Easy"]]}
            urlPath={"product-model"}
            loadAllThunk={loadAllProductModel}
            query={{ page: 1, count: 10, status: true }}
          />
        </Card>
      </div>
    </>
  );
};

export default AddProductModel;
