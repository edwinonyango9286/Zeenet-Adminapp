import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import ResestPassword from "./Pages/ResestPassword";
import ForgotPassword from "./Pages/ForgotPassword";
import Dashboard from "./Pages/Dashboard";
import MainLayout from "./Components/MainLayout";
import Enquiries from "./Pages/Enquiries";
import BlogList from "./Pages/BlogList";
import BlogCategoryList from "./Pages/BlogCategoryList";
import Orders from "./Pages/Orders";
import Customers from "./Pages/Customers";
import CategoryList from "./Pages/CategoryList";
import BrandList from "./Pages/BrandList";
import ProductList from "./Pages/ProductList";
import AddBlog from "./Pages/AddBlog";
import AddBlogCategory from "./Pages/AddBlogCategory";
import AddCategory from "./Pages/AddCategory";
import AddBrand from "./Pages/AddBrand";
import AddProduct from "./Pages/AddProduct";
import AddCoupon from "./Pages/AddCoupon";
import CouponList from "./Pages/CouponList";
import ViewEnquiry from "./Pages/ViewEnquiry";
import ViewOrder from "./Pages/ViewOrder";
import { OpenRoutes } from "./routing/OpenRoutes";
import { PrivateRoutes } from "./routing/PrivateRoutes";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
          toastStyle={{
            fontSize: "12px",
            fontWeight: "400",
          }}
        />
        <Routes>
          <Route
            path="/"
            element={
              <OpenRoutes>
                <Login />
              </OpenRoutes>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <OpenRoutes>
                <ResestPassword />
              </OpenRoutes>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/admin"
            element={
              <PrivateRoutes>
                <MainLayout />
              </PrivateRoutes>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="enquiries/:id" element={<ViewEnquiry />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="coupon" element={<AddCoupon />} />
            <Route path="coupon/:id" element={<AddCoupon />} />
            <Route path="coupon-list" element={<CouponList />} />
            <Route path="blog" element={<AddBlog />} />
            <Route path="blog/:id" element={<AddBlog />} />
            <Route path="blog-list" element={<BlogList />} />
            <Route path="blog-category" element={<AddBlogCategory />} />
            <Route path="blog-category/:id" element={<AddBlogCategory />} />
            <Route path="blog-category-list" element={<BlogCategoryList />} />
            <Route path="order/:id" element={<ViewOrder />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="category" element={<AddCategory />} />
            <Route path="category/:id" element={<AddCategory />} />
            <Route path="category-list" element={<CategoryList />} />
            <Route path="brand" element={<AddBrand />} />
            <Route path="brand/:id" element={<AddBrand />} />
            <Route path="brand-list" element={<BrandList />} />
            <Route path="product" element={<AddProduct />} />
            <Route path="product/:id" element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
