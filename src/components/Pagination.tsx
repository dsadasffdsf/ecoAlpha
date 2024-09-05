import React, { FC } from 'react';

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ totalPage, currentPage, handlePageChange }) => {
  return (
    <div className="space-x-4 text-center mb-16">
      <button
        className={`${currentPage === 1 ? 'opacity-50' : ''}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        Previous
      </button>
      {Array.from({ length: totalPage }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={index + 1 === currentPage ? 'active-page' : ''}>
          {index + 1}
        </button>
      ))}
      <button
        className={`${currentPage === totalPage ? 'opacity-50' : ''}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
