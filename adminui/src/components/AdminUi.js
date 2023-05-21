import "./AdminUi.css";
import axios from "axios";
import { config } from "../App";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import Modal from "./Modal";

const AdminUi = () => {
  const [userData, setUserData] = useState([]);
  const [filteredUserData, setFilteredUserData] = useState([]);
  const [dataPerPage, setDataPerPage] = useState(1);
  const [isEditable, setIsEditable] = useState(false);
  const [deletableData, setDeletableData] = useState([]);
  const [editData, setEditData] = useState({});

  /**
   * @param {array} userData
   * It contains all the user's data in the form of array of objects.
   * 
   * @param {array} filteredUserData
   * It also contains all the user's data in the form of array of objects.
   * This state is used to render all the data into the table.
   * It also used to store updated data after doing search.
   * 
   * @param {array} dataPerPage
   * It contains page data that we want that we want the user to show.
   * 
   * @param {boolean} isEditable
   * It stores the state the the row-data needs to be edited or not.
   * 
   * @param {array} deletableData
   * It stores array of Id's that are needed to be deleted.
   * 
   * @param {Object} editData
   * It stores all the row data that are needed to be edited in object form. 
   */

  /**
   * fetchData() Function is used to fetch all the data from API endpoint
   *It sets the State variable userData and filteredUserData which stores all the data.
  */
 const fetchData = async () => {
    let res = await axios.get(config.endPoint);
    setUserData(res.data);
    setFilteredUserData(res.data);
  };

  //This hook is invoked only for initial render which calls fetchData().

  useEffect(() => {
    fetchData();
  }, []);

  //This hook is invoked everytime isEditable gets updated.

  useEffect(() => {
    setFilteredUserData(userData);
  }, [isEditable,userData]);

  /** deleteData() function is used to delete the data
   * @param {array[id's]} contains array of id's that are needed to be deleted
   */

  const deleteData = (value) => {
    let j,
      resultArr = [];
    for (let i = 0; i < userData.length; i++) {
      j = 0;
      for (; j < value.length; j++) {
        if (value[j] === userData[i].id) {
          break;
        }
      }
      if (j === value.length) resultArr.push(userData[i]);
    }
    setUserData(resultArr);
    setFilteredUserData(resultArr);
  };

  /**
   * searchUserData() function is called when we want to search for required userData as per userName/user-email/user-role.
   * @param {string} required string that we have to search for.
   */

  const searchUserData = (value) => {
    let resultArr = userData.filter((data) => {
      return (
        data.name.toLowerCase().match(value.toLowerCase()) ||
        data.role.toLowerCase().match(value.toLowerCase()) ||
        data.email.toLowerCase().match(value.toLowerCase())
      );
    });
    setFilteredUserData(resultArr);
  };
  return (
    <>
      
      <div className="table-wrapper">
        <input
          type="text"
          name="searchbox"
          className="search-box"
          placeholder="Search For UserData"
          onChange={(event) => {
            searchUserData(event.target.value);
          }}
        ></input>
        <table className="table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  name="check"
                  className="checkBox"
                  onChange={(e) => {
                    if (e.target.checked === true) {
                      let resultArr = [];
                      for (
                        let i = (dataPerPage - 1) * 10;
                        i < 10 * dataPerPage && i < userData.length;
                        i++
                      ) {
                        resultArr.push(userData[i].id);
                      }
                      setDeletableData(resultArr);
                    } else {
                      setDeletableData([]);
                    }
                  }}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUserData.length !== 0 &&
              filteredUserData.map((e, index) => {
                if (
                  index >= (dataPerPage - 1) * 10 &&
                  index < 10 * dataPerPage
                ) {
                  return (
                    <tr
                      key={e.id}
                      className={
                        deletableData.includes(e.id) === true ? "selected" : ""
                      }
                    >
                      <td>
                        <input
                          type="checkbox"
                          name={e.name}
                          className="checkBox"
                          value={e.id}
                          checked={
                            deletableData.includes(e.id) === true ? true : false
                          }
                          onChange={(event) => {
                            if (event.target.checked === true) {
                              let resultArr = [...deletableData];
                              resultArr.push(event.target.value);
                              setDeletableData(resultArr);
                            } else {
                              let resultArr = [];
                              resultArr = deletableData.filter((e) => {
                                if (e !== event.target.value) return e;
                              });
                              setDeletableData(resultArr);
                            }
                          }}
                        />
                      </td>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.role}</td>
                      <td>
                        <span
                          onClick={() => {
                            setIsEditable(true);
                            setEditData({
                              ...editData,
                              id: e.id,
                              name: e.name,
                              email: e.email,
                              role: e.role,
                              index: index,
                            });
                          }}
                        >
                          <BsFillPencilFill />
                        </span>
                        <span
                          className="delete-icon"
                          onClick={(event) => {
                            deleteData([e.id]);
                          }}
                        >
                          <BsFillTrashFill />
                        </span>
                      </td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>
        <div className="footer-buttons">
          <button
            className="delete-button"
            onClick={() => {
              deleteData(deletableData);
            }}
          >
            Delete Selected
          </button>
          {userData.length !== 0 ? (
            <Pagination
              data={filteredUserData}
              dataPerPage={dataPerPage}
              setDataPerPage={setDataPerPage}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      {isEditable && (
        <Modal
          completeData={userData}
          setCompleteData={setUserData}
          isEditable={setIsEditable}
          data={editData}
        />
      )}
    </>
  );
};

export default AdminUi;
