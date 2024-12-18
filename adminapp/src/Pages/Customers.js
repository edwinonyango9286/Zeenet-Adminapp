import React, { useEffect } from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCustomers,
  resetState,
} from "../features/customers/customerSlice";

const columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    render: (text, record) => {
      const [firstName, lastName] = text?.split("  ");
      return (
        <span>
          <span className="text-capitalize">{firstName}</span>
          <span className="text-capitalize">{lastName}</span>
        </span>
      );
    },

    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer.customers);
  const isLoading = useSelector(
    (state) => state.customer.isLoading.getAllCustomers
  );
  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllCustomers());
  }, [dispatch]);

  const data = (Array.isArray(customers) ? customers : [])
    .filter((customer) => customer?.role !== "admin")
    .map((customer, index) => ({
      key: index + 1,
      name: `${customer?.firstname} ${customer?.lastname}`,
      email: customer?.email,
      phone: customer?.phone,
    }));

  return (
    <div className="container">
      <h5 className="mb-2 title">Customers</h5>

      {isLoading ? (
        <div className="text-center">
          <Spin
            indicator={
              <Loading3QuartersOutlined
                style={{
                  fontSize: 40,
                  fontWeight: "bold",
                  color: "#000",
                }}
                spin
              />
            }
          />
        </div>
      ) : (
        <Table columns={columns} dataSource={data} />
      )}
    </div>
  );
};

export default Customers;
