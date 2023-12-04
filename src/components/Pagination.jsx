import React from "react";
import "./Pagination.css"

export const Pagination = ({ currentPage, totalPages, onPageChange, onPrevPage, onNextPage }) => {
  return (
    <div className="pagination align-items-center justify-content-center">
      <button className="btn btn-primary m-2" onClick={onPrevPage} disabled={currentPage === 1}>
        Anterior
      </button>
      {[...Array(totalPages).keys()].map((number) => (
        <button
          key={number + 1}
          onClick={() => onPageChange(number + 1)}
          className={currentPage === number + 1 ? "current-page" : "other-page"}
        >
          {number + 1}
        </button>
      ))}
      <button
        className="btn btn-primary m-2"
        onClick={onNextPage}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};