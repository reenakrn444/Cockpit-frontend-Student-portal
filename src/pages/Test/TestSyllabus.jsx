import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './test.css';
import Header from '../../components/Header/Header';
import FooterSection from '../../components/Footer/footer';
import { apiGet } from '../../api/axios';
import Syllabus from '../../components/syllabus/Syllabus';

function TestSyllabus() {

  const[syllabus, setSyllabus]= useState([]);

   const navigate = useNavigate();

  const handleClick = (params) => {
    navigate('/testRules', { state: params }); 
  };

  return (
       <>
    
      <Syllabus handleClick={handleClick}/>
    
    </>
  );
}

export default TestSyllabus;