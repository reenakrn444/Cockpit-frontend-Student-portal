import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './training.css';
import Header from '../../components/Header/Header';
import FooterSection from '../../components/Footer/footer';
import { apiGet } from '../../api/axios';
import Syllabus from '../../components/syllabus/Syllabus';

const TrainingSyllabus = () => {
   const navigate = useNavigate();

   const handleClick = (title, id) => {
    console.log(title, id, "paramssssss");

    navigate('/chapter', { state: { title, id } });
  };
  
  return (
    <>
      <Syllabus handleClick={handleClick}/>
    </>
  );
}

export default TrainingSyllabus;