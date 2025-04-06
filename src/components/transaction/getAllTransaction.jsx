import { loadAllAccount } from "@/redux/rtk/features/account/accountSlice";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import { loadAllTransaction } from "../../redux/rtk/features/transaction/transactionSlice";
import CreateDrawer from "../CommonUi/CreateDrawer";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddTransaction from "./AddTransaction";
import TransactionTable from "./TransactionTable";

const GetAllTransaction = () => {
  const [isTab1, setIsTab1] = useState(1);
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.transactions);
  const { list: accounts } = useSelector((state) => state.accounts);
  const { RangePicker } = DatePicker;

  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
  });

  const transactionColumns = (isOnline) => [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <Link to={`/admin/transaction/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("ll"),
      renderCsv: (date) => moment(date).format("ll"),
    },
    {
      id: 3,
      title: "Debit Account",
      dataIndex: "debit",
      key: "debit",
      render: (debit) => debit?.name,
      renderCsv: (debit) => debit?.name,
    },
    {
      id: 4,
      title: "Credit Account",
      dataIndex: "credit",
      key: "credit",
      render: (credit) => credit?.name,
      renderCsv: (credit) => credit?.name,
    },
    {
      id: 5,
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
    },
    {
      id: 6,
      title: "Particulars",
      dataIndex: "particulars",
      key: "particulars",
    },
    ...(isOnline
      ? [
          {
            id: 7,
            title: "Qty",
            dataIndex: "qty",
            key: "qty",
            render: (qty) => <span>{qty}</span>,
            renderCsv: (qty) => qty,
          },
          {
            id: 8,
            title: "Subtotal",
            dataIndex: "subtotal",
            key: "subtotal",
            render: (subtotal) => <span>{subtotal}</span>,
            renderCsv: (subtotal) => subtotal,
          },
          {
            id: 9,
            title: "Rate",
            dataIndex: "rate",
            key: "rate",
            render: (rate) => <span>{rate}</span>,
            renderCsv: (rate) => rate,
          },
          {
            id: 10,
            title: "Commission",
            dataIndex: "commission",
            key: "commission",
            render: (commission) => <span>{commission}</span>,
            renderCsv: (commission) => commission,
          },
          {
            id: 11,
            title: "Shipping",
            dataIndex: "shipping",
            key: "shipping",
            render: (shipping) => <span>{shipping}</span>,
            renderCsv: (shipping) => shipping,
          },
          {
            id: 12,
            title: "Payout Amt.",
            dataIndex: "payoutAmt",
            key: "payoutAmt",
            render: (payoutAmt) => <span>{payoutAmt}</span>,
            renderCsv: (payoutAmt) => payoutAmt,
          },
          {
            id: 13,
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => <span>{status}</span>,
            renderCsv: (status) => status,
          },
          {
            id: 14,
            title: "Fulfilled By",
            dataIndex: "fulfilledBy",
            key: "fulfilledBy",
            render: (fulfilledBy) => <span>{fulfilledBy}</span>,
            renderCsv: (fulfilledBy) => fulfilledBy,
          },
        ]
      : [
          {
            id: 7,
            title: "Location",
            dataIndex: "location",
            key: "location",
            render: (location) => <span>{location}</span>,
            renderCsv: (location) => location,
          },
        ]),
  ];


  const filters = useMemo(() => {
    // Add null check for accounts
    const accountOptions = Array.isArray(accounts) 
      ? accounts.map((item) => ({
          label: item?.name,
          value: item?.id,
        }))
      : [];

    return [
      {
        key: "debitId",
        label: "Debit A/C",
        type: "select",
        options: accountOptions,
        className: "min-w-[100px] max-w-[150px]",
        popupClassName: "w-[200px]",
      },
      {
        key: "creditId",
        label: "Credit A/C",
        type: "select",
        options: accountOptions,
        className: "min-w-[100px] max-w-[150px]",
        popupClassName: "w-[200px]",
      },
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
  }, [accounts]);

  useEffect(() => {
    dispatch(loadAllAccount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadAllTransaction(pageConfig));
  }, [dispatch, pageConfig]);

  const onCalendarChange = (dates) => {
    if (dates && dates.length) {
      const startDate = dates[0].format("YYYY-MM-DD");
      const endDate = dates[1].format("YYYY-MM-DD");

      setPageConfig((prev) => ({
        ...prev,
        startDate,
        endDate,
      }));
    }
  };

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0"
      headClass="border-none"
      title={`${
        isTab1 === 1 ? "Online Transaction List" : "Offline Transaction List"
      }`}
      extra={
        <div className="flex gap-3 md:justify-end justify-between items-center">
          <RangePicker
            className="range-picker w-3/6"
            onCalendarChange={onCalendarChange}
            defaultValue={[
              dayjs(pageConfig.startDate, "YYYY-MM-DD"),
              dayjs(pageConfig.endDate, "YYYY-MM-DD"),
            ]}
          />
          <CreateDrawer
            width={35}
            permission={"create-transaction"}
            title={"Create Transaction"}
          >
            <AddTransaction />
          </CreateDrawer>
        </div>
      }
    >
     
        {isTab1 === 1 && (
          <TransactionTable
            list={list}
            total={total?._count?.id}
            columns={transactionColumns(true)} // For online transactions
            loading={loading}
            setPageConfig={setPageConfig}
            title={"Online Transaction"}
            filters={filters}
            isSearch
            isTab1={isTab1}
            handleTab1={setIsTab1}
          />
        )}
        {isTab1 === 2 && (
          <TransactionTable
            list={list}
            total={total?._count?.id}
            columns={transactionColumns(false)} // For offline transactions
            loading={loading}
            setPageConfig={setPageConfig}
            title={"Offline Transaction"}
            filters={filters}
            isSearch
            isTab1={isTab1}
            handleTab1={setIsTab1}
          />
        )}
    
    </Card>
  );
};

export default GetAllTransaction;
