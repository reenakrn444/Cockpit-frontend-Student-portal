import {
    Link,
} from '@mui/material';
import { formatedDate } from '../../Helper/DayCalculation/Daycalculation';

const TestTermsAndConditions = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const renderBulletPoints = (items) => (
        <List sx={{ listStyle: 'disc', pl: 4 }}>
            {items.map((item, index) => (
                <ListItem key={index} sx={{ display: 'list-item', pl: 1 }}>
                    <Typography variant="body1">{item}</Typography>
                </ListItem>
            ))}
        </List>
    );

    return (
        <Box sx={{ backgroundColor: '#f8fafc', py: isMobile ? 2 : 3 }}>
            <Container maxWidth="xl" sx={{ padding: isMobile ? 2 : 5 }}>
                <Typography variant="h3" component="h1" sx={{ color: '#303A42', mb: 1, borderBottom: '2px solid #e2e8f0', pb: 1 }}>
                    Test Terms and Conditions
                </Typography>

                <Typography variant="body2" sx={{ color: '#718096', mb: 3, fontStyle: 'italic' }}>
                    Effective Date: {formatedDate(new Date())}
                </Typography>

                <Typography paragraph>
                    By participating in any test conducted on our platform, you agree to the following terms and conditions. These ensure a fair, secure, and standardized testing experience for all users.
                </Typography>

                {/* Section 1 */}
                <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, color: '#303A42' }}>
                    1. Secure Test Environment
                </Typography>
                {renderBulletPoints([
                    'Once the test begins, your screen will enter full-screen mode. You will not be able to minimize, switch tabs, or open other windows.',
                    'Tab-switch detection is enabled. Any attempts to leave the test screen will result in warnings. Multiple violations will auto-terminate your session.',
                    'Copy-paste, keyboard shortcuts, or browser manipulation is disabled and monitored.',
                ])}

                {/* Section 2 */}
                <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, color: '#303A42' }}>
                    2. Allowed and Prohibited Activities
                </Typography>
                {renderBulletPoints([
                    'Allowed: Use of the question palette, flagging for review, and navigation buttons.',
                    'Prohibited: Use of mobile phones, secondary devices, notes, or assistance from others.',
                    'Third-party apps (screen sharing, recording, etc.) are not permitted.',
                ])}

                {/* Section 3 */}
                <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, color: '#303A42' }}>
                    3. Test Rules
                </Typography>
                {renderBulletPoints([
                    'Each test can be taken only once. Once submitted, it cannot be resumed or retaken.',
                    'The countdown timer is visible during the test. When it reaches zero, your test will auto-submit.',
                    'Unanswered questions will remain blank and may affect your score.',
                    'Do not refresh the browser or press back—this may cause submission issues or data loss.',
                ])}

                {/* Section 4 */}
                <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, color: '#303A42' }}>
                    4. Monitoring & Tracking
                </Typography>
                {renderBulletPoints([
                    'All user activity is monitored: time spent on questions, navigation behavior, and suspicious actions.',
                    'Optional: screen freeze, webcam proctoring, or tab-monitoring may be enabled for added security.',
                    'Detected malpractice will result in immediate termination and review.',
                ])}

                {/* Section 5 */}
                <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, color: '#303A42' }}>
                    5. System Requirements
                </Typography>
                {renderBulletPoints([
                    'Ensure a stable internet connection to avoid disconnections or test submission issues.',
                    'Use the latest version of Google Chrome, Mozilla Firefox, or Microsoft Edge.',
                    'Browser must allow full-screen mode and JavaScript must be enabled.',
                ])}

                {/* Section 6 */}
                <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, color: '#303A42' }}>
                    6. Privacy and Data Handling
                </Typography>
                <Typography paragraph>
                    Your responses, test activity, and behavior will be recorded and analyzed to maintain exam integrity. Personal information will be handled in accordance with our{' '}
                    <Link href="/privacy-policy" underline="hover" sx={{ color: '#1A7FC1' }}>
                        Privacy Policy
                    </Link>.
                </Typography>

                {/* Section 7 */}
                <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, color: '#303A42' }}>
                    7. Disqualification and Disciplinary Action
                </Typography>
                {renderBulletPoints([
                    'Suspicious or unauthorized activity will lead to session termination.',
                    'Results may be invalidated, and further action may be taken depending on the severity.',
                    'Repeat offenses may result in a permanent ban from the platform.',
                ])}

                {/* Section 8 */}
                <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, color: '#303A42' }}>
                    8. Legal Acknowledgment
                </Typography>
                <Typography paragraph>
                    By starting the test, you acknowledge that you have read and understood the above terms and agree to abide by them. Any breach may result in academic, legal, or administrative consequences.
                </Typography>
            </Container>
        </Box>
    );
};

export default TestTermsAndConditions;
