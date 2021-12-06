export const DragDropObject = {
  dragItem: {
    "todo-1": { id: "todo-1", content: "todo-sample1" }
  },
  dropZone: {
    "column-1": { id: "column-1", title: "Delete" },
    "column-2": {
      id: "column-2",
      title: "Todo",
      todoIds: ["todo-1"]
    },
    "column-3": { id: "column-3", title: "In progress", todoIds: [] },
    "column-4": { id: "column-4", title: "Done", todoIds: [] }
  },
  dropZoneOrder: ["column-1", "column-2", "column-3", "column-4"]
};
