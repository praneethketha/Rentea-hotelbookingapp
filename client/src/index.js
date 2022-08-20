import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./store/authContext";
import { BrowserRouter } from "react-router-dom";
import HotelProvider from "./store/hotelContext";
import ReserveProvider from "./store/reserveContext";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AdminContextProvider } from "./store/adminContext";
import UserProvider from "./store/userContext";
import BookingProvider from "./store/bookingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

const promise = loadStripe(
  "pk_test_51L9MW0SG4PrYvfaFnSFqf1aKsQWwxDEiXDMS8erMnZEzilyzX8MDP6bKupXXy7JlaT0RMFFAi0BOh1ygN00GfbXp00UXYFTlGI"
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Elements stripe={promise}>
          <ReserveProvider>
            <HotelProvider>
              <AdminContextProvider>
                <UserProvider>
                  <BookingProvider>
                    <App />
                  </BookingProvider>
                </UserProvider>
              </AdminContextProvider>
            </HotelProvider>
          </ReserveProvider>
        </Elements>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
