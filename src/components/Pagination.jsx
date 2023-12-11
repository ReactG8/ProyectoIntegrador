import React from "react";
import "./Pagination.css";

export const Pagination = ({ currentPage, totalPages, onPageChange, onPrevPage, onNextPage }) => {
  const visiblePageCount = 2; // Define cuántas páginas quieres mostrar alrededor de la página actual

  const generatePageButtons = () => {
    const pages = [];

    for (let number = Math.max(1, currentPage - visiblePageCount); number <= Math.min(currentPage + visiblePageCount, totalPages); number++) {
      pages.push(
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? "current-page" : "other-page"}
        >
          {number}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination align-items-center justify-content-center">
      <button className="btn btn-primary m-2" onClick={onPrevPage} disabled={currentPage === 1}>
        Anterior
      </button>
      {generatePageButtons()}
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
