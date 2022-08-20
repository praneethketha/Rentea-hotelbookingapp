import React, { useMemo, useState } from "react";

import "./hotelTable.css";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import Pagination from "../Pagination/pagination";
import { useHotel } from "../../store/hotelContext";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import { useAdminContext } from "../../store/adminContext";
import { NEW_HOTEL } from "../../store/constants";

let PageSize = 8;

const HotelTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { setNewHotel, removeHotel } = useAdminContext();
  const { hotels, handleSearch, searchTerm, getHotel } = useHotel();

  const navigate = useNavigate();

  const handleEdit = (item) => {
    getHotel(item._id, setNewHotel, true);
    navigate("addHotel", { state: true });
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return hotels.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, hotels]);

  return (
    <div className="booking-table-container mt-2">
      <Container className="pt-4 h-100 container-table">
        <div>
          <p>Page</p>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <h4>Hotels</h4>
          <input
            type="text"
            name="search"
            id="search"
            defaultValue={searchTerm}
            onKeyUp={(e) => handleSearch(e.target.value)}
            placeholder="Search by name, city"
            className="ps-4  border-1"
          />
        </div>
        <div className="table-container m-0 p-0">
          <Table className="booking-table">
            <thead>
              <tr className="text-center">
                <td className="ps-0">Hotel Name</td>
                <td>Base Price</td>
                <td>Rating</td>
                <td>Reviews</td>
                <td>Rooms</td>
                <td>Location</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {currentTableData.map((item) => {
                let rooms = 0;
                item.rooms.forEach((element) => {
                  rooms += element.roomNumbers.length;
                });
                return (
                  <tr
                    className="text-center ps-0 text-capitalize"
                    key={item._id}
                  >
                    <td>{item.name}</td>
                    <td>{item.basePrice}</td>
                    <td>{item.rating.toFixed(1)}</td>
                    <td>{item.reviews.length}</td>
                    <td>{rooms}</td>
                    <td>{item.city}</td>
                    <td onClick={() => handleEdit(item)}>
                      <MdOutlineEdit className="editHotel" />
                    </td>
                    <td onClick={() => removeHotel(item._id)}>
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
          totalCount={hotels.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
        <button
          className="editIcon addIcon"
          onClick={() => {
            setNewHotel(NEW_HOTEL);
            navigate("addHotel");
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

export default HotelTable;
