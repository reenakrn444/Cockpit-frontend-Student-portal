import {
    Link,
} from '@mui/material';

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

const TermsAndConditions = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ backgroundColor: '#f8fafc', py: isMobile ? 2 : 3 }}>
            <Container
                maxWidth="xl"
                sx={{
                    // backgroundColor: '#ffffff',
                    // borderRadius: '12px',
                    // boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                    padding: isMobile ? 2 : 5,
                }}
            >
                <Typography variant="h3" component="h1" sx={{ color: '#303A42', mb: 1, borderBottom: '2px solid #e2e8f0', pb: 1 }}>
                    Terms and Conditions
                </Typography>

                <Typography variant="body2" className="last-updated" sx={{ color: '#718096', mb: 3, fontStyle: 'italic' }}>
                    Last Updated: April 30, 2025
                </Typography>

                <Typography paragraph>
                    Please read these Terms and Conditions carefully before using Our Service. By accessing or using the Service, You agree to be bound by these Terms and Conditions. If You do not agree with any part of these Terms, You must not use the Service.
                </Typography>

                <Typography variant="h4" component="h2" sx={{ color: '#303A42', mt: 4, mb: 2 }}>
                    Interpretation and Definitions
                </Typography>

                <Typography variant="h5" component="h3" sx={{ color: '#303A42', mt: 3, mb: 1 }}>
                    Interpretation
                </Typography>
                <Typography paragraph>
                    Words with capitalized initial letters have meanings defined under the following conditions. These definitions apply whether the terms appear in singular or plural form
                </Typography>

                <Typography variant="h5" component="h3" sx={{ color: '#303A42', mt: 3, mb: 1 }}>
                    Definitions
                </Typography>
                <Typography paragraph>
                    For the purposes of these Terms and Conditions:
                </Typography>

                <List sx={{ listStyle: 'none', pl: 0 }}>
                    {[
                        ['Affiliate', 'means an entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for election of directors or other managing authority.'],
                        ['Country', 'refers to India.'],
                        ['Company', '(referred to as "the Company," "We," "Us," or "Our" in this Agreement) refers to Cockpit Private Limited, New Delhi, India.'],
                        ['Content', 'refers to any text, images, or other material uploaded or provided by You to the Service.'],
                        ['Device', 'means any device that can access the Service, such as a computer, cellphone, or digital tablet.'],
                        ['Service', 'refers to the Website and any related services, including account creation, content uploading, purchasing items, and subscription plans.'],
                        ['Subscription', 'refers to a paid plan that provides access to premium features or content on the Service.'],
                        ['Terms and Conditions', '(also referred to as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.'],
                        ['Third-party Service', 'means any services or content (including data, information, products, or services) provided by a third party that may be displayed, included, or made available by the Service.'],
                        ['Website', <>refers to Cockpit, accessible from <Link href="https://thecockpit.in" target="_blank">https://thecockpit.in</Link>.</>],
                        ['You', 'means the individual accessing or using the Service, or the company or other legal entity on behalf of which such individual is accessing or using the Service.']
                    ].map(([term, description], index) => (
                        <ListItem key={index}
                            sx={{ pl: 3, position: 'relative', mb: 1 }}
                        >
                            <Box component="span" sx={{ position: 'absolute', left: 0, color: '#303A42', fontSize: '1.2em' }}>•</Box>
                            <Typography component="span"><strong>{term}</strong> {description}</Typography>
                        </ListItem>
                    ))}
                </List>


                <Typography variant="h6" component="h2" sx={{ color: '#303A42', mt: 4, mb: 2 }}>
                    Acknowledgment
                </Typography>
                <Typography paragraph>
                    These Terms and Conditions govern the use of the Service and constitute the agreement between You and the Company. They set out the rights and obligations of all users regarding the use of the Service. Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Our Privacy Policy.
                </Typography>

                <Typography variant="h6" component="h2" sx={{ color: '#303A42', mt: 4, mb: 2 }}>
                    Eligibility
                </Typography>
                <Typography paragraph>
                    You represent that You are at least 16 years of age. The Company does not permit individuals under 16 to create accounts or use the Service.
                </Typography>

                <Section
                    title="Account Creation"
                    items={[
                        "You may create an account on the Service by providing accurate and complete information as requested.",
                        "You are responsible for maintaining the confidentiality of Your account credentials and for all activities that occur under Your account.",
                        "You agree to notify Us immediately of any unauthorized use of Your account or any other breach of security.",
                        "We reserve the right to suspend or terminate Your account if We suspect fraudulent, abusive, or unlawful activity.",
                    ]}
                />

                <Section
                    title="User-Generated Content"
                    items={[
                        "You may upload Content (text, images, or other permitted materials) to the Service.",
                        "By uploading Content, You grant Us a non-exclusive, worldwide, royalty-free, perpetual license to use, reproduce, modify, adapt, publish, distribute, and display such Content for the purpose of providing and promoting the Service.",
                        "You represent and warrant that Your Content does not infringe on any third-party rights, including intellectual property, privacy, or publicity rights, and complies with applicable laws and these Terms.",
                        "We reserve the right to remove or modify any Content that violates these Terms or is deemed inappropriate, at Our sole discretion.",
                    ]}
                />

                <Section
                    title="Purchases and Subscriptions"
                    items={[
                        "Purchases: You may purchase items available on the Service. All purchases are subject to availability and Our acceptance of Your order. Prices are listed in Indian Rupees (INR) unless otherwise stated and include applicable taxes.",
                        "Subscriptions: We offer subscription plans for access to premium features or content. Subscription fees are charged on a recurring basis (e.g., monthly or annually) and are non-refundable except as required by applicable law.",
                        "Payment: Payments are processed through secure third-party payment processors. You agree to provide accurate payment information and authorize Us to charge Your chosen payment method for all purchases and subscriptions.",
                        "Cancellations and Refunds: You may cancel Your subscription at any time, but no refunds will be provided for the unused portion of the subscription period unless required by law. Refunds for purchased items are subject to Our refund policy, available on the Website.",
                        "Promotions: We may offer promotional discounts or offers at Our discretion. Such offers are subject to specific terms and may be withdrawn at any time without notice.",
                    ]}
                />

                <Section
                    title="Intellectual Property"
                    items={[
                        "Our logos and taglines are protected by copyright, and our trademarks are registered under Indian and, where applicable, international intellectual property laws.",
                        "You may not reproduce, distribute, modify, or create derivative works of Our content, including Our copyrighted logos, taglines, or registered trademarks, without prior written consent from the Company.",
                        "Any feedback, suggestions, or ideas You submit to Us may be implemented at Our discretion. By submitting feedback, You grant Us a non-exclusive, worldwide, royalty-free, perpetual license to use and implement such feedback without compensation to You.",
                    ]}
                />

                <Section
                    title="Links to Third-Party Websites"
                    items={[
                        "The Service may contain links to third-party websites or services not owned or controlled by the Company.",
                        "We are not responsible for the content, privacy policies, or practices of third-party websites or services. You access such websites at Your own risk and should review their terms and privacy policies.",
                    ]}
                />

                <Section
                    title="Termination"
                    items={[
                        "We may terminate or suspend Your account and access to the Service immediately, without prior notice or liability, for reasons including but not limited to a breach of these Terms.",
                        "Upon termination, Your right to use the Service will cease immediately, and any Content You uploaded may be removed at Our discretion.",
                        "You may terminate Your account by contacting Us or using the account deletion feature, if available.",
                    ]}
                />

                <Section
                    title="Limitation of Liability"
                    items={[
                        "To the maximum extent permitted by applicable law, the Company and its Affiliates, suppliers, or licensors shall not be liable for any special, incidental, indirect, or consequential damages (including but not limited to loss of profits, data, or privacy) arising out of or related to the use of or inability to use the Service.",
                        "Our total liability to You for any claims under these Terms is limited to the amount You paid through the Service in the six (6) months prior to the claim or INR 5,000, whichever is lower.",
                    ]}
                />

                <Section
                    title='"AS IS" and "AS AVAILABLE" Disclaimer'
                    items={[
                        "The Service is provided \"AS IS\" and \"AS AVAILABLE,\" without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.",
                        "We do not guarantee that the Service will be uninterrupted, error-free, or free of viruses or other harmful components. You use the Service at Your own risk.",
                    ]}
                />

                <Section
                    title="Governing Law"
                    items={[
                        "These Terms and Your use of the Service are governed by the laws of India, excluding its conflict of law rules.",
                        "Any disputes arising from these Terms or the Service shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.",
                    ]}
                />

                <Section
                    title="Dispute Resolution"
                    items={[
                        "If You have any concerns or disputes about the Service, You agree to first attempt to resolve the issue informally by contacting Us at support@thecockpit.in.",
                        "If the dispute remains unresolved, it shall be settled through mediation or arbitration in accordance with the Arbitration and Conciliation Act, 1996, in New Delhi, India.",
                    ]}
                />

                <Section
                    title="Severability and Waiver"
                    items={[
                        "Severability: If any provision of these Terms is found to be unenforceable or invalid, that provision will be modified to achieve its intended purpose to the greatest extent possible, and the remaining provisions will remain in full force.",
                        "Waiver: Our failure to enforce any right or provision of these Terms does not constitute a waiver of such right or provision unless expressly acknowledged in writing.",
                    ]}
                />

                <Section
                    title="Changes to These Terms"
                    items={[
                        "We reserve the right to modify or replace these Terms at any time at Our sole discretion.",
                        "By continuing to use the Service after revised Terms become effective, You agree to be bound by the updated Terms. If You do not agree, You must stop using the Service.",
                    ]}
                />

                <Box mt={6}>
                    <Typography variant="h6" component="h2" fontWeight={600} gutterBottom>
                        Contact Us
                    </Typography>
                    <List sx={{ pl: 2 }}>
                        <ListItem sx={{ pl: 3, position: 'relative', mb: 1 }}
                        >
                            <Box component="span" sx={{ position: 'absolute', left: 0, color: '#303A42', fontSize: '1.2em' }}>•</Box>
                            <Link href="mailto:support@thecockpit.in" underline="hover">
                                support@thecockpit.in
                            </Link>
                        </ListItem>
                        <ListItem sx={{ pl: 3, position: 'relative', mb: 1 }}
                        >
                            <Box component="span" sx={{ position: 'absolute', left: 0, color: '#303A42', fontSize: '1.2em' }}>•</Box>
                            <Link href="https://thecockpit.in/contact" target="_blank" rel="noopener noreferrer" underline="hover">
                                https://thecockpit.in/contact
                            </Link>
                        </ListItem>
                    </List>
                </Box>
                {/* Add other sections here... */}
            </Container>
        </Box>
    );
};

export default TermsAndConditions;

