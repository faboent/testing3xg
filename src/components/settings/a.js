import React, { useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const KYCForm = () => {
  const [loading, setLoading] = useState(false);

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
    action: "/upload", // Your upload endpoint
    onChange: handleUploadChange,
    accept: ".pdf,.jpg,.jpeg,.png", // Only accept certain file types
  };

  return (
    <Form
      name="kyc_form"
      onFinish={handleSubmit}
      layout="vertical"
      className="kyc-form"
    >
      {/* Certificate Upload */}
      <Form.Item
        name="certificate"
        label="Upload Certificate"
        valuePropName="file"
        rules={[{ required: true, message: "Please upload your certificate!" }]}
      >
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload. Accepts PDF, JPG, JPEG, PNG.
          </p>
        </Dragger>
      </Form.Item>

      {/* Licence Upload */}
      <Form.Item
        name="licence"
        label="Upload Licence"
        valuePropName="file"
        rules={[{ required: true, message: "Please upload your licence!" }]}
      >
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload. Accepts PDF, JPG, JPEG, PNG.
          </p>
        </Dragger>
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Submit KYC
        </Button>
      </Form.Item>
    </Form>
  );
};

export default KYCForm;
