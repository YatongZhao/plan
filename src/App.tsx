import './App.css';
import styled from 'styled-components';
import { AddTodo } from './components/AddTodo';
import { Button, Col, Row } from 'antd';
import { Dashboard } from './components/Dashboard';
import { OperationPanel } from './components/OperationPanel';
import { AppHeader } from './components/AppHeader';
import { HistoryOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';

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
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
`;

const Main = styled(Row)`
  padding-bottom: 50px;
`

const Bottom = styled(Row)`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  /* padding-top: 150px; */
  bottom: 15px;
  z-index: 100;
`;

const ButtonContainer = styled.div`
  width: calc(100% - 60px);
  margin: 0 auto;
  background-color: rgba(255, 255, 255, .3);
  width: fit-content;
  border-radius: 5px;
  padding: 5px 9px;
`;

const StyledButton = styled(Button)`
  margin-left: 5px;
  border-radius: 5px;
`;

function App() {
  return (
    <Wrapper>
      <Header style={{ zIndex: 200 }} gutter={[{ xs: 2, lg: 8 }, { xs: 2, lg: 8 }]}>
        <StyledCol>
          <AppHeader />
        </StyledCol>
      </Header>
      <Row style={{ zIndex: -1 }} gutter={[{ xs: 2, lg: 8 }, { xs: 2, lg: 8 }]}>
        <StyledCol>
          <Dashboard />
        </StyledCol>
      </Row>
      <Main style={{ backgroundColor: 'mediumturquoise' }} gutter={[{ xs: 2, lg: 8 }, { xs: 2, lg: 8 }]}>
        <StyledCol>
          <OperationPanel />
        </StyledCol>
      </Main>
      <Bottom gutter={[{ xs: 2, lg: 8 }, { xs: 2, lg: 8 }]}>
        <StyledCol>
          <ButtonContainer>
            <AddTodo />
            <StyledButton type="primary" icon={<HistoryOutlined />} />
            <StyledButton type="primary" icon={<QuestionOutlined />} />
          </ButtonContainer>
        </StyledCol>
      </Bottom>
    </Wrapper>
  );
}

export default App;
