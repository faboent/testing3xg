import { getSetting } from "@/redux/rtk/features/setting/settingSlice";
import { decodeHtmlEntity } from "@/utils/functions";
import invoiceGenerator from "@/utils/invoiceGenerator";
import numberToWords from "@/utils/numberToWords";
import useCurrency from "@/utils/useCurrency";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function NewSaleReturnInvoice({ data, title }) {
  const { currencySymbol, currencyName } = useCurrency() || {};
  const companyInfo = useSelector((state) => state?.setting?.data) || null;
  const dispatch = useDispatch();
  const customerInfo = [
    {
      value: `Customer: ${
        data?.saleInvoice?.customer?.username
          ? data?.saleInvoice?.customer?.username
          : "-"
      }`,
    },
    {
      value: `Sale Invoice Id: ${
        data?.saleInvoiceId ? data?.saleInvoiceId : "-"
      }`,
    },
  ];

  const TopRightInfo = [
    {
      value: `Invoice No: ${data?.id ? data?.id : "-"}`,
    },
    {
      value: `Invoice Date: ${moment(data?.date).format("YYYY-MM-DD")}`,
    },
  ];
  const numberInText = numberToWords(
    Math.round(data.totalAmount + (data.tax ? data.tax : 0))
  );

  const currencyLocal = decodeHtmlEntity(currencySymbol);

  const bottomLeftContent = [
    {
      label: "IN WORDS: ",
      value: `${numberInText.toUpperCase()} ${currencyName}` || "",
    },
    {
      label: "Terms And Conditions: ",
      value: data.termsAndConditions ? data.termsAndConditions : "",
    },
    { label: "Notes: ", value: data.note ? data.note : "" },
  ];

  const bottomRightContent = [
    {
      label: "Total:",
      value: `${currencyLocal}${data.totalAmount ? data.totalAmount : 0}`,
    },
    {
      label: "Tax Amount:",
      value: `${currencyLocal}${data.tax ? data.tax : 0}`,
    },
    {
      label: "Ground Total:",
      value: `${currencyLocal}${data.totalAmount + (data.tax ? data.tax : 0)}`,
    },
  ];

  const tableHead = [
    "SI",
    "Product Description",
    "Quantity",
    "Sale Price",
    "Total Price",
    "Total Tax",
  ];

  const tableBody = data.returnSaleInvoiceProduct.map((item) => [
    item.id,
    item.product.name,
    item.productQuantity,
    `${currencyLocal} ${item.productUnitSalePrice}`,
    `${currencyLocal} ${item.productUnitSalePrice * item.productQuantity}`,
    `${currencyLocal} ${item.taxAmount}`,
  ]);

  const settings = {
    jsPDF: {
      // orientation: "landscape"
    },
    tableFontSize: 10,
    infoTopFontSize: 10,
    bottomRightFontSize: 10,
    bottomLeftFontSize: 8,
    footerFontSize: 10,
  };
  useEffect(() => {
    !companyInfo && dispatch(getSetting());
  }, [dispatch, companyInfo]);
  return (
    <div className="">
      <button
        className="bg-primary flex justify-center items-center px-4 py-[10px] text-white rounded"
        onClick={() =>
          invoiceGenerator("print", {
            title,
            TopRightInfo,
            companyInfo,
            customerInfo,
            bottomLeftContent,
            bottomRightContent,
            tableBody,
            tableHead,
            settings,
            leftBottomSecondColumnX : 32
          })
        }
      >
        Print Invoice
      </button>
    </div>
  );
}
