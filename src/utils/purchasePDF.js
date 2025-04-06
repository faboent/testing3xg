
import "jspdf-autotable";
import moment from "moment";
import { decodeHtmlEntity } from "./functions";
import invoiceGenerator from "./invoiceGenerator";
import numberToWords from "./numberToWords";

export default function purchasePDF(data, companyInfo ,title ,currencySymbol) {

  const numberInText = numberToWords(
    Math.round(data.totalAmount - data.discount)
  );

  const currencyLocal = decodeHtmlEntity(currencySymbol);

  const bottomLeftContent = [
    { label: "In Words: ", value: numberInText || "" },
    {
      label: "Terms And Conditions: ",
      value: data.termsAndConditions ? data.termsAndConditions : "",
    },
    { label: "Notes: ", value: data.note ? data.note : "" },
  ];
  const bottomRightContent = [
    { label: "Sub Total:", value: `${currencyLocal} ${data.totalAmount}` },
    {
      label: "Discount: (-)",
      value: `${currencyLocal} ${data.discount ? data.discount : 0}`,
    },
    {
      label: "Grand total:",
      value: `${currencyLocal} ${
        data.totalAmount - (data.discount ? data.discount : 0)
      }`,
    },
    {
      label: "Paid:",
      value: `${currencyLocal} ${data.paidAmount}`,
    },
    {
      label: "Due:",
      value: `${currencyLocal} ${data.dueAmount}`,
    },
  ];

  const tableHead = [
    "SI",
    "Product Description",
    "Quantity",
    "Unit Price",
    "Total Price",
  ];

  const tableBody = data.purchaseInvoiceProduct.map((item) => [
    item.id,
    item.product.name,
    item.productQuantity,
    `${currencyLocal} ${item.productUnitPurchasePrice}`,
    `${currencyLocal} ${item.productUnitPurchasePrice * item.productQuantity}`,
  ]);
  const customerInfo = [
    {
      value: `Client Id: ${data?.supplierId}`,
    },
    {
      value: `Client Name: ${data?.supplier?.name}`,
    },
    {
      value: `Address: ${data?.supplier?.address}`,
    },
    {
      value: `Contact No: ${data?.supplier?.phone}`,
    },
  ];
  const TopRightInfo = [
    {
      value: `Invoice No: ${data?.id}`,
    },
    {
      value: `Invoice Date: ${moment(data?.date).format("YYYY-MM-DD")}`,
    },
  ];
 const settings = {
   jsPDF: {
     // orientation: "landscape"
   },
   tableFontSize: 10,
   infoTopFontSize: 10,
   bottomRightFontSize: 10,
   bottomLeftFontSize: 7,
   footerFontSize: 10,
  };
  
  return invoiceGenerator(null, {
            title,
            TopRightInfo,
            customerInfo,
            companyInfo,
            bottomLeftContent,
            bottomRightContent,
            tableBody,
            tableHead,
            settings
          })
}
