import { apiGet } from '../../api/axios';

const ChapterSection = () => {
    const [activeBook, setActiveBook] = useState('');
    const [bookId, setBookId] = useState("");
    const [books, setBooks] = useState([]);
    const [chapters, setChapters] = useState([]);

    const location = useLocation();
    const locationData = location.state
    const syllabusTitle = locationData?.title;
    const syllabusId = locationData?.id;

    console.log(locationData, "locationData", syllabusTitle, "syllabusTitle");

    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchBooksAndChapters = async () => {
            try {
                const bookResponse = await apiGet('/getBooks');
                const fetchedBooks = bookResponse.data.books;
                setBooks(fetchedBooks);

                const defaultBook = fetchedBooks[0]?.bookTitle || '';
                setActiveBook(defaultBook);

                const chapterResponse = await apiGet('/getChapters');
                setChapters(chapterResponse.data.chapters);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchBooksAndChapters();
    }, []);

    const filteredChapters = useMemo(() => {
        return chapters.filter(
            (chapter) =>
                chapter.book === activeBook && chapter.syllabus === syllabusTitle
        );
    }, [chapters, activeBook, syllabusTitle]);

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
                        .join(' ')} Question Banks`}
                </Typography>
            </Box>

            <Box className="tabs-section" sx={{ p: isMobile ? 2 : 4, mt: 2, borderRadius: 2 }}>
                <Box className="custom-tabs" component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', overflowX: 'auto', borderRadius: '10px 10px 0 0', backgroundColor: '#F5F5F5' }}>
                    {books.map((book, index) => (
                        <Box component="li" className="nav-item" key={index} sx={{ flex: 1 }}>

                            <Button
                                fullWidth
                                className={`nav-link ${activeBook === book.bookTitle ? 'active' : ''}`}
                                onClick={() => {
                                    { console.log(book, "booksdata") }
                                    setActiveBook(book.bookTitle);
                                    setBookId(book?._id);
                                }}
                                sx={{
                                    backgroundColor: activeBook === book.bookTitle ? '#f5f5f5' : '#0f2848',
                                    color: activeBook === book.bookTitle ? '#fbbd00' : '#fff',
                                    border: 'none',
                                    borderRight: '1px solid #1c3d63',
                                    padding: '12px 20px',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    borderRadius: 0,
                                    transition: '0.3s',
                                    width: '100%',
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

                <Box className="tab-description" sx={{ pt: 3, px: isMobile ? 1 : 4, backgroundColor: '#F5F5F5', }}>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Typography>
                </Box>

                <Box className="chapter-list" sx={{ px: isMobile ? 1 : 4, py: 3, borderRadius: '0 0 10px 10px', backgroundColor: '#F5F5F5', }}>
                    {filteredChapters.map((chapter, index) => (
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
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default ChapterSection;