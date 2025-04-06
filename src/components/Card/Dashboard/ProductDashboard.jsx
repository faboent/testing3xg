import { Tooltip } from "antd";
import { BiCartAdd, BiCartDownload } from "react-icons/bi";
import { FaMoneyBills } from "react-icons/fa6";
import { abbreviateNumber } from "../../../utils/nFormetter";
import useCurrency from "../../../utils/useCurrency";
import { MdInventory2, MdOutlineInventory2 } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductDashboard = ({ card, information }) => {
  const currency = useCurrency();
  return (
    <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-5 mb-5">
      <div className="ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 p-2 bg-white shadow-custom rounded-lg dashboard-card-bg">
        <div className="sm:hidden inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-violet-600 bg-violet-100 rounded-lg mr-6">
          <FaCoins size={30} />
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
                {card?.inventorySalesValue.toFixed(3)}
              </span>
            }
          >
            <span className="block text-violet-600 text-2xl sm:text-3xl font-bold sm:text-center">
              {" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: currency?.currencySymbol,
                }}
              />
              {card?.inventorySalesValue
                ? abbreviateNumber(Number(card.inventorySalesValue))
                : 0}
            </span>
            <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2  dark:text-yellow-100 ">
              Inventory Sale Value{" "}
            </span>
          </Tooltip>
        </div>
      </div>
      <div className="ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 p-2 bg-white shadow-custom rounded-lg dashboard-card-bg">
        <div className="sm:hidden inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-blue-600 bg-blue-100 rounded-lg mr-6">
          <BiCartDownload size={30} />
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
                {information?.totalSaleAmount?.toFixed(3)}
              </span>
            }
          >
            <span className="block text-blue-600  text-2xl sm:text-3xl font-bold sm:text-center">
              {" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: currency?.currencySymbol,
                }}
              />
              {information?.totalSaleAmount
                ? abbreviateNumber(Number(information?.totalSaleAmount))
                : 0}
            </span>
            <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2  dark:text-yellow-100 ">
              Low Inventory
            </span>
          </Tooltip>
        </div>
      </div>
      <div className="ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 p-2 bg-white shadow-custom rounded-lg dashboard-card-bg">
        <div className="sm:hidden inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-violet-500 bg-violet-100 rounded-lg mr-6">
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
                {information?.totalSaleDue?.toFixed(3)}
              </span>
            }
          >
            <span className="block text-violet-500 text-2xl sm:text-3xl font-bold sm:text-center">
              <span
                dangerouslySetInnerHTML={{
                  __html: currency?.currencySymbol,
                }}
              />
              {information?.totalSaleDue
                ? abbreviateNumber(Number(information?.totalSaleDue))
                : 0}
            </span>

            <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2  dark:text-yellow-100 ">
              Out of Stock
            </span>
          </Tooltip>
        </div>
      </div>
      <div className="ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 p-2 bg-white shadow-custom rounded-lg dashboard-card-bg">
        <div className="sm:hidden inline-flex flex-shrink-0 items-center justify-center h-14 w-14 text-violet-500 bg-violet-100 rounded-lg mr-6">
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
                {information?.totalSaleDue?.toFixed(3)}
              </span>
            }
          >
            <span className="block text-violet-500 text-2xl sm:text-3xl font-bold sm:text-center">
              <span
                dangerouslySetInnerHTML={{
                  __html: currency?.currencySymbol,
                }}
              />
              {information?.totalSaleDue
                ? abbreviateNumber(Number(information?.totalSaleDue))
                : 0}
            </span>

            <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2  dark:text-yellow-100 ">
              Wallet Ballance
            </span>
          </Tooltip>
        </div>
      </div>
    </section>
  );
};

export default ProductDashboard;
