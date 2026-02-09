import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./test.css";
import Header from "../../components/Header/Header";
import FooterSection from "../../components/Footer/footer";
import { apiGet } from "../../api/axios";
import Syllabus from "../../components/syllabus/Syllabus";

function TestSyllabus() {
  const navigate = useNavigate();

  const handleClick = (title, id) => {
    // console.log(title, id, "paramssssss");
    navigate("/testRules", { state: { title, id } });
  };

  return (
    <>
      <Syllabus handleClick={handleClick} syllabusType="Test" />
    </>
  );
}

export default TestSyllabus;
