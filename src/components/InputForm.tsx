import { Form, Input, Select, Button } from "antd"
import { columns } from "../Table Data/TableLayout";
import { FormContainer } from "../Styles/Form.style";
import { useStore, emptyFormData } from "../zustand/store";
import { useState } from "react";
import { postUser, editUser } from "../API/apiData";

export type formType = {
  name: string,
  email: string,
  gender: string,
  city: string,
  street: string,
  phone: string
}

function InputForm() {

  const showForm = useStore((store) => store.showForm);
  const addUser = useStore((store) => store.addUser);
  const editUserTemp = useStore((store) => store.editUserTemp);
  const fillForm = useStore((store) => store.fillForm);

  const defaultData = useStore((store) => store.defaultData); // default data for form editing.

  const[formData, setFormData] = useState<formType>(defaultData.data)
  
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };

  const handleSubmit = () => {
    if (Object.values(defaultData.data).every((input) => input === '')) { // new item is being added
      postUser('/users', {
        name: formData.name,
        email: formData.email,
        address: {
          city: formData.city,
          street: formData.street,
        },
        gender: formData.gender,
        phone: formData.phone
      })
        .then((res) => {
          addUser(res.data.user); // adding data to Zustland for display purposes
          console.log(res)
        })
        .catch((err) => console.log(err));
    }

    else { // an item is being edited

      const updatedData = {
        name: formData.name,
        email: formData.email,
        address: {
          city: formData.city,
          street: formData.street,
        },
        gender: formData.gender,
        phone: formData.phone
      }

      editUser('/users', defaultData.currentID, updatedData)
        .then((res) => {
          editUserTemp(defaultData.currentID, { id: defaultData.currentID, ...updatedData }); // updating data in Zustland for display purposes
          console.log(res);
        }).catch((err) => console.log(err));
    }
    
    fillForm({ data: emptyFormData, currentID: 0 });
    showForm(); // hide form after submission
  }

  return (
    <FormContainer>
      <Form {...layout} id='userForm' onFinish={handleSubmit} initialValues={defaultData.data}>
        { columns.map((inputName) => (
          inputName.dataIndex !== 'gender' ?
          <Form.Item name={inputName.dataIndex} label={inputName.title} rules={[{ required: true }]} key={inputName.key}>
            <Input onChange={(e) => setFormData({
              ...formData,
              [inputName.dataIndex]: e.target.value
            })} />
          </Form.Item>
            :
          <Form.Item name={inputName.dataIndex} label={inputName.title} rules={[{ required: true }]} key={inputName.key}>
            <Select onSelect={(value) => setFormData({
              ...formData,
              [inputName.dataIndex]: value
            })}>
              <Select.Option value="male">male</Select.Option>
              <Select.Option value="female">female</Select.Option>
              <Select.Option value="other">other</Select.Option>
            </Select>
          </Form.Item>
        )) }
      </Form>

        <Button type='primary' form='userForm' key='submit' htmlType='submit' style={{ margin: '10px' }}>Submit</Button>
        <Button onClick={() => { showForm(); fillForm({ data: emptyFormData, currentID: 0 }) }}>Cancel</Button>
    </FormContainer>
  )
}

export default InputForm