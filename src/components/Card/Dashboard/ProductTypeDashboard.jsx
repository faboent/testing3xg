import { Tooltip } from "antd";
import { BiCartAdd, BiCartDownload } from "react-icons/bi";
import { FaMoneyBills } from "react-icons/fa6";
import { abbreviateNumber } from "../../../utils/nFormetter";
import useCurrency from "../../../utils/useCurrency";
import { MdInventory2, MdOutlineInventory2 } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductTypeDashboard = ({ card, information }) => {
  const currency = useCurrency();
  return (
    <section className="grid sm:grid-cols-4 xl:grid-cols-3 gap-6 mt-5 mb-5">
      <div className="ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 p-2  shadow-custom rounded-lg dashboard-card-bg">
        <div className="sm:hidden inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-violet-600 bg-violet-100 rounded-lg mr-6">
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
                {information?.totalPurchaseDue?.toFixed(3)}
              </span>
            }
          >
            <Tooltip
              title={<span className="text-lg">{card?.uniqueProduct}</span>}
            >
              <span className="block text-blue-600 text-2xl sm:text-3xl font-bold sm:text-center">
                <span />
                {card?.uniqueProduct
                  ? abbreviateNumber(card?.uniqueProduct)
                  : 0}
              </span>
            </Tooltip>
            <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              {" "}
              Store Rating
            </span>
          </Tooltip>
        </div>
      </div>

      <div className="ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 p-2  shadow-custom rounded-lg dashboard-card-bg">
        <div className="sm:hidden inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-violet-600 bg-violet-100 rounded-lg mr-6">
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
                {information?.totalPurchaseDue?.toFixed(3)}
              </span>
            }
          >
            <Tooltip
              title={<span className="text-lg">{card?.uniqueProduct}</span>}
            >
              <span className="block text-blue-600 text-2xl sm:text-3xl font-bold sm:text-center">
                <span />
                {card?.uniqueProduct
                  ? abbreviateNumber(card?.uniqueProduct)
                  : 0}
              </span>
            </Tooltip>
            <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              {" "}
              Order Fulfillment
            </span>
          </Tooltip>
        </div>
      </div>

      <div className="ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 p-2  shadow-custom rounded-lg dashboard-card-bg">
        <div className="sm:hidden inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-violet-600 bg-violet-100 rounded-lg mr-6">
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
                {information?.totalPurchaseDue?.toFixed(3)}
              </span>
            }
          >
            <span className="block text-violet-600 text-2xl sm:text-3xl font-bold sm:text-center">
              {information?.totalPurchaseDue
                ? abbreviateNumber(information?.totalPurchaseDue)
                : 0}{" "}
              %
            </span>
            <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              {" "}
              Positive Review
            </span>
          </Tooltip>
        </div>
      </div>
    </section>
  );
};

export default ProductTypeDashboard;
