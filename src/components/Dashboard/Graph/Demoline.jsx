import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDashboard,
  loadDashboardData,
} from "../../../redux/rtk/features/dashboard/dashboardSlice";
import EcommerceDashboard from "../../Card/Dashboard/EcommerceDashboard";
import NewDashboardCard from "../../Card/Dashboard/NewDashboardCard";
import ProductDashboard from "../../Card/Dashboard/ProductDashboard";
import ProductCard from "@/components/product/ProductCard";
import ProductTypeDashboard from "@/components/Card/Dashboard/ProductTypeDashboard";

const DemoLine = ({ pageConfig, data }) => {
  const { list, loading, total, card } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const cardInformation = useSelector((state) => state.dashboard.info);

  useEffect(() => {
    dispatch(loadDashboardData(pageConfig));

    return () => {
      dispatch(clearDashboard());
    };
  }, [dispatch, pageConfig]);

  return (
    <>
      {/* {data?.dashboardType === "e-commerce" ? (
        <>
          <EcommerceDashboard information={cardInformation} />
          <ProductDashboard information={cardInformation} />
        </>
      ) : ( */}
      <>
        <NewDashboardCard information={cardInformation} />
        {/* <ProductDashboard card={card} />
        <ProductTypeDashboard /> */}
      </>
      {/* )} */}
    </>
  );
};

export default DemoLine;
