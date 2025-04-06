import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";

const Help = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl p-6 text-center">
        <h1 className="text-xl font-semibold mb-4">3XG Help & Support</h1>

        <p className="mb-4 text-gray-600">
          Need help? You can chat with the 3XG admin for support and assistance
          using the support chat located at the bottom right corner of the app.
        </p>

        <h2 className="text-lg font-semibold mt-4">Getting Started</h2>
        <ul className="list-none pl-0">
          <li>How to create an account</li>
          <li>How to log in and log out</li>
          <li>Setting up your profile</li>
        </ul>

        <h2 className="text-lg font-semibold mt-4">Product Management</h2>
        <ul className="list-none pl-0">
          <li>How to add a new product</li>
          <li>How to edit or delete a product</li>
          <li>Understanding product categories</li>
        </ul>

        <h2 className="text-lg font-semibold mt-4">Order Management</h2>
        <ul className="list-none pl-0">
          <li>How to view and manage orders</li>
          <li>Updating order status</li>
          <li>Handling returns and refunds</li>
        </ul>

        <h2 className="text-lg font-semibold mt-4">Payments & Earnings</h2>
        <ul className="list-none pl-0">
          <li>How to set up payment details</li>
          <li>Understanding commission and fees</li>
          <li>How and when payouts are processed</li>
        </ul>

        <h2 className="text-lg font-semibold mt-4">Shipping & Delivery</h2>
        <ul className="list-none pl-0">
          <li>How to set shipping options</li>
          <li>Managing delivery timelines</li>
          <li>Partnering with logistics services</li>
        </ul>

        <h2 className="text-lg font-semibold mt-4">Customer Support</h2>
        <ul className="list-none pl-0">
          <li>How to handle customer inquiries</li>
          <li>Best practices for resolving disputes</li>
          <li>Contacting platform support</li>
        </ul>

        <h2 className="text-lg font-semibold mt-4">Policies & Guidelines</h2>
        <ul className="list-none pl-0">
          <li>Seller terms and conditions</li>
          <li>Product listing guidelines</li>
          <li>Fraud prevention tips</li>
        </ul>

        <h2 className="text-lg font-semibold mt-4">Marketing & Promotions</h2>
        <ul className="list-none pl-0">
          <li>How to run discounts and promotions</li>
          <li>Optimizing product listings for better sales</li>
          <li>Using analytics to track performance</li>
        </ul>

        <Button
          type="primary"
          className="mt-4"
          onClick={() => navigate("/admin")}
        >
          Go to Dashboard
        </Button>
      </Card>
    </div>
  );
};

export default Help;
