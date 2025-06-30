import { apiGet, apiGetToken } from '../../api/axios';

const ChapterSection = () => {
    const [books, setBooks] = useState([]);
    const [chapters, setChapters] = useState([]);
    const userData = JSON.parse(localStorage.getItem('user'));
    const [completedChapterIds, setCompletedChapterIds] = useState(new Set());
    const location = useLocation();
    const locationData = location.state

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
                // const bookResponse = await apiGet('/getBooks');
                const bookResponse = await apiGet(`/booksBySyllabusId/${syllabusId}`);
                console.log(bookResponse, "bookResponse");

                const fetchedBooks = bookResponse?.data?.data;
                setBooks(fetchedBooks);

                const defaultBook = fetchedBooks[0] || '';
                setActiveBook(activeBookTab ? activeBookTab : defaultBook?.bookTitle);
                setBookId(ActiveBookId ? ActiveBookId : defaultBook?._id)

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

    useEffect(() => {
        if (bookId && tabRefs.current[bookId]) {
            tabRefs.current[bookId].scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [bookId, books]);

    const filteredChapters = useMemo(() => {
        return chapters.filter((chapter) => chapter.book === activeBook);
    }, [chapters, bookId, syllabusTitle]);

    const handleChapterClick = (chapter) => {
        const user = localStorage.getItem('user');
        console.log(chapter, "chapter");
        const chapterId = chapter?._id
        navigate(`/trainingQuestion/${chapter.syllabus}/${chapter.book}/${chapter.chaptername}`, { state: { syllabusTitle, syllabusId, bookId, chapterId, activeBook } });
    };

    return (
        <Box sx={{ mt: 0 }}>
            <Box sx={{ p: 4, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h4" fontWeight={700} color="#0f2848" gutterBottom>
                    {/* {syllabusTitle} Question Banks */}
                    {`${syllabusTitle
                        .split(' ')
                        .map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase())
                        .join(' ')} Chapters`}
                </Typography>
            </Box>

            <Box className="tabs-section" sx={{ p: isMobile ? 2 : 4, mt: 2, borderRadius: 2 }}>
                <Box className="custom-tabs" component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', overflowX: 'auto', borderRadius: '10px 10px 0 0', backgroundColor: '#F5F5F5' }}>
                    {books.map((book, index) => (
                        <Box component="li" className="nav-item" ref={(el) => (tabRefs.current[book._id] = el)} key={index} sx={{ minWidth: '25%', flex: 1, borderRight: '1px solid #EAEAEA', }}>
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
                                    borderRight: '1px solid #f5f5f5',
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
                                        color: bookId === book._id ? '#fbbd00' : '#EAB308', // keep text white when not active
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
                    {filteredChapters?.filter(chapter => chapter.isactive)?.map((chapter, index) => {

                        const isCompleted = completedChapterIds.has(chapter._id);

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

                                }}
                            >
                                <Grid container spacing={2} alignItems="right" display="flex" justifyContent="center">
                                    <Grid size={{ xs: 10, sm: 11 }} alignItems="left" display="grid" justifyContent={{ xs: "left", sm: "center" }} pl={{ xs: 0, sm: 4 }}>
                                        <Typography sx={{ fontWeight: 500 }}>
                                            Chapter {chapter?.chapterno}:  {chapter?.chaptername?.toUpperCase()}
                                        </Typography>
                                    </Grid>
                                    <Grid size={{ xs: 2, sm: 1 }} alignItems="center" display="flex" justifyContent={{ xs: "right" }} pr={{ xs: 0 }}>
                                        {isCompleted && (
                                            <CheckCircleIcon sx={{ color: '#27C76F', fontSize: 32 }} />
                                        )}
                                    </Grid>
                                </Grid>
                            </Paper>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};

export default ChapterSection;