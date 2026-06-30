import styles from '../Legal/Legal.module.css'

export default function Terms() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1>Terms of Use</h1>
          <p>Please read these terms carefully before using this website</p>
        </div>
      </section>

      <div className="container">
        <div className={styles.wrap}>
          <p className={styles.updated}>Last updated: June 2026 &nbsp;·&nbsp; Effective from: June 2026</p>

          <p>
            These Terms of Use ("Terms") govern your access to and use of the website located at
            <strong> sparrowpharmaceuticals.in</strong> (the "Website"), operated by <strong>Sparrow Pharmaceuticals</strong>
            ("Company", "we", "us", or "our"). By accessing or using this Website, you agree to be
            bound by these Terms. If you do not agree, please do not use this Website.
          </p>

          <h2>1. Website Purpose and Scope</h2>
          <p>
            This Website is operated by Sparrow Pharmaceuticals for the purpose of providing information
            about our company, our products (including Surgicover), and peri-operative clinical nutrition.
            The Website also facilitates product enquiries, institutional order requests, and the
            dissemination of educational clinical content.
          </p>
          <p>
            This Website is intended for use by healthcare professionals, hospital procurement teams,
            institutional buyers, clinical dietitians, and adult consumers in India.
          </p>

          <h2>2. Medical and Clinical Disclaimer</h2>
          <p>
            <strong>
              The content on this Website  including product descriptions, nutritional information,
              blog articles, and clinical references  is provided for informational and educational
              purposes only. It does not constitute medical advice, clinical guidance, or a substitute
              for consultation with a qualified healthcare professional.
            </strong>
          </p>
          <p>
            Surgicover is a nutritional supplement. It is not a medicine, drug, or medical device.
            Patients should consult their treating physician, surgeon, or clinical dietitian before
            commencing any nutritional supplementation protocol, particularly in the context of surgery,
            chronic illness, or pre-existing medical conditions.
          </p>
          <p>
            Sparrow Pharmaceuticals makes no representation that any product described on this Website
            is appropriate for use in every clinical situation or in every jurisdiction. Product
            availability and regulatory status may vary.
          </p>

          <h2>3. Intellectual Property</h2>
          <p>
            All content on this Website  including text, graphics, logos, photography, product images,
            icons, audio clips, and software  is the property of Sparrow Pharmaceuticals or its content
            suppliers and is protected by applicable Indian and international intellectual property laws.
          </p>
          <p>
            You are permitted to view, print, and download content from this Website solely for your
            personal, non-commercial reference. You may not:
          </p>
          <ul>
            <li>Reproduce, republish, or redistribute any content without prior written permission</li>
            <li>Modify or create derivative works based on Website content</li>
            <li>Use any content for commercial purposes without express authorisation</li>
            <li>Remove or alter any copyright, trademark, or proprietary notices</li>
          </ul>
          <p>
            The Sparrow Pharmaceuticals name, logo, and the Surgicover product name are trademarks of
            Sparrow Pharmaceuticals. Unauthorised use of these marks is strictly prohibited.
          </p>

          <h2>4. User Conduct</h2>
          <p>By using this Website, you agree not to:</p>
          <ul>
            <li>Use the Website for any unlawful purpose or in violation of applicable laws</li>
            <li>Transmit any unsolicited commercial communications (spam)</li>
            <li>Attempt to gain unauthorised access to any part of the Website or its underlying systems</li>
            <li>Interfere with or disrupt the security, integrity, or performance of the Website</li>
            <li>Impersonate any person or entity or misrepresent your affiliation</li>
            <li>Submit false, misleading, or fraudulent information through any form or enquiry</li>
          </ul>

          <h2>5. Product Orders and Enquiries</h2>
          <p>
            Order requests and institutional enquiries submitted through this Website are non-binding
            until confirmed in writing by Sparrow Pharmaceuticals. Final pricing, availability, delivery
            terms, and payment conditions are subject to a separate purchase order or supply agreement.
          </p>
          <p>
            Sparrow Pharmaceuticals reserves the right to decline any order or enquiry at its sole
            discretion, without providing a reason.
          </p>

          <h2>6. Accuracy of Information</h2>
          <p>
            We endeavour to ensure that information on this Website is accurate and up to date. However,
            we do not warrant that the content is complete, current, or free from errors. Nutritional
            values, product specifications, and regulatory declarations are subject to change.
            Clinical information on this Website is based on published literature available at the time
            of writing and may not reflect the most recent research.
          </p>

          <h2>7. Third-Party Links</h2>
          <p>
            This Website may contain links to external websites for reference purposes (e.g., published
            clinical studies). These links are provided for convenience only. Sparrow Pharmaceuticals
            does not endorse, control, or take responsibility for the content, privacy practices, or
            availability of any linked external website.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, Sparrow Pharmaceuticals shall not be
            liable for any direct, indirect, incidental, consequential, or punitive damages arising
            from your use of, or inability to use, this Website or any content herein  including
            but not limited to reliance on clinical or product information, errors or omissions in
            content, or interruptions in Website availability.
          </p>
          <p>
            This limitation applies regardless of whether such damages arise in contract, tort
            (including negligence), or any other legal theory, even if Sparrow Pharmaceuticals has
            been advised of the possibility of such damages.
          </p>

          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Sparrow Pharmaceuticals, its officers, employees,
            agents, and affiliates from any claims, damages, losses, liabilities, and expenses
            (including reasonable legal fees) arising from your breach of these Terms or your use of
            this Website.
          </p>

          <h2>10. Governing Law and Jurisdiction</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the
            Republic of India. Any disputes arising under or in connection with these Terms shall
            be subject to the exclusive jurisdiction of the courts located in India.
          </p>

          <h2>11. Amendments</h2>
          <p>
            Sparrow Pharmaceuticals reserves the right to modify these Terms at any time. Changes
            will be posted on this page with a revised "Last updated" date. Your continued use of
            the Website following the posting of changes constitutes your acceptance of the
            revised Terms.
          </p>

          <h2>12. Severability</h2>
          <p>
            If any provision of these Terms is found to be invalid, illegal, or unenforceable, the
            remaining provisions shall continue in full force and effect.
          </p>

          <div className={styles.contact}>
            <h3>Questions About These Terms?</h3>
            <p>
              If you have any questions about these Terms of Use, please contact us:<br />
              <strong>Sparrow Pharmaceuticals</strong><br />
              Email: <a href="mailto:admin@sparrowpharmaceuticals.in">admin@sparrowpharmaceuticals.in</a><br />
              Website: <a href="/contact">sparrowpharmaceuticals.in/contact</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
