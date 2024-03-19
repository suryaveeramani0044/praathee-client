import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUer,
} from "../store/action/userAction";
import "./dashboard.css";
import { Header } from "../component/header/header";
import { IoMdAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Employee",
    address: "",
    password: "",
  });
  const [search, setSearch] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [id, setID] = useState("");
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  /* eslint-disable */
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwttoken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserDetails(decodedToken);
    }
  }, []);

  const store = useSelector((store) => {
    return store.users;
  });

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    edit ? await dispatch(updateUer(user, id)) : await dispatch(addUser(user));
    edit && setEdit(false);
    setUser({
      firstName: "",
      lastName: "",
      email: "",
      role: "Employee",
      address: "",
      mobile: "",
      password: "",
    });
  };
  const handleEdit = (item) => {
    setEdit(true);
    setAdd(true);
    setID(item._id);
    setUser({
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      role: item.role,
      address: item.address,
      mobile: item.mobile,
      salary: item.salary,
    });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchItem(value);
    const searchData = store.filter((data) => {
      return (
        data.firstName.toLowerCase().includes(value) ||
        data.address.toLowerCase().includes(value) ||
        data.lastName.toLowerCase().includes(value)
      );
    });
    setSearch(searchData);
  };

  return (
    <main className="main">
      <Header />
      {userDetails?.role === "Admin" && (
        <section className="emp-form">
          {add && (
            <>
              <input
                placeholder="First Name"
                name="firstName"
                value={user.firstName}
                onChange={(e) => handleChange(e)}
                className="add-input"
              />
              <input
                placeholder="
            Last Name"
                name="lastName"
                value={user.lastName}
                onChange={(e) => handleChange(e)}
                className="add-input"
              />
              <input
                placeholder="email"
                name="email"
                value={user.email}
                onChange={(e) => handleChange(e)}
                className="add-input"
              />
              <select
                name="role"
                value={user.role}
                onChange={(e) => handleChange(e)}
              >
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
              </select>
              <input
                placeholder="address"
                name="address"
                value={user.address}
                onChange={(e) => handleChange(e)}
                className="add-input"
              />
              <input
                placeholder="
            password"
                name="password"
                value={user.password}
                onChange={(e) => handleChange(e)}
                className="add-input"
              />

              <button onClick={() => handleSubmit()} className="add-btn">
                {edit ? "Update" : "Save"}
              </button>
            </>
          )}

          {add ? (
            <MdCancel
              onClick={() => setAdd(false)}
              style={{ color: "red", fontSize: "1.3rem", cursor: "pointer" }}
              className="add-icon"
            />
          ) : (
            <IoMdAddCircle
              style={{
                color: "#00ff00",
                fontSize: "1.3rem",
                cursor: "pointer",
              }}
              className="clear-icon"
              onClick={() => {
                setAdd(true);
                setEdit(false);
                setUser({
                  firstName: "",
                  lastName: "",
                  email: "",
                  role: "Employee",
                  address: "",
                  mobile: "",
                  salary: "",
                });
              }}
            />
          )}
        </section>
      )}

      <section className="search">
        <input
          placeholder="Search Name and Address"
          onChange={(e) => handleSearch(e)}
          className="search"
        />
      </section>
      <section className="table-container">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Address</TableCell>
                {userDetails?.role === "Admin" && <TableCell>Action</TableCell>}
              </TableRow>
            </TableHead>

            <TableBody>
              {searchItem.length > 0 ? (
                search.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6}>Employeed Not found</TableCell>
                  </TableRow>
                ) : (
                  search.map((item, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>{item.firstName}</TableCell>
                        <TableCell>{item.lastName}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.role}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        {userDetails?.role === "Admin" && (
                          <TableCell>
                            <button
                              onClick={() => handleEdit(item)}
                              className="edit"
                            >
                              <MdEditSquare />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="delete"
                            >
                              <MdDelete />
                              Delete
                            </button>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })
                )
              ) : (
                store.map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{item.firstName}</TableCell>
                      <TableCell>{item.lastName}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.role}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      {userDetails?.role === "Admin" && (
                        <TableCell className="action-data">
                          <button
                            onClick={() => handleEdit(item)}
                            className="edit"
                          >
                            <MdEditSquare />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="delete"
                          >
                            <MdDelete />
                            Delete
                          </button>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </main>
  );
};
