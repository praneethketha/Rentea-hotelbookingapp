import React, { useMemo, useState } from "react";
import "./bookingTable.css";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import Pagination from "../Pagination/pagination";
import { useBooking } from "../../store/bookingContext";

let PageSize = 8;

const BookingTable = () => {
  const { bookings } = useBooking();
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return bookings.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, bookings]);

  return (
    <div className="booking-table-container mt-2">
      <Container className="pt-4 h-100 container-table">
        <div>
          <p>Page</p>
        </div>
        <div className="d-flex justify-content-between">
          <h4>Bookings</h4>
        </div>
        {bookings.length ? (
          <div className="table-container m-0 p-0">
            <Table className="booking-table">
              <thead>
                <tr className="text-center">
                  <td>Hotel Name</td>
                  <td>Customer</td>
                  <td>From Date</td>
                  <td>To Date</td>
                  <td>Total Amount</td>
                </tr>
              </thead>
              <tbody>
                {currentTableData.map((item) => {
                  return (
                    <tr className="text-center text-capitalize ps-0">
                      <td>{item.hotel.name}</td>
                      <td>{item.user.name}</td>
                      <td>{item.from.slice(0, 10)}</td>
                      <td>{item.to.slice(0, 10)}</td>
                      <td>{item.amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          <h3>No Bookings done to display</h3>
        )}

        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={bookings.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Container>
      <div></div>
    </div>
  );
};

export default BookingTable;
