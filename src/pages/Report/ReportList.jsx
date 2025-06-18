import ReportCard from "./ReportCard";

// Helper to group by date string
const groupByDate = (data) =>
  data.reduce((acc, item) => {
    acc[item.date] = [...(acc[item.date] || []), item];
    return acc;
  }, {});

// Simulated dynamic data
const reports = [
  {
    id: 1,
    user: "B",
    message: "You have reported a question on air navigation",
    time: "3min ago",
    date: "2024-06-17",
    highlight: true,
    answer: null,
  },
  {
    id: 2,
    user: "B",
    message:
      "Your explanation on a question on air navigation has been rejected by the Admin.",
    time: "3min ago",
    date: "2024-06-17",
    answer: {
      text: `Each international operating agency must be assigned a distinctive common mark by ICAO, selected by ICAO from a series of symbols included in the radio call signs allocated to ICAO by the International Telecommunication Union (ITU).`,
    },
  },
  {
    id: 3,
    user: "B",
    message:
      "Bhumika & 4 Others have reported a question on air navigation",
    time: "3min ago",
    date: "2024-06-16",
  },
  {
    id: 4,
    user: "B",
    message:
      "Bhumika & 4 Others have reported a question on air navigation",
    time: "3min ago",
    date: "2024-06-16",
  },
];

const ReportList = () => {
  const grouped = groupByDate(reports);
  const sortedDates = Object.keys(grouped).sort((a, b) =>
    new Date(b) - new Date(a)
  );

  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      {sortedDates.map((date) => (
        <Box key={date} sx={{ mb: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              fontWeight={600}
              variant="subtitle1"
              sx={{ mb: 1 }}
            >
              {formatDateLabel(date)}
            </Typography>
            <FormControlLabel
              control={<Checkbox />}
              label="Select all"
              sx={{ fontSize: 12 }}
            />
          </Box>

          <Grid container spacing={2}>
            {grouped[date].map((item) => (
              <Grid size={{xs:12}} key={item.id}>
                <ReportCard data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Paper>
  );
};

// Converts ISO date string to label
const formatDateLabel = (dateStr) => {
  const today = new Date().toISOString().split("T")[0];
  if (dateStr === today) return "Today";

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yestStr = yesterday.toISOString().split("T")[0];

  if (dateStr === yestStr)
    return `Yesterday ${yesterday.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}`;

  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default ReportList;
