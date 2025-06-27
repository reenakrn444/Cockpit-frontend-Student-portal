const PrivacyPolicy = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ py: 5, bgcolor: '#fff', minHeight: '100vh' }}>
            <Container maxWidth="md">
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Privacy Policy
                </Typography>

                <Section title="Intended Use of Website">
                    CARDONE CAPITAL is not a broker-dealer or financial advisor and does not provide personal investment advice or legal services.
                </Section>

                <Section title="User Registration">
                    Users must be 18+ to register. All information provided must be accurate. CARDONE CAPITAL reserves the right to reject any registration.
                </Section>

                <Section title="Account Obligations">
                    Users are responsible for maintaining the confidentiality of their account and password.
                </Section>

                <Section title="Content Use Limitations">
                    Content is for informational purposes only and must not be copied, republished, or misused. Unauthorized use may lead to termination.
                </Section>

                <Section title="Prospective Investor Accounts">
                    Investing involves risks. CARDONE CAPITAL is not responsible for your financial decisions. Consult a licensed professional before investing.
                </Section>
            </Container>
        </Box>
    );
};

const Section = ({ title, children }) => (
    <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight={600} sx={{ color: '#0f2848', mb: 1 }}>
            {title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#444' }}>
            {children}
        </Typography>
    </Box>
);

export default PrivacyPolicy;
