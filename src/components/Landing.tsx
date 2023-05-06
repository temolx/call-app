import UserTable from '../components/UserTable';
import InputForm from '../components/InputForm';
import { BGContainer } from '../Styles/Form.style';
import { useStore } from '../zustand/store';

function Landing() {

    const formVisibility = useStore((store) => store.formVisibility);

  return (
    <div>
        <UserTable />

        { formVisibility && <InputForm /> }
        { formVisibility && <BGContainer /> }
    </div>
  )
}

export default Landing