import { Route, Routes } from "react-router-dom";
import "./App.css";

import LoginRegister from "./pages/LoginRegister/LoginRegister";
import { Admin, Home, HotelDetail, Hotels, Profile } from "./pages";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import NotFound from "./pages/NotFound/notFound";
import {
  AddCustomer,
  AddHotel,
  AddRoom,
  AdminBooking,
  AdminCustomers,
  AdminDashboard,
  AdminHotel,
  AdminReviews,
  ChangePasword,
  DatePicker,
  Edit,
  EditRooms,
  ForgotPassword,
  Login,
  Payment,
  ProfileCard,
  RequireAuth,
  ReserveModal,
  ResetPassword,
  RoomPicker,
  SignUp,
  TimeLine,
  VerifyOTP,
} from "./components";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="hotels" element={<Hotels />} />
        <Route path="hotels/:id" element={<HotelDetail />} />
        <Route path="reviews/:id" element={<AdminReviews />} />
        <Route path="profile" element={<Profile />}>
          <Route index element={<ProfileCard />}></Route>
          <Route path="timeline" element={<TimeLine />}></Route>
          <Route path="edit" element={<Edit />}></Route>
          <Route path="change-password" element={<ChangePasword />}></Route>
        </Route>
        <Route path="auth" element={<LoginRegister />}>
          <Route index element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="verifyOTP" element={<VerifyOTP />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="resetPassword/:token" element={<ResetPassword />} />
        </Route>
        <Route path="reserve/:id" element={<ReserveModal />}>
          <Route index element={<DatePicker />} />
          <Route path="roomSelect" element={<RoomPicker />} />
          <Route path="payment" element={<Payment />} />
        </Route>
        <Route
          path="admin"
          element={
            <RequireAuth>
              <Admin />
            </RequireAuth>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="booking" element={<AdminBooking />} />
          <Route path="hotels" element={<AdminHotel />}>
            <Route path="addHotel" element={<AddHotel />} />
            <Route path="addRoom" element={<AddRoom />} />
            <Route path="rooms" element={<EditRooms />} />
          </Route>
          <Route path="customers" element={<AdminCustomers />}>
            <Route path="addCustomer" element={<AddCustomer />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
