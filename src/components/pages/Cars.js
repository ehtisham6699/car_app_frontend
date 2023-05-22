import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Modal from "../modals/editModal";
import API_BASE_URL from "./../../api_config";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const Cars = () => {
  const Navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [editCarId, setEditCarId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);
  const [paginationTotalRows, setPaginationTotalRows] = useState(0);
  const [newCar, setNewCar] = useState({
    category: "",
    color: "",
    model: "",
    make: "",
    registerationNo: "",
  });

  const checkUserLogin = () => {
    if (!localStorage.getItem("token")) {
      Navigate("/");
    }
  };

  useEffect(() => {
    // Fetching the cars and categories
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const carsResponse = await axios.get(
          `${API_BASE_URL}/cars?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const categoriesResponse = await axios.get(`${API_BASE_URL}/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPaginationTotalRows(carsResponse.data.totalRows);
        setCars(carsResponse.data.cars);
        setTotalPages(carsResponse.data.totalPages);
        setCategories(categoriesResponse.data.cat);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    checkUserLogin();
  }, []);

  const handleCreateCar = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(`${API_BASE_URL}/cars`, newCar, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCars((prevCars) => [...prevCars, response.data.car]);

      setNewCar({
        category: "",
        color: "",
        model: "",
        make: "",
        registerationNo: "",
      });
    } catch (error) {
      console.error("Error creating car:", error);
    }
  };

  const handleDeleteCar = async (carId) => {
    // Deleting a car
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/cars/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedCars = cars.filter((car) => car._id !== carId);
      setCars(updatedCars);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({ ...prevCar, [name]: value }));
  };
  const closeModal = async () => {
    setShowModal(false);
    setEditCarId(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/cars`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars(response.data.cars);
    } catch (error) {
      console.error("Error fetching updated car list:", error);
    }
  };

  const columns = [
    {
      name: "Category",
      selector: (row) =>
        row.category && row.category.CategoryName
          ? row.category.CategoryName
          : "",
      sortable: true,
    },
    { name: "Color", selector: "color", sortable: true },
    { name: "Model", selector: "model", sortable: true },
    { name: "Make", selector: "make", sortable: true },
    { name: "Registeration No", selector: "registerationNo", sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            className="dataTable_button"
            onClick={() => {
              setEditCarId(row);
              setShowModal(true);
            }}
          >
            Edit{" "}
          </button>
          <button
            className="dataTable_button"
            onClick={() => handleDeleteCar(row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="text-center m-5-auto">
      {showModal && (
        <Modal
          car={editCarId}
          closeModal={closeModal}
          categories={categories}
        />
      )}
      <h1>Cars</h1>
      <form className="form_control" onSubmit={handleCreateCar}>
        <h2>Add Car</h2>
        <div>
          <label>
            <select
              className="text_input"
              name="category"
              placeholder="Category"
              value={newCar.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.CategoryName}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            <input
              className="text_input"
              type="text"
              name="color"
              placeholder="Color"
              value={newCar.color}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <input
              className="text_input"
              type="text"
              name="model"
              placeholder="Model"
              value={newCar.model}
              onChange={handleInputChange}
              pattern="[0-9]+"
              title="Please enter a valid number"
              required
            />
          </label>
        </div>
        <div>
          <label>
            <input
              className="text_input"
              type="text"
              name="make"
              placeholder="Make"
              value={newCar.make}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <input
              className="text_input"
              type="text"
              placeholder="Registeration No:"
              name="registerationNo"
              value={newCar.registerationNo}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <button type="submit" className="primary-button">
            Add Car
          </button>
        </div>
      </form>

      <div className="dataTable">
        <DataTable
          title="Cars List"
          columns={columns}
          data={cars}
          pagination
          paginationServer
          paginationPerPage={5}
          paginationTotalRows={paginationTotalRows}
          paginationDefaultPage={currentPage}
          onChangePage={(page) => setCurrentPage(page)}
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
};

export default Cars;
