import { Tooltip } from "antd";
import { BiCartAdd, BiCartDownload } from "react-icons/bi";
import { FaMoneyBills } from "react-icons/fa6";
import { abbreviateNumber } from "../../../utils/nFormetter";
import useCurrency from "../../../utils/useCurrency";

const NewDashboardCard = ({ card, information }) => {
  const currency = useCurrency();
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5 mb-5">
      {/* <div className="ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 p-2 shadow-custom rounded-lg dashboard-card-bg">
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
              Total Sales{" "}
            </span>
          </Tooltip>
        </div>
      </div> */}
      <div className="ant-shadow w-full relative sm:p-2 dark:bg-[#2e2d35] flex sm:justify-center items-center md:p-6 p-2 shadow-custom rounded-lg dashboard-card-bg">
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
            <span className="block text-[#E7906B] text-2xl sm:text-3xl font-bold sm:text-center">
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
              Total Revenue{" "}
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
              <span className="block text-[#E7906B]  text-2xl sm:text-3xl font-bold sm:text-center">
                <span />
                {card?.uniqueProduct
                  ? abbreviateNumber(card?.uniqueProduct)
                  : 0}
              </span>
            </Tooltip>
            <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              {" "}
              Total Online Revenue
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
              <span className="block text-[#E7906B]  text-2xl sm:text-3xl font-bold sm:text-center">
                <span />
                {card?.uniqueProduct
                  ? abbreviateNumber(card?.uniqueProduct)
                  : 0}
              </span>
            </Tooltip>
            <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              {" "}
              Total POS Revenue
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
              <span className="block text-[#E7906B]  text-2xl sm:text-3xl font-bold sm:text-center">
                <span />
                {card?.uniqueProduct
                  ? abbreviateNumber(card?.uniqueProduct)
                  : 0}
              </span>
            </Tooltip>
            <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              {" "}
              Total inventory sales value
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
              <span className="block text-[#E7906B]  text-2xl sm:text-3xl font-bold sm:text-center">
                <span />
                {card?.uniqueProduct
                  ? abbreviateNumber(card?.uniqueProduct)
                  : 0}
              </span>
            </Tooltip>
            <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              {" "}
              Total Pay out
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
              <span className="block text-[#E7906B] text-2xl sm:text-3xl font-bold sm:text-center">
                <span />
                {card?.uniqueProduct
                  ? abbreviateNumber(card?.uniqueProduct)
                  : 0}
              </span>
            </Tooltip>
            <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              {" "}
              Pending Payout
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
              <span className="block text-[#E7906B] text-2xl sm:text-3xl font-bold sm:text-center">
                <span />
                {card?.uniqueProduct
                  ? abbreviateNumber(card?.uniqueProduct)
                  : 0}
              </span>
            </Tooltip>
            <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              {" "}
              Total Shortage Product
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
              <span className="block text-[#E7906B] text-2xl sm:text-3xl font-bold sm:text-center">
                <span />
                {card?.uniqueProduct
                  ? abbreviateNumber(card?.uniqueProduct)
                  : 0}
              </span>
            </Tooltip>
            <span className="uppercase sm:text-[14px] block font-semibold sm:font-bold sm:mt-2 dark:text-yellow-100 ">
              {" "}
              Wallet Balance
            </span>
          </Tooltip>
        </div>
      </div>
    </section>
  );
};

export default NewDashboardCard;
