import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { LegalContent } from "@/components/legal/legal-content"

export const metadata = {
  title: "Privacy Policy | Ìbáṣepọ̀",
  description: "Our commitment to protecting your privacy and personal information.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <LegalContent
        title="Privacy Policy"
        lastUpdated="January 1, 2024"
        content={`
# Privacy Policy

## Introduction

At Ìbáṣepọ̀ — Connected Hearts Coaching & Consultancy ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.

## Information We Collect

### Personal Information
We may collect personal information that you voluntarily provide to us when you:
- Register for our services
- Book a coaching session
- Subscribe to our newsletter
- Contact us through our website
- Participate in surveys or feedback forms

This information may include:
- Name and contact information (email, phone number, address)
- Professional information (job title, company)
- Payment and billing information
- Communication preferences
- Any other information you choose to provide

### Automatically Collected Information
When you visit our website, we may automatically collect certain information about your device and browsing actions, including:
- IP address
- Browser type and version
- Operating system
- Referring website
- Pages viewed and time spent on pages
- Cookies and similar tracking technologies

## How We Use Your Information

We use the information we collect to:
- Provide, maintain, and improve our coaching services
- Process your bookings and payments
- Send you confirmations, updates, and administrative messages
- Respond to your inquiries and provide customer support
- Send you newsletters and marketing communications (with your consent)
- Analyze usage patterns and improve our website
- Protect against fraud and unauthorized access
- Comply with legal obligations

## Information Sharing and Disclosure

We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:

### Service Providers
We may share your information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, such as:
- Payment processors
- Email service providers
- Scheduling and calendar tools
- Analytics providers

### Legal Requirements
We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, subpoenas).

### Business Transfers
In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.

### With Your Consent
We may share your information with third parties when we have your explicit consent to do so.

## Data Security

We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
- Encryption of sensitive data
- Secure server infrastructure
- Regular security assessments
- Access controls and authentication
- Employee training on data protection

However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.

## Your Rights and Choices

Depending on your location, you may have certain rights regarding your personal information, including:

### Access and Correction
You have the right to access and update your personal information. You can do this by logging into your account or contacting us directly.

### Deletion
You may request that we delete your personal information, subject to certain legal exceptions.

### Opt-Out
You can opt out of receiving marketing communications from us by:
- Clicking the "unsubscribe" link in our emails
- Updating your communication preferences in your account
- Contacting us directly

### Cookies
You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website.

## Retention of Information

We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.

## Children's Privacy

Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child without parental consent, we will take steps to delete that information.

## International Data Transfers

Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. We take appropriate safeguards to ensure your information receives adequate protection.

## Third-Party Links

Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.

## Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:
- Posting the updated policy on our website
- Updating the "Last Updated" date
- Sending you an email notification (for significant changes)

Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.

## Contact Us

If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:

**Ìbáṣepọ̀ — Connected Hearts Coaching & Consultancy**

Email: Enquiries@ibasepo.org.uk
Phone: 07958 709238
Address: The living room, 14 Brunswick street, Stretford, M32 8NJ

## Consent

By using our website and services, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy.
        `}
      />
      <Footer />
    </main>
  )
}
