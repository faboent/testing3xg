import { EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../UI/Card";
import {
  deleteVatTax,
  editVatTax,
  loadAllVatTaxPaginated,
  loadVatTaxStatement,
} from "../../redux/rtk/features/vatTax/vatTaxSlice";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import VatTaxUpdate from "./VatTaxUpdate";
import AddVatTax from "./addVatTax";

const GetAllVatTax = () => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.vatTax);
  const information = useSelector((state) => state.vatTax.statement);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      id: 1,
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      id: 3,
      title: "Percentage",
      dataIndex: "percentage",
      key: "percentage",
      render: (percentage) => `${percentage}%`,
      renderCsv: (percentage) => `${percentage}%`,
    },
    {
      id: 4,
      title: "Country",
      dataIndex: "country",
      key: "percentage",
      render: (country) => `${country}%`,
      renderCsv: (country) => `${country}%`,
    },
    {
      id: 5,
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
      renderCsv: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
    },
    {
      id: 6,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <UserPrivateComponent permission={"update-vat"}>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  dispatch(editVatTax(item));
                  showModal();
                }}
              >
                <EditOutlined className="bg-gray-600 p-1 text-white rounded-md" />
                Edit
              </div>
            </UserPrivateComponent>
          ),
          key: "edit",
        },
        {
          label: (
            <CommonDelete
              permission={"delete-vat"}
              deleteThunk={deleteVatTax}
              id={item.id}
              title="Hide"
              loadThunk={loadAllVatTaxPaginated}
              query={{ status: true, page: 1, count: 10 }}
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
    dispatch(loadVatTaxStatement());
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadAllVatTaxPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <>
      {/* <VatStatementCards information={information} /> */}
      <Card
        className='max-md:border-0 max-md:bg-white'
        bodyClass='max-md:p-0 '
        headClass='border-none'
        title={"Vat tax List"}
        extra={
          <CreateDrawer
            permission={"create-vat"}
            title={"Create Vat Type"}
            width={35}
          >
            <AddVatTax />
          </CreateDrawer>
        }
      >
        <UserPrivateComponent permission={"readAll-vat"}>
          <TableComponent
            total={total}
            columns={columns}
            list={list}
            loading={loading}
            setPageConfig={setPageConfig}
            title={"Vat Tax List"}
            filters={filters}
            isSearch
          />
        </UserPrivateComponent>
      </Card>
      <Modal
        title='Update vat/tax type'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <VatTaxUpdate handleCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default GetAllVatTax;
