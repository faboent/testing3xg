import { Input } from "antd";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function CommonSearch({ onChange, filter }) {
  const [inputValue, setInputValue] = useState("");

  // const onSearchChange = (e) => {
  //   if (e.target.value === "") {
  //     setPageConfig((prev) => {
  //       return prev.key ? { page: 1, count: 10 } : prev;
  //     });
  //   }
  //   setInputValue(e.target.value);
  // };

  // const onSearch = () => {
  //   if (inputValue !== "") {
  //     setPageConfig((prev) => {
  //       return {
  //         ...prev,
  //         key: inputValue,
  //       };
  //     });
  //   }
  // };

  return (
    <div className="common-search w-full sm:w-[250px]">
      <style>
        {`
          .ant-input-search .ant-input:focus,
          .ant-input-search .ant-input:hover {
            border-color: #f97316 !important;
          }
          .ant-input-search .ant-input-search-button:hover {
            border-color: #f97316 !important;
          }
          .ant-input-search .ant-input {
            box-shadow: none !important;
          }
          .ant-input-search .ant-input:focus {
            box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.1) !important;
          }
        `}
      </style>
      <Input.Search
        className="h-[32px] w-full"
        size="small"
        placeholder="Search"
        onChange={onChange}
        value={filter}
        enterButton={
          <button className="w-[35px] h-[32px] bg-orange-500 text-white rounded-r">
            <BiSearch className="w-full" />
          </button>
        }
      />
    </div>
  );
}
