import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';

export const metadata: Metadata = {
  title: 'Terms of Service — Soft Standards Inc.',
  description:
    'Terms of Service for Soft Standards Inc., a New York corporation. Read our terms governing the use of our web development, app development, UI/UX design, digital marketing, AI automation, and brand strategy services.',
  openGraph: {
    title: 'Terms of Service — Soft Standards Inc.',
    description:
      'Terms of Service governing the use of digital services provided by Soft Standards Inc., a New York corporation.',
    type: 'website',
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <HeroSection
        title={
          <>
            Terms of <span className="text-gradient">Service</span>
          </>
        }
        subtitle="Please read these terms carefully before using our services."
        background="light"
        showScrollIndicator={false}
      />

      <section className="py-[clamp(40px,6vw,80px)] px-[clamp(20px,5vw,80px)]">
        <div className="max-w-[900px] mx-auto">
          {/* Disclaimer Banner */}
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-6 mb-10">
            <p className="text-[0.95rem] text-amber-800 font-medium leading-[1.7]">
              <strong>Notice:</strong> These terms are pending review by a licensed New York
              attorney. They are provided for informational purposes and may be updated. Please
              check this page periodically for changes.
            </p>
          </div>

          <p className="text-[0.95rem] text-gray-500 mb-8">
            Last updated: February 1, 2026
          </p>

          {/* 1. Agreement to Terms */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            1. Agreement to Terms
          </h2>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement
            between you (&quot;Client,&quot; &quot;you,&quot; or &quot;your&quot;) and Soft
            Standards Inc., a New York corporation (&quot;Soft Standards,&quot; &quot;Company,&quot;
            &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), governing your access to and use of
            our website located at softstandards.net (the &quot;Site&quot;) and all related services,
            applications, products, and content provided by Soft Standards Inc. (collectively, the
            &quot;Services&quot;).
          </p>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            By accessing or using any part of the Services, you acknowledge that you have read,
            understood, and agree to be bound by these Terms, as well as our Privacy Policy, which is
            incorporated herein by reference. If you do not agree with any provision of these Terms,
            you must not access or use the Services.
          </p>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            These Terms are effective as of February 1, 2026. We reserve the right to modify these
            Terms at any time. Any changes will be posted on this page with an updated &quot;Last
            updated&quot; date. Your continued use of the Services after such changes constitutes
            acceptance of the revised Terms. It is your responsibility to review these Terms
            periodically.
          </p>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            If you are entering into these Terms on behalf of a company, organization, or other
            legal entity, you represent and warrant that you have the authority to bind that entity
            to these Terms, in which case &quot;you&quot; and &quot;your&quot; shall refer to that
            entity.
          </p>

          {/* 2. Description of Services */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            2. Description of Services
          </h2>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Soft Standards Inc., a New York corporation, is a full-service digital agency that
            provides professional services in the following areas:
          </p>
          <ul className="list-disc pl-6 text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            <li>
              <strong>Web Development:</strong> Custom website design and development, including
              responsive websites, web applications, e-commerce platforms, content management
              systems, progressive web applications, and website maintenance and optimization.
            </li>
            <li>
              <strong>App Development:</strong> Native and cross-platform mobile application
              development for iOS and Android, including UI implementation, backend integration, API
              development, app store deployment, and ongoing maintenance.
            </li>
            <li>
              <strong>UI/UX Design:</strong> User interface design, user experience research and
              strategy, wireframing, prototyping, design systems, usability testing, and interaction
              design for digital products across web and mobile platforms.
            </li>
            <li>
              <strong>Digital Marketing:</strong> Search engine optimization (SEO), social media
              marketing and management, pay-per-click advertising (PPC), email marketing campaigns,
              content marketing, analytics and reporting, and conversion rate optimization.
            </li>
            <li>
              <strong>AI Automation:</strong> Custom AI-powered solutions including chatbots,
              workflow automation, data processing pipelines, machine learning integrations, natural
              language processing tools, and intelligent business process automation.
            </li>
            <li>
              <strong>Brand Strategy:</strong> Brand identity development, logo design, visual
              identity systems, brand guidelines, market positioning, competitive analysis, and brand
              messaging and voice development.
            </li>
          </ul>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            The specific scope, deliverables, timelines, and fees for each engagement shall be
            outlined in a separate Statement of Work (&quot;SOW&quot;), proposal, or service
            agreement executed by both parties. In the event of a conflict between these Terms and
            any SOW, the SOW shall govern with respect to the specific project, and these Terms
            shall govern all other matters.
          </p>

          {/* 3. User Registration and Accounts */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            3. User Registration and Accounts
          </h2>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Certain features of the Services may require you to register for an account. When
            creating an account, you agree to the following:
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            3.1 Accurate Information
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            You agree to provide accurate, current, and complete information during the registration
            process and to update such information as necessary to keep it accurate, current, and
            complete. Providing false, inaccurate, outdated, or incomplete information may result in
            the immediate suspension or termination of your account.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            3.2 Account Security
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            You are responsible for maintaining the confidentiality of your account credentials,
            including your username and password. You agree to accept responsibility for all
            activities that occur under your account. You must use a strong, unique password and
            should not share your credentials with any third party.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            3.3 Notification of Breach
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            You agree to immediately notify Soft Standards Inc. of any unauthorized use of your
            account or any other breach of security of which you become aware. You may notify us by
            contacting us at legal@softstandards.net. We will not be liable for any loss or damage
            arising from your failure to comply with this requirement.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            3.4 Account Termination
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            We reserve the right to suspend or terminate your account at our sole discretion,
            without prior notice, for conduct that we determine violates these Terms, is harmful to
            other users or third parties, or for any other reason we deem appropriate.
          </p>

          {/* 4. Acceptable Use Policy */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            4. Acceptable Use Policy
          </h2>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            You agree to use the Services only for lawful purposes and in accordance with these
            Terms. You agree not to use the Services in any way that:
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            4.1 Prohibited Activities
          </h3>
          <ul className="list-disc pl-6 text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            <li>
              Violates any applicable federal, state, local, or international law or regulation,
              including but not limited to laws regarding the export of data or software, patent,
              trademark, trade secret, copyright, or other intellectual property laws.
            </li>
            <li>
              Infringes upon or misappropriates the intellectual property rights, privacy rights,
              publicity rights, or other proprietary rights of any third party, including uploading,
              transmitting, or distributing content you do not have the right to use.
            </li>
            <li>
              Uploads, transmits, distributes, or otherwise makes available any viruses, Trojan
              horses, worms, logic bombs, ransomware, spyware, adware, or any other malicious code,
              files, or programs designed to interrupt, destroy, or limit the functionality of any
              computer software, hardware, or telecommunications equipment.
            </li>
            <li>
              Uses any automated system, including without limitation robots, spiders, scrapers,
              crawlers, or data mining tools, to access, collect, or download content or data from
              the Services without our prior written consent, except as may be the result of standard
              search engine technology or Internet browser usage.
            </li>
            <li>
              Interferes with, disrupts, or attempts to gain unauthorized access to the Services,
              servers, networks, or databases connected to the Services, including through
              distributed denial-of-service attacks, packet flooding, or similar methods.
            </li>
            <li>
              Impersonates or attempts to impersonate Soft Standards Inc., a Soft Standards
              employee, another user, or any other person or entity, including through the use of
              email addresses, usernames, or other identifiers associated with any of the foregoing.
            </li>
            <li>
              Engages in any activity that could disable, overburden, damage, or impair the Services
              or interfere with any other party&apos;s use and enjoyment of the Services.
            </li>
            <li>
              Uses the Services for any purpose that is fraudulent, deceptive, misleading, or
              otherwise harmful to Soft Standards Inc. or any third party.
            </li>
          </ul>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            4.2 Enforcement
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Soft Standards Inc. reserves the right to investigate and take appropriate legal action
            against anyone who, in our sole discretion, violates this Acceptable Use Policy,
            including without limitation reporting such violations to law enforcement authorities,
            removing offending content, suspending or terminating access to the Services, and seeking
            civil remedies.
          </p>

          {/* 5. Intellectual Property Rights */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            5. Intellectual Property Rights
          </h2>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            5.1 Client Ownership of Deliverables
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Upon receipt of full and final payment for the applicable project, Soft Standards Inc.
            assigns to the Client all right, title, and interest in and to the custom deliverables
            specifically created for the Client under the applicable SOW (&quot;Client
            Deliverables&quot;), including all intellectual property rights therein. This assignment
            is contingent upon full payment of all outstanding invoices related to the project.
            Until full payment is received, Soft Standards Inc. retains all rights in the Client
            Deliverables.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            5.2 Pre-Existing Intellectual Property
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Soft Standards Inc. retains all right, title, and interest in and to any pre-existing
            intellectual property, including but not limited to frameworks, libraries, code
            snippets, design templates, tools, methodologies, processes, and know-how that existed
            prior to the engagement or that are developed independently of any client project
            (&quot;Soft Standards IP&quot;). To the extent that any Soft Standards IP is
            incorporated into Client Deliverables, Soft Standards Inc. hereby grants the Client a
            non-exclusive, perpetual, royalty-free, worldwide license to use such Soft Standards IP
            solely as part of and in connection with the Client Deliverables.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            5.3 Third-Party Materials
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Client Deliverables may incorporate third-party software, libraries, fonts, images, or
            other materials (&quot;Third-Party Materials&quot;) that are subject to their own license
            terms. Soft Standards Inc. will use commercially reasonable efforts to identify such
            Third-Party Materials and their applicable license terms. The Client&apos;s use of
            Third-Party Materials is governed by the respective third-party license agreements, and
            the Client agrees to comply with such terms.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            5.4 Portfolio and Marketing Rights
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Unless otherwise agreed in writing, the Client grants Soft Standards Inc. a
            non-exclusive, perpetual, royalty-free right to display and reference the Client
            Deliverables and the Client&apos;s name and logo in Soft Standards&apos; portfolio, case
            studies, website, social media accounts, marketing materials, and proposals for the
            purpose of showcasing our work and capabilities. The Client may revoke this right at any
            time by providing written notice to Soft Standards Inc.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            5.5 Site Content
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            All content on the Soft Standards Inc. website, including but not limited to text,
            graphics, logos, icons, images, audio clips, video clips, data compilations, page
            layout, underlying code, and software, is the property of Soft Standards Inc. or its
            content suppliers and is protected by United States and international copyright,
            trademark, and other intellectual property laws. You may not reproduce, distribute,
            modify, create derivative works of, publicly display, publicly perform, republish,
            download, store, or transmit any of the material on our Site without our prior written
            consent.
          </p>

          {/* 6. Payment Terms */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            6. Payment Terms
          </h2>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            6.1 Invoicing and Payment Schedule
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Payment terms, amounts, and schedules shall be specified in the applicable SOW or
            proposal. Unless otherwise stated in the SOW, Soft Standards Inc. utilizes the following
            standard payment structure: a non-refundable deposit of fifty percent (50%) of the total
            project fee is due upon execution of the SOW, with the remaining balance due upon
            project completion and final delivery. For ongoing or retainer-based services, invoices
            will be issued monthly and are due within fifteen (15) days of the invoice date.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            6.2 Accepted Payment Methods
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            We accept payment via bank transfer (ACH/wire), credit card, and other methods as
            specified in the invoice. All payments shall be made in United States Dollars (USD)
            unless otherwise agreed in writing. The Client is responsible for any transaction fees,
            currency conversion charges, or bank charges associated with the payment.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            6.3 Late Payment
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Any payment not received by the due date shall accrue interest at the rate of one and
            one-half percent (1.5%) per month, or the maximum rate permitted by applicable law,
            whichever is less, calculated from the due date until the date of payment. This late fee
            is in addition to, and not in lieu of, any other rights or remedies available to Soft
            Standards Inc. under these Terms or applicable law.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            6.4 Right to Suspend Services
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Soft Standards Inc. reserves the right to suspend or halt all work on any project,
            including the delivery of any in-progress or completed deliverables, if any invoice
            remains unpaid for more than fifteen (15) days past the due date. Work will resume upon
            receipt of all outstanding payments in full. Soft Standards Inc. shall not be liable for
            any delays or damages resulting from such suspension.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            6.5 Taxes
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            All fees quoted are exclusive of applicable taxes, including but not limited to sales
            tax, use tax, value-added tax (VAT), and goods and services tax (GST). The Client is
            responsible for all such taxes, except for taxes based on Soft Standards Inc.&apos;s net
            income.
          </p>

          {/* 7. Project Cancellation and Refund Policy */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            7. Project Cancellation and Refund Policy
          </h2>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            7.1 Cancellation Before Work Begins
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            If the Client cancels a project before any substantive work has commenced (as determined
            by Soft Standards Inc. in its reasonable discretion), the Client shall be entitled to a
            full refund of all fees paid, minus the non-refundable deposit. If no deposit was
            collected, a cancellation fee equal to ten percent (10%) of the total project value will
            apply to cover administrative and scheduling costs.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            7.2 Cancellation During Active Work
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            If the Client cancels a project after work has commenced but before final delivery, the
            Client shall pay for all work completed through the date of cancellation on a prorated
            basis, calculated based on the percentage of the project completed as reasonably
            determined by Soft Standards Inc. Any overpayment will be refunded to the Client within
            thirty (30) business days. The Client shall receive all deliverables completed through
            the cancellation date, subject to the intellectual property provisions in Section 5.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            7.3 Cancellation After Delivery
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Once final deliverables have been delivered and accepted by the Client (or deemed
            accepted after a ten (10) business day review period without written objection), no
            refund will be issued. All fees paid for completed and delivered work are non-refundable.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            7.4 Cancellation by Soft Standards
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Soft Standards Inc. reserves the right to cancel any project if the Client materially
            breaches these Terms, fails to make payments when due, fails to provide necessary
            materials or feedback within a reasonable time, or engages in conduct that makes
            continued performance impracticable. In such cases, Soft Standards Inc. will refund any
            prepaid fees for work not yet performed, less any costs incurred.
          </p>

          {/* 8. Professional Services Warranty */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            8. Professional Services Warranty
          </h2>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            8.1 Thirty-Day Warranty Period
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Soft Standards Inc. warrants that all Client Deliverables will substantially conform to
            the specifications and requirements outlined in the applicable SOW for a period of
            thirty (30) days following final delivery and acceptance (&quot;Warranty Period&quot;).
            During the Warranty Period, Soft Standards Inc. will, at no additional cost to the
            Client, correct any bugs, defects, or errors in the deliverables that cause them to fail
            to substantially conform to the agreed-upon specifications.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            8.2 Scope of Warranty Repairs
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Warranty repairs are limited to defects in the deliverables as originally delivered by
            Soft Standards Inc. and do not extend to issues caused by:
          </p>
          <ul className="list-disc pl-6 text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            <li>
              Modifications, alterations, or additions made to the deliverables by the Client or any
              third party without the prior written consent of Soft Standards Inc.
            </li>
            <li>
              Misuse, improper operation, or failure to follow instructions or documentation
              provided by Soft Standards Inc.
            </li>
            <li>
              Third-party software, hardware, hosting environments, or services not provided or
              specified by Soft Standards Inc.
            </li>
            <li>
              Changes to third-party APIs, platforms, browsers, or operating systems that occur after
              delivery.
            </li>
            <li>
              Force majeure events or circumstances beyond the reasonable control of Soft Standards
              Inc.
            </li>
          </ul>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            8.3 Post-Warranty Support
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            After the Warranty Period expires, any additional bug fixes, updates, enhancements, or
            maintenance shall be subject to a separate maintenance agreement or billed at Soft
            Standards Inc.&apos;s then-current hourly rate.
          </p>

          {/* 9. Third-Party Service Disclaimers */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            9. Third-Party Service Disclaimers
          </h2>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            In the course of providing the Services, Soft Standards Inc. may utilize, integrate with,
            or recommend third-party tools, software, platforms, APIs, hosting providers, and other
            services (&quot;Third-Party Services&quot;). These may include, without limitation, cloud
            hosting providers (such as AWS, Google Cloud, or Vercel), content management systems,
            payment processors, analytics platforms, email service providers, AI and machine learning
            APIs, and social media platforms.
          </p>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Soft Standards Inc. does not own, operate, or control these Third-Party Services and is
            not responsible for their availability, reliability, accuracy, security, privacy
            practices, or compliance with applicable laws. The Client acknowledges and agrees that:
          </p>
          <ul className="list-disc pl-6 text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            <li>
              Soft Standards Inc. makes no representations or warranties regarding any Third-Party
              Services, including their continued availability or compatibility.
            </li>
            <li>
              The Client&apos;s use of Third-Party Services is subject to the terms and conditions,
              privacy policies, and usage limitations of the respective third-party providers.
            </li>
            <li>
              Soft Standards Inc. shall not be liable for any loss, damage, or disruption caused by
              Third-Party Services, including but not limited to service outages, data loss, security
              breaches, API changes, pricing changes, or discontinuation of service.
            </li>
            <li>
              The Client is responsible for maintaining its own accounts, subscriptions, and license
              agreements with Third-Party Service providers and for all associated fees.
            </li>
          </ul>

          {/* 10. Data Export */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            10. Data Export
          </h2>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Upon termination or expiration of the Services for any reason, the Client shall have a
            period of thirty (30) calendar days to request the export of any Client data, content,
            files, or materials stored on Soft Standards Inc.&apos;s systems or under Soft
            Standards Inc.&apos;s control (&quot;Client Data&quot;). Soft Standards Inc. will use
            commercially reasonable efforts to provide the Client Data in a standard, commonly used
            electronic format.
          </p>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            After the thirty (30) day export period, Soft Standards Inc. shall have no obligation to
            retain any Client Data and may, at its sole discretion, delete or destroy all Client
            Data in its possession. Soft Standards Inc. shall not be liable for any loss or damage
            resulting from the deletion of Client Data after the export period has expired.
          </p>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            The Client is solely responsible for maintaining independent backups of all Client Data
            throughout the term of the engagement. Soft Standards Inc. recommends that Clients
            maintain their own copies of all project files, source code, assets, and content at all
            times.
          </p>

          {/* 11. Termination */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            11. Termination
          </h2>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            11.1 Termination for Convenience
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Either party may terminate these Terms or any active SOW at any time, for any reason or
            no reason, by providing the other party with at least thirty (30) days&apos; prior
            written notice. Written notice may be delivered by email to the addresses specified in
            the applicable SOW or in Section 19 of these Terms.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            11.2 Termination for Material Breach
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Either party may terminate these Terms or any active SOW immediately upon written notice
            if the other party materially breaches any provision of these Terms or the applicable SOW
            and fails to cure such breach within fifteen (15) days after receiving written notice
            specifying the nature of the breach. Notwithstanding the foregoing, Soft Standards Inc.
            may terminate immediately and without a cure period in cases of non-payment exceeding
            thirty (30) days, violation of the Acceptable Use Policy, or any breach that, by its
            nature, cannot be cured.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            11.3 Effect of Termination
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Upon termination, the Client shall promptly pay all outstanding fees for Services
            rendered through the termination date. The following provisions shall survive termination
            of these Terms: Sections 5 (Intellectual Property Rights), 6 (Payment Terms), 10 (Data
            Export), 12 (Disclaimers), 13 (Limitation of Liability), 14 (Indemnification), 15
            (Dispute Resolution / Arbitration), 16 (Class Action Waiver), 17 (Governing Law), and
            18 (Severability).
          </p>

          {/* 12. DISCLAIMERS */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            12. Disclaimers
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 my-6">
            <p className="uppercase font-bold text-gray-800 text-[0.95rem] leading-[1.8] mb-4">
              THE SERVICES, INCLUDING ALL CONTENT, SOFTWARE, FUNCTIONS, MATERIALS, AND INFORMATION
              MADE AVAILABLE ON OR ACCESSED THROUGH THE SERVICES, ARE PROVIDED ON AN &quot;AS
              IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER
              EXPRESS OR IMPLIED.
            </p>
            <p className="uppercase font-bold text-gray-800 text-[0.95rem] leading-[1.8] mb-4">
              TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, SOFT STANDARDS INC., A NEW
              YORK CORPORATION, AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AFFILIATES,
              SUCCESSORS, AND ASSIGNS DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT
              LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              TITLE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING FROM COURSE OF DEALING, USAGE, OR
              TRADE PRACTICE.
            </p>
            <p className="uppercase font-bold text-gray-800 text-[0.95rem] leading-[1.8] mb-4">
              SOFT STANDARDS INC. DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED,
              ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. SOFT STANDARDS
              INC. DOES NOT WARRANT OR MAKE ANY REPRESENTATION REGARDING THE RESULTS THAT MAY BE
              OBTAINED FROM THE USE OF THE SERVICES, OR THE ACCURACY, RELIABILITY, OR COMPLETENESS
              OF ANY CONTENT OR INFORMATION PROVIDED THROUGH THE SERVICES.
            </p>
            <p className="uppercase font-bold text-gray-800 text-[0.95rem] leading-[1.8] mb-4">
              NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM SOFT STANDARDS
              INC. OR THROUGH THE SERVICES SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THESE
              TERMS.
            </p>
            <p className="uppercase font-bold text-gray-800 text-[0.95rem] leading-[1.8]">
              SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE
              EXCLUSIONS MAY NOT APPLY TO YOU. IN SUCH JURISDICTIONS, THE LIABILITY OF SOFT
              STANDARDS INC. SHALL BE LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW.
            </p>
          </div>

          {/* 13. LIMITATION OF LIABILITY */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            13. Limitation of Liability
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 my-6">
            <p className="uppercase font-bold text-gray-800 text-[0.95rem] leading-[1.8] mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SOFT STANDARDS
              INC., A NEW YORK CORPORATION, OR ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS,
              AFFILIATES, SUCCESSORS, OR ASSIGNS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES
              FOR LOSS OF PROFITS, REVENUE, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES,
              REGARDLESS OF WHETHER SUCH DAMAGES ARE BASED ON CONTRACT, TORT (INCLUDING NEGLIGENCE),
              STRICT LIABILITY, OR ANY OTHER LEGAL THEORY, AND EVEN IF SOFT STANDARDS INC. HAS BEEN
              ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p className="uppercase font-bold text-gray-800 text-[0.95rem] leading-[1.8] mb-4">
              IN NO EVENT SHALL THE TOTAL AGGREGATE LIABILITY OF SOFT STANDARDS INC. FOR ALL CLAIMS
              ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES EXCEED THE TOTAL AMOUNT OF
              FEES ACTUALLY PAID BY THE CLIENT TO SOFT STANDARDS INC. DURING THE TWELVE (12) MONTH
              PERIOD IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
            </p>
            <p className="uppercase font-bold text-gray-800 text-[0.95rem] leading-[1.8] mb-4">
              THE LIMITATIONS SET FORTH IN THIS SECTION SHALL APPLY EVEN IF THE CLIENT&apos;S
              REMEDIES UNDER THESE TERMS FAIL OF THEIR ESSENTIAL PURPOSE AND REGARDLESS OF WHETHER
              SOFT STANDARDS INC. HAS BEEN INFORMED OF THE LIKELIHOOD OF SUCH DAMAGES.
            </p>
            <p className="uppercase font-bold text-gray-800 text-[0.95rem] leading-[1.8]">
              SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR
              INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATIONS OR EXCLUSIONS MAY NOT
              APPLY TO YOU. IN SUCH JURISDICTIONS, THE LIABILITY OF SOFT STANDARDS INC. SHALL BE
              LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW.
            </p>
          </div>

          {/* 14. Indemnification */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            14. Indemnification
          </h2>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            You agree to defend, indemnify, and hold harmless Soft Standards Inc., a New York
            corporation, and its officers, directors, employees, agents, affiliates, successors, and
            assigns (collectively, the &quot;Indemnified Parties&quot;) from and against any and all
            claims, actions, suits, proceedings, damages, losses, liabilities, costs, and expenses
            (including reasonable attorneys&apos; fees and court costs) arising out of or relating
            to:
          </p>
          <ul className="list-disc pl-6 text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            <li>
              Any content, materials, data, or information provided by the Client to Soft Standards
              Inc. for use in connection with the Services, including but not limited to any claim
              that such content infringes, misappropriates, or otherwise violates the intellectual
              property rights, privacy rights, or other rights of any third party.
            </li>
            <li>
              Your breach or alleged breach of any representation, warranty, obligation, or covenant
              set forth in these Terms.
            </li>
            <li>
              Your misuse of the Services or any deliverables provided by Soft Standards Inc.,
              including use in a manner inconsistent with the intended purpose or in violation of
              applicable law.
            </li>
            <li>
              Any dispute or claim between the Client and any third party arising from the
              Client&apos;s use of the Client Deliverables or the Services.
            </li>
            <li>
              Your violation of any applicable law, regulation, or third-party right.
            </li>
          </ul>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Soft Standards Inc. reserves the right, at its own expense, to assume the exclusive
            defense and control of any matter otherwise subject to indemnification by the Client, in
            which event the Client shall cooperate fully with Soft Standards Inc. in asserting any
            available defenses. The Client shall not settle any claim without the prior written
            consent of Soft Standards Inc.
          </p>

          {/* 15. Dispute Resolution / Arbitration */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            15. Dispute Resolution / Arbitration
          </h2>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            15.1 Mandatory Binding Arbitration
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Any dispute, controversy, or claim arising out of or relating to these Terms, the
            Services, or the relationship between you and Soft Standards Inc., including the
            determination of the scope or applicability of this agreement to arbitrate, shall be
            resolved exclusively by final and binding arbitration administered by the American
            Arbitration Association (&quot;AAA&quot;) in accordance with its Commercial Arbitration
            Rules and Mediation Procedures in effect at the time the arbitration is initiated.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            15.2 Arbitration Procedures
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            The arbitration shall be conducted by a single arbitrator selected in accordance with
            AAA rules. The arbitration shall take place in Queens County, New York, unless the
            parties mutually agree to a different location or to conduct the arbitration via
            videoconference. The arbitrator shall apply the substantive law of the State of New York
            (without regard to conflict of laws principles). The arbitrator shall have the authority
            to award any relief that a court of competent jurisdiction could award, including
            injunctive relief and attorneys&apos; fees, subject to the limitations set forth in
            these Terms.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            15.3 Individual Basis
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            All arbitration proceedings shall be conducted on an individual basis. Neither party
            shall be entitled to join or consolidate claims with those of any other person or entity,
            or to bring claims in a representative capacity on behalf of any other person or entity.
            The arbitrator may not consolidate proceedings or preside over any form of representative
            or class proceeding.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            15.4 Confidentiality
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            All aspects of the arbitration proceeding, including the arbitrator&apos;s decision and
            award, shall be kept strictly confidential. Neither party shall disclose the existence,
            content, or results of any arbitration without the prior written consent of the other
            party, except as may be necessary to enforce the arbitration award or as required by
            applicable law.
          </p>
          <h3 className="text-[1.15rem] font-semibold text-gray-800 mb-3 mt-6">
            15.5 Exceptions
          </h3>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            Notwithstanding the foregoing, either party may seek injunctive or other equitable relief
            in any court of competent jurisdiction to prevent the actual or threatened infringement,
            misappropriation, or violation of intellectual property rights, confidential information,
            or other proprietary rights. Additionally, claims within the jurisdictional limits of
            small claims court in Queens County, New York may be brought in such court.
          </p>

          {/* 16. Class Action Waiver */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            16. Class Action Waiver
          </h2>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, YOU AND SOFT STANDARDS INC. EACH
            WAIVE THE RIGHT TO A TRIAL BY JURY AND THE RIGHT TO PARTICIPATE IN A CLASS ACTION,
            COLLECTIVE ACTION, PRIVATE ATTORNEY GENERAL ACTION, OR OTHER REPRESENTATIVE PROCEEDING
            OF ANY KIND. You agree that any dispute resolution proceeding will be conducted only on
            an individual basis and not as a class, consolidated, or representative action.
          </p>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            If any court or arbitrator determines that the class action waiver set forth in this
            section is void or unenforceable for any reason, or that an arbitration can proceed on a
            class basis, then the arbitration provision set forth in Section 15 shall be deemed null
            and void in its entirety, and the parties shall be deemed to have not agreed to
            arbitrate disputes. In such event, the dispute shall be resolved in accordance with
            Section 17 (Governing Law).
          </p>

          {/* 17. Governing Law */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            17. Governing Law
          </h2>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            These Terms and any dispute or claim arising out of or in connection with them, their
            subject matter, or their formation (including non-contractual disputes or claims) shall
            be governed by and construed in accordance with the laws of the State of New York,
            without regard to its conflict of laws provisions.
          </p>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            To the extent that any lawsuit or court proceeding is permitted under these Terms
            (including the exceptions set forth in Section 15.5), you and Soft Standards Inc. agree
            to submit to the exclusive personal jurisdiction of the state courts located in Queens
            County, New York, and the federal courts of the United States District Court for the
            Eastern District of New York. Each party waives any objection to jurisdiction and venue
            in such courts, including on the grounds of inconvenient forum.
          </p>

          {/* 18. Severability */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            18. Severability
          </h2>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            If any provision of these Terms is held by a court of competent jurisdiction or
            arbitrator to be invalid, illegal, or unenforceable for any reason, such provision shall
            be modified to the minimum extent necessary to make it valid, legal, and enforceable
            while preserving the original intent of the parties. If such modification is not
            possible, the offending provision shall be severed from these Terms. The invalidity,
            illegality, or unenforceability of any provision shall not affect or impair the validity,
            legality, or enforceability of the remaining provisions of these Terms, which shall
            continue in full force and effect.
          </p>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            The failure of Soft Standards Inc. to exercise or enforce any right or provision of these
            Terms shall not constitute a waiver of such right or provision. Any waiver of any
            provision of these Terms will be effective only if in writing and signed by Soft
            Standards Inc.
          </p>

          {/* 19. Contact Information */}
          <h2 className="text-[1.4rem] font-bold text-gray-900 mb-4 mt-10">
            19. Contact Information
          </h2>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mb-4">
            If you have any questions, concerns, or requests regarding these Terms of Service,
            please contact us at:
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 my-4">
            <p className="text-[0.95rem] text-gray-700 leading-[1.8] font-semibold mb-1">
              Soft Standards Inc.
            </p>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8]">
              A New York Corporation
            </p>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mt-2">
              Email:{' '}
              <a
                href="mailto:legal@softstandards.net"
                className="text-purple-600 hover:text-purple-700 underline underline-offset-2"
              >
                legal@softstandards.net
              </a>
            </p>
            <p className="text-[0.95rem] text-gray-600 leading-[1.8] mt-2">
              Website:{' '}
              <a
                href="https://softstandards.net"
                className="text-purple-600 hover:text-purple-700 underline underline-offset-2"
              >
                softstandards.net
              </a>
            </p>
          </div>
          <p className="text-[0.95rem] text-gray-600 leading-[1.8] mt-8 mb-4">
            By using our Services, you acknowledge that you have read, understood, and agree to be
            bound by these Terms of Service.
          </p>
          <p className="text-[0.95rem] text-gray-500 leading-[1.8] italic">
            &copy; 2026 Soft Standards Inc. All rights reserved.
          </p>
        </div>
      </section>
    </>
  );
}
