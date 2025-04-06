import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import { loadAllDepartmentPaginated } from "../../redux/rtk/features/department/departmentSlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddDepartment from "./AddDepartment";

const GetAllDepartment = () => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.department);
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
      render: (id) => <Link to={`/admin/department/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => (
        <Link to={`/admin/department/${id}`}>{name}</Link>
      ),
      renderCsv: (name) => name,
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
      title: "Action",
      key: "Action",
      dataIndex: "id",
      render: (id) => (
        <div className='flex items-center gap-3'>
          <UserPrivateComponent permission={"update-department"}>
            <ViewBtn path={`/admin/department/${id}`} />
          </UserPrivateComponent>
        </div>
      ),
      csvOff: true,
    },
  ];
  useEffect(() => {
    dispatch(loadAllDepartmentPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <Card
      className='max-md:border-0 max-md:bg-white'
      bodyClass='max-md:p-0 '
      headClass='border-none'
      title={"Departments"}
      extra={
        <CreateDrawer
          permission={"create-department"}
          title={"Create Department"}
          width={35}
        >
          <AddDepartment />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-department"}>
        <TableComponent
          total={total}
          columns={columns}
          list={list}
          loading={loading}
          setPageConfig={setPageConfig}
          title={"Department List"}
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllDepartment;
