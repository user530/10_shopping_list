import React from "react";
import { FaEdit, FaTrash, FaCheck } from "react-icons/fa";

const List = ({ items, removeItem, editItem, markItem }) => {
  return (
    <div className="grocery-list">
      {items.map(({ id, title, done }) => {
        return (
          <article className="grocery-item" key={id}>
            <p className={`title ${done && "strike-through"}`}>{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="mark-btn"
                onClick={() => markItem(id)}
              >
                <FaCheck />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
