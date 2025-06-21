import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './training.css';
import Header from '../../components/Header/Header';
import FooterSection from '../../components/Footer/footer';
import { apiGet } from '../../api/axios';
import Syllabus from '../../components/syllabus/Syllabus';

const TrainingSyllabus = () => {
  
  return (
    <>
      <Syllabus/>
    </>
  );
}

export default TrainingSyllabus;