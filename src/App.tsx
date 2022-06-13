import './App.css';
import styled from 'styled-components';
import { AddTodo } from './components/AddTodo';
import { Col, Row } from 'antd';
import { Dashboard } from './components/Dashboard';
import { OperationPanel } from './components/OperationPanel';

const Wrapper = styled.div`
  padding: 1px;
  padding-bottom: 50px;
`;

const StyledCol = ({ children }: {
  children: React.ReactNode
}) => {
  return <Col
    xs={{ offset: 0, span: 24 }}
    lg={{ offset: 6, span: 12 }}
  >
    {children}
  </Col>
}

const Bottom = styled(Row)`
  position: sticky;
  bottom: 10px;
  z-index: 100;
`;

function App() {
  return (
    <Wrapper>
      <Row gutter={[{ xs: 2, lg: 8 }, { xs: 2, lg: 8 }]}>
        <StyledCol>
          <Dashboard />
        </StyledCol>
        <StyledCol>
          <OperationPanel />
        </StyledCol>
      </Row>
      <Bottom gutter={[{ xs: 2, lg: 8 }, { xs: 2, lg: 8 }]}>
        <StyledCol>
          <AddTodo />
        </StyledCol>
      </Bottom>
    </Wrapper>
  );
}

export default App;
