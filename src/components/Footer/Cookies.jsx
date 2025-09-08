import {
    Link,
} from '@mui/material';
import { formatedDate } from '../../Helper/DayCalculation/Daycalculation';

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

const CookiesPolicy = () => {
    const theme = useTheme();
    return (
        <Container maxWidth="xl" sx={{ py: 4, color: '#303A42', fontFamily: 'Jost' }}>
            <Typography variant="h4" sx={{ color: theme.policy.text, mb: 1, borderBottom: '2px solid #e2e8f0', pb: 1 }}>
                Cookie Policy
            </Typography>
            <Typography variant="body2" sx={{ color: '#718096', mb: 3, fontStyle: 'italic' }}>
                Effective Date: {formatedDate(new Date())}
            </Typography>

            <Typography paragraph color={theme.policy.sectionsubText}>
                This Cookie Policy explains how The Cockpit ("we," "us," or "our") uses cookies and similar tracking technologies on our website, thecockpit.in (the "Website"), to enhance your experience, analyze usage, and deliver personalized Services. This policy is part of our broader policy and applies to all users of the Website.
            </Typography>

            <Typography variant="h5" gutterBottom color={theme.policy.subText}>1. What Are Cookies?</Typography>
            <Typography paragraph color={theme.policy.sectionsubText}>
                Cookies are small text files placed on your device (e.g., computer, smartphone) when you visit the Website. They store information about your preferences, interactions, or device to help the Website function efficiently. Similar technologies, such as web beacons, pixels, or local storage, serve comparable purposes and are included in this policy under "cookies."
            </Typography>

            <Typography variant="h5" gutterBottom color={theme.policy.subText}>2. Types of Cookies We Use</Typography>
            <Typography paragraph color={theme.policy.sectionsubText}>
                We use the following categories of cookies, each serving specific functions:
            </Typography>

            <Typography variant="h6" gutterBottom color={theme.policy.subText}>2.1 Essential Cookies</Typography>
            <Typography paragraph color={theme.policy.sectionsubText}>
                <strong>Purpose:</strong> Enable core Website functionality, such as user authentication, session management, and access to secure areas (e.g., your account dashboard).
            </Typography>
            <Typography paragraph color={theme.policy.sectionsubText}>
                <strong>Examples:</strong> Cookies that maintain your login session or remember your cart items (if applicable).
            </Typography>
            <Typography paragraph color={theme.policy.sectionsubText}>
                <strong>Necessity:</strong> These cookies are mandatory and cannot be disabled, as the Website would not function without them.
            </Typography>

            <Typography variant="h6" gutterBottom color={theme.policy.subText}>2.2 Performance and Analytics Cookies</Typography>
            <Typography paragraph color={theme.policy.sectionsubText}>
                <strong>Purpose:</strong> Collect anonymized data on how users interact with the Website to improve its performance and usability.
            </Typography>
            <Typography paragraph color={theme.policy.sectionsubText}>
                <strong>Examples:</strong> Cookies from Google Analytics that track page views, time spent on pages, or bounce rates.
            </Typography>

            <Typography variant="h6" gutterBottom color={theme.policy.subText}>2.3 Functional Cookies</Typography>
            <Typography paragraph color={theme.policy.sectionsubText}>
                <strong>Purpose:</strong> Remember your preferences and settings to enhance your experience (e.g., language selection, test format preferences).
            </Typography>
            <Typography paragraph color={theme.policy.sectionsubText}>
                <strong>Examples:</strong> Cookies that save your chosen theme (light/dark mode) or question difficulty level.
            </Typography>

            <Typography variant="h6" gutterBottom color={theme.policy.subText}>2.4 Marketing and Personalization Cookies</Typography>
            <Typography paragraph color={theme.policy.sectionsubText}>
                <strong>Purpose:</strong> Deliver tailored content or ads based on your interests and usage patterns (e.g., recommending premium plans or related educational resources).
            </Typography>

            <Typography variant="h5" gutterBottom color={theme.policy.subText}>3. How We Use Cookies</Typography>
            <Typography paragraph color={theme.policy.sectionsubText}>Cookies help us:</Typography>
            <List component="ul" sx={listSx}>
                <ListItem sx={{color:theme.policy.sectionsubText}}>Ensure seamless navigation and access to Services.</ListItem>
                <ListItem sx={{color:theme.policy.sectionsubText}}>Analyze Website performance and user behavior to identify areas for improvement.</ListItem>
                <ListItem sx={{color:theme.policy.sectionsubText}}>Personalize your experience by remembering your preferences and tailoring content.</ListItem>
                <ListItem sx={{color:theme.policy.sectionsubText}}>Measure the effectiveness of our marketing campaigns (if applicable).</ListItem>
                <ListItem sx={{color:theme.policy.sectionsubText}}>Enhance security by detecting unusual activity.</ListItem>
            </List>

            <Typography variant="h5" gutterBottom color={theme.policy.subText}>4. Third-Party Cookies</Typography>
            <Typography paragraph color={theme.policy.sectionsubText}>
                Some cookies are set by third-party services we use, such as:
            </Typography>
            <List component="ul" sx={listSx}>
                <ListItem sx={{color:theme.policy.sectionsubText}}>
                    <strong>Google Analytics:</strong> To track Website usage and performance.
                </ListItem>
                <ListItem sx={{color:theme.policy.sectionsubText}}>
                    <strong>Social Media Plugins:</strong> To enable sharing or login via platforms like Google or Facebook.
                </ListItem>
                <ListItem sx={{color:theme.policy.sectionsubText}}>
                    <strong>Payment Processors:</strong> To facilitate secure transactions.
                </ListItem>
            </List>

            <Typography variant="h5" gutterBottom color={theme.policy.subText}>5. Cookie Retention</Typography>
            <Typography paragraph color={theme.policy.sectionsubText}>
                Cookies have varying lifespans:
            </Typography>
            <List component="ul" sx={listSx} >
                <ListItem sx={{color:theme.policy.sectionsubText}}>
                    <strong>Session Cookies:</strong> Temporary and deleted when you close your browser (e.g., for login sessions).
                </ListItem>
                <ListItem sx={{color:theme.policy.sectionsubText}}>
                    <strong>Persistent Cookies:</strong> Remain on your device for a set period (e.g., 30 days for analytics).
                </ListItem>
                <ListItem sx={{color:theme.policy.sectionsubText}}>
                    We retain cookie data only as long as necessary for the purposes described, in line with our privacy policy.
                </ListItem>
            </List>

            <Typography variant="h5" gutterBottom color={theme.policy.subText}>6. Updates to This Cookie Policy</Typography>
            <Typography paragraph color={theme.policy.sectionsubText}>
                We may update this Cookie Policy to reflect changes in our practices or legal requirements. We will notify you of significant changes via the Website or email (where required). Your continued use of the Website constitutes acceptance of the updated policy.
            </Typography>

            <Typography variant="h5" gutterBottom color={theme.policy.subText}>7. Contact Us</Typography>
            <Typography paragraph color={theme.policy.sectionsubText}>
                For questions about cookies or this policy, contact us at:
            </Typography>
            <Typography color={theme.policy.subText}>
                Email: <Link href="mailto:support@thecockpit.in">support@thecockpit.in</Link>
            </Typography>
        </Container>
    );
};

export default CookiesPolicy;

