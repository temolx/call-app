import { useEffect } from 'react'
import { fetchUsers } from '../API/apiData'
import { useStore, usersList } from '../zustand/store';
import { Table, Button } from 'antd';
import { columns } from '../Table Data/TableLayout';
import { deleteUser } from '../API/apiData';
import { ActionBtns } from '../Styles/User.styles';
import { Link } from 'react-router-dom';

export type dataSourceType = {
    id: number,
    name: string,
    email: string,
    gender: string,
    city: string,
    street: string,
    phone: string
  }

function UserTable() {

    const users = useStore<usersList[]>((store) => store.users);

    const setUsers = useStore((store) => store.setUsers);
    const deleteUserTemp = useStore((store) => store.deleteUserTemp);
    const showForm = useStore((store) => store.showForm);

    useEffect(() => {
        fetchUsers('/users')
          .then((res) => {
            setUsers(res);
            console.log(res);
          }).catch((err) => console.log(err))
      }, [setUsers])

      const dataSource = users.map((user: usersList) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        city: user.address.city,
        street: user.address.street,
        gender: user.gender,
        phone: user.phone
    }))

    const displayForm = () => {
        showForm(); // show form
    }

    const handleDelete = (userID: number) => {
        deleteUser('/users', userID)
            .then((res) => {
                deleteUserTemp(userID);  // deleting data from Zustland store for display purposes
                console.log(res);
            }).catch((err) => console.log(err));
    }

    const updatedColumns = [...columns, {
        title: '',
        dataIndex: 'actionBtns',
        key: 'actionBtns',
        render: (item: dataSourceType, record: dataSourceType) => 
          <div>
            <Button type='primary' size='small' style={{ marginRight: '10px' }} onClick={displayForm}>Edit</Button>
            <Button type='primary' size='small' danger onClick={() => handleDelete(record.id)}>Delete</Button>
          </div>
      }];

  return (
    <div>
        <ActionBtns>
          <Button type='primary' size='middle' onClick={displayForm} className='addBtn'>Add user</Button>
          <Link to='/stats'><Button size='middle' >Show Stats</Button></Link>
        </ActionBtns>

        <Table columns={updatedColumns} dataSource={dataSource} />
    </div>
  )
}

export default UserTable