import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteColor,
  loadColorPaginated,
} from "../../redux/rtk/features/color/colorSlice";

import { useState } from "react";
import Card from "../../UI/Card";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddProductColor from "./addProductColor";
import UpdateProductColor from "./updateProductColor";

const GetAllProductColor = (props) => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.colors);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      id: 2,
      title: "Color code",
      dataIndex: "colorCode",
      key: "colorCode",
    },
    {
      id: 3,
      title: "",
      dataIndex: "",
      key: "action",
      render: ({ name, colorCode, id }) => [
        {
          label: (
            <UserPrivateComponent permission='update-color'>
              <UpdateProductColor data={{ name, colorCode }} id={id} />
            </UserPrivateComponent>
          ),
          key: "edit",
        },
        {
          label: (
            <CommonDelete
              permission={"delete-color"}
              deleteThunk={deleteColor}
              id={id}
              title='Hide'
              loadThunk={loadColorPaginated}
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];
  const filters = [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Show", value: "true" },
        { label: "Hide", value: "false" },
      ],
      className: "min-w-[85px] max-w-[150px]",
      popupClassName: "w-[200px]",
    },
  ];

  useEffect(() => {
    dispatch(loadColorPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Product Color"}
      extra={
        <CreateDrawer
          permission={"create-color"}
          title={"Create Color"}
          width={35}
        >
          <AddProductColor />
        </CreateDrawer>
      }
    >
      {" "}
      <UserPrivateComponent permission={"readAll-color"}>
        <TableComponent
          list={list}
          columns={columns}
          total={total}
          loading={loading}
          setPageConfig={setPageConfig}
          title={"Product Color List"}
          filters={filters}
          isSearch
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllProductColor;
