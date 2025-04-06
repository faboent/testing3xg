import axios from "axios";

export const addReturnPurchase = async (values) => {
  try {
    const { data } = await axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      url: `return-purchase-invoice/`,
      data: {
        ...values,
      },
    });
    return "success";
  } catch (error) {
  }
};
