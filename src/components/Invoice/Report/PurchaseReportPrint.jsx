import Button from "@/UI/Button";
import { decodeHtmlEntity } from "@/utils/functions";
import invoiceGenerator from "@/utils/invoiceGenerator";
import numberToWords from "@/utils/numberToWords";
import useCurrency from "@/utils/useCurrency";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

export default function PurchaseReportPrint({
  data,
  pageConfig,
  supplier,
  title,
  info,
  type,
  btnName,
}) {
  const { currencySymbol } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;
  const dispatch = useDispatch();
  const numberInText = numberToWords(
    Math.round(data?.totalAmount - data?.discount)
  );
  const currencyLocal = decodeHtmlEntity(currencySymbol);

  const bottomLeftContent = [];

  const bottomRightContent = [
    {
      label: "Total",
      value: `${currencyLocal}${
        info?.totalAmount ? info.totalAmount.toFixed(2) : 0
      }`,
    },
    {
      label: "Paid",
      value: `${currencyLocal}${
        info?.paidAmount ? info.paidAmount.toFixed(2) : 0
      }`,
    },
    {
      label: "Due",
      value: `${currencyLocal}${
        info?.dueAmount ? info.dueAmount.toFixed(2) : 0
      }`,
    },
    {
      label: "Discount",
      value: `${currencyLocal}${info?.discount ? info.discount.toFixed(2) : 0}`,
    },
    {
      label: "Return",
      value: `${currencyLocal}${
        info?.totalReturnAmount ? info.totalReturnAmount.toFixed(2) : 0
      }`,
    },
  ];
  const tableHead = [
    "Date",
    "Invoice",
    "Supplier",
    "Product ",
    "QTY",
    "Discount",
    "Return",
    "Total",
    "Paid",
    "Due",
  ];
  const tableBody = data.map((item) => [
    moment(item.date).format("YYYY-MM-DD"),
    item.id,
    item.supplier?.name,
    item.purchaseInvoiceProduct
      .map((product) => product?.product?.name)
      .join(",\n"),
    item.purchaseInvoiceProduct
      .map((product) => product.productQuantity)
      .join("\n"),
    `${currencyLocal}${item.discount ? item.discount : 0}`,
    `${currencyLocal}${item.returnAmount ? item.returnAmount : 0}`,
    `${currencyLocal}${item.totalAmount ? item.totalAmount : 0}`,
    `${currencyLocal}${item.paidAmount ? item.paidAmount : 0}`,
    `${currencyLocal}${item.dueAmount ? item.dueAmount : 0}`,
  ]);

  const customerInfo = [
    {
      value: `Supplier: ${supplier ? supplier : "All"}`,
      style: {
        bold: true,
        fontSize: 12,
      },
    },
  ];
  const TopRightInfo = [
    {
      value: `From Date: ${moment(pageConfig?.startDate).format("YYYY-MM-DD")}`,
    },
    {
      value: `To Date: ${moment(pageConfig?.endDate).format("YYYY-MM-DD")}`,
    },
  ];
  const settings = {
    jsPDF: {
      // orientation: "landscape"
    },
    tableFontSize: 8,
    infoTopFontSize: 10,
    bottomRightFontSize: 12,
    bottomLeftFontSize: 8,
    footerFontSize: 10,
  };
  return (
    <div className='flex gap-2'>
      <Button
        className='bg-primary flex justify-center items-center px-4 py-2 text-white rounded'
        onClick={() =>
          invoiceGenerator(type, {
            title,
            TopRightInfo,
            companyInfo,
            customerInfo,
            bottomLeftContent,
            bottomRightContent,
            tableBody,
            tableHead,
            settings,
          })
        }
      >
        {btnName}
      </Button>
    </div>
  );
}
