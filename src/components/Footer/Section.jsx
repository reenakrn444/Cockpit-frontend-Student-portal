const Section = ({ title, items }) => (
    <Box mb={4}>
        <Typography variant="h6" component="h2" sx={{ color: '#303A42', mt: 4, mb: 2 }}>
            {title}
        </Typography>
        <List sx={{ pl: 2 }}>
            {items.map((item, index) => (
                <ListItem
                    key={index}
                    sx={{ pl: 3, position: 'relative', mb: 1 }}
                >
                    <Box component="span" sx={{ position: 'absolute', left: 0, color: '#303A42', fontSize: '1.2em' }}>•</Box>
                    <Typography variant="body2">{item}</Typography>
                </ListItem>
            ))}
        </List>
    </Box>
);

export {Section};