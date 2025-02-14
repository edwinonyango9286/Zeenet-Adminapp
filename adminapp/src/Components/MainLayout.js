import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import { MdDashboardCustomize } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { SiBrandfolder } from "react-icons/si";
import { TbCategory } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import { ImBlogger2 } from "react-icons/im";
import { LiaBlogSolid } from "react-icons/lia";
import { BiSolidMessageEdit } from "react-icons/bi";
import { Outlet } from "react-router-dom";
import { MdNotificationsNone } from "react-icons/md";
import { Link } from "react-router-dom";
import { RiCoupon5Fill } from "react-icons/ri";
import { SiMarketo } from "react-icons/si";
import { GrCatalog } from "react-icons/gr";
import { TfiMenu } from "react-icons/tfi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getAllEnquiries } from "../features/enquiry/enquirySlice";
import { RiLogoutBoxRLine } from "react-icons/ri";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, SetAvatar] = useState("");

  useEffect(() => {
    const adminFirstName = Cookies.get("adminFirstName");
    const adminEmail = Cookies.get("adminEmail");
    const adminAvatar = Cookies.get("adminAvatar");
    if (adminFirstName) setFirstName(adminFirstName);
    if (adminEmail) setEmail(adminEmail);
    if (adminAvatar) SetAvatar(adminAvatar);
  }, []);

  useEffect(() => {
    dispatch(getAllEnquiries());
  }, [dispatch]);

  const enquiries = useSelector((state) => state?.enquiry?.enquiries);
  const submittedEnquiriesCount = enquiries?.filter(
    (enquiry) => enquiry.status === "Submitted"
  ).length;

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "#fff" }}
      >
        <div className="logo">
          <h2 className="text-center items-center text-white mb-0 fs-4 py-3">
            <span className="sm-logo fw-bold fs-2">ZN</span>
            <span className="lg-logo fw-bold fs-2 m-0 p-0 ">ZeeNet</span>
          </h2>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            if (key === "signout") {
              Cookies.remove("firstName");
              Cookies.remove("email");
              Cookies.remove("avatar");
              Cookies.remove("token");
              navigate("/");
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <MdDashboardCustomize className="fs-6 fw-bold" />,
              label: (
                <p className="fs-6 fw-bold text-start  m-0 p-0">Dashboard</p>
              ),
            },
            {
              key: "customers",
              icon: <BsPeople className="fs-6 fw-bold" />,
              label: (
                <p className="fs-6 fw-bold text-start m-0 p-0">Customers</p>
              ),
            },
            {
              key: "catalog",
              icon: <GrCatalog className="fs-6 fw-bold" />,
              label: <p className="fs-6 fw-bold text-start m-0 p-0">Catalog</p>,
              children: [
                {
                  key: "product-list",
                  icon: <BsCart3 className="fs-6 fw-bold" />,
                  label: (
                    <p className="fs-6 fw-bold text-start m-0 p-0">Products</p>
                  ),
                },
                {
                  key: "product",
                  icon: <BsCart3 className="fs-6 fw-bold" />,
                  label: (
                    <p className="fs-6 fw-bold text-start  m-0 p-0">
                      Add product
                    </p>
                  ),
                },
                {
                  key: "brand-list",
                  icon: <SiBrandfolder className="fs-6 fw-bold" />,
                  label: (
                    <p className="fs-6 fw-bold text-start m-0 p-0">Brands</p>
                  ),
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-6 fw-bold" />,
                  label: (
                    <p className="fs-6 fw-bold text-start  m-0 p-0">
                      Add Brand
                    </p>
                  ),
                },
                {
                  key: "category-list",
                  icon: <TbCategory className="fs-5" />,
                  label: (
                    <p className="fs-6 fw-bold text-start  m-0 p-0">
                      Product Categories
                    </p>
                  ),
                },
                {
                  key: "category",
                  icon: <TbCategory className="fs-6 fw-bold" />,
                  label: (
                    <p className="fs-6 fw-bold text-start  m-0 p-0">
                      {" "}
                      Add Product category
                    </p>
                  ),
                },
              ],
            },

            {
              key: "blogs",
              icon: <ImBlogger2 className="fs-6 fw-bold" />,
              label: <p className="fs-6 fw-bold text-start  m-0 p-0">Blogs</p>,
              children: [
                {
                  key: "blog-category-list",
                  icon: <ImBlogger2 className="fs-6 fw-bold" />,
                  label: (
                    <p className="fs-6 fw-bold text-start  m-0 p-0">
                      Blog categories
                    </p>
                  ),
                },

                {
                  key: "blog-category",
                  icon: <LiaBlogSolid className="fs-6 fw-bold" />,
                  label: (
                    <p className="fs-6 fw-bold text-start  m-0 p-0">
                      Add blog category
                    </p>
                  ),
                },
                {
                  key: "blog-list",
                  icon: <ImBlogger2 className="fs-6 fw-bold " />,
                  label: (
                    <p className="fs-6 fw-bold  text-start  m-0 p-0">Blogs</p>
                  ),
                },
                {
                  key: "blog",
                  icon: <LiaBlogSolid className="fs-6 fw-bold" />,
                  label: (
                    <p className="fs-6 fw-bold text-start  m-0 p-0">Add blog</p>
                  ),
                },
              ],
            },

            {
              key: "marketing",
              icon: <SiMarketo className="fs-6 fw-bold" />,
              label: (
                <p className="fs-6 fw-bold text-start  m-0 p-0">Marketing</p>
              ),
              children: [
                {
                  key: "coupon-list",
                  icon: <RiCoupon5Fill className="fs-6 fw-bold" />,
                  label: (
                    <p className="fs-6 fw-bold text-start m-0 p-0">Coupons</p>
                  ),
                },
                {
                  key: "coupon",
                  icon: <RiCoupon5Fill className="fs-6 fw-bold" />,
                  label: (
                    <p className="fs-6 fw-bold text-start  m-0 p-0">
                      Add coupon
                    </p>
                  ),
                },
              ],
            },
            {
              key: "enquiries",
              icon: <BiSolidMessageEdit className="fs-6 fw-bold " />,
              label: (
                <p className="fs-6 fw-bold text-start m-0 p-0">Enquiries</p>
              ),
            },

            {
              key: "orders",
              icon: <FaClipboardList className="fs-6 fw-bold" />,
              label: <p className="fs-6 fw-bold text-start  m-0 p-0">Orders</p>,
            },

            {
              key: "signout",
              icon: <RiLogoutBoxRLine className="fs-6 fw-bold" />,
              label: (
                <p className="fs-6 fw-bold text-start  m-0 p-0">Sign out</p>
              ),
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <TfiMenu /> : <TfiMenu />}
            onClick={() => setCollapsed(!collapsed)}
            className="trigger"
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center">
            <div className="position-relative">
              <MdNotificationsNone className="fs-3 fw-bold" />
              <span className="badge bg-primary rounded-circle py-1 position-absolute">
                {submittedEnquiriesCount}
              </span>
            </div>

            <div
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="d-flex flex-row align-items-center gap-2">
                <div className="d-flex gap-2 align-items-center justify-content-center">
                  <img
                    width={34}
                    height={34}
                    src={avatar}
                    alt="userimage"
                    className="rounded-circle"
                  />
                </div>
                <div>
                  <p className="mb-0 text-capitalize  fw-bold">
                    {" "}
                    Welcome, {firstName}
                  </p>
                  <p className="mb-0 fw-bold">{email}</p>
                </div>
              </div>
            </div>
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuLink"
              style={{ height: "auto", lineHeight: "20px" }}
            >
              <li>
                <Link to="/" className="dropdown-item py-1 mb-1">
                  View Profile
                </Link>
              </li>

              <li>
                <Link to="/" className="dropdown-item py-1 mb-1">
                  Signout
                </Link>
              </li>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
