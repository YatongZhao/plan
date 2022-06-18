import { DeleteFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Tag } from "antd"
import { useMemo, useState } from "react";
import styled from "styled-components"
import { COLORS } from "../constant";
import { generateClockIn, getGoByCycleNumber, getTimes } from "../features/clockInsSlice";
import { getBaseTime, getTimeSum, isTodoActive, Todo, todosSelectors } from "../features/todosSlice"
import { useClockInHandler, useClockIns, useCurrentClockInNumber, useDeleteTodo } from "../hooks";
import { getScore } from "../score";
import { useAppSelector } from "../store"
import { unitMap } from "./AddTodo";

const StyledCard = styled(Card)`
  overflow: hidden;
  color: white;
  border-radius: 20px;
  margin: 5px 15px;
  .ant-card-body {
    padding: 6px 6px 8px;
  }
`;
const TransBackground = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: crimson;
  transition: height 1s cubic-bezier(0, 0.4, 0, 0.4),
    opacity 1s cubic-bezier(0, 0.4, 0, 0.4);
`;

const actionsHeight = '24px';
const CardContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  padding-bottom: ${actionsHeight};
`;
const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;
const CardStatus = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
`;
const StatusTag = styled(Tag)`
  font-weight: 700;
`;
const CardTitle = styled.div`
  font-size: 22px;
  padding-left: 20px;
`;
const AddedScore = styled.span`
  font-size: 20px;
  margin-left: 20px;
`;

const Score = styled.div`
  font-size: 56px;
  margin: -14px 5px -20px 0;
  flex-shrink: 0;
`;
const Actions = styled.div`
  height: ${actionsHeight};
  width: 100%;
  background-color: rgba(0, 0, 0, .1);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
const Mask = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const DeleteTodoButton = ({ todo }: {
  todo: Todo;
}) => {
  const handleDelete = useDeleteTodo(todo.id);

  const handleClick = () => {
    Modal.confirm({
      title: 'Are you sure delete this TODO?',
      icon: <ExclamationCircleOutlined />,
      content: todo.title,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: handleDelete,
    });
  }

  return <Button
    style={{ color: 'white' }}
    type="link"
    size="small"
    onMouseDown={e => e.stopPropagation()}
    onTouchStart={e => e.stopPropagation()}
    onClick={handleClick}
    icon={<DeleteFilled />} />
}

const TodoCard = ({ todo }: {
  todo: Todo;
}) => {
  const disabled = !isTodoActive(todo);
  const [bgHeight, setBgHeight] = useState<0 | 100>(0);
  const [opacity, setOpacity] = useState<0 | 1>(1);

  const currentClockIns = useCurrentClockInNumber(todo.id, todo.unitNumber, todo.unit);

  const { beginHeightTransition, removeMouseUpListener, handleTouchMove } = useMemo(() => {
    let timer: NodeJS.Timeout;
    const handleMouseUp = () => {
      clearTimeout(timer);
      setBgHeight(0);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    }

    const handleTouchMove = () => {
      setBgHeight(0);
      clearTimeout(timer);
    }

    const beginHeightTransition = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setBgHeight(100);
      }, 80);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    const removeMouseUpListener = () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    }

    return {
      beginHeightTransition,
      removeMouseUpListener,
      handleTouchMove,
    };
  }, []);

  const handleMouseDown = () => {
    if (disabled) return;
    beginHeightTransition();
  }

  const handleClockIn = useClockInHandler(todo.id);
  const handleTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = (e) => {
    switch (e.propertyName) {
      case 'height':
        removeMouseUpListener();
        if (bgHeight === 100) {
          handleClockIn();
          setOpacity(0);
        } else {
          setOpacity(1);
        }
        break;
      case 'opacity':
        if (opacity === 0) {
          setBgHeight(0);
        }
        break;
      default:
        break;
    }
  }

  const clockIns = useClockIns(todo.id);
  const score = getScore(
    ...getTimes(clockIns, todo.targetUnitNumber, todo.unit, todo.unitNumber),
    getBaseTime(todo),
    getTimeSum(todo)
  );
  const afterAddScore = getScore(
    ...getTimes([...clockIns, generateClockIn(todo.id, Date.now())], todo.targetUnitNumber, todo.unit, todo.unitNumber),
    getBaseTime(todo),
    getTimeSum(todo)
  );
  const goByCycleNumber = getGoByCycleNumber(clockIns, todo.unit, todo.unitNumber);

  return <StyledCard
    bordered={false}
    style={{ backgroundColor: disabled ? 'rebeccapurple' : COLORS[~~(score)] }}
    onMouseDown={handleMouseDown}
    onTouchStart={handleMouseDown}
    onTouchMove={handleTouchMove}
  >
    <Mask>
      <Actions>
        <DeleteTodoButton todo={todo} />
      </Actions>
    </Mask>
    <TransBackground style={{ height: bgHeight + '%', opacity }} onTransitionEnd={handleTransitionEnd} />
    <CardContent>
      <CardDetail>
        <CardStatus>
          <div>
            <Tag color="transparent">
              {todo.timesNumber}({currentClockIns.length})次/{todo.unitNumber}{unitMap[todo.unit]}
            </Tag>
            <Tag color="transparent">
              {goByCycleNumber}/{todo.targetUnitNumber}
            </Tag>
          </div>
        </CardStatus>
        <CardTitle>
          {todo.title}
          <AddedScore>+{(afterAddScore - score).toFixed(1)}</AddedScore>
        </CardTitle>
      </CardDetail>
      <Score>
        {score.toFixed(1)}
      </Score>
    </CardContent>
  </StyledCard>
}

export const OperationPanel = () => {
  const todos = useAppSelector(todosSelectors.selectAll);

  return <>
    {todos.map(todo => <TodoCard key={todo.id} todo={todo} />)}
  </>
}