import { cn } from "@/utils/functions";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import UserPrivateComponent from "../PrivacyComponent/UserPrivateComponent";

export default function CommonDelete({
  permission,
  title,
  deleteThunk,
  id,
  navigatePath,
  className,
  loadThunk,
  query,
  icon,
  onSuccess,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDelete = async (id) => {
    var result = window.confirm("Are you sure you want to delete?");
    if (result) {
      const res = await dispatch(deleteThunk(id));

      if (res.payload?.message === "success") {
        navigatePath && navigate(navigatePath);
        loadThunk && dispatch(loadThunk(query && query));
        onSuccess && onSuccess();
      }
    }
  };

  return (
    <>
      <UserPrivateComponent permission={permission}>
        {icon ? (
          <div className='flex items-center gap-2'>
            <span className='cursor-pointer' onClick={() => onDelete(id)}>
              {icon}
            </span>
            {title || null}
          </div>
        ) : (
          <div onClick={() => onDelete(id)} className='flex items-center gap-2'>
            <DeleteOutlined
              className={cn(
                `bg-red-600 text-white inline-block rounded-md p-1`,
                {
                  [className]: className,
                }
              )}
            />
            {title || null}
          </div>
        )}
      </UserPrivateComponent>
    </>
  );
}
