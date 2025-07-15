import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid, ResponsiveContainer } from "recharts";

// Sample data
const books = ["Air Navigation", "Meteorology", "Technical"];
const attempts = ["1st Attempt", "2nd Attempt", "3rd Attempt"];
const chartData = [
  { month: "Jan 2024", score: 0, total: 100, correct: 50, incorrect: 50 },
  { month: "Jan 2024", score: 10, total: 100, correct: 10, incorrect: 90 },
  { month: "Feb 2024", score: 15, total: 100, correct: 50, incorrect: 50 },
  { month: "Feb 2024", score: 15, total: 100, correct: 50, incorrect: 50 },
  { month: "Feb 2024", score: 15, total: 100, correct: 50, incorrect: 50 },
  { month: "Mar 2024", score: 10, total: 100, correct: 50, incorrect: 50 },
  { month: "Mar 2024", score: 20, total: 100, correct: 50, incorrect: 50 },
  { month: "Mar 2024", score: 30, total: 100, correct: 50, incorrect: 50 },
  { month: "Apr 2024", score: 45, total: 100, correct: 50, incorrect: 50 },
  { month: "May 2024", score: 50, total: 100, correct: 50, incorrect: 50 },
  { month: "Jul 2024", score: 60, total: 100, correct: 50, incorrect: 50 },
  { month: "Sept 2024", score: 80, total: 100, correct: 50, incorrect: 50 },
  { month: "Jan 2025", score: 30, total: 100, correct: 10, incorrect: 90 },

];

const chartDataWithIndex = chartData.map((item, index, arr) => {
  const count = arr.slice(0, index + 1).filter(d => d.month === item.month).length;
  return {
    ...item,
    label: `${item.month} (${count})`, // Unique label for X axis
  };
});


// ✅ Custom Tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    const { score, total, correct, incorrect } = payload[0].payload;
    return (
      <div
        style={{
          background: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          fontSize: 14,
        }}
      >
        <p><strong>{label}</strong></p>
        <p>Score: {score}</p>
        <p>Total: {total}</p>
        <p>Correct: {correct}</p>
        <p>Incorrect: {incorrect}</p>
      </div>
    );
  }

  return null;
};

const FlightLogReport = () => {
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedAttempt, setSelectedAttempt] = useState("");

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Book Cards */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {[...Array(5)].map((_, i) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={i}>
            <Card
              elevation={selectedBook === `Air Navigation ${i}` ? 4 : 1}
              sx={{
                border: selectedBook === `Air Navigation ${i}` ? "2px solid #F5B400" : "1px solid #eee",
                borderRadius: 2,
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/300x140?text=Book+Cover"
                alt="Air Navigation"
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography fontWeight={600}>Air Navigation</Typography>
                <Typography fontSize={12} color="text.secondary" mb={1}>
                  General, Instrument, Radio
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: "#F5B400",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "#e0a400",
                    },
                  }}
                  onClick={() => setSelectedBook(`Air Navigation ${i}`)}
                >
                  Start
                </Button>
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
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Book</InputLabel>
            <Select
              value={selectedBook}
              label="Book"
              onChange={(e) => setSelectedBook(e.target.value)}
            >
              {books.map((book) => (
                <MenuItem key={book} value={book}>
                  {book}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Attempt</InputLabel>
            <Select
              value={selectedAttempt}
              label="Attempt"
              onChange={(e) => setSelectedAttempt(e.target.value)}
            >
              {attempts.map((attempt) => (
                <MenuItem key={attempt} value={attempt}>
                  {attempt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Chart Section */}
      <Box
        sx={{
          background: "#fff",
          borderRadius: 2,
          p: 3,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={1}>
          Test
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Track how your Test & compares to your industry average.
        </Typography>

        {/* <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: "Score", angle: -90, position: "insideLeft" }} />
            <RechartsTooltip />
            <Line type="monotone" dataKey="score" stroke="#F5B400" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer> */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartDataWithIndex}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis label={{ value: "Score", angle: -90, position: "insideLeft" }} />
            <RechartsTooltip content={CustomTooltip} />
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
