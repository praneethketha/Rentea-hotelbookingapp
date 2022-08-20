import React, { useEffect } from "react";
import HotelCard from "../../components/HotelCard/hotelCard";
import "./hotel.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { IoFunnelOutline } from "react-icons/io5";
import { useHotel } from "../../store/hotelContext";
import Loading from "./../../components/Loading/loading";
import { useState } from "react";
import Filters from "../../components/Filters/filters";
import { Footer, Header } from "../../components";
import { useLocation } from "react-router-dom";

const Hotels = () => {
  const [open, setOpen] = useState(false);
  const { hotels, searchTerm, setSearchTerm, handleSearch, isLoading } =
    useHotel();

  const { state } = useLocation();

  useEffect(() => {
    if (state === "default") {
      setSearchTerm("");
    }
  }, [state]);

  return (
    <>
      <Header />
      <Container className="hotelsPage">
        <div className="mainhotels">
          <h4 className="heading">HOTELS</h4>
          <Form>
            <div className="form1">
              <div className="formgrup">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="search for cities and hotel names"
                    className="searchfield py-3 px-4"
                    defaultValue={searchTerm}
                    onKeyUp={(e) => handleSearch(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="btn1">
                <Button
                  variant="success"
                  className="btn1"
                  onClick={() => setOpen(!open)}
                >
                  {" "}
                  <IoFunnelOutline /> Filter
                </Button>
              </div>
            </div>
          </Form>

          {isLoading ? (
            <Loading />
          ) : (
            <div className="classifyhotels">
              {hotels.length ? (
                <Row className="Row1">
                  {hotels.map((item) => (
                    <Col key={item._id} lg={4} md={6} sm={12}>
                      <HotelCard hotel={item} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <h3>No hotels to display !!!</h3>
              )}
            </div>
          )}
        </div>
        {open && <Filters setOpen={setOpen} />}
      </Container>
      <Footer />
    </>
  );
};
export default Hotels;
