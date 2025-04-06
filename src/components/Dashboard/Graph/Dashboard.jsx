import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import moment from "moment";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import QuickLink from "../../../layouts/QuickLink";
import Content from "../RecentContent/Content";
import InventoryContent from "../RecentContent/InventoryContent";
import DemoLine from "./Demoline";
import Footer from "../../../layouts/Footer";
import OrderSummary from "../OrderSummary/OrderSummary";
import LatestOrder from '../LatestOrder/LatestOrder';
import StatisticsCards from "../StatisticsCards/StatisticsCards";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state?.setting) || {};
  const [pageConfig, setPageConfig] = useState({
    count: 5,
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
  });

  let card;
  if (loading) {
    card = (
      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-5 mb-5">
        <div className="ant-shadow w-full h-[70px] md:h-[120px]  bg-slate-100 animate-pulse rounded-lg "></div>
        <div className="ant-shadow w-full h-[70px] md:h-[120px]  bg-slate-100 animate-pulse rounded-lg "></div>
        <div className="ant-shadow w-full h-[70px] md:h-[120px]  bg-slate-100 animate-pulse rounded-lg "></div>
        <div className="ant-shadow w-full h-[70px] md:h-[120px]  bg-slate-100 animate-pulse rounded-lg "></div>
      </section>
    );
  } else if (data && !loading) {
    card = <DemoLine pageConfig={pageConfig} data={data} />;
  } else if (!data && !loading) {
    card = <DemoLine pageConfig={pageConfig} data={data} />;
  }

  const [isWelcomeModalVisible, setIsWelcomeModalVisible] = useState(false);

  useEffect(() => {
    const firstTimeUser = Cookies.get("firstTimeUser");
    if (!firstTimeUser) {
      setIsWelcomeModalVisible(true);
    }
  }, []);

  const handleWelcomeModalClose = () => {
    Cookies.set("firstTimeUser", "true", { expires: 365 });
    setIsWelcomeModalVisible(false);
    navigate("/admin/guide");
  };
  return (
    <>

      <div className="mb-5">
        <StatisticsCards loading={loading} data={data} />
      </div>
      <div className="mb-5">
        <OrderSummary />
      </div>
      <div className="mb-5">
        <LatestOrder />
      </div>
      {/* <div className="mb-5">
        <Content pageConfig={pageConfig} />
      </div> */}

      <Modal
        title="Welcome to 3XG Seller App!"
        open={isWelcomeModalVisible}
        onCancel={handleWelcomeModalClose}
        footer={[
          <Button key="ok" type="primary" onClick={handleWelcomeModalClose}>
            Get Started
          </Button>,
        ]}
      >
        <p>
          We're excited to have you on board! Explore and enjoy your experience.
        </p>
      </Modal>

      <Footer data={data} />
    </>
  );
};

export default Dashboard;
