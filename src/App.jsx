import AppRouter from './routers/AppRouter';

function App() {
  return (
    <div>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppRouter />
      </Box>
    </div>
  );
}

export default App;
