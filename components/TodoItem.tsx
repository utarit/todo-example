import { Todo } from "@/types";
import React, { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import EditModal from "./EditModal";
import { DEFAULT_DATE_FORMAT, DEFAULT_LOCALE } from "@/utils/dateUtils";

import styles from "./TodoItem.module.css";

interface Props {
  todo: Todo;
  onEdit?: (todo: Todo, newContent: string) => void;
  onArchive?: (todo: Todo) => void;
}

const TodoItem = ({ todo, onArchive, onEdit }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChecked = useCallback(() => {
    onArchive?.(todo);
  }, [onArchive, todo]);

  const handleEdit = useCallback(
    (newContent: string) => {
      setIsModalOpen(false);
      onEdit?.(todo, newContent);
    },
    [onEdit, todo]
  );

  const handleCheckboxKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleChecked();
    }
  };

  return (
    <li className={`w-full bg-slate-200 p-2 rounded-md mb-2 ${styles.fadeIn}`}>
      <div className="flex gap-4 items-start justify-between">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            disabled={todo.archived}
            className="w-5 h-5"
            onChange={handleChecked}
            checked={todo.archived}
            onKeyDown={handleCheckboxKeyDown}
          />
          <p
            className={`flex-1 ${
              todo.archived ? "line-through text-gray-500 italic" : ""
            }`}
          >
            {todo.content}
          </p>
        </label>
        {!todo.archived && (
          <button
            className="p-2 bg-gray-200 rounded-md text-sm hover:bg-gray-300 active:bg-gray-400"
            onClick={() => setIsModalOpen(true)}
          >
            Edit
          </button>
        )}
        {isModalOpen &&
          createPortal(
            <EditModal
              content={todo.content}
              onSave={handleEdit}
              onClose={() => setIsModalOpen(false)}
            />,
            document.body
          )}
      </div>
      <p className="text-xs text-gray-500 border-t-2 border-gray-300 pt-2 mt-2">
        <span className="font-bold">Created:</span>{" "}
        {todo.created.toLocaleDateString(DEFAULT_LOCALE, DEFAULT_DATE_FORMAT)}{" "}
      </p>
      {todo.lastUpdated && (
        <p className="text-xs text-gray-500 ">
          <span className="font-bold">Last Updated:</span>{" "}
          {todo.lastUpdated.toLocaleDateString(
            DEFAULT_LOCALE,
            DEFAULT_DATE_FORMAT
          )}
        </p>
      )}
    </li>
  );
};

export default TodoItem;
