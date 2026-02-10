import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';

export const metadata: Metadata = {
  title: 'Privacy Policy — Soft Standards Inc.',
  description:
    'Privacy Policy for Soft Standards Inc. Learn how we collect, use, and protect your personal information. Covers CCPA, GDPR, NY SHIELD Act, and other privacy rights.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <HeroSection
        title={
          <>
            Privacy <span className="text-gradient">Policy</span>
          </>
        }
        subtitle="Your privacy matters to us. This policy explains how we collect, use, and protect your information."
        background="light"
        showScrollIndicator={false}
      />

      <section className="py-[clamp(40px,6vw,80px)] px-[clamp(20px,5vw,80px)]">
        <div className="max-w-[900px] mx-auto">
          {/* Disclaimer Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-4 mb-10">
            <p className="text-[0.9rem] text-amber-800 leading-[1.7]">
              <strong>Disclaimer:</strong> This policy is pending review by a licensed New York
              attorney. It is provided for informational purposes and may be updated.
            </p>
          </div>

          {/* 1. Introduction */}
          <section id="introduction">
            <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">1. Introduction</h2>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              <strong>Effective Date:</strong> February 1, 2026
            </p>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              Soft Standards Inc., a New York corporation (&quot;Soft Standards,&quot;
              &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), is committed to protecting and
              respecting your privacy. This Privacy Policy describes how we collect, use, disclose,
              and safeguard your personal information when you visit our website at{' '}
              <strong>softstandardsinc.com</strong>, use our services, communicate with us, or otherwise
              interact with our digital properties (collectively, the &quot;Services&quot;).
            </p>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              This Privacy Policy applies to all visitors, users, and clients of Soft Standards Inc.,
              regardless of location. By accessing or using our Services, you acknowledge that you
              have read, understood, and agree to the practices described in this Privacy Policy. If
              you do not agree with the terms of this Privacy Policy, please do not access or use our
              Services.
            </p>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              We encourage you to read this Privacy Policy in its entirety. If you have any questions
              or concerns, please contact us using the information provided in the{' '}
              <a href="#contact-us" className="text-blue-600 underline hover:text-blue-800">
                Contact Us
              </a>{' '}
              section below.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section id="information-we-collect">
            <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
              2. Information We Collect
            </h2>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              Soft Standards Inc., a New York corporation, may collect the following categories of
              information in connection with our Services:
            </p>

            <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
              a. Personal Information
            </h3>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              Personal information is data that can be used to identify you directly or indirectly.
              We may collect:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Name</strong> (first and last)
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Email address</strong>
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Phone number</strong>
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Company or organization name</strong>
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Job title or role</strong>
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Billing and payment information</strong> (processed by our third-party
                payment processors)
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Any other information you voluntarily provide</strong> through forms,
                correspondence, or our voice agent
              </li>
            </ul>

            <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
              b. Technical Data
            </h3>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              When you access our website or Services, we automatically collect certain technical
              data, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>IP address</strong>
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Browser type and version</strong>
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Operating system</strong>
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Device type and screen resolution</strong>
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Cookies and similar tracking identifiers</strong>
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Referring URL and exit pages</strong>
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Time zone and language preferences</strong>
              </li>
            </ul>

            <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
              c. Usage Data
            </h3>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              We collect information about how you interact with our website and Services, such as:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                Pages viewed and time spent on each page
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                Click patterns and navigation paths
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                Features used and interactions with our AI voice agent
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                Scroll depth and engagement metrics
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                Date and time of access
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                Search queries entered on our site
              </li>
            </ul>
          </section>

          {/* 3. How We Collect Information */}
          <section id="how-we-collect">
            <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
              3. How We Collect Information
            </h2>

            <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
              a. Directly From You
            </h3>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              We collect information that you provide to us directly when you:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                Fill out a contact form or request a consultation
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                Book an appointment through our scheduling system
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                Subscribe to our newsletter or marketing communications
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                Interact with our AI-powered voice agent
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                Engage with us via email, phone, or social media
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                Enter into a contract or service agreement with us
              </li>
            </ul>

            <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
              b. Automatically
            </h3>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              Certain information is collected automatically when you visit or use our Services. This
              includes technical data and usage data gathered through cookies, web beacons, pixel
              tags, and similar tracking technologies. Our servers also automatically record
              information from your browser, including your IP address, browser type, referring and
              exit pages, and timestamps.
            </p>

            <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
              c. From Third Parties
            </h3>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              We may receive information about you from third-party sources, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Analytics providers</strong> (such as Google Analytics) that provide us with
                aggregated usage data
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Advertising networks</strong> that help us deliver relevant marketing
                messages
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Social media platforms</strong> when you interact with our content or link
                your account
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Business partners and referral sources</strong> who may share your contact
                information with your consent
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Publicly available sources</strong> such as business directories and
                professional networking sites
              </li>
            </ul>
          </section>

          {/* 4. How We Use Your Information */}
          <section id="how-we-use">
            <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
              4. How We Use Your Information
            </h2>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              Soft Standards Inc., a New York corporation, uses the information we collect for the
              following purposes:
            </p>

            <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
              a. Service Delivery
            </h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                To provide, operate, and maintain our Services, including web development, app
                development, UI/UX design, digital marketing, brand strategy, and AI automation
                services
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                To process and fulfill your requests, inquiries, and appointment bookings
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                To manage your account and provide client support
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                To process payments and send invoices through our third-party payment processors
              </li>
            </ul>

            <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
              b. Communications
            </h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                To send you service-related notices, updates, and transactional messages
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                To send marketing and promotional communications where you have opted in or where
                permitted by applicable law
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                To respond to your comments, questions, and inquiries
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                To provide you with relevant content, newsletters, and industry insights
              </li>
            </ul>

            <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
              c. Improvement and Analytics
            </h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                To analyze usage trends, monitor the effectiveness of our Services, and improve
                website functionality and user experience
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                To develop new features, products, and services
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                To conduct research and analysis, including A/B testing
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                To train and improve our AI-powered tools and voice agent (using anonymized and
                aggregated data only)
              </li>
            </ul>

            <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
              d. Legal Compliance and Protection
            </h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                To comply with applicable laws, regulations, and legal obligations, including tax
                and accounting requirements
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                To enforce our terms and conditions and other agreements
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                To protect our rights, privacy, safety, or property, and that of our clients and
                the public
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                To detect, investigate, and prevent fraud, security breaches, and other harmful
                activities
              </li>
            </ul>
          </section>

          {/* 5. Information Sharing and Disclosure */}
          <section id="information-sharing">
            <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
              5. Information Sharing and Disclosure
            </h2>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              Soft Standards Inc., a New York corporation, does not sell your personal information.
              We may share your information in the following limited circumstances:
            </p>

            <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
              a. Service Providers
            </h3>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              We share information with trusted third-party service providers who assist us in
              operating our business and delivering our Services. These providers are contractually
              obligated to use your information only for the purposes of providing services to us and
              are required to protect your information in accordance with this Privacy Policy and
              applicable law. Examples include cloud hosting providers, payment processors, email
              delivery services, analytics tools, and AI service providers.
            </p>

            <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
              b. Legal Requirements
            </h3>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              We may disclose your information if required to do so by law, regulation, legal
              process, or enforceable government request, including to meet national security or law
              enforcement requirements. We may also disclose information when we believe in good
              faith that disclosure is necessary to protect our rights, your safety, or the safety of
              others, or to investigate fraud or respond to a government request.
            </p>

            <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
              c. Business Transfers
            </h3>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              In the event of a merger, acquisition, reorganization, bankruptcy, or sale of all or a
              portion of our assets, your personal information may be transferred as part of that
              transaction. We will notify you via email and/or a prominent notice on our website of
              any change in ownership or uses of your personal information, as well as any choices
              you may have regarding your personal information.
            </p>

            <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
              d. With Your Consent
            </h3>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              We may share your information with third parties when you have given us your explicit
              consent to do so. For example, if you authorize us to share project details with a
              partner agency or technology provider in connection with your engagement.
            </p>
          </section>

          {/* 6. Cookies and Tracking Technologies */}
          <section id="cookies">
            <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
              6. Cookies and Tracking Technologies
            </h2>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              Soft Standards Inc., a New York corporation, uses cookies and similar tracking
              technologies to enhance your experience on our website. Cookies are small text files
              placed on your device by your web browser that allow us to recognize your device and
              remember certain information about your visit.
            </p>

            <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
              Types of Cookies We Use
            </h3>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Strictly Necessary Cookies:</strong> These cookies are essential for the
                operation of our website. They enable core functionality such as security, network
                management, and accessibility. You cannot opt out of these cookies as the website
                cannot function properly without them.
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Analytics Cookies:</strong> We use analytics cookies (such as those provided
                by Google Analytics) to collect information about how visitors interact with our
                website. This data helps us understand traffic patterns, identify popular content,
                and improve website performance. Analytics data is aggregated and anonymized where
                possible.
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Marketing Cookies:</strong> These cookies are used to track visitors across
                websites and display ads that are relevant and engaging for the individual user.
                Marketing cookies may be set by our advertising partners and used to build a profile
                of your interests and show you relevant advertisements on other sites.
              </li>
            </ul>

            <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
              Managing Cookies
            </h3>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              Most web browsers allow you to control cookies through their settings. You can set
              your browser to refuse all cookies or to indicate when a cookie is being sent. However,
              if you disable or refuse cookies, some parts of our website may become inaccessible or
              may not function properly. You may also opt out of targeted advertising by visiting the{' '}
              <strong>Network Advertising Initiative</strong> opt-out page or the{' '}
              <strong>Digital Advertising Alliance</strong> opt-out page.
            </p>
          </section>

          {/* 7. Data Retention */}
          <section id="data-retention">
            <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
              7. Data Retention
            </h2>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              We retain your personal information only for as long as is necessary to fulfill the
              purposes for which it was collected, including to satisfy any legal, accounting, or
              reporting requirements. To determine the appropriate retention period for personal data,
              we consider:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                The amount, nature, and sensitivity of the personal data
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                The potential risk of harm from unauthorized use or disclosure
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                The purposes for which we process your personal data and whether we can achieve
                those purposes through other means
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                Applicable legal, regulatory, tax, accounting, or other requirements
              </li>
            </ul>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              In general, we retain client project files and related communications for a period of
              three (3) years following the completion of a project engagement, unless a longer
              retention period is required by law. Marketing and analytics data is typically retained
              for twenty-four (24) months. When your personal information is no longer needed, we
              will securely delete or anonymize it in accordance with our data retention schedule and
              applicable law.
            </p>
          </section>

          {/* 8. Data Security */}
          <section id="data-security">
            <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
              8. Data Security
            </h2>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              Soft Standards Inc., a New York corporation, takes the security of your personal
              information seriously. We implement administrative, technical, and physical safeguards
              designed to protect your personal information from unauthorized access, use,
              alteration, and disclosure, in compliance with the New York SHIELD Act (Stop Hacks and
              Improve Electronic Data Security Act).
            </p>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              Our security measures include, but are not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Encryption:</strong> We use industry-standard TLS/SSL encryption to protect
                data in transit. Sensitive data at rest is encrypted using AES-256 or equivalent
                encryption standards.
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Access Controls:</strong> Access to personal information is restricted to
                authorized personnel who need the information to perform their job functions. We use
                role-based access controls, strong password policies, and multi-factor
                authentication.
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Infrastructure Security:</strong> Our services are hosted on secure cloud
                infrastructure with regular security patches, firewalls, and intrusion detection
                systems.
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Employee Training:</strong> Our team members receive training on data
                privacy and security best practices.
              </li>
              <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                <strong>Incident Response:</strong> We maintain an incident response plan to address
                any potential data breaches promptly and in accordance with applicable notification
                requirements under the NY SHIELD Act and other applicable laws.
              </li>
            </ul>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              While we strive to protect your personal information, no method of transmission over
              the Internet or method of electronic storage is completely secure. We cannot guarantee
              the absolute security of your information, but we are committed to maintaining
              commercially reasonable safeguards appropriate to the sensitivity of the data.
            </p>
          </section>

          {/* 9. Your Privacy Rights */}
          <section id="your-privacy-rights">
            <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
              9. Your Privacy Rights
            </h2>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              Depending on your location, you may have certain rights regarding your personal
              information under applicable data protection laws. Soft Standards Inc., a New York
              corporation, is committed to honoring your privacy rights. Below is a summary of
              rights by jurisdiction.
            </p>

            {/* 9a. CCPA/CPRA */}
            <section id="ccpa-opt-out">
              <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
                a. California Residents (CCPA/CPRA)
              </h3>
              <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
                If you are a California resident, the California Consumer Privacy Act (CCPA), as
                amended by the California Privacy Rights Act (CPRA), provides you with specific
                rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Know:</strong> You have the right to request that we disclose to
                  you the categories and specific pieces of personal information we have collected
                  about you, the categories of sources from which it was collected, the business or
                  commercial purpose for collecting or selling it, and the categories of third
                  parties with whom we share it.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Delete:</strong> You have the right to request the deletion of
                  your personal information that we have collected, subject to certain exceptions
                  provided by law (such as when retention is necessary to complete a transaction,
                  detect security incidents, or comply with a legal obligation).
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Correct:</strong> You have the right to request the correction of
                  inaccurate personal information that we maintain about you.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Opt-Out of Sale or Sharing:</strong> You have the right to
                  opt-out of the sale or sharing of your personal information for cross-context
                  behavioral advertising. Soft Standards Inc. does not sell personal information.
                  However, some of our use of cookies and tracking technologies may constitute
                  &quot;sharing&quot; under the CPRA. To opt out, please contact us at{' '}
                  <a
                    href="mailto:privacy@softstandardsinc.com"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    privacy@softstandardsinc.com
                  </a>
                  .
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Limit Use of Sensitive Personal Information:</strong> If we
                  collect sensitive personal information, you have the right to limit our use and
                  disclosure of that information to what is necessary to perform the Services.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Non-Discrimination:</strong> We will not discriminate against you
                  for exercising any of your CCPA/CPRA rights. We will not deny you goods or
                  services, charge you different prices or rates, provide a different level or
                  quality of goods or services, or suggest that you will receive a different price
                  or rate or different level or quality of goods or services.
                </li>
              </ul>
              <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
                To exercise your CCPA/CPRA rights, please submit a verifiable consumer request by
                emailing us at{' '}
                <a
                  href="mailto:privacy@softstandardsinc.com"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  privacy@softstandardsinc.com
                </a>
                . We will verify your identity before processing your request and respond within
                forty-five (45) days of receiving your verified request.
              </p>
            </section>

            {/* 9b. GDPR */}
            <section id="gdpr">
              <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
                b. European Economic Area, United Kingdom, and Switzerland (GDPR)
              </h3>
              <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
                If you are located in the European Economic Area (EEA), the United Kingdom (UK), or
                Switzerland, the General Data Protection Regulation (GDPR) and applicable local
                implementing legislation grant you certain rights with respect to your personal data.
              </p>
              <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
                <strong>Lawful Basis for Processing:</strong> We process your personal data on the
                following legal bases:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Consent:</strong> Where you have given clear consent for us to process
                  your personal data for a specific purpose.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Contract:</strong> Where the processing is necessary for the performance
                  of a contract to which you are a party, or in order to take steps at your request
                  prior to entering into a contract.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Legitimate Interests:</strong> Where the processing is necessary for our
                  legitimate interests or the legitimate interests of a third party, provided that
                  such interests are not overridden by your interests or fundamental rights and
                  freedoms.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Legal Obligation:</strong> Where the processing is necessary for
                  compliance with a legal obligation to which we are subject.
                </li>
              </ul>
              <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
                <strong>Your Rights Under the GDPR:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right of Access:</strong> You have the right to obtain confirmation as to
                  whether we are processing your personal data and, if so, to access that data along
                  with supplementary information.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Rectification:</strong> You have the right to have inaccurate
                  personal data corrected and incomplete personal data completed.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Erasure (&quot;Right to Be Forgotten&quot;):</strong> You have
                  the right to request the deletion of your personal data in certain circumstances.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Restriction of Processing:</strong> You have the right to request
                  that we restrict the processing of your personal data in certain circumstances.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Data Portability:</strong> You have the right to receive your
                  personal data in a structured, commonly used, and machine-readable format and to
                  transmit that data to another controller.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Object:</strong> You have the right to object to the processing
                  of your personal data where we rely on legitimate interests as the legal basis for
                  processing.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Withdraw Consent:</strong> Where processing is based on consent,
                  you have the right to withdraw your consent at any time without affecting the
                  lawfulness of processing that occurred before withdrawal.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Lodge a Complaint:</strong> You have the right to lodge a
                  complaint with your local data protection supervisory authority.
                </li>
              </ul>
              <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
                <strong>Data Protection Officer:</strong> For GDPR-related inquiries, please
                contact our designated privacy point of contact at{' '}
                <a
                  href="mailto:privacy@softstandardsinc.com"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  privacy@softstandardsinc.com
                </a>
                .
              </p>
            </section>

            {/* 9c. New York */}
            <section id="new-york-residents">
              <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
                c. New York Residents
              </h3>
              <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
                As a New York corporation, Soft Standards Inc. complies with the New York SHIELD Act
                (Stop Hacks and Improve Electronic Data Security Act), which requires businesses that
                collect private information of New York residents to implement reasonable safeguards
                to protect such data.
              </p>
              <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
                Under the NY SHIELD Act, you are entitled to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Data Breach Notification:</strong> In the event of a security breach
                  involving your private information, we will notify you in the most expedient time
                  possible and without unreasonable delay, consistent with the legitimate needs of
                  law enforcement and any measures necessary to determine the scope of the breach.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Reasonable Security:</strong> We maintain reasonable administrative,
                  technical, and physical safeguards to protect the security, confidentiality, and
                  integrity of your private information, as required by the SHIELD Act.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Inquiry Rights:</strong> You may contact us at any time to inquire about
                  the personal information we hold about you and our data security practices.
                </li>
              </ul>
            </section>

            {/* 9d. Virginia VCDPA */}
            <section id="virginia-vcdpa">
              <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
                d. Virginia Residents (VCDPA)
              </h3>
              <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
                If you are a Virginia resident, the Virginia Consumer Data Protection Act (VCDPA)
                provides you with the following rights:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Access:</strong> You have the right to confirm whether we are
                  processing your personal data and to access such data.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Correct:</strong> You have the right to correct inaccuracies in
                  your personal data.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Delete:</strong> You have the right to delete personal data that
                  you have provided or that we have obtained about you.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Data Portability:</strong> You have the right to obtain a copy of
                  your personal data in a portable and readily usable format.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Opt Out:</strong> You have the right to opt out of the processing
                  of your personal data for purposes of targeted advertising, sale of personal data,
                  or profiling in furtherance of decisions that produce legal or similarly significant
                  effects.
                </li>
              </ul>
              <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
                To exercise your VCDPA rights, please contact us at{' '}
                <a
                  href="mailto:privacy@softstandardsinc.com"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  privacy@softstandardsinc.com
                </a>
                . If we decline your request, you may appeal our decision by contacting us at the
                same email address. If your appeal is denied, you may contact the Virginia Attorney
                General to submit a complaint.
              </p>
            </section>

            {/* 9e. Colorado CPA */}
            <section id="colorado-cpa">
              <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
                e. Colorado Residents (CPA)
              </h3>
              <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
                If you are a Colorado resident, the Colorado Privacy Act (CPA) provides you with the
                following rights:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Access:</strong> You have the right to confirm whether we are
                  processing your personal data and to access that data.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Correct:</strong> You have the right to correct inaccuracies in
                  your personal data.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Delete:</strong> You have the right to delete personal data that
                  we hold about you.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Data Portability:</strong> You have the right to obtain your
                  personal data in a portable and readily usable format.
                </li>
                <li className="text-[0.95rem] text-gray-600 leading-[1.8]">
                  <strong>Right to Opt Out:</strong> You have the right to opt out of the processing
                  of your personal data for targeted advertising, sale of personal data, or certain
                  types of profiling.
                </li>
              </ul>
              <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
                To exercise your CPA rights, please contact us at{' '}
                <a
                  href="mailto:privacy@softstandardsinc.com"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  privacy@softstandardsinc.com
                </a>
                . You have the right to appeal our decision regarding your request. If your appeal is
                denied, you may contact the Colorado Attorney General.
              </p>
            </section>
          </section>

          {/* 10. Do Not Track / Global Privacy Control */}
          <section id="do-not-track">
            <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
              10. Do Not Track / Global Privacy Control
            </h2>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              Some web browsers transmit &quot;Do Not Track&quot; (DNT) signals to websites. Because
              there is no universally accepted standard for how to interpret DNT signals, our website
              does not currently respond to browser DNT signals.
            </p>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              However, we do honor the Global Privacy Control (GPC) signal. If your browser or
              extension sends a GPC signal, we will treat it as a valid opt-out request for the
              sale or sharing of your personal information, as required under applicable laws such as
              the CCPA/CPRA. You can learn more about GPC and how to enable it at{' '}
              <strong>globalprivacycontrol.org</strong>.
            </p>
          </section>

          {/* 11. Children's Privacy */}
          <section id="childrens-privacy">
            <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
              11. Children&apos;s Privacy
            </h2>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              Our Services are not directed to children under the age of thirteen (13), and we do
              not knowingly collect personal information from children under 13 in compliance with
              the Children&apos;s Online Privacy Protection Act (COPPA). If we become aware that we
              have inadvertently collected personal information from a child under 13 without
              verified parental consent, we will take prompt steps to delete that information from
              our records.
            </p>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              If you are a parent or guardian and believe that your child under 13 has provided us
              with personal information without your consent, please contact us immediately at{' '}
              <a
                href="mailto:privacy@softstandardsinc.com"
                className="text-blue-600 underline hover:text-blue-800"
              >
                privacy@softstandardsinc.com
              </a>{' '}
              so that we can take appropriate action.
            </p>
          </section>

          {/* 12. International Data Transfers */}
          <section id="international-transfers">
            <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
              12. International Data Transfers
            </h2>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              Soft Standards Inc., a New York corporation, is based in the United States. If you are
              accessing our Services from outside the United States, please be aware that your
              information may be transferred to, stored in, and processed in the United States and
              other countries where our service providers operate. These countries may have data
              protection laws that differ from those in your country of residence.
            </p>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              Where we transfer personal data from the EEA, UK, or Switzerland to a country that has
              not been deemed to provide an adequate level of data protection, we will ensure that
              appropriate safeguards are in place, such as standard contractual clauses approved by
              the European Commission or other legally recognized transfer mechanisms. By using our
              Services or providing your information to us, you consent to the transfer, storage, and
              processing of your information as described in this Privacy Policy.
            </p>
          </section>

          {/* 13. Third-Party Links */}
          <section id="third-party-links">
            <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
              13. Third-Party Links
            </h2>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              Our website may contain links to third-party websites, services, or applications that
              are not operated or controlled by Soft Standards Inc. This Privacy Policy does not
              apply to any third-party sites or services. We are not responsible for the content,
              privacy policies, or practices of any third-party sites or services. We encourage you
              to review the privacy policies of any third-party websites that you visit before
              providing any personal information.
            </p>
          </section>

          {/* 14. Changes to This Policy */}
          <section id="changes">
            <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
              14. Changes to This Policy
            </h2>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our
              practices, technologies, legal requirements, or other factors. When we make material
              changes to this Privacy Policy, we will notify you by updating the &quot;Effective
              Date&quot; at the top of this page and, where required by law, by sending you an
              email notification or posting a prominent notice on our website.
            </p>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              We encourage you to review this Privacy Policy periodically to stay informed about how
              we are protecting your information. Your continued use of our Services after any
              changes to this Privacy Policy constitutes your acceptance of those changes.
            </p>
          </section>

          {/* 15. Contact Us */}
          <section id="contact-us">
            <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">15. Contact Us</h2>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our
              data practices, please do not hesitate to contact us:
            </p>
            <div className="bg-gray-50 rounded-xl px-6 py-5 mb-4">
              <p className="text-[0.95rem] text-gray-700 leading-[1.8] mb-1">
                <strong>Soft Standards Inc.</strong>
              </p>
              <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-1">
                A New York Corporation
              </p>
              <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-1">
                Email:{' '}
                <a
                  href="mailto:privacy@softstandardsinc.com"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  privacy@softstandardsinc.com
                </a>
              </p>
            </div>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
              We will make every reasonable effort to respond to your inquiry within thirty (30)
              business days. For CCPA/CPRA requests, we will respond within forty-five (45) calendar
              days as required by law. For GDPR requests, we will respond within one (1) month of
              receipt of the request, with the possibility of a two-month extension where necessary,
              considering the complexity and number of requests.
            </p>
          </section>

          {/* Footer note */}
          <div className="border-t border-gray-200 mt-12 pt-6">
            <p className="text-[0.85rem] text-gray-400 leading-[1.7] text-center">
              &copy; {new Date().getFullYear()} Soft Standards Inc., a New York corporation. All
              rights reserved.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
