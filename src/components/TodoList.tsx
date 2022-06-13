import { Button, Checkbox, List } from "antd";
import styled from "styled-components";
import { v4 } from "uuid";
import { clockInsActions } from "../features/clockInsSlice";
import { activeTodosSelector, doneTodosSelector, Todo, todosActions, undoneTodosSelector } from "../features/todosSlice";
import { useAppDispatch, useAppSelector } from "../store";

const TodoListWrapper = styled.div`
`;
const StyledListItem = styled(List.Item)`
  padding: 0;
`;
const StyledCheckbox = styled(Checkbox)`
  width: 100%;
  padding: 10px;
`;

const TodoItem = ({ todo, disabled }: { todo: Todo; disabled?: boolean; }) => {
  const dispatch = useAppDispatch();

  const handleClockIn = () => {
    dispatch(clockInsActions.upsertOne({
      id: v4(),
      todoId: todo.id,
      timeStamp: Date.now(),
    }));
  }

  return <>
    <StyledCheckbox disabled={disabled} key={todo.id} checked={todo.isDone} onChange={handleClockIn}>
      {todo.title}
    </StyledCheckbox>
    <Button disabled={disabled} size="small" type="primary" danger>DELETE</Button>
  </>
}

const TodoListHeader = ({ title }: { title: string; }) => {
  return <div>{title}</div>
}

export const TodoList = ({ todos, disabled, title }: {
  todos: Todo[];
  disabled?: boolean;
  title: string;
}) => {
  return <TodoListWrapper>
    <List
      bordered
      header={<TodoListHeader title={title} />}
      dataSource={todos}
      renderItem={todo => (
        <StyledListItem>
          <TodoItem disabled={disabled} todo={todo} />
        </StyledListItem>
      )}
    />
  </TodoListWrapper>;
}

export const ActiveTodoList = () => {
  const todos = useAppSelector(activeTodosSelector);
  return <TodoList todos={todos} title="所有可以打卡的TODO" />;
}

export const UndoneTodoList = () => {
  const todos = useAppSelector(undoneTodosSelector);
  return <TodoList todos={todos} disabled={true} title="所有没有标记为结束的TODO" />;
}

export const DoneTodoList = () => {
  const todos = useAppSelector(doneTodosSelector);
  return <TodoList todos={todos} disabled={true} title="所有标记为结束的TODO" />;
}
