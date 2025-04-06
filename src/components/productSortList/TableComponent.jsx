import Button from "@/UI/Button";
import CSV from "@/UI/CSV";
import Menu from "@/UI/Menu";
import Pagination from "@/UI/Pagination";
import { Popover, Table, Select } from "antd";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import PrintPdf from "../CommonUi/PrintPdf";
import CommonSearch from "../CommonUi/CommonSearch";
import Filter from "../CommonUi/Filter";
import { useSelector, useDispatch } from "react-redux";
import { loadAllProductCategory } from "../../redux/rtk/features/productCategory/productCategorySlice";

const TableComponent = ({
  columns,
  list,
  total,
  loading,
  paginatedThunk,
  children,
  filters,
  title,
  setPageConfig,
  isSearch,
  loadingUiSize = 10,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const fetchData = (page, count) => {
    setPageConfig((prev) => {
      return { ...prev, page, count };
    });
  };

  const dispatch = useDispatch();
  const category = useSelector((state) => state.productCategories?.list);

  useEffect(() => {
    dispatch(loadAllProductCategory());
  }, [dispatch]);

  // column select
  const [columnsToShow, setColumnsToShow] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setColumnsToShow(columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columnsToShowHandler = (val) => {
    setColumnsToShow(val);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter(e.target.value.toLowerCase());
  };

  // let filteredProducts = list.filter((property) => {
  //   return Object.keys(property).some((key) => {
  //     const value = property[key];
  //     return (
  //       value !== null &&
  //       value !== undefined &&
  //       value.toString().toLowerCase().includes(filter.toString().toLowerCase())
  //     );
  //   });
  // });

  const filteredProducts = list.filter((item) => {
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    const matchesSearch =
      !filter ||
      Object.values(item).some(
        (val) => val && val.toString().toLowerCase().includes(filter)
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="mt-2">
        <div className="w-full dark:text-yellow-50 flex flex-wrap gap-2 items-center flex-col-reverse sm:flex-row  justify-between mb-3">
          <div className="flex flex-wrap lg:flex-nowrap gap-2 w-full md:w-auto">
            {isSearch && (
              <div className="w-full sm:w-[250px]">
                {/* <CommonSearch setPageConfig={setPageConfig} /> */}
                <CommonSearch onChange={handleSearch} filter={filter} />
              </div>
            )}
            <div className="hideScrollBar overflow-x-auto overflow-y-hidden w-full">
              <Filter setPageConfig={setPageConfig} filters={filters} />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* <ColVisibilityDropdown
              options={columns}
              columns={columns}
              columnsToShowHandler={columnsToShowHandler}
            /> */}
            <div className="flex items-center gap-2">
              <Select
                name="category"
                className="w-44"
                loading={!category}
                showSearch
                placeholder="Filter by Category"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.children?.toLowerCase().includes(input.toLowerCase())
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.children || '').toLowerCase().localeCompare((optionB?.children || '').toLowerCase())
                }
                onChange={handleCategoryChange}
                allowClear
              >
                {category &&
                  category.map((cat) => (
                    <Select.Option key={cat.id} value={cat.name}>
                      {cat.name}
                    </Select.Option>
                  ))}
              </Select>
            </div>
            <Popover
              content={
                <Menu
                  items={[
                    {
                      key: "1",
                      label: (
                        <PrintPdf
                          list={list}
                          columns={columns}
                          title={"Shortage Products"}
                        />
                      ),
                    },
                    {
                      key: "2",
                      label: (
                        <CSV
                          notButton={true}
                          list={list}
                          columns={columns}
                          title={"Shortage Products"}
                        />
                      ),
                    },
                  ]}
                />
              }
              placement="bottomRight"
              arrow={false}
              trigger="click"
            >
              <Button
                color={"gray"}
                icon={<BsThreeDotsVertical size={15} />}
                className="px-2"
              ></Button>
            </Popover>
          </div>
        </div>
      </div>

      <Table
        loading={loading}
        columns={columnsToShow}
        dataSource={
          !!list?.length &&
          list
            .filter((item) => item.quantity <= 5)
            .map((item) => ({ ...item, key: item?.item_code }))
        }
        pagination={false}
        scroll={{ x: 1000, y: window.innerHeight - 319 }}
      />

      <div className="flex justify-center mt-3">
        {total >= 11 && <Pagination onChange={fetchData} total={total} />}
      </div>
      {children && children}
    </>
  );
};
export default TableComponent;
