import React from "react";
import { useState } from "react";
import "./Modal.css";

const Modal = ({ completeData, setCompleteData, isEditable, data }) => {
  /**   This method is called whenever user wants to edit any present in table
   * @param {Array} completeData
   * It contains all the user data from the table
   * 
   * @param {function} setCompleteData
   * Function that is used to reset the completeData
   * 
   * @param {function} isEditable
   * Function that used to hold the state os data that its edited aor not.
   * 
   * @param {object} data
   * It stores the data that the user wants to do edit operation on
    
  */

  const [userId, setUserId] = useState(data.id);
  const [userName, setUserName] = useState(data.name);
  const [userEmail, setUserEmail] = useState(data.email);
  const [userRole, setUserRole] = useState(data.role);

  //handleSubmit() function is used to store the edited data in our completeData(array).
  //It gets triggered whenever user clicks on SUBMIT button

  const handleSubmit = (event) => {
    event.preventDefault();
    let resultArr = [...completeData];
    resultArr[data.index].id = "" + userId;
    resultArr[data.index].name = userName;
    resultArr[data.index].email = userEmail;
    resultArr[data.index].role = userRole;
    setCompleteData(resultArr);
    isEditable(false);
    alert("User Data updated successfully");
  };

  return (
    <div
      className="parent-modal"
      onClick={(event) => {
        if (event.target.className === "parent-modal") isEditable(false);
      }}
    >
      <div className="modal">
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div className="form-group">
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              name="id"
              id="id"
              value={userId}
              required
              onChange={(event) => {
                setUserId(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={userName}
              required
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={userEmail}
              required
              onChange={(event) => {
                setUserEmail(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input
              type="text"
              name="role"
              id="role"
              value={userRole}
              required
              onChange={(event) => {
                setUserRole(event.target.value);
              }}
            />
          </div>
          <div className="submit">
            <button className="btn" type="submit">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
