import {
    Link,
} from '@mui/material';
import { Section } from './Section';
import { formatedDate } from '../../Helper/DayCalculation/Daycalculation';


const renderList = (items) => (
    <List sx={{ pl: 2 }}>
        {items.map((item, index) => (
            <ListItem key={index} sx={{ pl: 3, position: 'relative', }}
            >
                <Box component="span" sx={{ position: 'absolute', left: 0, color: '#303A42', fontSize: '1.2em' }}>•</Box>
                <ListItemText primary={<Typography variant="body2">{item}</Typography>} />
            </ListItem>
        ))}
    </List>
);

const PrivacyPolicy = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ backgroundColor: '#f8fafc', py: isMobile ? 2 : 3 }}>
            <Container
                maxWidth="xl"
                sx={{
                    padding: isMobile ? 2 : 5,
                    fontFamily: 'Jost'
                }}
            >
                <Typography variant="h3" component="h1" sx={{ color: '#303A42', mb: 1, borderBottom: '2px solid #e2e8f0', pb: 1 }}>
                    Privacy Policy
                </Typography>

                <Typography variant="body2" className="last-updated" sx={{ color: '#718096', mb: 3, fontStyle: 'italic' }}>
                    Last Updated: {formatedDate(new Date())}
                </Typography>

                <Typography paragraph>
                    This Privacy Policy governs the collection, use, disclosure, and protection of personal information by Cockpit Private Limited based in New Delhi, India ("Company," "We," "Us," or "Our"), when you access or use our website at <a href="https://thecockpit.in">https://thecockpit.in</a> ("Service"). This policy is designed with a focus on Indian users and complies with the Digital Personal Data Protection Act, 2023 (DPDPA), India’s primary data protection law. For users accessing the Service from other regions, this policy also adheres to applicable international regulations, including the General Data Protection Regulation, California Consumer Privacy Act as amended by the California Privacy Rights Act, and California Online Privacy Protection Act. By using the Service, you consent to the practices described herein.
                </Typography>

                <Typography variant="h4" component="h2" sx={{ color: '#303A42', mt: 4, mb: 2 }}>
                    Interpretation and Definitions
                </Typography>

                <Typography variant="h5" component="h3" sx={{ color: '#303A42', mt: 3, mb: 1 }}>
                    Interpretation
                </Typography>
                <Typography paragraph>
                    Terms with initial capital letters have the meanings defined below, applicable in singular and plural forms.
                </Typography>

                <Typography variant="h5" component="h3" sx={{ color: '#303A42', mt: 3, mb: 1 }}>
                    Definitions
                </Typography>


                <List sx={{ listStyle: 'none', pl: 0 }}>
                    {[
                        ['Account', 'A unique profile created to access the Service or its features.'],
                        ['Affiliate', 'An entity controlling, controlled by, or under common control with a party, where control denotes ownership of 50% or more of voting shares or securities.'],
                        ['Cookies', 'Small files stored on your device to track browsing activity and preferences.'],
                        ['Device', 'Any hardware accessing the Service, such as a computer, mobile phone, or tablet.'],
                        ['Personal Data', 'Information relating to an identified or identifiable individual, including name, email address, or IP address, as defined under the DPDPA.'],
                        ['Service', <>The website at <a href="https://thecockpit.in">https://thecockpit.in</a>.</>],
                        ['Service Provider', 'A third party processing data on our behalf to support the Service.'],
                        ['Third-Party Social Media Service', 'External platforms used for login or account creation, including Google, Facebook, Instagram, Twitter, and LinkedIn.'],
                        ['Usage Data', 'Automatically collected data, including IP addresses, browser details, or visit duration.'],
                        ['You', 'The individual or legal entity accessing or using the Service.'],
                    ].map(([term, description], index) => (
                        <ListItem key={index}
                            sx={{ pl: 3, position: 'relative', mb: 1 }}
                        >
                            <Box component="span" sx={{ position: 'absolute', left: 0, color: '#303A42', fontSize: '1.2em' }}>•</Box>
                            <Typography component="span"><strong>{term}</strong> {description}</Typography>
                        </ListItem>
                    ))}
                </List>


                <Typography variant="h4" component="h2" sx={{ color: '#303A42', mt: 4, mb: 2 }}>
                    Collection of Personal Data
                </Typography>
                <Typography variant="h5" component="h3" sx={{ color: '#303A42', mt: 4, mb: 2 }}>
                    Types of Data Collected
                </Typography>


                <Typography variant="h6" gutterBottom>Personal Data</Typography>
                <Typography>We may collect the following identifiable information:</Typography>
                {renderList([
                    'Email address',
                    'First name and last name',
                    'Phone number',
                    'Address, including State, Province, ZIP/Postal code, and City',
                    'Payment information, processed securely by third-party providers',
                    'Other information voluntarily provided by you',
                ])}

                <Typography variant="h6" gutterBottom>Usage Data</Typography>
                <Typography>Usage Data is collected automatically and includes:</Typography>
                {renderList([
                    'Device IP address',
                    'Browser type and version',
                    'Pages visited, visit time, and duration',
                    'Unique device identifiers',
                    'Mobile device details, including operating system and browser type',
                ])}

                <Typography variant="h6" gutterBottom>Third-Party Social Media Services</Typography>
                <Typography>You may register or log in via:</Typography>
                {renderList(['Google', 'Facebook', 'Instagram', 'Twitter', 'LinkedIn'])}
                <Typography>
                    We may collect Personal Data from these accounts, including name, email address, or profile details, with your consent. Additional data shared through these services will be processed per this policy.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" gutterBottom>Tracking Technologies and Cookies</Typography>
                <Typography>
                    We use Cookies and similar technologies, including web beacons, to enhance and analyze the Service. Cookie types include:
                </Typography>
                {renderList([
                    'Necessary Cookies (Session): Enable core Service functionality and user authentication.',
                    'Policy Acceptance Cookies (Persistent): Record your consent to Cookie use.',
                    'Functionality Cookies (Persistent): Store preferences, such as login details or language settings.',
                ])}
                <Typography>
                    You may manage Cookie settings through your browser. For details, refer to our Cookies Policy at{' '}
                    <a href="https://thecockpit.in/cookies">https://thecockpit.in/cookies</a>
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>Use of Personal Data</Typography>
                <Typography>We process Personal Data for the following purposes:</Typography>
                <List sx={{ listStyleType: 'decimal', pl: 4 }}>
                    {[...Array(8)].map((_, i) => (
                        <ListItem key={i} sx={{ display: 'list-item' }}>
                            <ListItemText
                                primary={
                                    [
                                        'To provide and maintain the Service, including monitoring its performance.',
                                        'To manage your Account and enable access to registered user features.',
                                        'To fulfill contracts, including purchases or other agreements.',
                                        'To communicate with you via email, phone, SMS, or push notifications regarding updates, security, or services.',
                                        'To send promotional materials, news, or event information, subject to your opt-out preference.',
                                        'To address your inquiries or support requests.',
                                        'To evaluate or execute mergers, acquisitions, or asset sales.',
                                        'To analyze usage patterns, improve the Service, and enhance user experience.',
                                    ][i]
                                }
                            />
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>Legal Bases for Processing</Typography>
                <Typography>
                    Under the Digital Personal Data Protection Act, 2023, we process Personal Data based on:
                </Typography>
                {renderList([
                    'Consent, for voluntary data collection, such as marketing.',
                    'Contractual necessity, to fulfill Service agreements.',
                    'Legal obligations, to comply with applicable laws.',
                    'Legitimate interests, for analytics, fraud prevention, or Service enhancement, provided your rights are not overridden.',
                ])}
                <Typography>
                    For users in the European Economic Area, equivalent bases apply under GDPR, including explicit consent where required.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>Disclosure of Personal Data</Typography>
                <Typography>We may disclose Personal Data in the following circumstances:</Typography>
                {renderList([
                    'To Service Providers for analytics, payment processing, or Service support, under strict data protection agreements.',
                    'During mergers, acquisitions, or asset sales.',
                    'To Affiliates under common control, bound by this policy.',
                    'In public areas of the Service, where information you share may be visible to others, including via Third-Party Social Media Services.',
                    'With your explicit consent for additional purposes.',
                    'To comply with legal obligations, court orders, or to protect our rights, users, or the public.',
                ])}
                <Typography>
                    We do not disclose Personal Data for monetary or other valuable consideration to third parties, unless explicitly stated and consented to by you.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>Retention of Personal Data</Typography>
                <Typography>We retain Personal Data only as necessary for the purposes outlined, including:</Typography>
                {renderList([
                    'Providing the Service.',
                    'Complying with legal obligations, such as tax or reporting requirements under Indian law.',
                    'Resolving disputes or enforcing agreements.',
                ])}
                <Typography>
                    Usage Data is retained for internal analysis, typically for shorter periods, unless required for security or legal compliance.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>International Data Transfers</Typography>
                <Typography>
                    Personal Data may be processed outside India, including in the European Economic Area, United States, or other jurisdictions, particularly for users accessing the Service from those regions. We implement safeguards, such as Standard Contractual Clauses for GDPR or equivalent mechanisms under DPDPA, to ensure secure processing. Your submission of Personal Data constitutes consent to such transfers, as permitted under DPDPA.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>Your Privacy Rights</Typography>

                <Typography variant="h6">Rights Under DPDPA (India Residents)</Typography>
                <Typography>Under India's Digital Personal Data Protection Act, 2023, you have the right to:</Typography>
                {renderList([
                    'Access a summary of your Personal Data and processing activities.',
                    'Correct inaccurate or incomplete data.',
                    'Erase Personal Data, subject to legal obligations.',
                    'Nominate an individual to exercise your rights in case of incapacity.',
                    'Withdraw consent at any time, without affecting prior processing.',
                ])}
                <Typography>
                    Submit requests to <Link href="mailto:support@thecockpit.in">support@thecockpit.in</Link>. We will respond within 30 days, as required by DPDPA.
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6">General Rights for All Users</Typography>
                <Typography>Regardless of your location, you may:</Typography>
                {renderList([
                    'Access, update, or delete Personal Data through your Account settings.',
                    'Contact us at support@thecockpit.in to request access, correction, or deletion.',
                    'Opt out of promotional communications via email unsubscribe links or by contacting us.',
                ])}
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6">Rights for Users in the European Economic Area (GDPR)</Typography>
                <Typography>If you are in the European Economic Area, you have the right to:</Typography>
                {renderList([
                    'Access a copy of your Personal Data.',
                    'Rectify inaccurate data.',
                    'Request erasure of data.',
                    'Restrict processing in specific cases.',
                    'Receive your data in a portable format.',
                    'Object to processing based on legitimate interests, including marketing.',
                    'Withdraw consent at any time.',
                ])}
                <Typography>
                    Contact <Link href="mailto:support@thecockpit.in">support@thecockpit.in</Link> to exercise these rights. We will respond within one month, extendable per GDPR.
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6">Rights for California Residents (CCPA/CPRA)</Typography>
                <Typography>If you are a California resident, you have the right to:</Typography>
                {renderList([
                    'Know details of Personal Data collected, used, or disclosed in the past 12 months.',
                    'Request deletion of Personal Data, subject to exemptions.',
                    'Opt out of any disclosure of Personal Data for monetary or other valuable consideration (we do not currently engage in such disclosures).',
                    'Receive non-discriminatory treatment for exercising rights.',
                    'Limit use of sensitive Personal Data to specific purposes.',
                ])}
                <Typography>
                    Submit requests to <Link href="mailto:support@thecockpit.in">support@thecockpit.in</Link> with "CCPA Request" in the subject line. We will verify your identity and respond within 45 days, extendable by 45 days. Authorized agents may submit requests with your signed authorization.
                </Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6">CalOPPA Compliance</Typography>
                <Typography>
                    For users in California, we disclose categories of Personal Data collected, allow requests regarding third-party data sharing, and honor "Do Not Track" signals to the extent feasible.
                </Typography>
                <Divider sx={{ my: 3 }} />

                <Typography variant="h6">Other Jurisdictions</Typography>
                <Typography>
                    Residents of other regions may have similar rights under their local laws, such as data access or deletion. Contact us to exercise these rights.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>Security of Personal Data</Typography>
                <Typography>
                    We implement industry-standard measures, including encryption and access controls, to protect Personal Data. However, no method of internet transmission or electronic storage is entirely secure. We strive to mitigate risks but cannot guarantee absolute security.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>Children's Privacy</Typography>
                <Typography>
                    The Service is not intended for individuals under 13, or 16 where required by applicable law. We do not knowingly collect Personal Data from children without verifiable parental consent. If you believe a child has provided Personal Data, contact <Link href="mailto:support@thecockpit.in">support@thecockpit.in</Link> for removal.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>Third-Party Websites</Typography>
                <Typography>
                    The Service may contain links to third-party websites. We are not responsible for their content or privacy practices. Review their policies before submitting Personal Data.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>Changes to This Policy</Typography>
                <Typography>
                    We may revise this Privacy Policy to reflect legal or operational changes. You will be notified via email or a notice on the Service prior to changes taking effect, with the "Last Updated" date revised. Review this policy periodically.
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h5" gutterBottom>Contact Us</Typography>
                <Typography>For inquiries, requests, or complaints, contact:</Typography>
                {renderList([
                    'Email: support@thecockpit.in',
                    'Address: Cockpit Private Limited, New Delhi, India',
                ])}
                <Typography>
                    Unresolved concerns may be escalated to the Data Protection Board of India under DPDPA or, for international users, to your local data protection authority.
                </Typography>
            </Container>
        </Box>
    );
};

export default PrivacyPolicy;

