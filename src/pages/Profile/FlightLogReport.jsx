import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { apiGet, apiGetToken, apiPostToken } from "../../api/axios";
import { toCapitalize } from "../../Helper/convertUpperCase";

const FlightLogReport = () => {
  const theme = useTheme();
  const [syllabusReport, setSyllabusReport] = useState([]);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [bookList, setBookList] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [attempts, setAttempts] = useState("");
  const [selectedAttempt, setSelectedAttempt] = useState("");
  const [chartData, setChartData] = useState([]);

  const fetchSyllabusReport = async () => {
    try {
      const resSyllabus = await apiGetToken("/getSyllabus");
      const syllabi = resSyllabus?.data?.data || [];

      const response = await apiGetToken("/testListOfSyllabus");
      // console.log(response.data, "responseTestListOfSyllabus");
      const validSyllabusIds = response?.data?.data || [];

      // Filter syllabi based on matching _id
      const filteredSyllabi = syllabi.filter((s) =>
        validSyllabusIds.includes(s._id)
      );

      setSyllabusReport(filteredSyllabi);
      if (filteredSyllabi.length > 0) {
        handleSyllabusClick(filteredSyllabi[0]);
      }
    } catch (error) {
      console.error("Error fetching syllabus:", error);
    }
  };

  const handleSyllabusClick = async (syllabus) => {
    setSelectedSyllabus(syllabus);
    setSelectedBook("");
    // setAttempts([]);
    setChartData([]);
    try {
      const bookResponse = await apiGet(`/booksBySyllabusId/${syllabus._id}`);
      const fetchedBooks = bookResponse?.data?.data || [];
      // console.log(fetchedBooks, "fetchedBooks");

      setBookList(fetchedBooks);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const handleBookSelect = async (bookId) => {
    setSelectedBook(bookId);
    setSelectedAttempt("");
    try {
      const response = await apiPostToken(`/countTestAttemptsByBook`, {
        bookId: bookId,
      });
      // console.log(response.data.data.testAttempts, "responseattempts");

      const Attempts = response?.data?.data?.testAttempts;
      // console.log(Attempts, "attempts");

      setAttempts(Attempts);
      const chartData = await apiPostToken(`/testChartData`, {
        bookId: bookId,
      });
      // console.log(chartData, "chartData");

      const rawChartData = chartData?.data?.data || [];
      // console.log(rawChartData, "rawChartData");

      const processedData = rawChartData.map((item) => {
        const score =
          item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;

        return {
          ...item,
          score,
          label: item.month,
        };
      });

      setChartData(processedData);
    } catch (err) {
      console.error("Error fetching chart/attempts data:", err);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      const { score, total, correct, incorrect } = payload[0].payload;
      return (
        <div
          style={{
            background: theme.card.bgcolor,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <p>
            <strong>{label}</strong>
          </p>
          <p>Score: {score}</p>
          <p>Total: {total}</p>
          <p>Correct: {correct}</p>
          <p>Incorrect: {incorrect}</p>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    fetchSyllabusReport();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Syllabus Cards */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {syllabusReport.map((course) => (
          <Grid key={course._id} size={{ xs: 12, sm: 6, md: 3, lg: 2 }} md={3}>
            <Card
              onClick={() => handleSyllabusClick(course)}
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                height: "100%",
                cursor: "pointer",
                border:
                  selectedSyllabus?._id === course._id
                    ? "2px solid #EAB308"
                    : "none",
                backgroundColor: theme.card.bgcolor,
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={course.imageUrl}
                alt={course.title}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {toCapitalize(course?.title)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#EAB308" }}>
                  {course.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Book + Attempt Dropdowns */}
      <Typography fontWeight={600} fontSize={22} mb={2}>
        Please select a book to continue
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth>
            <InputLabel>Book</InputLabel>
            <Select
              value={selectedBook}
              label="Book"
              onChange={(e) => handleBookSelect(e.target.value)}
            >
              {bookList.map((book) => (
                <MenuItem key={book._id} value={book._id}>
                  {book.bookTitle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          {/* {console.log(attempts, "attempts")} */}
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Number of Attempts"
              placeholder="Number of Attempts"
              value={attempts?.toString() || "0"}
              InputProps={{ readOnly: true }}
              disabled
            />
          </FormControl>
        </Grid>
      </Grid>

      {/* Chart Section */}
      <Box
        sx={{
          background: theme.report.testReportGraph,
          borderRadius: 2,
          p: 3,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={1}>
          Test Score Progress
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Track how your test progress compares over time.
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis
              label={{ value: "Score", angle: -90, position: "insideLeft" }}
              domain={[0, 100]} // <- This keeps it fixed from 0 to 100
            />
            <RechartsTooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#F5B400"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
};

export default FlightLogReport;
