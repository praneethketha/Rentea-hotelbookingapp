import React, { useMemo, useState } from "react";
import "./customerTable.css";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import Pagination from "../Pagination/pagination";
import { useUser } from "../../store/userContext";
import { MdOutlineEdit, MdDelete } from "react-icons/md";

import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authContext";
import { NEW_USER } from "../../store/constants";

let PageSize = 8;

const CustomerTable = () => {
  const { setNewUser } = useAuth();
  const { users, deactivateUser } = useUser();
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return users.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, users]);

  return (
    <div className="booking-table-container mt-2">
      <Container className="pt-4 h-100 container-table">
        <div>
          <p className="m-0">Page</p>
        </div>
        <div>
          <h4 className="m-0 p-0">Customers</h4>
        </div>
        <div className="table-container m-0 p-0">
          <Table className="booking-table">
            <thead>
              <tr className="text-center">
                <td>Name</td>
                <td>Email</td>
                <td>Booking</td>
                <td>Role</td>
                <td>Status</td>
                <td>Contact-number</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((item) => {
                return (
                  <tr className="text-center text-capitalize ps-0">
                    <td>{item.name}</td>
                    <td className="text-none">{item.email}</td>
                    <td>{item.bookings.length}</td>
                    <td>{item.role}</td>
                    <td>{item.active ? "Active" : "In Active"}</td>
                    <td>{item.contact_number}</td>
                    <td
                      onClick={() => {
                        setNewUser(item);
                        navigate("addCustomer", { state: true });
                      }}
                    >
                      <MdOutlineEdit className="editHotel" />
                    </td>
                    <td onClick={() => deactivateUser(item._id, !item.active)}>
                      <MdDelete className="delHotel" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={users.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
        <button
          className="editIcon addIcon"
          onClick={() => {
            setNewUser(NEW_USER);
            navigate("addCustomer");
          }}
        >
          +
        </button>
      </Container>
      <div></div>
      <Outlet />
    </div>
  );
};

export default CustomerTable;
