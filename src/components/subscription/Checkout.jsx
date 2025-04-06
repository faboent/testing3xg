import React, { useState } from "react";
import { Button, Form, Radio } from "antd";
import PaystackPop from "@paystack/inline-js";

const subscriptionPlan = {
  basic: 0,
  standard: 20000,
  premium: 50000,
};

const Checkout = () => {
  const [selectedPlan, setSelectedPlan] = useState("basic");
  const [paymentComplete, setPaymentComplete] = useState(false);

  const initializePaystack = () => {
    const publicKey = "pk_test_c13c9b99fe274eb22cdc922634d2f526ec4e8bc6";
    const amount = subscriptionPlan[selectedPlan] * 100; // Amount in kobo

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: publicKey,
      email: "taiwo.o@3xg.africa",
      amount,
      currency: "NGN",
      onSuccess: (transaction) => {
        console.log(
          `Payment successful with transaction reference: ${transaction.reference}`
        );
        alert(
          `Payment successful with transaction reference: ${transaction.reference}`
        );

        localStorage.setItem("paymentReference", transaction.reference);
        setPaymentComplete(true);
      },
      onClose: () => {
        console.log("Payment failed, please try again");
        alert("Payment failed, please try again");
      },
    });
  };

  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
    setPaymentComplete(false); // Reset payment state on plan change
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
        <Form layout="vertical">
          <Form.Item
            label="Select Subscription Plan"
            name="subscription"
            rules={[
              { required: true, message: "Please select a subscription plan!" },
            ]}
          >
            <Radio.Group
              className="flex flex-col"
              onChange={handlePlanChange}
              value={selectedPlan}
            >
              <Radio value="basic">
                ₦
                {subscriptionPlan.basic.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
                /y (Basic)
              </Radio>
              <Radio value="standard">
                ₦
                {subscriptionPlan.standard.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
                /y (Standard)
              </Radio>
              <Radio value="premium">
                ₦
                {subscriptionPlan.premium.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
                /y (Premium)
              </Radio>
            </Radio.Group>
          </Form.Item>
          {selectedPlan !== "basic" ? (
            <Form.Item>
              <Button
                type="primary"
                className="w-full"
                onClick={initializePaystack}
              >
                Complete Purchase
              </Button>
            </Form.Item>
          ) : (
            <Form.Item>
              <Button type="default" className="w-full" href="/admin">
                Proceed to Merchant Page
              </Button>
            </Form.Item>
          )}
          {paymentComplete && (
            <Form.Item>
              <Button type="default" className="w-full" href="/admin">
                Proceed to Merchant Page
              </Button>
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Checkout;
