import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import { loadAllShiftPaginated } from "../../redux/rtk/features/shift/shiftSlice";
import ViewBtn from "../Buttons/ViewBtn";
import CreateDrawer from "../CommonUi/CreateDrawer";
import TableComponent from "../CommonUi/TableComponent";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";
import AddShift from "./AddShift";

const GetAllShift = () => {
  const dispatch = useDispatch();
  const { list, total, loading } = useSelector((state) => state.shift);
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
      render: (id) => <Link to={`/admin/shift/${id}`}>{id}</Link>,
      renderCsv: (id) => id,
    },
    {
      id: 2,
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, { id }) => <Link to={`/admin/shift/${id}`}>{name}</Link>,
      renderCsv: (name) => name,
    },
    {
      id: 3,
      title: "Work Hour",
      dataIndex: "workHour",
      key: "workHour",
      render: (workHour) => `${workHour} Hours`,
      renderCsv: (workHour) => `${workHour} Hours`,
    },
    {
      id: 5,
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      render: (startTime) => dayjs(`2023-11-22T${startTime}`).format("h:mm A"),
      renderCsv: (startTime) =>
        dayjs(`2023-11-22T${startTime}`).format("h:mm A"),
    },
    {
      id: 4,
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: (endTime) => dayjs(`2023-11-22T${endTime}`).format("h:mm A"),
      renderCsv: (endTime) => dayjs(`2023-11-22T${endTime}`).format("h:mm A"),
    },
    {
      id: 6,
      title: "Action",
      dataIndex: "id",
      key: "Action",
      render: (id) => (
        <div className='flex items-center gap-3'>
          <UserPrivateComponent permission={"update-shift"}>
            <ViewBtn path={`/admin/shift/${id}`} />
          </UserPrivateComponent>
        </div>
      ),
      csvOff: true,
    },
  ];
  useEffect(() => {
    dispatch(loadAllShiftPaginated(pageConfig));
  }, [dispatch, pageConfig]);

  return (
    <Card
      className="max-md:border-0 max-md:bg-white"
      bodyClass="max-md:p-0 "
      headClass="border-none"
      title={"Shift List"}
      extra={
        <CreateDrawer
          permission={"create-shift"}
          title={"Create Shift"}
          width={35}
        >
          <AddShift />
        </CreateDrawer>
      }
    >
      <UserPrivateComponent permission={"readAll-shift"}>
        <TableComponent
          total={total}
          columns={columns}
          list={list}
          loading={loading}
          setPageConfig={setPageConfig}
          title={"Shift List"}
        />
      </UserPrivateComponent>
    </Card>
  );
};

export default GetAllShift;
