import { EditOutlined } from "@ant-design/icons";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearSupplier,
  deleteSupplier,
  loadSupplier,
} from "../../redux/rtk/features/supplier/supplierSlice";
import Loader from "../loader/loader";

import Card from "@/UI/Card";
import List from "@/UI/List";
import Tabs, { Tab } from "@/UI/Tabs";
import useCurrency from "@/utils/useCurrency";
import SupplierInvoiceTable from "../Card/SupplierInvoiceList";
import CommonDelete from "../CommonUi/CommonDelete";
import SupplierReturnInvoiceList from "./ListCard/SupplierReturnInvoiceList";
import SupplierTransactionList from "./ListCard/SupplierTransactionList";

//PopUp

const DetailsSupplier = () => {
  const { id } = useParams();
  const currency = useCurrency();
  //dispatch
  const dispatch = useDispatch();
  const supplier = useSelector((state) => state.suppliers.supplier);

  useEffect(() => {
    dispatch(loadSupplier(id));
    return () => {
      dispatch(clearSupplier());
    };
  }, [dispatch, id]);

  return (
    <div>
      <div className=''>
        {supplier ? (
          <Fragment key={supplier.id}>
            <div className='flex gap-2 md:gap-4'>
              <Card className='w-2/3' bodyClass={"p-0"}>
                <div className='flex justify-between mx-2 py-2 border-b items-center'>
                  <div className='flex gap-3'>
                    <Link
                      className=' bg-primary text-white rounded py-2 px-3 d-inline-block'
                      to={`/admin/supplier/${supplier.id}/update`}
                      state={{ data: supplier }}
                    >
                      <EditOutlined />
                    </Link>

                    <CommonDelete
                      permission={"delete-supplier"}
                      deleteThunk={deleteSupplier}
                      id={id}
                      navigatePath={"/admin/supplier"}
                      className='p-3 cursor-pointer'
                    />
                  </div>
                </div>
                <Tabs className='mt-4'>
                  <Tab
                    label={
                      <span>
                        Supplier Invoice{" "}
                        <span className='ml-2 rounded-full bg-slate-300 text-slate-700 px-1'>
                          {supplier.totalPurchaseInvoice}
                        </span>
                      </span>
                    }
                  >
                    <SupplierInvoiceTable
                      list={supplier.purchaseInvoice}
                      linkTo='/admin/purchase'
                    />
                  </Tab>
                  <Tab
                    label={
                      <span>
                        Supplier Return Invoice{" "}
                        <span className='ml-2 rounded-full bg-slate-300 text-slate-700 px-1'>
                          {supplier.totalReturnPurchaseInvoice}
                        </span>
                      </span>
                    }
                  >
                    <SupplierReturnInvoiceList
                      list={supplier.returnPurchaseInvoice}
                    />
                  </Tab>
                  <Tab label='Transactions'>
                    <SupplierTransactionList list={supplier.allTransaction} />
                  </Tab>
                </Tabs>
              </Card>
              <div className='w-1/3 flex flex-col gap-2 md:gap-4'>
                <Card title='Supplier'>
                  <List
                    labelClassName='w-[30%]'
                    list={[
                      {
                        label: "Name",
                        value: supplier.name,
                      },
                      {
                        label: "Email",
                        value: supplier.email || "N/A",
                      },
                      {
                        label: "Phone",
                        value: supplier.phone,
                      },
                      {
                        label: "Address",
                        value: supplier.address,
                      },
                    ]}
                  />
                </Card>
                <Card>
                  <List
                    labelClassName='w-[30%]'
                    list={[
                      {
                        label: "Total Amount",
                        value: supplier.totalAmount,
                      },
                      {
                        label: "Paid Amount",
                        value: (
                          <div className="before:content-['-'] relative before:absolute before:text-red-500 before:font-bold before:-left-3 before:top-0">
                            {supplier.totalPaidAmount}
                          </div>
                        ),
                      },
                      {
                        label: "Return Amount",
                        value: (
                          <div className="before:content-['-'] relative before:absolute before:text-red-500 before:font-bold before:-left-3 before:top-0">
                            {supplier.totalReturnAmount}
                          </div>
                        ),
                        className: "border-b pb-1",
                      },
                      {
                        label: "Due Amount",
                        value: supplier.dueAmount,
                      },
                    ]}
                  />
                </Card>
              </div>
            </div>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default DetailsSupplier;
