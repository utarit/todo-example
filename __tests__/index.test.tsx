import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Home from "@/app/page";
import { DEFAULT_DATE_FORMAT, DEFAULT_LOCALE } from "@/utils/dateUtils";

it("the user can add an item to the list", async () => {
  render(<Home />);
  const user = userEvent.setup();

  // Write a todo in the input which is labeled "Add to-do"
  const input = screen.getByRole("textbox", { name: "Add todo" });
  await user.type(input, "Buy milk");

  const addButton = screen.getByRole("button", { name: "Add" });
  await user.click(addButton);
  const currentDate = new Date();

  // The todo should be in the list
  expect(
    screen.getByRole("checkbox", { name: "Buy milk" })
  ).toBeInTheDocument();

  // Expect creation date
  expect(screen.getByText("Created:")).toBeInTheDocument();
  expect(
    screen.getByText(
      currentDate.toLocaleDateString(DEFAULT_LOCALE, DEFAULT_DATE_FORMAT),
      { exact: false }
    )
  ).toBeInTheDocument();
});

it("the user can edit an item in the list", async () => {
  render(<Home />);
  const user = userEvent.setup();

  // Write a todo in the input
  const input = screen.getByRole("textbox", { name: "Add todo" });
  await user.type(input, "Buy milk");

  const addButton = screen.getByRole("button", { name: "Add" });
  await user.click(addButton);

  // The todo should be in the list with edit button
  const editButton = screen.getByRole("button", { name: "Edit" });
  expect(editButton).toBeInTheDocument();

  await user.click(editButton);

  // Expect a text input with the value of to-do to be edited
  const editInput = screen.getByRole("textbox", { name: "Edit todo" });
  expect(editInput).toHaveValue("Buy milk");

  // Edit the input
  await user.clear(editInput);
  await user.type(editInput, "Buy eggs");

  // Save changes
  const saveButton = screen.getByRole("button", { name: "Submit" });
  await user.click(saveButton);
  const editedDate = new Date();

  // the todo should be changed with the new value
  expect(
    screen.queryByRole("checkbox", { name: "Buy milk" })
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("checkbox", { name: "Buy eggs" })
  ).toBeInTheDocument();

  // Expect creation date

  expect(screen.getByText("Created:")).toBeInTheDocument();

  // Expect edited date
  expect(screen.getByText("Last Updated:")).toBeInTheDocument();

  const elements = screen.getAllByText(
    editedDate.toLocaleDateString(DEFAULT_LOCALE, DEFAULT_DATE_FORMAT)
  );

  expect(elements.length).toBeGreaterThanOrEqual(1);
});

it("the user can mark an item as done in the list and see it archived", async () => {
  render(<Home />);
  const user = userEvent.setup();

  // Write a todo in the input which is labeled "Add to-do"
  const input = screen.getByRole("textbox", { name: "Add todo" });
  await user.type(input, "Buy milk");

  const addButton = screen.getByRole("button", { name: "Add" });
  await user.click(addButton);

  const todoList = screen.getByRole("list", { name: /todo list/i });
  const archivedList = screen.getByRole("list", { name: /archived list/i });

  // The todo should be in the todo list
  expect(
    screen.getByRole("checkbox", { name: "Buy milk" })
  ).toBeInTheDocument();

  expect(todoList.hasChildNodes()).toBe(true);
  expect(archivedList.hasChildNodes()).toBe(false);

  // Expect a checkbox to mark the item as done
  const checkbox = screen.getByRole("checkbox", { name: "Buy milk" });
  expect(checkbox).not.toBeChecked();

  // Click checkbox to mark as done
  await user.click(checkbox);

  // The todo should be marked as done and gone from the list
  expect(todoList.hasChildNodes()).toBe(false);
  expect(archivedList.hasChildNodes()).toBe(true);

  // Buy milk should appear in archived list and have line-through
  expect(screen.getByText("Buy milk")).toHaveClass("line-through");
});
