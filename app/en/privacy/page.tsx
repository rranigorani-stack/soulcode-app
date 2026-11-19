import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { OPERATOR } from '@/lib/legal';

export const metadata: Metadata = { title: 'Privacy Policy · SOULCODE', alternates: { canonical: '/en/privacy', languages: { ko: '/privacy', en: '/en/privacy', ja: '/ja/privacy' } } };

export default function Page() {
  return (
    <LegalPage title="Privacy Policy" lang="en">
      <p>{OPERATOR.name} (the &quot;Operator&quot;) protects users&apos; personal information under the Personal Information Protection Act of Korea and has established this Privacy Policy to handle related concerns promptly.</p>

      <h2>1. What we process and why</h2>
      <table>
        <thead><tr><th>Category</th><th>Items</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td>Kakao login</td><td>Kakao member ID, email, nickname, profile photo (optional)</td><td>Identifying members, login, support</td></tr>
          <tr><td>Email login</td><td>Email address</td><td>Identifying members, sending login links, support</td></tr>
          <tr><td>Using the Service</td><td>Nickname, date of birth, birth time (optional), MBTI, tarot/compatibility/check-in records, deck skin setting</td><td>Saju, tarot and compatibility readings; syncing across devices</td></tr>
          <tr><td>Compatibility</td><td>The other person&apos;s nickname, date of birth, birth time (optional) and MBTI that you enter</td><td>Showing compatibility results (stored only on your device and in your account)</td></tr>
          <tr><td>Chemistry map</td><td>Participants&apos; nickname, MBTI, Saju day master and zodiac (date of birth is not stored)</td><td>Showing a chemistry map among friends. Anyone with the link can see map members.</td></tr>
          <tr><td>How friends see me</td><td>The link creator&apos;s nickname, the options friends choose, and a value to prevent duplicate answers (an irreversible transformation of IP and device information)</td><td>Counting anonymous friend answers and showing the result card. We do not collect respondents&apos; names or contact details; the link owner sees only totals.</td></tr>
          <tr><td>Morning alert</td><td>Browser push subscription address</td><td>Sending today&apos;s card every morning</td></tr>
          <tr><td>Question tarot</td><td>A one-line question you write (optional)</td><td>Generating an AI reading</td></tr>
          <tr><td>Payments</td><td>Order number, amount, payment status, payment approval key, payment time</td><td>Providing passes, refunds, keeping legally required records</td></tr>
          <tr><td>Collected automatically</td><td>Access logs (IP, browser information, access time), daily AI usage count</td><td>Preventing abuse, handling outages, managing free limits</td></tr>
        </tbody>
      </table>
      <p>Card numbers and other payment details are handled directly by Toss Payments; the Operator does not receive or store them.</p>
      <p>If you use the Service without logging in, what you enter is stored only on your device (browser) and is not sent to the Operator&apos;s servers. AI readings are available only when logged in.</p>

      <h2>2. How long we keep it</h2>
      <ul>
        <li>Member information and usage records: <b>deleted immediately when you delete your account</b></li>
        <li>Chemistry map member information: until you leave the map or the map owner deletes it</li>
        <li>How friends see me: until the link owner deletes the link; deleted automatically 1 year after the last answer</li>
        <li>Push subscription address: until you turn alerts off or the subscription expires</li>
        <li>Records on contracts, cancellations, payments and supply of goods: <b>5 years</b> (Korean E-Commerce Act), kept unlinked from your account even after deletion</li>
        <li>Consumer complaint and dispute records: 3 years (Korean E-Commerce Act)</li>
        <li>Access logs: 3 months (Korean Protection of Communications Secrets Act)</li>
      </ul>
      <p>The Operator does not separately store AI reading requests and results on its servers. (Results that stay on screen, such as today&apos;s card reading, are saved in your synced records.)</p>

      <h2>3. Processors and transfers abroad</h2>
      <p>We entrust personal information processing to the companies below to run the Service. Entrusting to US companies constitutes a transfer of personal information abroad.</p>
      <table>
        <thead><tr><th>Recipient (country)</th><th>Task</th><th>Items</th><th>When and how</th><th>Retention</th></tr></thead>
        <tbody>
          <tr><td>Anthropic, PBC (USA)<br /><small>privacy@anthropic.com</small></td><td>Generating AI readings</td><td>Nickname, MBTI, Saju chart and five-element data, tarot results, your one-line question, compatibility partner details (for compatibility readings)</td><td>Encrypted over the network each time you tap an AI reading button</td><td>Kept for the period under Anthropic&apos;s policy, then deleted (not used to train models)</td></tr>
          <tr><td>Supabase, Inc. (US company; data stored in the Seoul, Korea region)</td><td>Authentication, database</td><td>Member information, usage records and payment records in Section 1</td><td>Encrypted transfer as you sign up and use the Service</td><td>Periods in Section 2</td></tr>
          <tr><td>Vercel Inc. (US company; servers in the Seoul, Korea region)</td><td>Hosting and running the Service</td><td>Information sent while using the Service, access logs</td><td>Encrypted transfer as you use the Service</td><td>Deleted after processing (access logs per Vercel&apos;s policy)</td></tr>
          <tr><td>Toss Payments Co., Ltd. (Korea)</td><td>Payment processing</td><td>Order number, amount, payment method details</td><td>At payment</td><td>As required by law</td></tr>
          <tr><td>Kakao Corp. (Korea)</td><td>Kakao login</td><td>Login linkage information</td><td>At login</td><td>Per Kakao&apos;s policy</td></tr>
        </tbody>
      </table>
      <p>If you do not want your information transferred abroad, you can use the Service without AI readings or without logging in. In that case, AI readings and cross-device sync are not available.</p>

      <h2>4. Deletion</h2>
      <p>We delete personal information without delay when the retention period ends or you delete your account. Electronic files are deleted in a way that cannot be recovered.</p>

      <h2>5. Your rights</h2>
      <ul>
        <li>You can request access to, correction, deletion or suspension of processing of your personal information at any time.</li>
        <li>You can edit your info with &apos;Re-enter my info&apos; and delete your account with &apos;Delete account&apos; in the MY tab.</li>
        <li>For other requests, email {OPERATOR.email} and we will handle them within 10 days.</li>
      </ul>

      <h2>6. Children under 14</h2>
      <p>The Service does not accept account sign-ups from children under 14. If we learn that personal information of a child under 14 has been collected, we delete it immediately.</p>

      <h2>7. Security measures</h2>
      <ul>
        <li>Encryption of all traffic (HTTPS)</li>
        <li>Database row-level security (RLS) so that users can access only their own data</li>
        <li>Payment and admin secret keys kept only on servers with minimal access</li>
      </ul>

      <h2>8. Cookies and similar technologies</h2>
      <p>The Service uses browser storage (localStorage) to keep you logged in and save records on your device. We do not use advertising or tracking cookies. You can clear storage in your browser settings, but you will be logged out and records saved only on your device will be lost.</p>

      <h2>9. Privacy officer</h2>
      <p>Privacy officer: Operator · {OPERATOR.email}</p>
      <p>You may also contact the Korean Personal Information Infringement Report Center (privacy.kisa.or.kr) or the Personal Information Dispute Mediation Committee (kopico.go.kr), or the data protection authority in your country.</p>

      <h2>10. Changes</h2>
      <p>If this Policy changes, we will announce it in the Service 7 days before the change takes effect.</p>
    </LegalPage>
  );
}
