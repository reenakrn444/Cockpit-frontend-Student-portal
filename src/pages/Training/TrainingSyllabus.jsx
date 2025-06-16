import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './training.css';
import Header from '../../components/Header/Header';
import FooterSection from '../../components/Footer/footer';
import { apiGet } from '../../api/axios';
import Syllabus from '../../components/syllabus/Syllabus';

function TrainingSyllabus() {

   const navigate = useNavigate();

  const handleClick = (params) => {
    navigate('/chapter', { state: params }); 
  };
        
  return (
    <>
      
      <Syllabus handleClick={handleClick}/>
     
    </>
  );
}

export default TrainingSyllabus;