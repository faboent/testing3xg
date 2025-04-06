import Button from "@/UI/Button";
import CSV from "@/UI/CSV";
import Menu from "@/UI/Menu";
import { Form, Popover } from "antd";
import { useEffect, useState, useMemo, useCallback } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Pagination from "../../UI/Pagination";
import Table from "../../UI/Table";
import ColVisibilityDropdown from "../Shared/ColVisibilityDropdown";
import CommonSearch from "../CommonUi/CommonSearch";
import Filter from "../CommonUi/Filter";
import PrintPdf from "../CommonUi/PrintPdf";
import SelectOption from "./SelectOption";

const ProductCategoryTable = ({
  columns,
  list,
  total,
  loading,
  children,
  filters,
  title,
  setPageConfig,
  isSearch,
  loadingUiSize = 10,
  isTab1,
  handleTab1,
}) => {
  const [form] = Form.useForm();
  const [columnsToShow, setColumnsToShow] = useState(columns);
  const [selectedType, setSelectedType] = useState("");

  const fetchData = useCallback(
    (page, count) => {
      setPageConfig((prev) => ({ ...prev, page, count }));
    },
    [setPageConfig]
  );

  const handleSelectChange = useCallback(
    (value) => {
      const tabMap = {
        10: 1,
        20: 2,
        30: 3,
        40: 4,
        50: 5,
      };
      setSelectedType(value);
      handleTab1(tabMap[value]);
    },
    [handleTab1]
  );

  const menuItems = useMemo(
    () => [
      {
        key: "1",
        label: <PrintPdf list={list} columns={columns} title={title} />,
      },
      {
        key: "2",
        label: <CSV notButton list={list} columns={columns} title={title} />,
      },
    ],
    [list, columns, title]
  );

  useEffect(() => {
    setColumnsToShow(columns);
  }, [columns]);

  return (
    <>
      <div className="mt-2">
        <div className="w-full dark:text-yellow-50 flex flex-wrap gap-2 items-center flex-col-reverse sm:flex-row justify-between mb-3">
          <div className="flex flex-wrap lg:flex-nowrap gap-2 w-full md:w-auto">
            {isSearch && (
              <div className="w-full sm:w-[250px]">
                <CommonSearch setPageConfig={setPageConfig} />
              </div>
            )}
            <div className="hideScrollBar overflow-x-auto overflow-y-hidden w-full">
              <Filter setPageConfig={setPageConfig} filters={filters} />
            </div>
            <div className="ml-4">
              <SelectOption
                selectedType={selectedType}
                onTypeChange={handleSelectChange}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ColVisibilityDropdown
              options={columns}
              columns={columns}
              columnsToShowHandler={setColumnsToShow}
            />
            <Popover
              content={<Menu items={menuItems} />}
              placement="bottomRight"
              arrow={false}
              trigger="click"
            >
              <Button
                color="gray"
                icon={<BsThreeDotsVertical size={15} />}
                className="px-3"
              />
            </Popover>
          </div>
        </div>

        <Table
          loading={loading}
          columns={columnsToShow}
          data={list?.map((item) => ({ ...item, key: item?.id })) || []}
          scroll={{ y: window.innerHeight - 350 }}
          loadingUiSize={loadingUiSize}
        />
      </div>

      {total > 10 && (
        <div className="flex justify-center mt-3">
          <Pagination onChange={fetchData} total={total} />
        </div>
      )}

      {children}
    </>
  );
};

export default ProductCategoryTable;
