import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Soft Standards Inc.",
  description:
    "Privacy Policy for Soft Standards Inc. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <nav className="border-b border-border-faint px-8 py-6 transition-colors duration-300">
        <div className="mx-auto max-w-[1200px]">
          <Link
            href="/"
            className="text-[14px] font-medium text-accent transition-opacity hover:opacity-80"
          >
            &larr; Back to Home
          </Link>
        </div>
      </nav>

      <article className="px-8 py-20">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="mb-2 text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.02em]">
            Privacy Policy
          </h1>
          <p className="mb-12 text-[14px] text-muted">
            Effective Date: February 1, 2026
          </p>

          <div className="space-y-10 text-[15px] leading-[1.8] text-muted">
            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                1. Introduction
              </h2>
              <p>
                Soft Standards Inc., a New York corporation (&quot;Soft
                Standards,&quot; &quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;), is committed to protecting and respecting your
                privacy. This Privacy Policy describes how we collect, use,
                disclose, and safeguard your personal information when you visit
                our website at <strong>softstandardsinc.com</strong>, use our
                services, communicate with us, or otherwise interact with our
                digital properties (collectively, the
                &quot;Services&quot;).
              </p>
              <p className="mt-4">
                This Privacy Policy applies to all visitors, users, and clients
                of Soft Standards Inc., regardless of location. By accessing or
                using our Services, you acknowledge that you have read,
                understood, and agree to the practices described in this Privacy
                Policy. If you do not agree with the terms of this Privacy
                Policy, please do not access or use our Services.
              </p>
              <p className="mt-4">
                We encourage you to read this Privacy Policy in its entirety. If
                you have any questions or concerns, please contact us using the
                information provided in the Contact Us section below.
              </p>
              <p className="mt-4 text-[13px] italic">
                Disclaimer: This policy is pending review by a licensed New York
                attorney. It is provided for informational purposes and may be
                updated.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                2. Information We Collect
              </h2>
              <p>
                Soft Standards Inc., a New York corporation, may collect the
                following categories of information in connection with our
                Services:
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                a. Personal Information
              </h3>
              <p>
                Personal information is data that can be used to identify you
                directly or indirectly. We may collect:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Name (first and last)</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company or organization name</li>
                <li>Job title or role</li>
                <li>
                  Billing and payment information (processed by our third-party
                  payment processors)
                </li>
                <li>
                  Any other information you voluntarily provide through forms,
                  correspondence, or our voice agent
                </li>
              </ul>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                b. Technical Data
              </h3>
              <p>
                When you access our website or Services, we automatically
                collect certain technical data, including:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Device type and screen resolution</li>
                <li>Cookies and similar tracking identifiers</li>
                <li>Referring URL and exit pages</li>
                <li>Time zone and language preferences</li>
              </ul>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                c. Usage Data
              </h3>
              <p>
                We collect information about how you interact with our website
                and Services, such as:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>Pages viewed and time spent on each page</li>
                <li>Click patterns and navigation paths</li>
                <li>
                  Features used and interactions with our AI voice agent
                </li>
                <li>Scroll depth and engagement metrics</li>
                <li>Date and time of access</li>
                <li>Search queries entered on our site</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                3. How We Collect Information
              </h2>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                a. Directly From You
              </h3>
              <p>
                We collect information that you provide to us directly when you
                fill out a contact form or request a consultation, book an
                appointment through our scheduling system, subscribe to our
                newsletter or marketing communications, interact with our
                AI-powered voice agent, engage with us via email, phone, or
                social media, or enter into a contract or service agreement with
                us.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                b. Automatically
              </h3>
              <p>
                Certain information is collected automatically when you visit or
                use our Services. This includes technical data and usage data
                gathered through cookies, web beacons, pixel tags, and similar
                tracking technologies. Our servers also automatically record
                information from your browser, including your IP address,
                browser type, referring and exit pages, and timestamps.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                c. From Third Parties
              </h3>
              <p>
                We may receive information about you from third-party sources,
                including analytics providers (such as Google Analytics),
                advertising networks, social media platforms, business partners
                and referral sources, and publicly available sources such as
                business directories and professional networking sites.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                4. How We Use Your Information
              </h2>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                a. Service Delivery
              </h3>
              <p>
                To provide, operate, and maintain our Services, including web
                development, app development, UI/UX design, digital marketing,
                brand strategy, and AI automation services. To process and
                fulfill your requests, inquiries, and appointment bookings. To
                manage your account and provide client support. To process
                payments and send invoices through our third-party payment
                processors.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                b. Communications
              </h3>
              <p>
                To send you service-related notices, updates, and transactional
                messages. To send marketing and promotional communications where
                you have opted in or where permitted by applicable law. To
                respond to your comments, questions, and inquiries. To provide
                you with relevant content, newsletters, and industry insights.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                c. Improvement and Analytics
              </h3>
              <p>
                To analyze usage trends, monitor the effectiveness of our
                Services, and improve website functionality and user experience.
                To develop new features, products, and services. To conduct
                research and analysis, including A/B testing. To train and
                improve our AI-powered tools and voice agent (using anonymized
                and aggregated data only).
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                d. Legal Compliance and Protection
              </h3>
              <p>
                To comply with applicable laws, regulations, and legal
                obligations. To enforce our terms and conditions and other
                agreements. To protect our rights, privacy, safety, or property,
                and that of our clients and the public. To detect, investigate,
                and prevent fraud, security breaches, and other harmful
                activities.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                5. Information Sharing and Disclosure
              </h2>
              <p>
                Soft Standards Inc. does not sell your personal information. We
                may share your information in the following limited
                circumstances:
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                a. Service Providers
              </h3>
              <p>
                We share information with trusted third-party service providers
                who assist us in operating our business and delivering our
                Services. These providers are contractually obligated to use your
                information only for the purposes of providing services to us
                and are required to protect your information in accordance with
                this Privacy Policy and applicable law.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                b. Legal Requirements
              </h3>
              <p>
                We may disclose your information if required to do so by law,
                regulation, legal process, or enforceable government request,
                including to meet national security or law enforcement
                requirements.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                c. Business Transfers
              </h3>
              <p>
                In the event of a merger, acquisition, reorganization,
                bankruptcy, or sale of all or a portion of our assets, your
                personal information may be transferred as part of that
                transaction. We will notify you via email and/or a prominent
                notice on our website of any change in ownership or uses of your
                personal information.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                d. With Your Consent
              </h3>
              <p>
                We may share your information with third parties when you have
                given us your explicit consent to do so.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                6. Cookies and Tracking Technologies
              </h2>
              <p>
                Soft Standards Inc. uses cookies and similar tracking
                technologies to enhance your experience on our website.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                Types of Cookies We Use
              </h3>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>
                  <strong>Strictly Necessary Cookies:</strong> Essential for the
                  operation of our website. You cannot opt out of these cookies.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> Used to collect information
                  about how visitors interact with our website, helping us
                  understand traffic patterns and improve performance.
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> Used to track visitors
                  across websites and display relevant ads. May be set by our
                  advertising partners.
                </li>
              </ul>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                Managing Cookies
              </h3>
              <p>
                Most web browsers allow you to control cookies through their
                settings. You can set your browser to refuse all cookies or to
                indicate when a cookie is being sent. However, if you disable or
                refuse cookies, some parts of our website may become
                inaccessible or may not function properly.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                7. Data Retention
              </h2>
              <p>
                We retain your personal information only for as long as is
                necessary to fulfill the purposes for which it was collected,
                including to satisfy any legal, accounting, or reporting
                requirements. In general, we retain client project files and
                related communications for a period of three (3) years following
                the completion of a project engagement, unless a longer retention
                period is required by law. Marketing and analytics data is
                typically retained for twenty-four (24) months.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                8. Data Security
              </h2>
              <p>
                Soft Standards Inc. takes the security of your personal
                information seriously. We implement administrative, technical,
                and physical safeguards designed to protect your personal
                information from unauthorized access, use, alteration, and
                disclosure, in compliance with the New York SHIELD Act.
              </p>
              <p className="mt-4">Our security measures include:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  <strong>Encryption:</strong> Industry-standard TLS/SSL
                  encryption for data in transit. AES-256 encryption for
                  sensitive data at rest.
                </li>
                <li>
                  <strong>Access Controls:</strong> Role-based access controls,
                  strong password policies, and multi-factor authentication.
                </li>
                <li>
                  <strong>Infrastructure Security:</strong> Secure cloud
                  infrastructure with regular security patches, firewalls, and
                  intrusion detection systems.
                </li>
                <li>
                  <strong>Employee Training:</strong> Team members receive
                  training on data privacy and security best practices.
                </li>
                <li>
                  <strong>Incident Response:</strong> Maintained incident
                  response plan to address potential data breaches promptly.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                9. Your Privacy Rights
              </h2>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                a. California Residents (CCPA/CPRA)
              </h3>
              <p>
                If you are a California resident, you have the right to know
                what personal information is collected, the right to delete your
                personal information, the right to correct inaccurate
                information, the right to opt-out of sale or sharing of personal
                information, the right to limit use of sensitive personal
                information, and the right to non-discrimination. To exercise
                your rights, email{" "}
                <a
                  href="mailto:privacy@softstandardsinc.com"
                  className="text-accent"
                >
                  privacy@softstandardsinc.com
                </a>
                . We will respond within forty-five (45) days.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                b. European Economic Area, United Kingdom, and Switzerland
                (GDPR)
              </h3>
              <p>
                If you are located in the EEA, UK, or Switzerland, you have the
                right of access, right to rectification, right to erasure, right
                to restriction of processing, right to data portability, right
                to object, right to withdraw consent, and the right to lodge a
                complaint with your local data protection supervisory authority.
                For GDPR-related inquiries, contact{" "}
                <a
                  href="mailto:privacy@softstandardsinc.com"
                  className="text-accent"
                >
                  privacy@softstandardsinc.com
                </a>
                .
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                c. New York Residents
              </h3>
              <p>
                As a New York corporation, Soft Standards Inc. complies with the
                New York SHIELD Act. You are entitled to data breach
                notification, reasonable security measures, and inquiry rights
                regarding personal information we hold about you.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                d. Virginia Residents (VCDPA)
              </h3>
              <p>
                Virginia residents have the right to access, correct, delete,
                obtain portable copies of personal data, and opt out of targeted
                advertising, sale of personal data, or profiling. Contact{" "}
                <a
                  href="mailto:privacy@softstandardsinc.com"
                  className="text-accent"
                >
                  privacy@softstandardsinc.com
                </a>{" "}
                to exercise your rights.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                e. Colorado Residents (CPA)
              </h3>
              <p>
                Colorado residents have the right to access, correct, delete,
                obtain portable copies of personal data, and opt out of targeted
                advertising, sale of personal data, or certain types of
                profiling. Contact{" "}
                <a
                  href="mailto:privacy@softstandardsinc.com"
                  className="text-accent"
                >
                  privacy@softstandardsinc.com
                </a>{" "}
                to exercise your rights.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                10. Do Not Track / Global Privacy Control
              </h2>
              <p>
                Our website does not currently respond to browser Do Not Track
                (DNT) signals. However, we do honor the Global Privacy Control
                (GPC) signal. If your browser or extension sends a GPC signal,
                we will treat it as a valid opt-out request for the sale or
                sharing of your personal information, as required under
                applicable laws such as the CCPA/CPRA.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                11. Children&apos;s Privacy
              </h2>
              <p>
                Our Services are not directed to children under the age of
                thirteen (13), and we do not knowingly collect personal
                information from children under 13 in compliance with COPPA. If
                you are a parent or guardian and believe that your child under 13
                has provided us with personal information, please contact us at{" "}
                <a
                  href="mailto:privacy@softstandardsinc.com"
                  className="text-accent"
                >
                  privacy@softstandardsinc.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                12. International Data Transfers
              </h2>
              <p>
                Soft Standards Inc. is based in the United States. If you are
                accessing our Services from outside the United States, your
                information may be transferred to, stored in, and processed in
                the United States. Where we transfer personal data from the EEA,
                UK, or Switzerland, we ensure that appropriate safeguards are in
                place, such as standard contractual clauses approved by the
                European Commission.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                13. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites, services,
                or applications that are not operated or controlled by Soft
                Standards Inc. This Privacy Policy does not apply to any
                third-party sites. We encourage you to review the privacy
                policies of any third-party websites that you visit.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                14. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices, technologies, legal requirements, or
                other factors. When we make material changes, we will notify you
                by updating the &quot;Effective Date&quot; at the top of this
                page and, where required by law, by sending you an email
                notification or posting a prominent notice on our website.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                15. Contact Us
              </h2>
              <p>
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact us:
              </p>
              <p className="mt-4">
                <strong className="text-foreground">
                  Soft Standards Inc.
                </strong>
                <br />A New York Corporation
                <br />
                Email:{" "}
                <a
                  href="mailto:privacy@softstandardsinc.com"
                  className="text-accent"
                >
                  privacy@softstandardsinc.com
                </a>
              </p>
            </section>

          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
