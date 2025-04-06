import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadWalletBalance } from "../../redux/rtk/features/dashboard/dashboardStatsSlice";
import { Link } from "react-router-dom";
import Card from "@/UI/Card";
import CreateDrawer from "../CommonUi/CreateDrawer";
import History from "./History";
import InEscrow from "./InEscrow";
import Invoice from "./Invoice";
import useCurrency from "@/utils/useCurrency";
import { MdInventory2 } from "react-icons/md";
import { Tooltip } from "antd";
import { FaCoins, FaMoneyBills } from "react-icons/fa6";

export default function WalletCard() {
  const dispatch = useDispatch();
  const { walletBalance } = useSelector((state) => state.dashboardStats);
  const currency = useCurrency();
  
  useEffect(() => {
    dispatch(loadWalletBalance());
  }, [dispatch]);
  const [isTab1, setIsTab1] = useState(1);
  
  const handleTab1 = (i) => {
    setIsTab1(i);
  };

  const historyColumns = [
    {
      id: 1,
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      width: "150px",
    },
    {
      id: 2,
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "100px",
    },
    {
      id: 3,
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: "100px",
    },
    {
      id: 4,
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "100px",
    },
    {
      id: 5,
      title: "New Balance",
      dataIndex: "newBalance",
      key: "newBalance",
      width: "120px",
    },
  ];

  const escrowColumns = [
    {
      id: 1,
      title: "ORDERS",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      id: 2,
      title: "DATE",
      dataIndex: "date",
      key: "date",
    },
    {
      id: 3,
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
    },
    {
      id: 4,
      title: "STATUS",
      dataIndex: "status",
      key: "status",
    },
  ];

  const invoiceColumns = [
    {
      id: 1,
      title: "REFERENCE",
      dataIndex: "reference",
      key: "reference",
      width: "150px",
    },
    {
      id: 2,
      title: "DATE",
      dataIndex: "date",
      key: "date",
      width: "120px",
    },
    {
      id: 3,
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      width: "100px",
    },
    {
      id: 4,
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: "100px",
    },
  ];

  // Simplified pageConfig
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "DEBIT",
  });

  // Simplified filters
  const filters = [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Show", value: "true" },
        { label: "Hide", value: "false" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
  ];

  return (
    <Fragment>
      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-5 mb-5">
        <div className="ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 p-2 bg-white shadow-custom rounded-lg dashboard-card-bg">
          <div className="sm:hidden inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-blue-600 bg-blue-100 rounded-lg mr-6">
            <MdInventory2 size={30} />
          </div>
          <div>
            <Tooltip
              title={
                <span className="text-lg">
                  <span dangerouslySetInnerHTML={{ __html: currency?.currencySymbol }} />
                  {walletBalance?.balance || 0}
                </span>
              }
            >
              <span className="block text-[#E7906B] text-2xl sm:text-3xl font-bold sm:text-center">
                <span dangerouslySetInnerHTML={{ __html: currency?.currencySymbol }} />
                {walletBalance?.balance || 0}
              </span>

              <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100">
                Amount in Wallet
              </span>
            </Tooltip>
          </div>
        </div>
        <div className="ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 p-2 bg-white shadow-custom rounded-lg dashboard-card-bg">
          <div className="sm:hidden inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-violet-600 bg-violet-100 rounded-lg mr-6">
            <FaCoins size={30} />
          </div>
          <div>
            <Tooltip
              title={
                <span className="text-lg">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: currency?.currencySymbol,
                    }}
                  />
                
                </span>
              }
            >
              <span className="block text-[#E7906B] text-2xl sm:text-3xl font-bold sm:text-center">
                {" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: currency?.currencySymbol,
                  }}
                />
              0
              </span>
              <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2  dark:text-yellow-100 ">
                Invoices
              </span>
            </Tooltip>
          </div>
        </div>
        <div className="ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 p-2 bg-white shadow-custom rounded-lg dashboard-card-bg">
          <div className="sm:hidden inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-violet-500 bg-violet-100 rounded-lg mr-6">
            <FaMoneyBills size={30} />
          </div>
          <div>
            <Tooltip
              title={
                <span className="text-lg">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: currency?.currencySymbol,
                    }}
                  />
                  {/* {card?.inventoryPurchaseValue.toFixed(3)} */}

                  0
                </span>
              }
            >
              <span className="block text-[#E7906B] text-2xl sm:text-3xl font-bold sm:text-center">
                <span
                  dangerouslySetInnerHTML={{
                    __html: currency?.currencySymbol,
                  }}
                />
               0
              </span>

              <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2  dark:text-yellow-100 ">
                In Escrow
              </span>
            </Tooltip>
          </div>
        </div>

        <div className="ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 p-2 bg-white shadow-custom rounded-lg dashboard-card-bg">
          <div className="sm:hidden inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-violet-500 bg-violet-100 rounded-lg mr-6">
            <FaMoneyBills size={30} />
          </div>
          <div>
            <Tooltip
              title={
                <span className="text-lg">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: currency?.currencySymbol,
                    }}
                  />
                
                </span>
              }
            >
              <span className="block text-[#E7906B] text-2xl sm:text-3xl font-bold sm:text-center">
                <span
                  dangerouslySetInnerHTML={{
                    __html: currency?.currencySymbol,
                  }}
                />
             0
              </span>

              <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2  dark:text-yellow-100 ">
                Threshold Amount
              </span>
            </Tooltip>
          </div>
        </div>
      </section>
      <div>
        <div className="flex flex-row items-center gap-1 mt-5">
          <div onClick={() => handleTab1(1)}>
            <div
              className={`ant-shadow w-[10rem] h-[4rem] relative sm:p-2 dark:bg-[#2e2d35] flex justify-center sm:justify-center items-center md:p-6 ${
                isTab1 === 1
                  ? "bg-orange-500 text-white rounded-t-2xl"
                  : "bg-gray-100 rounded-t-2xl"
              } shadow-custom cursor-pointer`}
            >
              <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
                History
              </span>
            </div>
          </div>
          <div onClick={() => handleTab1(2)}>
            <div
              className={`ant-shadow w-[10rem] h-[4rem] relative sm:p-2 dark:bg-[#2e2d35] flex justify-center sm:justify-center items-center md:p-6 ${
                isTab1 === 2
                  ? "bg-orange-500 text-white rounded-t-2xl"
                  : "bg-gray-100 rounded-t-2xl"
              } shadow-custom cursor-pointer`}
            >
              <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
                In Escrow
              </span>
            </div>
          </div>
          <div onClick={() => handleTab1(3)}>
            <div
              className={`ant-shadow w-[10rem] h-[4rem] relative sm:p-2 dark:bg-[#2e2d35] flex justify-center sm:justify-center items-center md:p-6 ${
                isTab1 === 3
                  ? "bg-orange-500 text-white rounded-t-2xl"
                  : "bg-gray-100 rounded-t-2xl"
              } shadow-custom cursor-pointer`}
            >
              <span className="uppercase sm:text-[18px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
                Invoice
              </span>
            </div>
          </div>
        </div>
        <div>
          <Card
            className="max-md:border-0 max-md:bg-white"
            bodyClass="max-md:p-0 "
            headClass="border-none"
            title={`${
              isTab1 === 1 ? "History" : isTab1 === 2 ? "In Escrow" : "Invoice"
            }`}
            extra={
              <CreateDrawer
                permission={"create-product"}
                title={"Fund Wallet"}
                width={60}
              >
                {/* <AddProd /> */}
              </CreateDrawer>
            }
          >
            <div style={{ display: `${isTab1 === 1 ? "block" : "none"}` }}>
              <History
                columns={historyColumns}
                filters={filters}
                setPageConfig={setPageConfig}
                title="History"
                isSearch
              />
            </div>
            <div style={{ display: `${isTab1 === 2 ? "block" : "none"}` }}>
              <InEscrow
                columns={escrowColumns}
                filters={filters}
                setPageConfig={setPageConfig}
                title="In Escrow"
                isSearch
              />
            </div>
            <div style={{ display: `${isTab1 === 3 ? "block" : "none"}` }}>
              <Invoice
                columns={invoiceColumns}
                filters={filters}
                setPageConfig={setPageConfig}
                title="Invoice"
                isSearch
              />
            </div>
          </Card>
        </div>
      </div>
    </Fragment>
  );
}