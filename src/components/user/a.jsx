{
  selectedCategory === "Luxury" && (
    <>
      {!kycVisible && (
        <div className="fixed inset-0 w-full h-full bg-black/25 flex justify-center items-center z-[1000] backdrop-blur-sm">
          <div
            className="absolute top-10 right-10 cursor-pointer"
            onClick={() => setKycVisible(!kycVisible)}
          >
            <IoCloseCircle size={50} color="#fff" />
          </div>
          <Card className="bg-white z-10">
            <Title level={4} className="m-2 text-center mb-4">
              KYC Requirements for Luxury
            </Title>

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
                  Support for a single upload. Accepts PDF, JPG, JPEG, PNG.
                </p>
              </Dragger>
            </Form.Item>
          </Card>
        </div>
      )}
    </>
  );
}

{
  selectedCategory === "Health & Supplies" && (
    <>
      {!kycVisible && (
        <div className="fixed inset-0 w-full h-full bg-black/25 flex justify-center items-center z-[1000] backdrop-blur-sm">
          <div
            className="absolute top-10 right-10 cursor-pointer"
            onClick={() => setKycVisible(!kycVisible)}
          >
            <IoCloseCircle size={50} color="#fff" />
          </div>
          <Card className="bg-white z-10">
            <Title level={4} className="m-2 text-center mb-4">
              KYC Requirements for Health & Supplies
            </Title>

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
                  Support for a single upload. Accepts PDF, JPG, JPEG, PNG.
                </p>
              </Dragger>
            </Form.Item>
          </Card>
        </div>
      )}
    </>
  );
}
