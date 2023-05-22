import React, { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import DataTable from "react-data-table-component";
import API_BASE_URL from "../../api_config";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const Navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationTotalRows, setPaginationTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");
  const token = localStorage.getItem("token");
  const checkUserLogin = () => {
    if (!localStorage.getItem("token")) {
      Navigate("/");
    }
  };

  useEffect(() => {
    checkUserLogin();

    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPaginationTotalRows(response.data.totalRows);
        setCategories(response.data.cat);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateCategory = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/category`,
        {
          CategoryName: newCategoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories((prevCategories) => [...prevCategories, response.data]);
      setNewCategoryName("");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleUpdateCategory = async (categoryId) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/category/${categoryId}`,
        {
          CategoryName: editingCategoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedCategoriesResponse = await axios.get(
        `${API_BASE_URL}/category`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(updatedCategoriesResponse.data.cat);

      // Reseting editing state
      setEditingCategoryId(null);
      setEditingCategoryName("");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${API_BASE_URL}/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedCategories = categories.filter(
        (category) => category._id !== categoryId
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEditCategory = (categoryId, categoryName) => {
    setEditingCategoryId(categoryId);
    setEditingCategoryName(categoryName);
  };

  const columns = [
    {
      name: "Category Name",
      selector: "CategoryName",
      sortable: true,
      cell: (row) => {
        if (editingCategoryId === row._id) {
          return (
            <input
              type="text"
              className="text_input"
              value={editingCategoryName}
              onChange={(e) => setEditingCategoryName(e.target.value)}
            />
          );
        } else {
          return <span>{row.CategoryName}</span>;
        }
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          {editingCategoryId === row._id ? (
            <button
              className="dataTable_button"
              onClick={() => handleUpdateCategory(row._id)}
            >
              Save
            </button>
          ) : (
            <button
              className="dataTable_button"
              onClick={() => handleEditCategory(row._id, row.CategoryName)}
            >
              Edit
            </button>
          )}
          <button
            className="dataTable_button"
            onClick={() => handleDeleteCategory(row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="text-center m-5-auto">
      <h1>Categories</h1>

      <form className="form_control">
        <input
          type="text"
          placeholder="Enter category name"
          className="text_input"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button onClick={handleCreateCategory} className="primary-button">
          Add Category
        </button>
      </form>
      <div className="dataTable">
        <DataTable
          title="Categories"
          columns={columns}
          data={categories}
          pagination
          highlightOnHover
          paginationServer
          paginationPerPage={5}
          paginationTotalRows={paginationTotalRows}
          paginationDefaultPage={currentPage}
          onChangePage={(page) => setCurrentPage(page)}
          striped
          dense
        />
      </div>
    </div>
  );
};

export default Categories;
