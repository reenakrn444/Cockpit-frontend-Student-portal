import {
    Link,
} from '@mui/material';
import { formatedDate } from '../../Helper/DayCalculation/Daycalculation';



const PrivacyPolicy = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const renderList = (items) => (
    <List sx={{ pl: 2 }}>
        {items.map((item, index) => (
            <ListItem key={index} sx={{ pl: 3, position: 'relative' }}>
                <Box component="span" sx={{ position: 'absolute', left: 0, color: '#303A42', fontSize: '2.2em' }}>•</Box>
                <ListItemText primary={<Typography variant="body2" color={theme.policy.sectionsubText}>{item}</Typography>} />
            </ListItem>
        ))}
    </List>
);
    return (
        <Box sx={{ backgroundColor: theme.palette.background.policyBgcolor, py: isMobile ? 2 : 3 }}>
            <Container maxWidth="xl" sx={{ padding: isMobile ? 2 : 5, fontFamily: 'Jost' }}>
                <Typography variant="h3" component="h1" sx={{ color: theme.policy.text, mb: 1, borderBottom: '2px solid #e2e8f0', pb: 1 }}>
                    Privacy Policy
                </Typography>

                <Typography variant="body2" sx={{ color: '#718096', mb: 3, fontStyle: 'italic' }}>
                    Effective Date: {formatedDate(new Date())}
                </Typography>

                <Typography paragraph>
                    By using, accessing or participating in the Service, you agree to the terms of this privacy policy (the "Privacy Policy"). Capitalized terms not defined in this Privacy Policy have the meanings set forth in the Terms and Conditions. We reserve the right to change our Privacy Policy at any time.
                </Typography>

                <Typography variant="h5" gutterBottom>1. Information We Collect</Typography>

                <Typography variant="h6" gutterBottom>1.1 Personal Information</Typography>
                {renderList([
                    'Account Creation: Full name, email, phone (optional), username, password.',
                    'Profile Details: Grade, interests, institution name, study preferences.',
                    'Communication: Name, contact details, message content.',
                    'Third-Party Logins: Name, email, profile picture via OAuth providers.'
                ])}

                <Typography variant="h6" gutterBottom>1.2 Usage and Performance Data</Typography>
                {renderList([
                    'Test and Question Data: Attempts, answers, scores, time spent, metrics.',
                    'Interaction Data: Navigation paths, clicks, usage preferences.',
                    'Progress Tracking: Completed modules, strengths, weaknesses.'
                ])}

                <Typography variant="h6" gutterBottom>1.3 Technical and Device Information</Typography>
                {renderList([
                    'Device Type, OS, Browser.',
                    'IP Address, ISP.',
                    'Timestamps, Referrals, Logs.'
                ])}

                <Typography variant="h6" gutterBottom>1.4 Information from Third Parties</Typography>
                {renderList([
                    'Analytics: Aggregated insights from Google Analytics.',
                    'Educational Partners: Name, student ID, course details (if applicable).'
                ])}

                <Typography variant="h6" gutterBottom>1.5 Tracking Technologies and Cookies</Typography>
                {renderList([
                    'Necessary Cookies: Session management.',
                    'Policy Cookies: Store cookie consent.',
                    'Functionality Cookies: Preferences like login/language.'
                ])}
                <Typography>Manage settings through your browser. Details: <Link href="https://thecockpit.in/cookies">Cookies Policy</Link></Typography>

                <Typography variant="h6" gutterBottom>1.6 Information from Minors</Typography>
                <Typography>If you are under 16, parental or guardian consent may be required.</Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>2. How We Use Your Information</Typography>
                {renderList([
                    'Service Delivery and Access.',
                    'Account Management and Authentication.',
                    'Content Personalization and Suggestions.',
                    'Performance Insights and Reports.',
                    'Website Optimization and Bug Tracking.',
                    'Communication and Notifications.',
                    'Security Monitoring and Fraud Prevention.',
                    'Legal Compliance.'
                ])}

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>3. How We Share Your Information</Typography>
                {renderList([
                    'Service Providers under data protection agreements.',
                    'Educational Partners (with consent).',
                    'With Your Explicit Consent.'
                ])}

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>4. Data Security</Typography>
                {renderList([
                    'SSL/TLS encryption.',
                    'Access controls for staff.',
                    'Regular audits and penetration testing.',
                    'Data minimization practices.'
                ])}
                <Typography>No method is entirely secure; we notify you promptly if breaches occur.</Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>5. Your Rights and Choices</Typography>
                {renderList([
                    'Access and Review Your Information.',
                    'Correct Inaccuracies.',
                    'Request Deletion.',
                    'Withdraw Consent.',
                    'Opt-out of Marketing.',
                    'Close Your Account.'
                ])}
                <Typography>To exercise rights: <Link href="mailto:support@thecockpit.in">support@thecockpit.in</Link></Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>6. Data Retention</Typography>
                {renderList([
                    'While account is active.',
                    'Inactive accounts deleted after 2 years.',
                    'Legal data retained up to 5 years.'
                ])}

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>7. International Data Transfers</Typography>
                <Typography color={theme.policy.sectionsubText}>
                    Your data may be processed in India. We use SCCs and work with certified providers (e.g., SOC 2). By using our Services, you consent to lawful transfers.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>8. Third-Party Links and Services</Typography>
                <Typography color={theme.policy.sectionsubText}>
                    Links to external resources may be present. Their policies apply independently.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>9. Changes to This Privacy Policy</Typography>
                <Typography color={theme.policy.sectionsubText}>
                    We will post updates with revised dates. Substantial changes may be emailed or shown in-app.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>10. Contact Us</Typography>
                {renderList([
                    <span>
                        Email:{' '}
                        <Link href="mailto:support@thecockpit.in" underline="hover">
                            support@thecockpit.in
                        </Link>
                    </span>
                ])}
            </Container>
        </Box>
    );
};

export default PrivacyPolicy;



