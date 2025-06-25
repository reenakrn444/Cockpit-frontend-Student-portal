import ReportCard from "./ReportCard";

// Group by formatted createdAt date
const groupByDate = (data) =>
  data.reduce((acc, item) => {
    const date = item?.createdAt?.split("T")[0]; // 'yyyy-mm-dd'
    acc[date] = [...(acc[date] || []), item];
    return acc;
  }, {});

const ReportList = ({ reports }) => {
  const grouped = groupByDate(reports);
  const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      {sortedDates.map((date) => (
        <Box key={date} sx={{ mb: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={600} variant="subtitle1" sx={{ mb: 1 }}>
              {formatDateLabel(date)}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {grouped[date].map((item) => (
              <Grid size={{xs:12}} key={item._id}>
                <ReportCard data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Paper>
  );
};

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
