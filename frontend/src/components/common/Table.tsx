import React from 'react';
import './Table.css';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
  isLoading?: boolean;
}

const Table = ({ headers, children, isLoading }: TableProps) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {headers.map((_, j) => (
                  <td key={j}>
                    <div className="skeleton" />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
