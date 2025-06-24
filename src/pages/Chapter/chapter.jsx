import { apiGet, apiGetToken } from '../../api/axios';

const ChapterSection = () => {
    const [activeBook, setActiveBook] = useState('');
    const [bookId, setBookId] = useState("");
    const [books, setBooks] = useState([]);
    const [chapters, setChapters] = useState([]);
    const userData = JSON.parse(localStorage.getItem('user'));
    const [completedChapterIds, setCompletedChapterIds] = useState(new Set());
    const location = useLocation();
    const locationData = location.state
    const syllabusTitle = locationData?.title;
    const syllabusId = locationData?.id;

    console.log(locationData, "locationData", syllabusTitle, "syllabusTitle");

    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));



    const getStudentProgress = async () => {
        try {
            const response = await apiGetToken(`/task/studentTaskProgress?userId=${userData._id}`);
            console.log(response, "responsegetStudentprogress");
            if (response?.data?.status === 200) {
                const taskStatus = response?.data?.data;
                console.log(taskStatus, "taskstatus");
                const completedIds = new Set();
                // setUserSyllabuses(taskStatus?.syllabuses || []);
                taskStatus?.syllabuses?.forEach((syllabus) => {
                    syllabus.books?.forEach((book) => {
                        book.chapters?.forEach((chapter) => {

                            if (chapter.isTaskCompleted) {
                                console.log(chapter, "chapter222");
                                completedIds.add(chapter._id);
                            }
                        });
                    });
                });
                setCompletedChapterIds(completedIds); // ✅ update state
            }
        }
        catch (err) {
            return err
            // snackbarEmitter("")
        }
    }
    useEffect(() => {
        const fetchBooksAndChapters = async () => {
            try {
                const bookResponse = await apiGet('/getBooks');
                const fetchedBooks = bookResponse.data.books;
                setBooks(fetchedBooks);

                const defaultBook = fetchedBooks[0] || '';
                setActiveBook(defaultBook?.bookTitle);
                setBookId(defaultBook?._id)

                // const chapterResponse = await apiGet('/getChapters');
                // setChapters(chapterResponse.data.chapters);

                const chapterResponse = await apiGet(`/chaptersBySyllabusId/${syllabusId}`);
                setChapters(chapterResponse.data.data);
                getStudentProgress();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchBooksAndChapters();
    }, []);

    const filteredChapters = useMemo(() => {
        return chapters.filter((chapter) => chapter.book === activeBook);
    }, [chapters, bookId, syllabusTitle]);

    const handleChapterClick = (chapter) => {
        const user = localStorage.getItem('user');
        console.log(chapter, "chapter");
        const chapterId = chapter?._id

        if (user) {
            navigate(`/trainingQuestion/${chapter.syllabus}/${chapter.book}/${chapter.chaptername}`, { state: { syllabusTitle, syllabusId, bookId, chapterId } });
        } else {
            navigate('/login');
        }
    };

    return (
        <Box sx={{ mt: 0 }}>
            <Box sx={{ p: 4, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h4" fontWeight={700} color="#0f2848" gutterBottom>
                    {/* {syllabusTitle} Question Banks */}
                    {`${syllabusTitle
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ')} Chapters`}
                </Typography>
            </Box>

            <Box className="tabs-section" sx={{ p: isMobile ? 2 : 4, mt: 2, borderRadius: 2 }}>
                <Box className="custom-tabs" component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', overflowX: 'auto', borderRadius: '10px 10px 0 0', backgroundColor: '#F5F5F5' }}>
                    {books.map((book, index) => (

                        <Box component="li" className="nav-item" key={index} sx={{ flex: 1 }}>
                            <Button
                                fullWidth
                                className={`nav-link ${bookId === book._id ? 'active' : ''}`}
                                onClick={() => {
                                    { console.log(book, "booksdata") }
                                    setActiveBook(book.bookTitle);
                                    setBookId(book?._id);
                                }}
                                sx={{
                                    backgroundColor: bookId === book._id ? '#f5f5f5' : '#0f2848',
                                    color: bookId === book._id ? '#fbbd00' : '#fff',
                                    border: 'none',
                                    borderRight: '1px solid #1c3d63',
                                    padding: '12px 20px',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    borderRadius: 0,
                                    transition: '0.3s',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%', // 
                                    '&:hover': {
                                        backgroundColor: bookId === book._id ? '#eaeaea' : '#16355c', // Optional hover bg
                                        color: bookId === book._id ? '#fbbd00' : '#fff', // keep text white when not active
                                    },
                                    '&:last-child': {
                                        borderRight: 'none',
                                    },
                                }}
                            >
                                {book.bookTitle}
                            </Button>
                        </Box>
                    ))}
                </Box>


                <Box className="chapter-list" sx={{ px: isMobile ? 1 : 4, py: 3, borderRadius: '0 0 10px 10px', backgroundColor: '#F5F5F5', }}>
                    {filteredChapters.map((chapter, index) => {
                        console.log(chapter, "chapter44444");

                        const isCompleted = completedChapterIds.has(chapter._id);
                        {
                            console.log(isCompleted, "isCompletedisCompleted");
                        }
                        return (
                            <Paper
                                key={index}
                                onClick={() => handleChapterClick(chapter)}
                                sx={{
                                    backgroundColor: '#0f2b50',
                                    color: 'white',
                                    p: 2,
                                    mb: 2,
                                    borderRadius: 2,
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    display: "flex",
                                    justifyContent: "space-around",
                                    alignItems: "center"
                                }}
                            >
                                <Typography sx={{ fontWeight: 500 }}>
                                    <Box sx={{ display: "flex", maxWidth: 300, mx: 'auto' }}>
                                        Chapter {chapter.chapterno}: {chapter.chaptername.toUpperCase()}
                                        {/* {chapter.chaptername} */}
                                    </Box>
                                </Typography>
                                {isCompleted && (
                                    <CheckCircleIcon sx={{ color: '#27C76F', fontSize: 32 }} />
                                )}
                            </Paper>

                            // <Box
                            //     key={chapter._id}
                            //     sx={{
                            //         backgroundColor: '#132F4C',
                            //         borderRadius: '12px',
                            //         px: 3,
                            //         py: 2,
                            //         display: 'flex',
                            //         justifyContent: 'space-between',
                            //         alignItems: 'center',
                            //         color: '#fff',
                            //     }}
                            // >
                            //     <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                            //         Chapter {chapter.chapterno}: {chapter.chaptername.toUpperCase()}
                            //     </Typography>

                            //     {isCompleted && (
                            //         <CheckCircleIcon sx={{ color: '#27C76F', fontSize: 32 }} />
                            //     )}
                            // </Box>
                        );
                        <Paper
                            key={index}
                            onClick={() => handleChapterClick(chapter)}
                            sx={{
                                backgroundColor: '#0f2b50',
                                color: 'white',
                                p: 2,
                                mb: 2,
                                borderRadius: 2,
                                fontWeight: 500,
                                cursor: 'pointer',
                            }}
                        >
                            <Typography sx={{ fontWeight: 500 }}>
                                <Box sx={{ display: "flex", maxWidth: 200, mx: 'auto' }}>
                                    Chapter {index + 1} : {" "}
                                    {chapter.chaptername}
                                </Box>
                            </Typography>
                        </Paper>
                    })}
                </Box>
            </Box>
        </Box>
    );
};

export default ChapterSection;