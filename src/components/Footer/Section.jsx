const listSx = {
  pl: 2,
  listStyleType: 'disc',
  listStylePosition: 'inside',
  '& .MuiListItem-root': {
    display: 'list-item',
    listStyleType: 'disc',
    fontSize: '1rem',
  },
  '& li::marker': {
    fontSize: '1rem',
  },
};

const Section = ({ title, items }) => {
  const theme = useTheme();
  return (
    <Box mb={4}>
      <Typography variant="h6" component="h2" sx={{ color: theme.policy.subText, mt: 4, mb: 2 }}>
        {title}
      </Typography>

      {/* If items is a single JSX block like a custom <List />, render directly */}
      {Array.isArray(items) && items.every(item => typeof item === 'string') ? (
        <List component="ul" sx={listSx}>
          {items.map((item, index) => (
            <ListItem key={index}>
              <Typography variant="body2" component="span" color={theme.policy.sectionsubText}>
                {item}
              </Typography>
            </ListItem>
          ))}
        </List>
      ) : (
        // Else assume it's a full custom JSX block and render it directly
        items
      )}
    </Box>
  )
}

export { Section };
