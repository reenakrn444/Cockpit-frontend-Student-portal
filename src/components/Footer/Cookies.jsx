// import {
//     Link,
// } from '@mui/material';
// import { formatedDate } from '../../Helper/DayCalculation/Daycalculation';

// const CookiesPolicy = () => {
//     return (
//         <Container maxWidth="xl" sx={{ py: 4, color: '#303A42', fontFamily: 'Jost' }}>
//             <Typography variant="h4" sx={{ color: '#303A42', mb: 1, borderBottom: '2px solid #e2e8f0', pb: 1 }}>Cookies Policy</Typography>
//             <Typography variant="body2" sx={{ color: '#718096', mb: 3, fontStyle: 'italic' }}>Last Updated: {formatedDate(new Date())}</Typography>

//             <Typography paragraph>
//                 This Cookies Policy explains what cookies are, how we use them on our website, and your choices regarding their use. Please read this policy to understand the types of cookies we use, the information we collect through cookies, and how that information is utilized.
//             </Typography>

//             <Typography paragraph>
//                 Cookies are small text files placed on your device (computer, mobile device, or other) by a website to store details about your browsing activity. Cookies do not typically contain personally identifiable information, but personal data we store about you may be linked to information stored in and obtained from cookies. For more details on how we handle, store, and secure your personal data, please refer to our{' '}
//                 <a href="https://thecockpit.in/privacy-policy">Privacy Policy</a>.
//             </Typography>

//             <Typography paragraph>
//                 We do not store sensitive personal information, such as mailing addresses or account passwords, in the cookies we use.
//             </Typography>

//             <Typography variant="h5" gutterBottom>Interpretation and Definitions</Typography>

//             <Typography variant="h6" gutterBottom>Interpretation</Typography>
//             <Typography paragraph>
//                 Words with an initial capital letter have meanings defined under the conditions below. These definitions apply whether the terms appear in singular or plural form.
//             </Typography>

//             <Typography variant="h6" gutterBottom>Definitions</Typography>
//             <Typography paragraph>For the purposes of this Cookies Policy:</Typography>
//             <List sx={{ pl: 2 }}>
//                 <ListItem sx={{ display: 'list-item' }}>
//                     <strong>Company</strong> (referred to as "the Company," "We," "Us," or "Our") refers to Cockpit Private Limited, New Delhi, India.
//                 </ListItem>
//                 <ListItem sx={{ display: 'list-item' }}>
//                     <strong>Cookies</strong> are small files placed on your device by a website, containing details of your browsing history on that website, among other uses.
//                 </ListItem>
//                 <ListItem sx={{ display: 'list-item' }}>
//                     <strong>Website</strong> refers to TheCockpit, accessible from{' '}
//                     <a href="https://thecockpit.in">https://thecockpit.in</a>.
//                 </ListItem>
//                 <ListItem sx={{ display: 'list-item' }}>
//                     <strong>You</strong> refers to the individual accessing or using the Website, or a company or legal entity on behalf of which such individual is accessing or using the Website.
//                 </ListItem>
//             </List>

//             <Typography variant="h5" gutterBottom>Types of Cookies We Use</Typography>
//             <Typography paragraph>
//                 Cookies can be "Persistent" (remaining on your device after you go offline) or "Session" (deleted when you close your browser). We use both types of cookies for the following purposes:
//             </Typography>

//             {[{
//                 title: '1. Necessary / Essential Cookies',
//                 items: [
//                     '<strong>Type</strong>: Session Cookies',
//                     '<strong>Administered by</strong>: Us',
//                     '<strong>Purpose</strong>: These cookies are essential for providing you with services available through the Website and enabling you to use its features. They help authenticate users, prevent fraudulent use of accounts, and ensure the Website functions properly. Without these cookies, the services you request cannot be provided.',
//                 ],
//             }, {
//                 title: '2. Functionality Cookies',
//                 items: [
//                     '<strong>Type</strong>: Persistent Cookies',
//                     '<strong>Administered by</strong>: Us',
//                     '<strong>Purpose</strong>: These cookies allow us to remember choices you make on the Website, such as login details, language preferences, or other customizations. They enhance your experience by avoiding the need to re-enter preferences during subsequent visits.',
//                 ],
//             }, {
//                 title: '3. Analytics and Performance Cookies',
//                 items: [
//                     '<strong>Type</strong>: Persistent Cookies',
//                     '<strong>Administered by</strong>: Us and Third-Party Analytics Providers',
//                     '<strong>Purpose</strong>: These cookies collect aggregated, anonymized data about how users interact with our Website, such as page visits, time spent on pages, and navigation patterns. We use various analytics and performance tools to analyze this data, helping us improve the Website’s functionality, content, and user experience.',
//                 ],
//             }, {
//                 title: '4. Advertising Cookies',
//                 items: [
//                     '<strong>Type</strong>: Persistent Cookies',
//                     '<strong>Administered by</strong>: Us and Third-Party Advertising Platforms',
//                     '<strong>Purpose</strong>: These cookies enable us to deliver personalized advertisements on our Website and across other platforms, including retargeting users who have previously visited our Website. They track your browsing behavior to show relevant ads based on your interests. We use advertising platforms to promote our Website and services effectively.',
//                 ],
//             }, {
//                 title: '5. Social Media Cookies',
//                 items: [
//                     '<strong>Type</strong>: Persistent Cookies',
//                     '<strong>Administered by</strong>: Third-Party Social Media Platforms',
//                     '<strong>Purpose</strong>: These cookies are used in connection with social media features, such as “Like,” “Follow,” or “Login” buttons, to enable interaction with social media platforms. They may track your activity to provide a seamless experience and allow social media platforms to collect data about your engagement with our Website.',
//                 ],
//             }].map((section, idx) => (
//                 <Box key={idx} mt={3}>
//                     <Typography variant="h6" gutterBottom>{section.title}</Typography>
//                     <List sx={{ pl: 2 }}>
//                         {section.items.map((item, index) => (
//                             <ListItem
//                                 key={index}
//                                 sx={{ display: 'list-item' }}
//                                 disablePadding
//                             >
//                                 <Typography variant="body2" component="span" dangerouslySetInnerHTML={{ __html: item }} />
//                             </ListItem>
//                         ))}
//                     </List>
//                 </Box>
//             ))}

//             <Typography variant="h5" gutterBottom>Your Choices Regarding Cookies</Typography>
//             <Typography paragraph>
//                 You can control and manage cookies through your browser settings. To avoid cookies, you can disable them in your browser or delete existing cookies associated with our Website. Note that disabling cookies may cause inconvenience, and some Website features may not function properly.
//             </Typography>

//             <Typography paragraph>To delete or refuse cookies, please consult your browser’s help pages:</Typography>
//             <List sx={{ pl: 2 }}>
//                 <ListItem sx={{ display: 'list-item' }}>
//                     <Link href="https://support.google.com/accounts/answer/32050" target="_blank">Chrome</Link>
//                 </ListItem>
//                 <ListItem sx={{ display: 'list-item' }}>
//                     <Link href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank">Edge</Link>
//                 </ListItem>
//                 <ListItem sx={{ display: 'list-item' }}>
//                     <Link href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank">Firefox</Link>
//                 </ListItem>
//                 <ListItem sx={{ display: 'list-item' }}>
//                     <Link href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank">Safari</Link>
//                 </ListItem>
//             </List>
//             <Typography paragraph>For other browsers, visit the official support pages of your browser.</Typography>

//             <Typography paragraph>
//                 You may also opt out of certain third-party cookies (e.g., advertising or analytics cookies) via tools provided by those third parties. For example:
//             </Typography>

//             <List sx={{ pl: 2 }}>
//                 <ListItem sx={{ display: 'list-item' }}>
//                     Opt out of personalized ads through the{' '}
//                     <Link href="https://optout.networkadvertising.org/" target="_blank">Network Advertising Initiative</Link> or{' '}
//                     <Link href="https://optout.aboutads.info/" target="_blank">Digital Advertising Alliance</Link>.
//                 </ListItem>
//                 <ListItem sx={{ display: 'list-item' }}>
//                     Adjust settings for social media cookies through the respective platforms’ privacy settings.
//                 </ListItem>
//             </List>

//             <Divider sx={{ my: 2 }} />

//             <Typography variant="h5" gutterBottom>Contact Us</Typography>
//             <Typography paragraph>If you have any questions about this Cookies Policy, please contact us:</Typography>
//             <List sx={{ pl: 2 }}>
//                 <ListItem sx={{ display: 'list-item' }}>
//                     <strong>By email</strong>: <Link href="mailto:support@thecockpit.in">support@thecockpit.in</Link>
//                 </ListItem>
//                 {/* <ListItem sx={{ display: 'list-item' }}>
//                     <strong>By visiting</strong>: <Link href="https://thecockpit.in/contact" target="_blank">https://thecockpit.in/contact</Link>
//                 </ListItem> */}
//             </List>

//             <Typography paragraph>
//                 We may update this Cookies Policy periodically to reflect changes in our practices or legal requirements. Please review this page regularly for the latest information.
//             </Typography>
//         </Container>
//     );
// };

// export default CookiesPolicy;


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
    return (
        <Container maxWidth="xl" sx={{ py: 4, color: '#303A42', fontFamily: 'Jost' }}>
            <Typography variant="h4" sx={{ color: '#303A42', mb: 1, borderBottom: '2px solid #e2e8f0', pb: 1 }}>
                Cookie Policy
            </Typography>
            <Typography variant="body2" sx={{ color: '#718096', mb: 3, fontStyle: 'italic' }}>
                Effective Date: {formatedDate(new Date())}
            </Typography>

            <Typography paragraph>
                This Cookie Policy explains how The Cockpit ("we," "us," or "our") uses cookies and similar tracking technologies on our website, thecockpit.in (the "Website"), to enhance your experience, analyze usage, and deliver personalized Services. This policy is part of our broader policy and applies to all users of the Website.
            </Typography>

            <Typography variant="h5" gutterBottom>1. What Are Cookies?</Typography>
            <Typography paragraph>
                Cookies are small text files placed on your device (e.g., computer, smartphone) when you visit the Website. They store information about your preferences, interactions, or device to help the Website function efficiently. Similar technologies, such as web beacons, pixels, or local storage, serve comparable purposes and are included in this policy under "cookies."
            </Typography>

            <Typography variant="h5" gutterBottom>2. Types of Cookies We Use</Typography>
            <Typography paragraph>
                We use the following categories of cookies, each serving specific functions:
            </Typography>

            <Typography variant="h6" gutterBottom>2.1 Essential Cookies</Typography>
            <Typography paragraph>
                <strong>Purpose:</strong> Enable core Website functionality, such as user authentication, session management, and access to secure areas (e.g., your account dashboard).
            </Typography>
            <Typography paragraph>
                <strong>Examples:</strong> Cookies that maintain your login session or remember your cart items (if applicable).
            </Typography>
            <Typography paragraph>
                <strong>Necessity:</strong> These cookies are mandatory and cannot be disabled, as the Website would not function without them.
            </Typography>

            <Typography variant="h6" gutterBottom>2.2 Performance and Analytics Cookies</Typography>
            <Typography paragraph>
                <strong>Purpose:</strong> Collect anonymized data on how users interact with the Website to improve its performance and usability.
            </Typography>
            <Typography paragraph>
                <strong>Examples:</strong> Cookies from Google Analytics that track page views, time spent on pages, or bounce rates.
            </Typography>

            <Typography variant="h6" gutterBottom>2.3 Functional Cookies</Typography>
            <Typography paragraph>
                <strong>Purpose:</strong> Remember your preferences and settings to enhance your experience (e.g., language selection, test format preferences).
            </Typography>
            <Typography paragraph>
                <strong>Examples:</strong> Cookies that save your chosen theme (light/dark mode) or question difficulty level.
            </Typography>

            <Typography variant="h6" gutterBottom>2.4 Marketing and Personalization Cookies</Typography>
            <Typography paragraph>
                <strong>Purpose:</strong> Deliver tailored content or ads based on your interests and usage patterns (e.g., recommending premium plans or related educational resources).
            </Typography>

            <Typography variant="h5" gutterBottom>3. How We Use Cookies</Typography>
            <Typography paragraph>Cookies help us:</Typography>
            <List component="ul" sx={listSx}>
                <ListItem>Ensure seamless navigation and access to Services.</ListItem>
                <ListItem>Analyze Website performance and user behavior to identify areas for improvement.</ListItem>
                <ListItem>Personalize your experience by remembering your preferences and tailoring content.</ListItem>
                <ListItem>Measure the effectiveness of our marketing campaigns (if applicable).</ListItem>
                <ListItem>Enhance security by detecting unusual activity.</ListItem>
            </List>

            <Typography variant="h5" gutterBottom>4. Third-Party Cookies</Typography>
            <Typography paragraph>
                Some cookies are set by third-party services we use, such as:
            </Typography>
            <List component="ul" sx={listSx}>
                <ListItem>
                    <strong>Google Analytics:</strong> To track Website usage and performance.
                </ListItem>
                <ListItem>
                    <strong>Social Media Plugins:</strong> To enable sharing or login via platforms like Google or Facebook.
                </ListItem>
                <ListItem>
                    <strong>Payment Processors:</strong> To facilitate secure transactions.
                </ListItem>
            </List>

            <Typography variant="h5" gutterBottom>5. Cookie Retention</Typography>
            <Typography paragraph>
                Cookies have varying lifespans:
            </Typography>
            <List component="ul" sx={listSx}>
                <ListItem>
                    <strong>Session Cookies:</strong> Temporary and deleted when you close your browser (e.g., for login sessions).
                </ListItem>
                <ListItem>
                    <strong>Persistent Cookies:</strong> Remain on your device for a set period (e.g., 30 days for analytics).
                </ListItem>
                <ListItem>
                    We retain cookie data only as long as necessary for the purposes described, in line with our privacy policy.
                </ListItem>
            </List>

            <Typography variant="h5" gutterBottom>6. Updates to This Cookie Policy</Typography>
            <Typography paragraph>
                We may update this Cookie Policy to reflect changes in our practices or legal requirements. We will notify you of significant changes via the Website or email (where required). Your continued use of the Website constitutes acceptance of the updated policy.
            </Typography>

            <Typography variant="h5" gutterBottom>7. Contact Us</Typography>
            <Typography paragraph>
                For questions about cookies or this policy, contact us at:
            </Typography>
            <Typography>
                Email: <Link href="mailto:support@thecockpit.in">support@thecockpit.in</Link>
            </Typography>
        </Container>
    );
};

export default CookiesPolicy;

