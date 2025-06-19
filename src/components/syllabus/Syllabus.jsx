// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { apiGetToken } from '../../api/axios';
// import './syllabus.css';

// function Syllabus({handleClick}) {

//   const[syllabus, setSyllabus]= useState([]);

// useEffect(()=>{
//       const fetchSyllabus = async () => {
//       try {
//         const response = await apiGetToken('/getSyllabus')
//         setSyllabus(response.data.data);

//       } catch (error) {
//         console.error('Error fetching syllabus:', error);
//       }
//     };

//     fetchSyllabus();

// },[])

//   return (
//        <>
//       <section className="p-5 bg-light">
//         <div className="container">
//           <h1 className="fw-bold text-dark-blue mb-3">
//             Discover Our DGCA Question Banks
//           </h1>
//           <p className="text-muted fs-5">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in libero risus semper habitant arcu eget.
//           </p>
//         </div>
//       </section>
//       <div className="container mb-5" >
//         <div className="course-grid-container" style={{display:'flex', gap:'50px'}}>
//           {syllabus.map((course, index) => (
//             <div className="course-card" key={index}>
//               <div className="course-image">
//                 <img src={course.imageUrl} alt={course.title} />
//               </div>
//               <div className="course-content">
//                 <h4 style={{fontWeight:'bold'}}>{course.title}</h4>
//                 <p style={{color:'#EAB308'}}>{course.category}</p>
//                 <button className="start-btn" onClick={()=> handleClick(course.title)}>Start</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Syllabus;

import { apiGetToken } from "../../api/axios";

const Syllabus = ({ handleClick }) => {
  const [syllabus, setSyllabus] = useState([]);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        const response = await apiGetToken("/getSyllabus");
        setSyllabus(response.data.data);
      } catch (error) {
        console.error("Error fetching syllabus:", error);
      }
    };
    fetchSyllabus();
  }, []);

  return (
    <>
      <Box sx={{ py: 5, bgcolor: "#f8f9fa" }} p={5}>
        <Typography variant="h4" fontWeight={700} color="primary" mb={2}>
          Discover Our DGCA Question Banks
        </Typography>
        <Typography variant="body1" color="text.secondary" fontSize={18} mb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in
          libero risus semper habitant arcu eget.
        </Typography>

        {/* <Container sx={{ mb: 5 }}> */}
        <Grid container spacing={2} >
          {syllabus.map((course, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
              {/* <Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%" }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={course.imageUrl}
                  alt={course.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#EAB308", mb: 2 }}>
                    {course.category}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleClick(course.title)}
                    sx={{
                      backgroundColor: "#f1b600",
                      color: "#000",
                      fontWeight: 600,
                      width: "fit-content",
                      padding: "5px",
                      textTransform: "none",
                      display: "flex",
                      borderRadius: "8px",
                      justifyContent: "center",
                      alignItems: "center",
                      "&:hover": {
                        backgroundColor: "#d9a600",
                      },
                    }}
                  >
                    Start
                  </Button>
                </CardContent>
              </Card> */}
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  // p: 2,
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={course.imageUrl}
                  alt={course.title}
                />
                <Box sx={{ ml: 2 }}>

                  <CardContent sx={{ px: 0 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#EAB308" }}>
                      {course.category}
                    </Typography>
                  </CardContent>
                </Box>

                {/* Button as Footer */}
                <Box mt="auto" py={2} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    onClick={() => handleClick(course.title)}
                    sx={{
                      backgroundColor: "#EAB308",
                      color: "#FFFFFF",
                      fontWeight: 600,
                      px: 4,
                      borderRadius: "8px",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#d9a600",
                      },
                    }}
                  >
                    Start
                  </Button>
                </Box>
              </Card>

            </Grid>
          ))}
        </Grid>
        {/* </Container> */}
      </Box>

    </>
  );
};

export default Syllabus;
