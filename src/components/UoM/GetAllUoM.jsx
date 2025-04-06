import { EditOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../UI/Card";
import {
  deleteUom,
  editUoM,
  loadAllUomPaginated,
} from "../../redux/rtk/features/uom/uomSlice";
import CommonDelete from "../CommonUi/CommonDelete";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddUoM from "./AddUoM";
import UpdateUoM from "./UpdateUoM";

export default function GetAllUoM() {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.uom);
  const [pageConfig, setPageConfig] = useState({
    page: 1,
    count: 10,
    status: "true",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      id: 3,
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
      renderCsv: (createdAt) => moment(createdAt).format("YYYY-MM-DD"),
    },
    {
      id: 4,
      title: "",
      key: "action",
      render: (item) => [
        {
          label: (
            <UserPrivateComponent permission={"update-department"}>
              <div
                onClick={() => {
                  dispatch(editUoM(item));
                  showModal();
                }}
                className='flex items-center gap-2 cursor-pointer'
              >
                <EditOutlined className='bg-gray-600 p-1 text-white rounded-md' />
                Edit
              </div>
            </UserPrivateComponent>
          ),
          key: "edit",
        },
        {
          label: (
            <CommonDelete
              permission={"delete-uom"}
              id={item.id}
              title={"Hide"}
              deleteThunk={deleteUom}
              loadThunk={loadAllUomPaginated}
            />
          ),
          key: "delete",
        },
      ],

      csvOff: true,
    },
  ];
  useEffect(() => {
    dispatch(loadAllUomPaginated(pageConfig));
  }, [dispatch, pageConfig]);
  return (
    <>
      <Card
        className="max-md:border-0 max-md:bg-white"
        bodyClass="max-md:p-0 "
        headClass="border-none"
        title={"UoM List"}
        extra={
          <CreateDrawer
            permission={"create-uom"}
            title={"Create UoM"}
            width={35}
          >
            <AddUoM />
          </CreateDrawer>
        }
      >
        <UserPrivateComponent permission={"readAll-uom"}>
          <TableComponent
            total={total}
            columns={columns}
            list={list}
            loading={loading}
            setPageConfig={setPageConfig}
            title={"UoM List"}
          />
        </UserPrivateComponent>
      </Card>
      <Modal
        title="Update UoM"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <UpdateUoM handleCancel={handleCancel} />
      </Modal>
    </>
  );
}
