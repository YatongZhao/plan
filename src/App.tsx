import './App.css';
import styled from 'styled-components';
import { AddTodo } from './components/AddTodo';
import { Col, Row } from 'antd';
import { Dashboard } from './components/Dashboard';
import { OperationPanel } from './components/OperationPanel';
import { AppHeader } from './components/AppHeader';

const Wrapper = styled.div`
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

const Header = styled(Row)`
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Bottom = styled(Row)`
  position: sticky;
  bottom: 5px;
  z-index: 100;
`;

function App() {
  return (
    <Wrapper>
      <Row style={{ zIndex: -1 }} gutter={[{ xs: 2, lg: 8 }, { xs: 2, lg: 8 }]}>
        <StyledCol>
          <Dashboard />
        </StyledCol>
      </Row>
      <Header style={{ zIndex: 200 }} gutter={[{ xs: 2, lg: 8 }, { xs: 2, lg: 8 }]}>
        <StyledCol>
          <AppHeader />
        </StyledCol>
      </Header>
      <Row style={{ backgroundColor: 'mediumturquoise' }} gutter={[{ xs: 2, lg: 8 }, { xs: 2, lg: 8 }]}>
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
