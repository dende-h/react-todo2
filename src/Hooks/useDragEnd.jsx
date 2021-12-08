import { useRecoilState } from "recoil";
import { todoListState } from "../components/atoms/todoListState";

export const useDragEnd = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  //ColumnDeleteAreaコンポーネントに渡すpropsの定義
  //ColumnDropAreaコンポーネントに渡すpropsの定義
  // "column-1"=deleteZonId
  //["column-2", "column-3", "column-4"]=columunsId
  const [deleteZoneId, ...columnsId] = todoList.dropZoneOrder;

  //  { id: "column-1", title: "Delete", todoIds: [] }
  const deleteColumn = todoList.dropZone[deleteZoneId];
  //DragDropContextのpropsドラッグが終了したときの処理
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      //console.log(destination.droppableId);
      //console.log(source.droppableId);
      return;
    }

    const start = todoList.dropZone[source.droppableId];
    const finish = todoList.dropZone[destination.droppableId];
    const del = todoList.dropZone[deleteZoneId];

    if (start === finish) {
      const newTaskIds = Array.from(start.todoIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        todoIds: newTaskIds
      };

      const newState = {
        ...todoList,
        dropZone: {
          ...todoList.dropZone,
          [newColumn.id]: newColumn
        }
      };
      setTodoList(newState);
      return;
    }
    if (finish === del) {
      //console.log(destination.droppableId);
      const startTaskIds = Array.from(start.todoIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        todoIds: startTaskIds
      };
      //console.log(newStart);
      const newState = {
        ...todoList,
        dropZone: {
          ...todoList.dropZone,
          [newStart.id]: newStart
        }
      };
      setTodoList(newState);
      return;
    }
    // console.log(finish);
    const startTaskIds = Array.from(start.todoIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      todoIds: startTaskIds
    };
    const finishTaskIds = Array.from(finish.todoIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      todoIds: finishTaskIds
    };
    const newState = {
      ...todoList,
      dropZone: {
        ...todoList.dropZone,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    setTodoList(newState);
  };
  return { todoList, onDragEnd, deleteZoneId, deleteColumn, columnsId };
};
