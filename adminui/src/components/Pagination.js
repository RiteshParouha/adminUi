import React from "react";
import "./Pagination.css";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";
function Pagination({ data, dataPerPage, setDataPerPage }) {
  /** This function handles which data we have to show at a time.
   * @param {Array} data
   * It contains all the data from table
   *
   * @param {Number} dataPerPage
   * It stores the page number that we want to show the user
   *
   * @param {function} setDataPerPage
   * It is used to change the dataPerPage variable
   *
   * @param {Array} button
   *  It stores the JSX, the Button array that we want to display on the page
   * It is dynamic, i.e. its length changes according to the Total data of table
   */
  let buttonArray = [];

  let dataLength = data.length;

  (function (data) {
    for (
      let i = 0;
      i <= (dataLength % 10 === 0 ? (dataLength - 1) / 10 : dataLength / 10);
      i++
    ) {
      buttonArray.push(
        <button
          key={i + 1}
          className="pagination-button number-button"
          onClick={() => setDataPerPage(i + 1)}
        >
          {i + 1}
        </button>
      );
    }
  })(data);

  return (
    <div className="pagination-parent">
      <button
        className="pagination-button"
        onClick={() => {
          setDataPerPage(1);
        }}
      >
        <AiOutlineDoubleLeft />
      </button>
      <button
        className="pagination-button"
        onClick={() => {
          if (dataPerPage > 1) {
            setDataPerPage(dataPerPage - 1);
          }
        }}
      >
        <MdArrowBackIosNew />
      </button>
      {buttonArray}
      <button
        className="pagination-button"
        onClick={() => {
          if (dataPerPage < buttonArray.length) {
            setDataPerPage(dataPerPage + 1);
          }
        }}
      >
        <MdArrowForwardIos />
      </button>
      <button
        className="pagination-button"
        onClick={() => {
          setDataPerPage(buttonArray.length);
        }}
      >
        <AiOutlineDoubleRight />
      </button>
    </div>
  );
}

export default Pagination;
