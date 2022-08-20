import React, { useContext, useState } from "react";
import * as api from "./../services";
import { useEffect } from "react";
import { useCallback } from "react";
import { useReserve } from "./reserveContext";

const HotelContext = React.createContext();

export const useHotel = () => {
  return useContext(HotelContext);
};

const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);
  const [currentHotel, setCurrentHotel] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([5000, 10000]);
  const [value, setValue] = useState([]);
  const [cities, setCities] = useState([]);

  const { rating } = useReserve();

  const getAllHotels = useCallback(
    async (queryStr) => {
      try {
        const query = queryStr || "";
        setIsLoading(true);
        const { data } = await api.fetchAllHotels(searchTerm, query);
        setHotels(data.data);
      } catch (error) {
        alert(error);
      }
      setIsLoading(false);
    },
    [searchTerm]
  );

  const getHotel = async (id, setTo, edit) => {
    try {
      console.log("inside get hotel");
      setIsLoading(true);
      const { data } = await api.fetchHotel(id);
      const hotel = data.data;
      if (edit) {
        setTo({
          ...hotel,
          images: [...hotel.images, hotel.cover_pic],
          latitude: hotel.location.coordinates[0],
          longitude: hotel.location.coordinates[1],
        });
      } else {
        setTo(hotel);
      }
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };

  const createSearchTerm = (value) => {
    setSearchTerm(value);
  };

  // debouncing in action
  let doSomeMagic = function (fn, delay) {
    let timer;
    return function () {
      let context = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  };

  const handleSearch = doSomeMagic(createSearchTerm, 300);

  const filterChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getHotelsByFilters = (e) => {
    e.preventDefault();
    getAllHotels(
      `&rating[gte]=${rating}&basePrice[gte]=${priceRange[0]}&basePrice[lte]=${priceRange[1]}`
    );
  };

  const getInitialStats = async () => {
    try {
      const cities = await api.getCities();
      const citiesData = await cities.data;
      setCities(citiesData.data);

      const { data } = await api.fetchPriceRange();
      setValue([data.data.low, data.data.high]);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getInitialStats();
    getAllHotels();
  }, [getAllHotels]);

  return (
    <HotelContext.Provider
      value={{
        hotels,
        currentHotel,
        isLoading,
        priceRange,
        value,
        searchTerm,
        cities,
        setCurrentHotel,
        setValue,
        setPriceRange,
        filterChange,
        createSearchTerm,
        setSearchTerm,
        handleSearch,
        getHotel,
        getAllHotels,
        getHotelsByFilters,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export default HotelProvider;
