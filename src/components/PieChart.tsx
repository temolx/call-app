import { Pie } from "@ant-design/charts";
import { useStore, usersList } from "../zustand/store";
import { Typography, Button } from 'antd';
import { ChartContainer, HeadingContainer } from "../Styles/Chart.style";
import { Link } from 'react-router-dom';

function PieChart() {

    const users = useStore<usersList[]>((store) => store.users);
    
    const data = users.map((user: usersList) => {
        return {
            type: user.address.city,
            value: Math.round(((users.filter((el: usersList) => el.address.city === user.address.city).length / users.length) * 100) * 100) / 100
        }
    })

    const config = {
        appendPadding: 15,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        label: {
          type: 'inner',
          offset: '-30%',
          style: {
            fontSize: 16,
            textAlign: 'center',
          },
        },
        interactions: [
          {
            type: 'element-active',
          },
        ],
      };

  return (
    <ChartContainer>
      <HeadingContainer>
        <Typography.Title className='mainTitle'>Statistics by Location</Typography.Title>
        <Link to='/'><Button size='middle' >Go Back</Button></Link>
      </HeadingContainer>

      <Pie {...config} />
    </ChartContainer>
  )
}

export default PieChart