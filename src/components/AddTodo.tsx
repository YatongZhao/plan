import { Button, Form, Input, InputNumber, Modal, Segmented } from "antd";
import { useForm, useWatch } from "antd/lib/form/Form";
import type { FormInstance } from "antd";
import { useEffect, useMemo, useState } from "react";
import { todosActions } from "../features/todosSlice";
import { useAppDispatch } from "../store";
import * as uuid from 'uuid';
import styled from "styled-components";

const TimesBox = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const TimesInputNumber = styled(Input)`
  text-align: center;
  max-width: 40px;
`
const TargetUnitInputNumber = styled(Input)`
  text-align: center;
  max-width: 80px;
`
const StyledFormItemUnit = styled(Form.Item)`
  margin: 0 16px 0 4px;
`;
const NoMarginFormItem = styled(Form.Item)`
  margin: 0;
`;

export const unitMap: { [key: string]: string } = {
  'daily': '天',
  'weekly': '周',
  'monthly': '月',
  'quarterly': '季',
  'yearly': '年',
}

const AddTodoForm = ({ form }: {
  form: FormInstance<any>;
}) => {
  const unitNumber = useWatch('unitNumber', form);
  const unit = useWatch('unit', form);

  const target = useMemo(() => {
    return <NoMarginFormItem label="Target">
      <TimesBox>
        <Form.Item name="targetUnitNumber">
          <TargetUnitInputNumber type="number" />
        </Form.Item>
        <StyledFormItemUnit>
          <Segmented size="small" disabled options={[
            'X'
              + form.getFieldValue('unitNumber')
              + unitMap[form.getFieldValue('unit')]]} />
        </StyledFormItemUnit>
      </TimesBox>
    </NoMarginFormItem>
  }, [unit, unitNumber]);

  return <Form form={form} size="small" labelCol={{ span: 4 }} initialValues={{
    timesNumber: 1,
    unitNumber: 1,
    unit: 'daily',
  }}>
    <Form.Item name="title" label="Title">
      <Input placeholder="todo title" />
    </Form.Item>
    <NoMarginFormItem label="Times">
      <TimesBox>
        <Form.Item name="timesNumber">
          <TimesInputNumber type="number" />
        </Form.Item>
        <StyledFormItemUnit>
          <Segmented size="small" disabled options={['次']} />
        </StyledFormItemUnit>
        <Form.Item name="unitNumber">
          <TimesInputNumber type="number" />
        </Form.Item>
        <StyledFormItemUnit name="unit">
          <Segmented size="small" options={[
            { label: '天', value: 'daily' },
            { label: '周', value: 'weekly' },
            { label: '月', value: 'monthly' },
            { label: '季', value: 'quarterly' },
            { label: '年', value: 'yearly' },
          ]} />
        </StyledFormItemUnit>
      </TimesBox>
    </NoMarginFormItem>
    {target}
  </Form>;
}

const StyledButton = styled(Button)`
  border-radius: 10px;
`;
const ButtonContainer = styled.div`
  width: calc(100% - 60px);
  margin: 0 auto;
  background-color: rgba(255, 255, 255, .3);
  width: fit-content;
  border-radius: 10px;
  padding: 5px 10px;
`;

export const AddTodo = () => {
  const dispatch = useAppDispatch();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleClick = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const [form] = useForm();

  const handleOk = () => {
    dispatch(todosActions.upsertOne({
      id: uuid.v4(),

      title: form.getFieldValue('title'),
      startAt: Date.now(),
      endAt: null,

      timesNumber: form.getFieldValue('timesNumber'),
      unitNumber: form.getFieldValue('unitNumber'),
      unit: form.getFieldValue('unit'),

      targetUnitNumber: form.getFieldValue('targetUnitNumber'),

      lastClockInStamp: null,

      isDone: false,
    }));

    form.resetFields();
    setIsModalVisible(false);
  }


  return <>
    <ButtonContainer>
      <StyledButton type="primary" onClick={handleClick}>add</StyledButton>
    </ButtonContainer>
    <Modal transitionName="" title="ADD TODO" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <AddTodoForm form={form} />
    </Modal>
  </>;
}
