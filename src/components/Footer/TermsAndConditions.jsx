import {
    Link,
} from '@mui/material';
import { Section } from './Section';
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

const bulletStyle = {
    position: 'absolute',
    left: 0,
    color: '#303A42',
    fontSize: '1.6em', // Increased bullet size
    lineHeight: 1,
};

const TermsAndConditions = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ backgroundColor: theme.palette.background.policyBgcolor, py: isMobile ? 2 : 3 }}>
            <Container
                maxWidth="xl"
                sx={{
                    padding: isMobile ? 2 : 5,
                }}
            >
                <Typography variant="h3" component="h1" sx={{ color: theme.policy.text, mb: 1, borderBottom: '2px solid #e2e8f0', pb: 1 }}>
                    Terms and Conditions
                </Typography>

                <Typography variant="body2" className="last-updated" sx={{ color: '#718096', mb: 3, fontStyle: 'italic' }}>
                    Last Updated: {formatedDate(new Date())}
                </Typography>

                <Typography paragraph>
                    Please read these Terms and Conditions carefully before using Our Service. By accessing or using the Service, You agree to be bound by these Terms and Conditions. If You do not agree with any part of these Terms, You must not use the Service.
                </Typography>

                <Section
                    title="Acknowledgment"
                    items={[
                        'These Terms and Conditions govern the use of the Service and constitute the agreement between You and the Company.',
                        'They set out the rights and obligations of all users regarding the use of the Service.',
                        'Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Our Privacy Policy.',
                    ]}
                />

                <Section
                    title="Account Creation"
                    items={[
                        'You may create an account on the Service by providing accurate and complete information as requested.',
                        'You are responsible for maintaining the confidentiality of Your account credentials and for all activities that occur under Your account.',
                        'You agree to notify Us immediately of any unauthorized use of Your account or any other breach of security.',
                        'We reserve the right to suspend or terminate Your account if We suspect fraudulent, abusive, or unlawful activity.',
                    ]}
                />

                <Section
                    title="Purchases and Subscriptions"
                    items={[
                        'Purchases: You may purchase items available on the Service. All purchases are subject to availability and Our acceptance of Your order. Prices are listed in Indian Rupees (INR) unless otherwise stated and include applicable taxes.',
                        'Subscriptions: We offer subscription plans for access to premium features or content. Subscription fees are charged on a recurring basis (e.g., monthly or annually) and are non-refundable except as required by applicable law.',
                        'Payment: Payments are processed through secure third-party payment processors. You agree to provide accurate payment information and authorize Us to charge Your chosen payment method for all purchases and subscriptions.',
                        'Cancellations and Refunds: You may cancel Your subscription at any time, but no refunds will be provided for the unused portion of the subscription period unless required by law. Refunds for purchased items are subject to Our refund policy, available on the Website.',
                        'Promotions: We may offer promotional discounts or offers at Our discretion. Such offers are subject to specific terms and may be withdrawn at any time without notice.',
                    ]}
                />

                <Section
                    title="Intellectual Property"
                    items={[
                        'Our logos and taglines are protected, and our trademarks are registered under Indian and, where applicable, international intellectual property laws.',
                        'You may not reproduce, distribute, modify, or create derivative works of Our content, including Our copyrighted logos, taglines, or registered trademarks, without prior written consent from the Company.',
                        'Any feedback, suggestions, or ideas You submit to Us may be implemented at Our discretion. By submitting feedback, You grant Us a non-exclusive, worldwide, royalty-free, perpetual license to use and implement such feedback without compensation to You.',
                    ]}
                />

                <Section
                    title="Links to Third-Party Websites"
                    items={[
                        'The Service may contain links to third-party websites or services not owned or controlled by the Company.',
                        'We are not responsible for the content, privacy policies, or practices of third-party websites or services. You access such websites at Your own risk and should review their terms and privacy policies.',
                    ]}
                />

                <Section
                    title="Termination"
                    items={[
                        'We may terminate or suspend Your account and access to the Service immediately, without prior notice or liability, for reasons including but not limited to a breach of these Terms.',
                        'Upon termination, Your right to use the Service will cease immediately, and any Content You uploaded may be removed at Our discretion.',
                        'You may terminate Your account by contacting Us or using the account deletion feature, if available.',
                    ]}
                />

                <Section
                    title="Limitation of Liability"
                    items={[
                        'To the maximum extent permitted by applicable law, the Company and its Affiliates, suppliers, or licensors shall not be liable for any special, incidental, indirect, or consequential damages (including but not limited to loss of profits, data, or privacy) arising out of or related to the use of or inability to use the Service.',
                        'Our total liability to You for any claims under these Terms is limited to the amount You paid through the Service in the six (6) months prior to the claim or INR 1,000, whichever is lower.',
                    ]}
                />

                <Section
                    title="Dispute Resolution"
                    items={[
                        <>
                            If You have any concerns or disputes about the Service, You agree to first attempt to resolve the issue informally by contacting us at{' '}
                            <Link href="mailto:support@thecockpit.in" underline="hover" color="primary">
                                support@thecockpit.in
                            </Link>
                            .
                        </>,
                        'If the dispute remains unresolved, it shall be settled through mediation or arbitration in accordance with the Arbitration and Conciliation Act, 1996, in New Delhi, India.',
                    ]}
                />

                <Section
                    title="Severability and Waiver"
                    items={[
                        'Severability: If any provision of these Terms is found to be unenforceable or invalid, that provision will be modified to achieve its intended purpose to the greatest extent possible, and the remaining provisions will remain in full force.',
                        'Waiver: Our failure to enforce any right or provision of these Terms does not constitute a waiver of such right or provision unless expressly acknowledged in writing.',
                    ]}
                />

                <Section
                    title="Changes to These Terms"
                    items={[
                        'We reserve the right to modify or replace these Terms at any time at Our sole discretion.',
                        'By continuing to use the Service after revised Terms become effective, You agree to be bound by the updated Terms. If You do not agree, You must stop using the Service.',
                    ]}
                />
                <Section
                    title="Contact Us"
                    items={
                        <List component="ul" sx={listSx}>
                            <ListItem>
                                <Link href="mailto:support@thecockpit.in" underline="hover">
                                    support@thecockpit.in
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="https://thecockpit.in" target="_blank" underline="hover">
                                    https://thecockpit.in
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Typography component="span">
                                    Sudarsan Aviation LLP, Bhubaneswar, Odisha, 751020
                                </Typography>
                            </ListItem>
                        </List>
                    }
                />
            </Container>
        </Box>
    );
};

export default TermsAndConditions;

