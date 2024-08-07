import React, { useState, useEffect } from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthWiseOrders,
  getOrders,
  getYearlyStatistics,
  resetState,
} from "../features/auth/authSlice";

const columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Products",
    dataIndex: "product",
  },
  {
    title: "Total Price",
    dataIndex: "price",
  },
  {
    title: "Price After Discount",
    dataIndex: "discountedPrice",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const ordersState = useSelector((state) => state?.auth?.orders?.orders);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const getTokenFromLocalStorge = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const config3 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorge !== null ? getTokenFromLocalStorge.token : ""
      }`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getMonthWiseOrders(config3));
    dispatch(getYearlyStatistics(config3));
  }, []);

  useEffect(() => {
     dispatch(resetState())
     dispatch(getOrders(config3));
   }, []);


  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    let mothlyOrderCount = [];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({
        type: monthNames[element?._id?.month],
        income: element?.amount,
      });

      mothlyOrderCount.push({
        type: monthNames[element?._id?.month],
        sales: element?.count,
      });
    }
    setDataMonthly(data);
    setDataMonthlySales(mothlyOrderCount);

    const data1 = [];
    for (let i = 0; i < ordersState?.length; i++) {
      data1.push({
        key: i + 1,
        name:
          ordersState[i]?.user?.firstname +
          " " +
          ordersState[i]?.user?.lastname,
        product: ordersState[i]?.orderedItems?.length,
        price: ordersState[i]?.totalPrice,
        discountedPrice: ordersState[i]?.totalPriceAfterDiscount,
        status: ordersState[i]?.orderStatus,
      });
    }
    setOrderData(data1);
  }, [monthlyDataState]);

  const config = {
    data: dataMonthly,
    xField: "type",
    yField: "income",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "top",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const config2 = {
    data: dataMonthlySales,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "top",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };
  return (
    <>
      <div className="container">
        <h5 className="mb-2 title">Dashboard</h5>
        <div className="d-flex justify-content-between align-items-center gap-2 flex-warp">
          <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-4 rounded-2">
            <div>
              <p className="desc">Total Income</p>
              <h6 className="mb-0 sub-title">
                Ksh {yearlyDataState && yearlyDataState[0]?.amount}
              </h6>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6>
                <BsArrowDownRight />
                32%
              </h6>
              <p className="mb-0 desc">Income from the last year.</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end  flex-grow-1 bg-white p-4 rounded-2">
            <div>
              <p className="desc">Total Sales</p>
              <h6 className="mb-0 sub-title">
                Products {yearlyDataState && yearlyDataState[0]?.count}
              </h6>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6 className="red">
                <BsArrowDownRight />
                32%
              </h6>
              <p className="mb-0 desc">Sales in the last year from today.</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end  flex-grow-1 bg-white p-4 rounded-2">
            <div>
              <p className="desc">Total Expesence</p>
              <h6 className="mb-0 sub-title">
                ksh {yearlyDataState && yearlyDataState[0]?.amount}
              </h6>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6 className="green">
                <BsArrowDownRight />
                32%
              </h6>
              <p className="mb-0 desc">Expesence from in last year. </p>
            </div>
          </div>
        </div>

        <div className="d-flex  justify-content-between gap-2">
          <div className="mt-4 flex-grow-1 w-50">
            <h5 className="mb-2 title">Income Statistics</h5>
            <div>
              <Column {...config} />
            </div>
          </div>

          <div className="mt-4 flex-grow-1 w-50">
            <h5 className="mb-2 title">Sales Statistics</h5>
            <div>
              <Column {...config2} />
            </div>
          </div>
        </div>
        <div className="mt-2">
          <h4 className="mb-2 title">Recent Orders</h4>
          <div>
            <Table columns={columns} dataSource={orderData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
