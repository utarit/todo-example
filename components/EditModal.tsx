import React, { useCallback, useEffect, useRef } from "react";

interface Props {
  content: string;
  onClose: () => void;
  onSave: (newContent: string) => void;
}

const EditModal = ({ content, onClose, onSave }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
        className="flex flex-col items-center gap-4 p-8 shadow-md my-4 w-full bg-gray-50 z-20 fixed max-w-md top-1/4 rounded-lg"
        onSubmit={handleSubmit}
      >
        <label className="flex flex-col gap-2 items-center w-full">
          <h2 className="text-2xl font-bold">Edit todo</h2>
          <input
            className="border border-gray-500 rounded-md p-2 w-full"
            required
            name="todo"
            maxLength={140}
            defaultValue={content}
            type="text"
            pattern=".*\S.*"
            ref={inputRef}
            title="Please enter a non-empty value"
          />
        </label>
        <div className="flex flex-row gap-4 w-full">
          <button
            className="w-full rounded-md p-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="w-full rounded-md p-2 bg-green-500  hover:bg-green-600 active:bg-green-700 text-white"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
