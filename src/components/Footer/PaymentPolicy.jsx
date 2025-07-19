import {
    Link
} from '@mui/material';
import { formatedDate } from '../../Helper/DayCalculation/Daycalculation';

const PaymentPolicy = () => {
    return (
        <Container maxWidth="xl" sx={{ py: 4, color: '#303A42', fontFamily: 'Jost' }}>
            <Typography variant="h4" sx={{ color: '#303A42', mb: 1, borderBottom: '2px solid #e2e8f0', pb: 1 }}>Payment Policy</Typography>
            <Typography variant="body2" sx={{ color: '#718096', mb: 3, fontStyle: 'italic' }}>Effective Date: {formatedDate(new Date())}</Typography>

            <Typography paragraph>
                This Payment Policy governs all financial transactions related to premium Services offered by The Cockpit website and related services operated by Sudarshan Aviation LLP. These premium Services may include subscription plans, access to exclusive question banks, advanced performance analytics, or other paid features. By purchasing or subscribing to Premium Services, you agree to the terms of this Payment Policy & Refund Policy.
            </Typography>

            <Typography variant="h5" gutterBottom>1. Payment Methods</Typography>
            <Typography paragraph>
                We facilitate secure payments through trusted Cashfree Payment Gateway ensuring compliance with global security standards. Accepted payment methods include:
            </Typography>
            <Typography paragraph>• Credit and Debit Cards: Visa, MasterCard, American Express, and other major cards</Typography>
            <Typography paragraph>• Unified Payments Interface (UPI): Available for users in India (e.g., Google Pay, PhonePe, BHIM)</Typography>
            <Typography paragraph>• Net Banking: Supported for major Indian banks, as listed at checkout</Typography>
            <Typography paragraph>• Digital Wallets: Select wallets (e.g., Paytm, Amazon Pay), subject to availability</Typography>
            <Typography paragraph>• Other Methods: Additional options may be offered based on your region and processor capabilities</Typography>
            <Typography paragraph>
                We do not store sensitive payment information, such as full credit card numbers or UPI PINs, on our servers. All payment data is securely handled by our payment processors, which adhere to the Payment Card Industry Data Security Standard (PCI DSS) and other applicable regulations.
            </Typography>

            <Typography variant="h5" gutterBottom>2. Pricing and Billing</Typography>
            <Typography paragraph><strong>Pricing Transparency:</strong> Prices for Premium Services are displayed on the Website in Indian Rupees (INR) for Indian users or in your local currency for international users, based on real-time exchange rates. Prices include applicable taxes (e.g., Goods and Services Tax GST at 18% in India unless otherwise stated).</Typography>
            <Typography paragraph><strong>Billing Options:</strong></Typography>
            <Typography paragraph>• One-Time Purchases: For standalone products, such as a specific question bank or test series, you are charged a single fee at the time of purchase</Typography>
            <Typography paragraph>• Subscriptions: For recurring access to Premium Services (e.g., monthly, quarterly, or annual plans), charges are applied at the start of each billing cycle. The billing frequency and amount are clearly shown before you confirm your subscription</Typography>
            <Typography paragraph><strong>Currency Conversion:</strong> For international users, payments are processed in INR, and your bank or payment provider may apply currency conversion fees or foreign transaction charges, which are your responsibility.</Typography>
            <Typography paragraph><strong>Tax Details:</strong> All applicable taxes are itemized in your payment confirmation and receipt. For Indian users, GST is calculated based on the billing address provided.</Typography>
            <Typography paragraph><strong>Price Changes:</strong> We reserve the right to adjust prices for Premium Services due to market conditions, new features, or other factors. For subscriptions, we will notify you via email or in-app message at least 7 days before any price increase takes effect. You may cancel your subscription if you do not agree to the new pricing.</Typography>

            <Typography variant="h5" gutterBottom>3. Payment Process</Typography>
            <Typography paragraph><strong>Authorization:</strong> By submitting a payment, you authorize us, through our payment processor, to charge the agreed amount to your selected payment method. You confirm that you are the authorized user of the payment method.</Typography>
            <Typography paragraph><strong>Payment Confirmation:</strong> Upon successful payment, you will receive an email receipt detailing transaction ID, date and time of payment, amount charged (including taxes), and description of the purchased Service.</Typography>
            <Typography paragraph><strong>Failed Payments:</strong> If a payment attempt fails (e.g., due to insufficient funds, an expired card, or incorrect UPI details), we will notify you via in-app message to update your payment method and retry the payment.</Typography>
            <Typography paragraph><strong>Payment Errors:</strong> If you are charged incorrectly (e.g., double-billed), contact us immediately at <Link href="mailto:support@thecockpit.in">support@thecockpit.in</Link> for resolution.</Typography>

            <Typography variant="h5" gutterBottom>4. Subscription Management</Typography>
            <Typography paragraph><strong>Auto-Renewal:</strong> Subscriptions automatically renew at the end of each billing cycle (e.g., monthly, annually) unless canceled. Renewal charges are applied to the payment method on file, and you will receive a reminder email 7 days before each renewal.</Typography>
            <Typography paragraph><strong>Managing Subscriptions:</strong></Typography>
            <Typography paragraph>• Access your account settings on the Website to view, update, or cancel your subscription</Typography>
            <Typography paragraph>• Update your payment method at any time to avoid service interruptions</Typography>
            <Typography paragraph>• Contact <Link href="mailto:support@thecockpit.in">support@thecockpit.in</Link> if you encounter issues managing your subscription</Typography>
            <Typography paragraph><strong>Cancellation:</strong> You may cancel your subscription at any time through your account dashboard or by emailing support@thecockpit.in. Cancellation takes effect at the end of the current billing cycle. No charges will apply for future cycles after cancellation. Partial refunds for unused portions are not provided.</Typography>
            <Typography paragraph><strong>Pause Option:</strong> If offered, certain subscription plans may allow you to pause access for a limited period (e.g., 30 days), with billing resuming automatically thereafter. Check your account settings for availability.</Typography>

            <Typography variant="h5" gutterBottom>5. Refund Policy</Typography>
            <Typography paragraph>
                At Cockpit, we aim to provide high-quality digital aviation content and services through a subscription-based model. Due to the nature of our offerings—where access is granted immediately upon payment—we maintain a strict No Refund and No Cancellation Policy.
            </Typography>
            <Typography paragraph><strong>5.1 General Policy:</strong> All payments made on Cockpit are final and non-refundable. Once access is granted, no refund or cancellation is permitted, regardless of usage level or reason.</Typography>
            <Typography paragraph><strong>5.2 Non-Refundable Circumstances:</strong></Typography>
            <Typography paragraph>• Change of Mind</Typography>
            <Typography paragraph>• Partial Use</Typography>
            <Typography paragraph>• Subscription Auto-Renewal</Typography>
            <Typography paragraph>• Device/Connectivity Issues</Typography>
            <Typography paragraph>• User Errors</Typography>
            <Typography paragraph>• Promotional Pricing Disputes</Typography>
            <Typography paragraph>• Third-Party Delays</Typography>
            <Typography paragraph><strong>5.3 Special Cases:</strong> Bulk or Institutional Purchases are subject to the agreement. Promotional credits are non-refundable but may be reinstated where applicable.</Typography>

            <Typography variant="h5" gutterBottom>6. Taxes</Typography>
            <Typography paragraph><strong>Inclusion:</strong> Prices include applicable taxes, such as GST at 18% for Indian users, unless stated otherwise.</Typography>
            <Typography paragraph><strong>International Users:</strong> Additional taxes, duties, or VAT may apply and are your responsibility.</Typography>
            <Typography paragraph><strong>Tax Compliance:</strong> We remit collected taxes to the authorities and maintain proper records.</Typography>

            <Typography variant="h5" gutterBottom>7. Security</Typography>
            <Typography paragraph><strong>Encryption:</strong> All payment data is transmitted securely using SSL/TLS protocols.</Typography>
            <Typography paragraph><strong>PCI DSS Compliance:</strong> Our processors follow PCI DSS standards for card handling.</Typography>
            <Typography paragraph><strong>No Storage:</strong> We do not store sensitive payment details.</Typography>
            <Typography paragraph><strong>Fraud Detection:</strong> Suspicious activity is monitored and flagged for your safety.</Typography>

            <Typography variant="h5" gutterBottom>8. Disputes and Chargebacks</Typography>
            <Typography paragraph><strong>Resolution Process:</strong> Contact us before disputing any charge with your provider. We aim to resolve within 10 business days.</Typography>
            <Typography paragraph><strong>Chargeback Consequences:</strong> Initiating chargebacks without contact may lead to suspension and fees.</Typography>
            <Typography paragraph><strong>Cooperation:</strong> We provide documentation to assist in dispute resolution.</Typography>

            <Typography variant="h5" gutterBottom>9. Contact Us</Typography>
            <Typography paragraph>
                For any questions or concerns regarding this Payment Policy, please contact us at:
            </Typography>
            <Typography>Email: <Link href="mailto:support@thecockpit.in">support@thecockpit.in</Link></Typography>

            <Typography variant="h4" sx={{ color: '#303A42', mb: 1, borderBottom: '2px solid #e2e8f0', pt: 2, pb: 2 }} />

            <Typography paragraph >© {new Date().getFullYear()} Sudarshan Aviation LLP. All rights reserved.</Typography>
        </Container>
    );
};

export default PaymentPolicy;
