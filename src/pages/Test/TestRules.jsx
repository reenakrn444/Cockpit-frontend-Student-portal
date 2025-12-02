// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import './test.css';
// import Header from '../../components/Header/Header';
// import FooterSection from '../../components/Footer/footer';
// import { apiGet } from '../../api/axios';

// function TestRules() {

//     const location = useLocation();
//     const syllabusTitle = location.state;

//     const [books, setBooks] = useState([]);
//     const [activeBook, setactiveBook] = useState('rk bali');

//     useEffect(() => {
//         const fetchBooks = async () => {
//             try {
//                 const response = await apiGet('/getBooks');
//                 setBooks(response.data.books);
//             } catch (error) {
//                 console.error('Error fetching syllabus:', error);
//             }
//         };

//         fetchBooks();

//     }, [])

//     const navigate = useNavigate();
//     const handleClick = () => {
//         const token = localStorage.getItem('authToken');

//         if (token) {
//             navigate('/testpage', { state: { activeBook, syllabusTitle } });
//         } else {
//             navigate('/login');
//         }
//     };

//     return (
//         <>

//             <h1>{syllabusTitle} question banks</h1>
//             <ul className="nav nav-tabs custom-tabs">
//                 {books.map((book, index) => (
//                     <li className="nav-item" key={index}>
//                         <button
//                             className={`nav-link ${activeBook === book.bookTitle ? 'active' : ''}`}
//                             onClick={() => setactiveBook(book.bookTitle)}
//                         >
//                             {book.bookTitle}
//                         </button>
//                     </li>
//                 ))}
//             </ul>

//             <button onClick={handleClick}>Get started</button>

//         </>
//     );
// }

// export default TestRules;

import { apiGet, apiGetToken } from "../../api/axios";
import TestInstructions from "./TestInstructions";

const TestRules = () => {
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));
  const [completedChapterIds, setCompletedChapterIds] = useState(new Set());
  const location = useLocation();
  const locationData = location.state;

  const syllabusTitle = locationData?.title;
  const syllabusId = locationData?.id;
  const activeBookTab = locationData?.activeBookTab;
  const ActiveBookId = locationData?.activeBookId;
  const [activeBook, setActiveBook] = useState("");
  const [bookId, setBookId] = useState("");
  const tabRefs = useRef({});

  console.log(locationData, "locationData", syllabusTitle, "syllabusTitle");

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchBooksAndChapters = async () => {
      try {
        // const bookResponse = await apiGet('/getBooks');
        const bookResponse = await apiGet(`/booksBySyllabusId/${syllabusId}`);
        console.log(bookResponse, "bookResponse");

        const fetchedBooks = bookResponse?.data?.data;
        setBooks(fetchedBooks);

        const defaultBook = fetchedBooks[0] || "";
        setActiveBook(activeBookTab ? activeBookTab : defaultBook?.bookTitle);
        setBookId(ActiveBookId ? ActiveBookId : defaultBook?._id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBooksAndChapters();
  }, []);

  useEffect(() => {
    if (bookId && tabRefs.current[bookId]) {
      tabRefs.current[bookId].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [bookId, books]);

  return (
    <Box sx={{ mt: 0 }}>
      <Box sx={{ p: 4, backgroundColor: theme.header.background.default }}>
        <Typography
          variant="h4"
          fontWeight={700}
          color={theme.header.primary.text}
          gutterBottom
        >
          {/* {syllabusTitle} Question Banks */}
          {`${syllabusTitle
            .split(" ")
            .map(
              (word) =>
                word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase()
            )
            .join(" ")} Test Rules`}
        </Typography>
      </Box>

      <Box
        className="tabs-section"
        sx={{ p: isMobile ? 2 : 4, mt: 2, borderRadius: 2 }}
      >
        <Box
          className="custom-tabs"
          component="ul"
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
            display: "flex",
            overflowX: "auto",
            borderRadius: "10px 10px 0 0",
            backgroundColor: theme.syllabus.booksBackground,
          }}
        >
          {books.map((book, index) => (
            <Box
              component="li"
              className="nav-item"
              ref={(el) => (tabRefs.current[book._id] = el)}
              key={index}
              sx={{
                minWidth: { xs: "60%", sm: "40%", md: "25%" },
                flex: 1,
                borderRight: `1px solid ${theme.syllabus.booksBackground}`,
              }}
            >
              <Button
                fullWidth
                className={`nav-link ${bookId === book._id ? "active" : ""}`}
                onClick={() => {
                  setActiveBook(book.bookTitle);
                  setBookId(book._id);
                }}
                sx={{
                  backgroundColor:
                    bookId === book._id
                      ? theme.palette.mode === "dark"
                        ? "#15101088" // ACTIVE (dark)
                        : "#ffffff" // ACTIVE (light)
                      : "#16355c",
                  color:
                    bookId === book._id
                      ? "#fbbd00 !important"
                      : "#ffffff !important",
                  border: "none",
                  padding: "12px 20px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  borderRadius: 0,
                  transition: "0.3s",

                  "&:hover": {
                    backgroundColor:
                      bookId === book._id
                        ? "#ffffff !important"
                        : "#0d2742 !important",
                    color:
                      bookId === book._id
                        ? "#fbbd00 !important"
                        : "#EAB308 !important",
                  },
                }}
              >
                {book.bookTitle}
              </Button>

              {/* <Button
                fullWidth
                className={`nav-link ${bookId === book._id ? "active" : ""}`}
                onClick={() => {
                  {
                    console.log(book, "booksdata");
                  }
                  setActiveBook(book.bookTitle);
                  setBookId(book?._id);
                }}
                sx={{
                  backgroundColor: bookId === book._id ? "#000000" : "#16355c",
                  color: bookId === book._id ? "#fbbd00" : "#fff",
                  border: "none",
                  borderRight: "1px solid #f5f5f5",
                  padding: "12px 20px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  borderRadius: 0,
                  transition: "0.3s",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  "&:hover": {
                    backgroundColor:
                      bookId === book._id ? "#eaeaea" : "#16355c", // Optional hover bg
                    color: bookId === book._id ? "#fbbd00" : "#EAB308", // keep text white when not active
                    cursor: "pointer",
                  },
                  "&:last-child": {
                    borderRight: "none",
                  },
                }}
              >
                {book.bookTitle}
              </Button> */}
            </Box>
          ))}
        </Box>

        {/* Test Instructions */}
        <Box
          className="chapter-list"
          sx={{
            px: isMobile ? 2 : 4,
            py: 3,
            borderRadius: "0 0 10px 10px",
            backgroundColor: theme.report.headingReport,
          }}
        >
          <Grid
            container
            spacing={2}
            alignItems="right"
            display="flex"
            justifyContent="center"
          >
            <Grid
              size={{ xs: 12 }}
              alignItems="left"
              display="grid"
              justifyContent={{ xs: "left", sm: "left" }}
              pl={{ xs: 0, sm: 0 }}
            >
              <TestInstructions
                syllabusId={syllabusId}
                bookId={bookId}
                activeBook={activeBook}
                syllabusTitle={syllabusTitle}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default TestRules;
