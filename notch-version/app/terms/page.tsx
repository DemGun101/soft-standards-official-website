import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service — Soft Standards Inc.",
  description:
    "Terms of Service for Soft Standards Inc. Read our terms governing access to and use of our services.",
};

export default function TermsOfService() {
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
            Terms of Service
          </h1>
          <p className="mb-12 text-[14px] text-muted">
            Last updated: February 1, 2026
          </p>

          <div className="space-y-10 text-[15px] leading-[1.8] text-muted">
            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                1. Agreement to Terms
              </h2>
              <p>
                These Terms of Service constitute a legally binding agreement
                between Client and Soft Standards Inc., a New York corporation,
                governing access to and use of softstandardsinc.com and all
                related services. By accessing the Services, you acknowledge
                agreement to these Terms and the{" "}
                <Link href="/privacy" className="text-accent">
                  Privacy Policy
                </Link>
                . Soft Standards reserves the right to modify these Terms at any
                time, with changes posted and an updated date. Continued use
                constitutes acceptance. If you lack authority to bind your entity
                to these Terms, do not access the Services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                2. Description of Services
              </h2>
              <p>
                Soft Standards Inc. provides professional services including:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  <strong>Web Development:</strong> Custom website design,
                  responsive websites, web applications, e-commerce platforms,
                  content management systems, progressive web applications, and
                  maintenance
                </li>
                <li>
                  <strong>App Development:</strong> Native and cross-platform
                  mobile applications for iOS and Android, including UI
                  implementation, backend integration, API development, and
                  deployment
                </li>
                <li>
                  <strong>UI/UX Design:</strong> User interface design, user
                  experience research, wireframing, prototyping, design systems,
                  usability testing, and interaction design
                </li>
                <li>
                  <strong>Digital Marketing:</strong> SEO, social media
                  marketing, PPC advertising, email campaigns, content
                  marketing, analytics, and conversion rate optimization
                </li>
                <li>
                  <strong>AI Automation:</strong> Custom AI solutions including
                  chatbots, workflow automation, data processing pipelines,
                  machine learning integrations, and business process automation
                </li>
                <li>
                  <strong>Brand Strategy:</strong> Brand identity development,
                  logo design, visual identity systems, brand guidelines, market
                  positioning, and competitive analysis
                </li>
              </ul>
              <p className="mt-4">
                Specific scope, deliverables, timelines, and fees are outlined in
                separate Statements of Work (SOW). SOWs govern project-specific
                matters; these Terms govern all other matters.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                3. User Registration and Accounts
              </h2>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                3.1 Accurate Information
              </h3>
              <p>
                You agree to provide accurate, current, and complete information
                during registration and maintain accuracy. False or incomplete
                information may result in account suspension or termination.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                3.2 Account Security
              </h3>
              <p>
                You are responsible for maintaining credential confidentiality.
                You accept responsibility for all account activities and agree to
                use strong, unique passwords. Do not share credentials with
                third parties.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                3.3 Notification of Breach
              </h3>
              <p>
                Immediately notify Soft Standards Inc. of unauthorized account
                use or security breaches by contacting{" "}
                <a
                  href="mailto:legal@softstandardsinc.com"
                  className="text-accent"
                >
                  legal@softstandardsinc.com
                </a>
                . The company is not liable for losses arising from failure to
                comply.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                3.4 Account Termination
              </h3>
              <p>
                Soft Standards reserves the right to suspend or terminate
                accounts at its sole discretion without prior notice for conduct
                violating these Terms, harmful to others, or for any other
                reason deemed appropriate.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                4. Acceptable Use Policy
              </h2>
              <p>
                You agree to use Services only for lawful purposes in accordance
                with these Terms.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                4.1 Prohibited Activities
              </h3>
              <p>You agree not to use Services in ways that:</p>
              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  Violate applicable federal, state, local, or international
                  law, including export laws and intellectual property laws
                </li>
                <li>
                  Infringe upon or misappropriate intellectual property rights,
                  privacy rights, publicity rights, or other proprietary rights
                  of third parties
                </li>
                <li>
                  Upload viruses, Trojan horses, worms, logic bombs, ransomware,
                  spyware, adware, or other malicious code
                </li>
                <li>
                  Use automated systems including robots, spiders, scrapers, or
                  data mining tools to access content without prior written
                  consent
                </li>
                <li>
                  Interfere with, disrupt, or attempt unauthorized access to
                  Services, servers, networks, or databases
                </li>
                <li>
                  Impersonate Soft Standards Inc., employees, users, or other
                  persons or entities
                </li>
                <li>
                  Disable, overburden, damage, or impair Services or interfere
                  with other users&apos; enjoyment
                </li>
                <li>
                  Use Services for fraudulent, deceptive, misleading, or harmful
                  purposes
                </li>
              </ul>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                4.2 Enforcement
              </h3>
              <p>
                Soft Standards Inc. reserves the right to investigate and take
                appropriate legal action against violators, including reporting
                to law enforcement, removing content, suspending or terminating
                access, and seeking civil remedies.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                5. Intellectual Property Rights
              </h2>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                5.1 Client Ownership of Deliverables
              </h3>
              <p>
                Upon receipt of full and final payment, Soft Standards Inc.
                assigns all right, title, and interest in custom deliverables
                created for Client under the applicable SOW. This assignment is
                contingent upon full payment. Until full payment is received,
                Soft Standards Inc. retains all rights.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                5.2 Pre-Existing Intellectual Property
              </h3>
              <p>
                Soft Standards Inc. retains all right, title, and interest in
                pre-existing intellectual property, including frameworks,
                libraries, code snippets, design templates, tools,
                methodologies, processes, and know-how. To the extent such IP is
                incorporated into Client Deliverables, Soft Standards Inc. grants
                Client a non-exclusive, perpetual, royalty-free, worldwide
                license to use such IP solely as part of Client Deliverables.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                5.3 Third-Party Materials
              </h3>
              <p>
                Client Deliverables may incorporate third-party software,
                libraries, fonts, images, or other materials subject to their own
                license terms. Client&apos;s use is governed by respective
                third-party license agreements.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                5.4 Portfolio and Marketing Rights
              </h3>
              <p>
                Unless otherwise agreed in writing, Client grants Soft Standards
                Inc. a non-exclusive, perpetual, royalty-free right to display
                and reference Client Deliverables and Client&apos;s name and
                logo in portfolio, case studies, website, social media, marketing
                materials, and proposals. Client may revoke this right by
                providing written notice.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                5.5 Site Content
              </h3>
              <p>
                All Soft Standards Inc. website content is property of Soft
                Standards Inc. or content suppliers, protected by U.S. and
                international copyright and intellectual property laws. You may
                not reproduce, distribute, modify, create derivative works,
                publicly display, perform, republish, download, store, or
                transmit material without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                6. Payment Terms
              </h2>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                6.1 Invoicing and Payment Schedule
              </h3>
              <p>
                Payment terms, amounts, and schedules are specified in applicable
                SOW or proposal. Standard payment structure: 50% non-refundable
                deposit upon SOW execution, with remaining balance due upon
                project completion and final delivery. For ongoing or
                retainer-based services, invoices are issued monthly and due
                within 15 days.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                6.2 Accepted Payment Methods
              </h3>
              <p>
                Payment accepted via bank transfer (ACH/wire), credit card, and
                other specified methods. All payments in U.S. Dollars (USD)
                unless otherwise agreed. Client is responsible for transaction
                fees, currency conversion charges, and bank charges.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                6.3 Late Payment
              </h3>
              <p>
                Payments not received by due date accrue interest at 1.5% per
                month (or maximum rate permitted by law), calculated from due
                date until payment.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                6.4 Right to Suspend Services
              </h3>
              <p>
                Soft Standards Inc. reserves the right to suspend or halt work if
                any invoice remains unpaid for more than 15 days past due. Work
                resumes upon receipt of all outstanding payments.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                6.5 Taxes
              </h3>
              <p>
                All fees are exclusive of applicable taxes. Client is responsible
                for all such taxes, except taxes based on Soft Standards
                Inc.&apos;s net income.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                7. Project Cancellation and Refund Policy
              </h2>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                7.1 Cancellation Before Work Begins
              </h3>
              <p>
                If Client cancels before substantive work commences, Client
                receives full refund of fees paid, minus the non-refundable
                deposit. If no deposit was collected, a 10% cancellation fee
                applies.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                7.2 Cancellation During Active Work
              </h3>
              <p>
                If Client cancels after work commences but before final delivery,
                Client pays for work completed through cancellation date on a
                prorated basis. Client receives all deliverables completed
                through cancellation date, subject to Section 5 intellectual
                property provisions.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                7.3 Cancellation After Delivery
              </h3>
              <p>
                Once final deliverables are delivered and accepted by Client (or
                deemed accepted after 10 business days without written
                objection), no refund is issued.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                7.4 Cancellation by Soft Standards
              </h3>
              <p>
                Soft Standards Inc. reserves the right to cancel if Client
                materially breaches these Terms, fails to make payments, fails to
                provide necessary materials or feedback within reasonable time,
                or engages in conduct making continued performance impracticable.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                8. Professional Services Warranty
              </h2>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                8.1 Thirty-Day Warranty Period
              </h3>
              <p>
                Soft Standards Inc. warrants that Client Deliverables
                substantially conform to specifications outlined in the
                applicable SOW for 30 days following final delivery and
                acceptance. During this period, Soft Standards Inc. corrects
                bugs, defects, or errors at no additional cost.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                8.2 Scope of Warranty Repairs
              </h3>
              <p>
                Warranty repairs are limited to defects in originally delivered
                deliverables and do not extend to issues caused by modifications
                by Client or third parties, misuse or improper operation,
                third-party software or hosting environments, changes to
                third-party APIs or platforms after delivery, or force majeure
                events.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                8.3 Post-Warranty Support
              </h3>
              <p>
                After Warranty Period expiration, additional support is subject
                to separate maintenance agreements or billed at Soft Standards
                Inc.&apos;s then-current hourly rate.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                9. Third-Party Service Disclaimers
              </h2>
              <p>
                Soft Standards Inc. may utilize, integrate with, or recommend
                third-party tools, software, platforms, APIs, hosting providers,
                and other services. These may include cloud hosting providers,
                content management systems, payment processors, analytics
                platforms, email service providers, AI and machine learning APIs,
                and social media platforms.
              </p>
              <p className="mt-4">
                Soft Standards Inc. does not own, operate, or control these
                services and is not responsible for their availability,
                reliability, accuracy, security, privacy practices, or legal
                compliance.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                10. Data Export
              </h2>
              <p>
                Upon termination or expiration of Services, Client has 30
                calendar days to request export of any Client data, content,
                files, or materials stored on or under Soft Standards Inc.&apos;s
                control. After the 30-day export period, Soft Standards Inc. has
                no obligation to retain Client Data and may delete or destroy all
                Client Data.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                11. Termination
              </h2>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                11.1 Termination for Convenience
              </h3>
              <p>
                Either party may terminate these Terms or any active SOW at any
                time for any reason by providing the other party at least 30
                days&apos; prior written notice.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                11.2 Termination for Material Breach
              </h3>
              <p>
                Either party may terminate immediately upon written notice if the
                other party materially breaches any provision and fails to cure
                within 15 days after receiving written notice. Soft Standards
                Inc. may terminate immediately without cure period in cases of
                non-payment exceeding 30 days, Acceptable Use Policy violation,
                or any breach that cannot be cured.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                11.3 Effect of Termination
              </h3>
              <p>
                Upon termination, Client shall promptly pay all outstanding fees
                for Services rendered through termination date. Sections
                relating to Intellectual Property Rights, Payment Terms, Data
                Export, Disclaimers, Limitation of Liability, Indemnification,
                Dispute Resolution, Class Action Waiver, Governing Law, and
                Severability survive termination.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                12. Disclaimers
              </h2>
              <p className="uppercase">
                THE SERVICES, INCLUDING ALL CONTENT, SOFTWARE, FUNCTIONS,
                MATERIALS, AND INFORMATION MADE AVAILABLE ON OR ACCESSED THROUGH
                THE SERVICES, ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS
                AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER
                EXPRESS OR IMPLIED.
              </p>
              <p className="mt-4 uppercase">
                TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, SOFT
                STANDARDS INC. AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS,
                AFFILIATES, SUCCESSORS, AND ASSIGNS DISCLAIM ALL WARRANTIES,
                EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE,
                NON-INFRINGEMENT, AND ANY WARRANTIES ARISING FROM COURSE OF
                DEALING, USAGE, OR TRADE PRACTICE.
              </p>
              <p className="mt-4 uppercase">
                SOFT STANDARDS INC. DOES NOT WARRANT THAT THE SERVICES WILL BE
                UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER
                HARMFUL COMPONENTS.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                13. Limitation of Liability
              </h2>
              <p className="uppercase">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SOFT
                STANDARDS INC. IS NOT LIABLE FOR ANY INDIRECT, INCIDENTAL,
                SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES,
                INCLUDING DAMAGES FOR LOSS OF PROFITS, REVENUE, GOODWILL, USE,
                DATA, OR OTHER INTANGIBLE LOSSES.
              </p>
              <p className="mt-4 uppercase">
                IN NO EVENT SHALL THE TOTAL AGGREGATE LIABILITY OF SOFT
                STANDARDS INC. FOR ALL CLAIMS ARISING OUT OF OR RELATING TO
                THESE TERMS OR THE SERVICES EXCEED THE TOTAL AMOUNT OF FEES
                ACTUALLY PAID BY CLIENT TO SOFT STANDARDS INC. DURING THE 12
                MONTH PERIOD IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE
                CLAIM.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                14. Indemnification
              </h2>
              <p>
                You agree to defend, indemnify, and hold harmless Soft Standards
                Inc. and its officers, directors, employees, agents, affiliates,
                successors, and assigns from any and all claims, actions, suits,
                proceedings, damages, losses, liabilities, costs, and expenses
                (including reasonable attorneys&apos; fees) arising out of or
                relating to any content or materials provided by Client, your
                breach of these Terms, your misuse of Services, any dispute
                between Client and any third party, or your violation of any
                applicable law.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                15. Dispute Resolution / Arbitration
              </h2>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                15.1 Mandatory Binding Arbitration
              </h3>
              <p>
                Any dispute arising out of or relating to these Terms shall be
                resolved exclusively by final and binding arbitration
                administered by the American Arbitration Association (AAA) in
                accordance with its Commercial Arbitration Rules.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                15.2 Arbitration Procedures
              </h3>
              <p>
                The arbitration shall be conducted by a single arbitrator. The
                arbitration shall take place in Queens County, New York, unless
                parties mutually agree otherwise. The arbitrator shall apply
                substantive New York law.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                15.3 Individual Basis
              </h3>
              <p>
                All arbitration proceedings shall be conducted on an individual
                basis. Neither party shall join or consolidate claims with other
                persons or entities.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                15.4 Confidentiality
              </h3>
              <p>
                All arbitration proceeding aspects shall be kept strictly
                confidential. Neither party shall disclose existence, content, or
                results without prior written consent, except as required by law.
              </p>

              <h3 className="mb-2 mt-6 text-[16px] font-semibold text-foreground">
                15.5 Exceptions
              </h3>
              <p>
                Either party may seek injunctive or other equitable relief in any
                court of competent jurisdiction to prevent infringement of
                intellectual property rights or confidential information.
                Additionally, claims within Queens County, New York small claims
                court jurisdictional limits may be brought in such court.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                16. Class Action Waiver
              </h2>
              <p className="uppercase">
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, YOU AND SOFT
                STANDARDS INC. EACH WAIVE THE RIGHT TO A TRIAL BY JURY AND THE
                RIGHT TO PARTICIPATE IN A CLASS ACTION, COLLECTIVE ACTION,
                PRIVATE ATTORNEY GENERAL ACTION, OR OTHER REPRESENTATIVE
                PROCEEDING OF ANY KIND.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                17. Governing Law
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with
                the laws of the State of New York, without regard to its conflict
                of laws provisions. You and Soft Standards Inc. agree to submit
                to the exclusive personal jurisdiction of the state courts
                located in Queens County, New York, and the federal courts of the
                United States District Court for the Eastern District of New
                York.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                18. Severability
              </h2>
              <p>
                If any provision of these Terms is held to be invalid, illegal,
                or unenforceable, such provision shall be modified to the minimum
                extent necessary to make it valid. The invalidity of any
                provision shall not affect the remaining provisions, which shall
                continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-[20px] font-bold text-foreground">
                19. Contact Information
              </h2>
              <p>
                If you have any questions regarding these Terms of Service,
                please contact us at:
              </p>
              <p className="mt-4">
                <strong className="text-foreground">
                  Soft Standards Inc.
                </strong>
                <br />A New York Corporation
                <br />
                Email:{" "}
                <a
                  href="mailto:legal@softstandardsinc.com"
                  className="text-accent"
                >
                  legal@softstandardsinc.com
                </a>
                <br />
                Website: softstandardsinc.com
              </p>
              <p className="mt-4 text-[13px] italic">
                Notice: These terms are pending review by a licensed New York
                attorney. They are provided for informational purposes and may be
                updated.
              </p>
            </section>

          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
