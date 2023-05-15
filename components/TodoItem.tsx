import { Todo } from "@/types";
import React, { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import EditModal from "./EditModal";
import { DEFAULT_DATE_FORMAT, DEFAULT_LOCALE } from "@/utils/dateUtils";

interface Props {
  todo: Todo;
  onEdit?: (todo: Todo, newContent: string) => void;
  onArchive?: (todo: Todo) => void;
}

const penIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
  </svg>
);

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

  return (
    <li className="w-full bg-slate-200 p-2 rounded-md mb-2 ">
      <div className="flex gap-4 items-start justify-between">
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            disabled={todo.archived}
            className="w-5 h-5"
            onChange={handleChecked}
            checked={todo.archived}
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
            className="p-2 bg-gray-200 rounded-md"
            aria-label="Edit todo"
            onClick={() => setIsModalOpen(true)}
          >
            {penIcon}
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
