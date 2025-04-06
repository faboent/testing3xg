import { Card } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadAllEmployeeStatusPaginated } from "../../redux/rtk/features/employeeStatus/employeeStatusSlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddEmploymentStatus from "./AddEmploymentStatus";

export default function GetEmploymentStatus() {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector(
    (state) => state.employmentStatus
  );
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
      render: (id) => <Link to={`/admin/employment-status/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => (
        <Link to={`/admin/employment-status/${id}`}>{name}</Link>
      ),
      renderCsv: (name) => name,
    },
    {
      id: 3,
      title: "Color Code",
      dataIndex: "colourValue",
      key: "colourValue",
      render: (colourValue) => (
        <div className='flex'>
          <div
            className='rounded border border-gray-200'
            style={{
              marginRight: "10px",
              width: "20px",
              height: "20px",
              backgroundColor: colourValue,
            }}
          ></div>
          {colourValue}
        </div>
      ),
      renderCsv: (colourValue) => colourValue,
    },
    {
      id: 4,
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      id: 5,
      title: "Action",
      dataIndex: "id",
      key: "Action",
      render: (id) => (
        <div className='flex items-center gap-3'>
          <UserPrivateComponent permission={"update-employmentStatus"}>
            <ViewBtn path={`/admin/employment-status/${id}`} />
          </UserPrivateComponent>
        </div>
      ),
      csvOff: true,
    },
  ];
  useEffect(() => {
    dispatch(loadAllEmployeeStatusPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <>
      <Card
        className="border-0 md:border md:p-6 bg-transparent md:bg-[#fafafa]"
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between pb-3">
          <h1 className="text-lg font-bold mb-3 ms:mb-0">
            Employment Status List
          </h1>
          <div className="flex justify-between md:justify-start gap-3 items-center">
            <CreateDrawer
              permission={"create-employmentStatus"}
              title={"Create Employment Status"}
              width={35}
            >
              <AddEmploymentStatus />
            </CreateDrawer>
          </div>
        </div>
        <UserPrivateComponent permission={"readAll-employmentStatus"}>
          <TableComponent
            total={total}
            columns={columns}
            list={list}
            loading={loading}
            setPageConfig={setPageConfig}
            title={"Employment Status List"}
          />
        </UserPrivateComponent>
      </Card>
      {/* <Modal
        title="Update vat/tax type"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <VatTaxUpdate handleCancel={handleCancel} />
      </Modal> */}
    </>
  );
}
