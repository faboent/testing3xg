import ChangePassword from "@/CustomerUI/ChangePassword";
import Button from "@/UI/Button";
import Menu from "@/UI/Menu";
import { Modal, Pagination, Popover, Skeleton, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loadAlleCommerceSalePaginated } from "../../redux/rtk/features/eCommerce/cartOrder/cartOrderSlice";
import { loadSingleCustomerEcom } from "../../redux/rtk/features/eCommerce/customer/customerSlice";
import { nameRender } from "../../utils/functions";
import useCurrency from "../../utils/useCurrency";
import UpdateProfile from "./UpdateProfile";

export default function MyAccount() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const currency = useCurrency();

  const { customer, loading } = useSelector((state) => state.customerECommerce);
  const {
    list,
    total,
    loading: saleLoading,
  } = useSelector((state) => state.ESale);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
  });
  const columns = [
    {
      title: "Order#",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/order/${id}`}>{id}</Link>,
    },
    {
      title: "Place On",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("MMM Do YY"),
    },
    {
      title: "Items",
      dataIndex: "cartOrderProduct",
      key: "cartOrderProduct",
      render: (cartOrderProduct) => {
        const productNames = cartOrderProduct.map(
          (product) => product.product.name
        );
        const productNamesString = productNames.join(", ");
        return productNamesString;
      },
    },
    {
      title: "Total",
      key: "totalAmount",
      render: ({ totalAmount, totalDiscountAmount }) => (
        <span>
          <span
            dangerouslySetInnerHTML={{
              __html: currency?.currencySymbol,
            }}
          />
          {` ${totalAmount + totalDiscountAmount}`}
        </span>
      ),
    },
    {
      title: "Discount",
      dataIndex: "totalDiscountAmount",
      key: "totalDiscountAmount",
      render: (totalDiscountAmount) => (
        <span>
          <span
            dangerouslySetInnerHTML={{
              __html: currency?.currencySymbol,
            }}
          />
          {` ${totalDiscountAmount}`}
        </span>
      ),
    },
    {
      title: "Tax",
      dataIndex: "totalTaxAmount",
      key: "totalTaxAmount",
      render: (totalTaxAmount) => (
        <span>
          <span
            dangerouslySetInnerHTML={{
              __html: currency?.currencySymbol,
            }}
          />
          {` ${totalTaxAmount}`}
        </span>
      ),
    },

    {
      title: "Paid",
      dataIndex: "paidAmount",
      key: "paidAmount",
      render: (paidAmount) => (
        <span>
          <span
            dangerouslySetInnerHTML={{
              __html: currency?.currencySymbol,
            }}
          />
          {` ${paidAmount}`}
        </span>
      ),
    },
    {
      title: "Due",
      dataIndex: "dueAmount",
      key: "dueAmount",
      render: (dueAmount) => (
        <span>
          <span
            dangerouslySetInnerHTML={{
              __html: currency?.currencySymbol,
            }}
          />
          {` ${dueAmount}`}
        </span>
      ),
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (orderStatus) => (
        <span
          className={` rounded px-2 py-[1px] text-ePrimary  ${
            orderStatus == "PENDING" && "text-orange-500 "
          }
                  ${orderStatus == "RECEIVED" && "text-green-500 "}
              
                  ${orderStatus == "CANCELLED" && "text-red-500"}
                    `}
        >
          {orderStatus}
        </span>
      ),
    },
   
  ];
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  const handleChangePassword = () => {
    setChangePasswordModal(true);
  };
  const handleChangeModal = () => {
    setChangePasswordModal(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // const handleChange = (value, name) => {
  //   setPageConfig((prev) => {
  //     return {
  //       ...prev,
  //       [name]: value,
  //       page: 1,
  //     };
  //   });
  // };

  const logOut = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  const fetchData = (page, count) => {
    setPageConfig((prev) => {
      return { ...prev, page, count };
    });
  };
  useEffect(() => {
    dispatch(loadSingleCustomerEcom());
    dispatch(loadAlleCommerceSalePaginated(pageConfig));
  }, [dispatch, pageConfig]);
  const handleOnError = (e) => {
    e.target.src = "/images/default.jpg";
  };
  const onRow = (record) => ({
    onClick: () => Navigate(`/order/${record.id}`),
  });

  const rowClassName = (record, index) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        {/*===================================================
                         Profile Container
          ======================================================*/}
        <div className="w-full lg:w-1/3 bg-slate-100  rounded p-5">
          <div className="flex justify-between items-center pb-7">
            <div className="flex justify-between items-center text-[14px]">
              <h3> Profile</h3>
            </div>

            <span>
              <Popover
                content={
                  <Menu
                    items={[
                      {
                        key: "1",
                        label: (
                          <button
                            onClick={showModal}
                            className="text-gray-500  hover:bg-slate-200 w-full p-1 text-start -my-3 rounded px-2"
                          >
                            Edit
                          </button>
                        ),
                      },

                      {
                        key: "change-password",
                        label: (
                          <button
                            onClick={handleChangePassword}
                            className="text-gray-500 hover:bg-slate-200 w-full p-1 text-start -my-3 rounded px-2"
                          >
                            Change Password
                          </button>
                        ),
                      },
                      {
                        key: "logout",
                        label: (
                          <button
                            onClick={logOut}
                            className="text-red-500  hover:bg-slate-200 w-full p-1 text-start -my-3 rounded px-2"
                          >
                            Logout
                          </button>
                        ),
                      },
                    ]}
                  />
                }
                placement="bottomRight"
                arrow={false}
                trigger="click"
              >
                <Button
                  color={"gray"}
                  icon={<BsThreeDotsVertical size={15} />}
                  className=" p-1 rounded"
                ></Button>
              </Popover>
            </span>
          </div>
          {loading && (
            <div>
              <div className="flex justify-center my-2">
                <span className="h-[80px] animate-pulse w-[80px] bg-gray-200 rounded-full"></span>
              </div>
              <div>
                <Skeleton active />
              </div>
            </div>
          )}
          {customer && !loading && (
            <div>
              <div className="flex justify-center my-2">
                {customer.profileImage ? (
                  <img
                    onError={handleOnError}
                    className="h-[80px] w-[80px] border-[3px] border-ePrimary rounded-full"
                    src={customer.profileImage}
                    alt="icon"
                  />
                ) : (
                  <FaUser size={80} className="text-gray-600 rounded-full " />
                )}
              </div>
              <div className="text-[14px]">
                <p className="py-1 text-[18px] text-center">
                  {nameRender(customer)}
                </p>
                <p className="text-gray-600 text-center">{customer?.phone}</p>
                <p className="text-gray-600 text-center">{customer?.email}</p>
              </div>
            </div>
          )}
        </div>

        {/*===================================================
                             Address Book Container
        ======================================================*/}
        <div className="w-full lg:w-2/3 bg-slate-100 rounded p-5">
          {/* Address title */}
          <div className=" flex  items-center text-[14px]">
            <h3>Shipping Address </h3>
            {/* <span className='px-2'>|</span>
            <button
              onClick={() => Navigate("/user")}
              className='text-ePrimary text-[12px] bg-ePrimary/10 px-1 rounded-sm '
            >
              Edit
            </button> */}
          </div>

          <div className="flex justify-between pt-2">
            <div>
              <p className="mt-2 ml-4">{customer?.address}</p>
            </div>
            {/* <div className="w-1/2 border-r">
              <span className="text-[12px] text-gray-600 py-4 inline-block">
                DELIVERY ADDRESS
              </span>
              <div>
                <h3 className="text-[12px] font-semibold  pb-1">Tanvir </h3>
                <p className="text-[12px] text-gray-600">shapla Sarani</p>
                <p className="text-[12px] text-gray-600">
                  {" "}
                  Dhaka - Dhaka - North - Shewrapara
                </p>
                <p className="text-[12px] text-gray-600">(+880) 1741940694</p>
              </div>
            </div> */}

            {/* <div className='w-1/2 pl-4'>
              <span className='text-[12px] text-gray-600 py-4 inline-block'>
                {" "}
                BILLING ADDRESS
              </span>
              <div>
                <h3 className='text-[12px] font-semibold  pb-1'>Tanvir </h3>
                <p className='text-[12px] text-gray-600'>shapla Sarani</p>
                <p className='text-[12px] text-gray-600'>
                  {" "}
                  Dhaka - Dhaka - North - Shewrapara
                </p>
                <p className='text-[12px] text-gray-600'>(+880) 1741940694</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/*===================================================
                        Order Table 
      ======================================================*/}
      <div className="bg-slate-100 my-4 p-5 table-container eCommerce">
        <div className="flex items-start gap-5">
          <h3>Orders</h3>{" "}
          {/* <div className="filterTag float-left min-w-[120px] max-w-[150px]">
            <Select
              placeholder="Order status"
              className=""
              showSearch={false}
              style={{ width: "100%" }}
              maxTagPlaceholder={(item) => (
                <div className="">{item.length} Selected</div>
              )}
              maxTagCount={0}
              onChange={(value) => handleChange(value, "orderStatus")}
            >
              <Select.Option value="PENDING" key="PENDING">
                Pending
              </Select.Option>
              <Select.Option value="RECEIVED" key="RECEIVED">
                Received
              </Select.Option>
              <Select.Option value="PACKED" key={"PACKED"}>
                Packed
              </Select.Option>
              <Select.Option value="SHIPPED" key={"SHIPPED"}>
                Shipped
              </Select.Option>
              <Select.Option value="DELIVERED" key={"DELIVERED"}>
                Delivered
              </Select.Option>
              <Select.Option value="CANCELLED" key={"CANCELLED"}>
                Cancelled
              </Select.Option>
            </Select>
          </div>{" "} */}
        </div>

        <Table
          className="my-5"
          loading={saleLoading}
          columns={columns}
          dataSource={
            !!list?.length && list.map((item) => ({ ...item, key: item?.id }))
          }
          pagination={false}
          scroll={{
            x: 400,
          }}
          onRow={onRow}
          rowClassName={rowClassName}
        />
        <div className="mt-2 flex justify-end">
          {total >= 11 && (
            <Pagination
              total={total}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
              onChange={fetchData}
              defaultPageSize={10}
              defaultCurrent={1}
              showLessItems
              showSizeChanger={total > 10}
            />
          )}
        </div>
      </div>

      {/*===================================================
                        update profile modal
      ======================================================*/}
      {customer && (
        <Modal
          open={isModalOpen}
          width={400}
          onCancel={handleCancel}
          title={"Update Profile"}
          footer={null}
        >
          <UpdateProfile handleCancel={handleCancel} customer={customer} />
        </Modal>
      )}

      <Modal
        open={changePasswordModal}
        onCancel={handleChangeModal}
        footer={null}
        width={400}
        title={"Change Password"}
      >
        <ChangePassword />
      </Modal>
    </div>
  );
}
