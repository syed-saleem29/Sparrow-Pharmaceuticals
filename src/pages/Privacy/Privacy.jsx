import styles from '../Legal/Legal.module.css'

export default function Privacy() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>How Sparrow Pharmaceuticals collects, uses, and protects your personal information</p>
        </div>
      </section>

      <div className="container">
        <div className={styles.wrap}>
          <p className={styles.updated}>Last updated: June 2026 &nbsp;·&nbsp; Effective from: June 2026</p>

          <p>
            This Privacy Policy describes how <strong>Sparrow Pharmaceuticals</strong> ("we", "us", or "our"),
            operating the website <strong>sparrowpharmaceuticals.in</strong> ("the Website"), collects, uses, stores,
            and protects information provided by visitors and users ("you"). This policy is compliant with
            India's <strong>Digital Personal Data Protection Act, 2023 (DPDPA)</strong> and applicable
            guidelines issued by the Ministry of Electronics and Information Technology (MeitY).
          </p>

          <h2>1. Information We Collect</h2>
          <h3>1.1 Information You Provide Directly</h3>
          <p>We collect personal data that you voluntarily provide when you:</p>
          <ul>
            <li>Submit a contact or enquiry form (name, email address, phone number, message)</li>
            <li>Place an order or request a quotation (name, organisation, shipping address, product selection)</li>
            <li>Subscribe to clinical updates or newsletters (email address)</li>
            <li>Communicate with us by email or phone</li>
          </ul>

          <h3>1.2 Information Collected Automatically</h3>
          <p>
            When you visit the Website, our hosting provider may automatically log standard server data,
            including your IP address, browser type, operating system, referring URLs, and pages visited.
            This data is used solely for website performance monitoring and security purposes. We do not use
            tracking cookies for advertising or behavioural profiling.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use the personal data we collect for the following purposes:</p>
          <ul>
            <li><strong>To respond to enquiries</strong>  answering questions submitted via our contact form or by email</li>
            <li><strong>To process orders and quotations</strong>  fulfilling institutional supply requests and bulk orders</li>
            <li><strong>To communicate product and clinical updates</strong>  only where you have explicitly opted in to receive such communications</li>
            <li><strong>To comply with legal obligations</strong>  including any applicable regulatory, tax, or accounting requirements</li>
            <li><strong>To maintain the security and integrity of our systems</strong></li>
          </ul>
          <p>We do not sell, rent, or trade your personal data to any third party for marketing purposes.</p>

          <h2>3. Legal Basis for Processing</h2>
          <p>
            Under the DPDPA 2023, we process your personal data on the following lawful bases:
          </p>
          <ul>
            <li><strong>Consent</strong>  where you have provided explicit consent, such as subscribing to updates</li>
            <li><strong>Legitimate interests</strong>  for responding to direct business enquiries and processing orders</li>
            <li><strong>Legal obligation</strong>  where processing is necessary to comply with applicable Indian law</li>
          </ul>

          <h2>4. Data Sharing and Disclosure</h2>
          <p>We may share your personal data with:</p>
          <ul>
            <li><strong>Service providers</strong>  third-party vendors who assist in website hosting, email delivery, and order fulfilment, under strict confidentiality obligations</li>
            <li><strong>Legal and regulatory authorities</strong>  where required by applicable law, court order, or regulatory request</li>
          </ul>
          <p>
            All third-party service providers who process personal data on our behalf are bound by data
            processing agreements and are not permitted to use your data for any purpose other than
            providing the specified service to us.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We retain personal data only for as long as necessary to fulfil the purposes for which it was
            collected, or as required by applicable law. Enquiry records are retained for up to 2 years.
            Order records may be retained for up to 7 years for accounting and regulatory compliance purposes.
            You may request deletion of your data at any time (see Section 7).
          </p>

          <h2>6. Data Security</h2>
          <p>
            We implement appropriate technical and organisational measures to protect your personal data
            against unauthorised access, disclosure, alteration, or destruction. Our Website is served over
            HTTPS (TLS encryption). However, no method of electronic transmission or storage is 100% secure,
            and we cannot guarantee absolute security.
          </p>

          <h2>7. Your Rights Under DPDPA 2023</h2>
          <p>As a Data Principal under the Digital Personal Data Protection Act, 2023, you have the right to:</p>
          <ul>
            <li><strong>Access</strong>  request a summary of the personal data we hold about you</li>
            <li><strong>Correction</strong>  request correction of inaccurate or incomplete personal data</li>
            <li><strong>Erasure</strong>  request deletion of your personal data, subject to legal retention requirements</li>
            <li><strong>Withdrawal of consent</strong>  withdraw consent for any processing based on consent, at any time</li>
            <li><strong>Grievance redressal</strong>  lodge a complaint with our Consent Manager (contact details below)</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the details provided in Section 9.
            We will respond to verified requests within 30 days.
          </p>

          <h2>8. Cookies</h2>
          <p>
            This Website is a single-page React application. We do not use third-party tracking cookies,
            advertising cookies, or analytics platforms such as Google Analytics. Any session data stored
            in your browser (localStorage) is used solely for functional purposes (e.g., remembering
            your preferences within a session) and is not transmitted to any third party.
          </p>

          <h2>9. Third-Party Links</h2>
          <p>
            The Website may contain links to external websites (such as medical literature references in
            our blog articles). We are not responsible for the privacy practices or content of those
            external sites. We recommend reviewing the privacy policy of any external site you visit.
          </p>

          <h2>10. Children's Privacy</h2>
          <p>
            This Website is intended for healthcare professionals, institutional buyers, and adult
            consumers. We do not knowingly collect personal data from individuals under the age of 18.
            If you believe a minor has provided us with personal data, please contact us immediately.
          </p>

          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or
            applicable law. The "Last updated" date at the top of this page will be revised accordingly.
            Material changes will be communicated via a notice on our Website. Your continued use of the
            Website following such changes constitutes acceptance of the revised policy.
          </p>

          <div className={styles.contact}>
            <h3>Contact Our Data Protection Officer</h3>
            <p>
              For any privacy-related enquiries, data access requests, or complaints, please contact:<br />
              <strong>Sparrow Pharmaceuticals</strong><br />
              Email: <a href="mailto:privacy@sparrowpharmaceuticals.in">privacy@sparrowpharmaceuticals.in</a><br />
              Website: <a href="/contact">sparrowpharmaceuticals.in/contact</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
