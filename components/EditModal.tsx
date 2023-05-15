import React, { useCallback } from "react";

interface Props {
  content: string;
  onClose: () => void;
  onSave: (newContent: string) => void;
}

const EditModal = ({ content, onClose, onSave }: Props) => {
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.target as HTMLFormElement);
      const todo = (formData.get("todo") as string).trim();

      onSave(todo);
    },
    [onSave]
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-10">
      <form
        className="flex flex-col items-center gap-4 p-8 shadow-md my-4 w-full bg-yellow-100 z-20 fixed max-w-md top-1/4 rounded-lg"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col gap-2 items-center w-full">
          <h2 className="text-2xl font-bold">Edit Todo</h2>
          <textarea
            className="border border-gray-500 rounded-md p-2 w-full"
            placeholder="Add a new todo"
            required
            name="todo"
            maxLength={140}
            minLength={1}
            defaultValue={content}
          />
        </label>
        <div className="flex flex-row gap-4 w-full">
          <button
            className="w-full bg-red-500 rounded-md p-2"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="w-full bg-blue-500 rounded-md p-2" type="submit">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
