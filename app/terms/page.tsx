import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LegalContent } from "@/components/legal/legal-content"

export const metadata = {
  title: "Terms of Service | Ìbáṣepọ̀",
  description: "Terms and conditions for using our coaching and consultancy services.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <LegalContent
        title="Terms of Service"
        lastUpdated="January 1, 2024"
        content={`
# Terms of Service

## Agreement to Terms

By accessing or using the services provided by Ìbáṣepọ̀ — Connected Hearts Coaching & Consultancy ("Company," "we," "our," or "us"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.

## Description of Services

Ìbáṣepọ̀ provides professional coaching, training, and consultancy services, including but not limited to:
- Individual coaching
- Couples coaching
- Corporate training and workshops
- Executive coaching
- Group workshops
- Online resources and content

## Eligibility

You must be at least 18 years old to use our services. By using our services, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these Terms.

## Account Registration

### Creating an Account
To access certain features of our services, you may need to create an account. You agree to:
- Provide accurate, current, and complete information
- Maintain and promptly update your account information
- Keep your password secure and confidential
- Notify us immediately of any unauthorized use of your account

### Account Responsibility
You are responsible for all activities that occur under your account. We are not liable for any loss or damage arising from your failure to maintain account security.

## Coaching Relationship

### Professional Boundaries
Our coaching services are professional in nature and are not a substitute for:
- Medical treatment or therapy
- Legal advice
- Financial planning services
- Any other licensed professional services

If you require such services, we will refer you to appropriate professionals.

### Client Responsibilities
As a client, you agree to:
- Participate actively and honestly in coaching sessions
- Complete agreed-upon assignments and exercises
- Communicate openly about your goals and challenges
- Respect scheduled session times
- Provide timely notice of cancellations

### Coach Responsibilities
We commit to:
- Maintain professional standards and ethics
- Respect client confidentiality (subject to legal exceptions)
- Provide services with reasonable skill and care
- Support your growth and development

## Scheduling and Cancellations

### Booking Sessions
Sessions must be booked through our official scheduling system. Confirmation will be sent via email.

### Cancellation Policy
- Cancellations must be made at least 24 hours before the scheduled session
- Cancellations with less than 24 hours notice may result in a cancellation fee
- No-shows will be charged the full session fee
- Emergency situations will be considered on a case-by-case basis

### Rescheduling
Sessions may be rescheduled with at least 24 hours notice, subject to availability.

## Payment Terms

### Fees
Current fees for our services are available on our website or upon request. Prices are subject to change with notice.

### Payment Methods
We accept payment via:
- Credit/debit cards
- Bank transfers
- Other methods as specified

### Payment Schedule
- Individual sessions: Payment due at time of booking
- Package deals: Payment plans available upon request
- Corporate services: Terms specified in separate agreement

### Refund Policy
- Cancellations within 24 hours: Full refund
- Cancellations with less than 24 hours notice: No refund
- Package deals: Refunds calculated on a pro-rata basis for unused sessions
- Dissatisfaction: We strive for client satisfaction; contact us to discuss concerns

## Confidentiality

### Our Commitment
We maintain strict confidentiality of all client information, including:
- Session content and discussions
- Personal information shared
- Progress and outcomes

### Exceptions
We may disclose information without consent when:
- Required by law or court order
- There is imminent risk of harm to self or others
- There is suspected abuse or neglect of a vulnerable person
- You provide written consent for disclosure

### Limits
Confidentiality cannot be guaranteed in:
- Group coaching or workshop settings
- Online communications (due to potential security risks)
- Situations involving multiple parties (e.g., couples coaching)

## Intellectual Property

### Our Content
All content on our website and in our materials, including text, graphics, logos, images, and software, is the property of Ìbáṣepọ̀ and is protected by copyright and other intellectual property laws.

### Your Use
You may:
- Access and use our content for personal, non-commercial purposes
- Download materials provided specifically for your coaching program

You may not:
- Reproduce, distribute, or create derivative works without permission
- Use our content for commercial purposes
- Remove copyright or proprietary notices

### Client Materials
Any materials you create or share during coaching remain your property. We may use anonymized examples for educational purposes with your consent.

## Limitation of Liability

To the fullest extent permitted by law:
- We are not liable for any indirect, incidental, special, or consequential damages
- Our total liability shall not exceed the amount paid by you for the services
- We do not guarantee specific outcomes or results from coaching

## Disclaimers

### No Guarantees
While we strive to provide high-quality services, we cannot guarantee:
- Specific results or outcomes
- That coaching will meet all your expectations
- Uninterrupted or error-free service delivery

### Professional Advice
Our coaching services do not constitute professional advice in areas such as:
- Medical or mental health treatment
- Legal matters
- Financial planning
- Tax preparation

## Termination

### By You
You may terminate the coaching relationship at any time by providing written notice. Refunds will be processed according to our refund policy.

### By Us
We reserve the right to terminate services if:
- You breach these Terms
- You engage in abusive or inappropriate behavior
- We determine that coaching is not appropriate for your needs
- Payment obligations are not met

## Dispute Resolution

### Informal Resolution
We encourage you to contact us first to resolve any disputes informally.

### Mediation
If informal resolution fails, we agree to attempt mediation before pursuing legal action.

### Governing Law
These Terms are governed by the laws of [Your State/Country], without regard to conflict of law principles.

## Changes to Terms

We may modify these Terms at any time. Changes will be effective upon posting to our website. Your continued use of our services after changes constitutes acceptance of the modified Terms.

## Severability

If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.

## Entire Agreement

These Terms, together with our Privacy Policy, constitute the entire agreement between you and Ìbáṣepọ̀ regarding our services.

## Contact Information

For questions about these Terms, please contact us at:

**Ìbáṣepọ̀ — Connected Hearts Coaching & Consultancy**

Email: Enquiries@ibasepo.org.uk
Phone: 07958 709238
Address: The living room, 14 Brunswick street, Stretford, M32 8NJ

## Acknowledgment

By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
        `}
      />
      <SiteFooter />
    </main>
  )
}
