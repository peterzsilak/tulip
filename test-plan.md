# Test Plan: Influencer Affiliate Links Feature

## 1. Test Strategy & Approach

The **Affiliate Links** feature introduces a cross-layer business logic that connects client-side URL parameters, browser state management (cookies), UI components, and backend persistence[cite: 1].

To ensure the highest quality and architectural stability, this test plan follows an **End-to-End (E2E)** validation approach[cite: 1], supplemented by lower-level integration and security verifications.

### Testing Pyramid Focus
* **Component / Integration Level:** Verifying cookie creation, expiration attributes, and API payload integrity[cite: 1].
* **UI / E2E Level:** Validating user journeys from hitting the affiliate URL to checking out with the banner displayed[cite: 1].
* **Backend Level:** Directly querying the database to ensure transactional data and metrics are properly populated[cite: 1].

---

## 2. Test Scenarios & Edge Cases

### A. Cookie Management & Persistence
* **TC-01: Happy Path Cookie Creation**
    * Navigate to `saucedemo.com/?ref=QA_INFLUENCER`[cite: 1].
    * **Expected Result:** A browser cookie named `affiliate_tracking` is created with the exact value `QA_INFLUENCER`[cite: 1].
* **TC-02: Cookie Longevity (30-Day Duration)**
    * Simulate cookie creation and close the browser session[cite: 1]. Reopen the browser and navigate back to `saucedemo.com` (without the query parameter)[cite: 1].
    * **Expected Result:** The `affiliate_tracking` cookie persists with its original value[cite: 1].
* **TC-03: Expiration Attribute Validation**
    * Inspect the metadata of the created `affiliate_tracking` cookie[cite: 1].
    * **Expected Result:** The `Expires/Max-Age` attribute is programmatically set to exactly **30 days** from the moment of creation[cite: 1].
* **TC-04: Parameter Overwriting (Attribution Reset)**
    * Navigate via `?ref=INFLUENCER_A` (cookie stored)[cite: 1]. Five days later, navigate via `?ref=INFLUENCER_B`[cite: 1].
    * **Expected Result:** The cookie value updates to `INFLUENCER_B` and the 30-day expiration clock resets (pending Product confirmation on attribution strategy).
* **TC-05: Empty or Missing Parameters**
    * Navigate to `saucedemo.com/?ref=` or `saucedemo.com`[cite: 1].
    * **Expected Result:** No cookie is created[cite: 1]. If a valid cookie already existed from a prior visit, it must **not** be overwritten or cleared by an empty parameter.
* **TC-06: Input Sanitation & Injection Attacks**
    * Append malicious scripts or SQL injection vectors to the parameter (e.g., `?ref=INF_<script>alert(1)</script>` or `?ref=INF'--`).
    * **Expected Result:** System sanitizes the input. The application does not crash, execute code, or break the database insertion logic.

### B. User Interface Feedback (UI)
* **TC-07: Referral Banner Presence**
    * With a valid `affiliate_tracking` cookie active, proceed to the "Checkout: Overview" page[cite: 1].
    * **Expected Result:** A banner dynamically appears displaying text matching the pattern: `"Referral applied: {Influencer_Name}"`[cite: 1].
* **TC-08: Referral Banner Absence**
    * Proceed to the "Checkout: Overview" page *without* an active `affiliate_tracking` cookie[cite: 1].
    * **Expected Result:** The banner is completely hidden, and no empty container space or layout shift (CLS) is visible to the user.
* **TC-09: Dynamic Name Mapping Validation**
    * Use an ID that maps to a specific name (e.g., ID `QA_INFLUENCER` maps to `"QA Team"`)[cite: 1].
    * **Expected Result:** The banner accurately prints the user-friendly name (`"Referral applied: QA Team"`), not the raw technical tracking ID[cite: 1].
* **TC-10: UI Responsiveness & Layout Compatibility**
    * Verify the banner across standard mobile, tablet, and desktop viewports.
    * **Expected Result:** The banner scales elegantly and does not obstruct critical transactional elements like the "Finish" button.

### C. Attribution & Backend Metrics
* **TC-11: Checkout API Payload Integrity**
    * Complete a purchase with an active affiliate cookie while intercepting network traffic[cite: 1].
    * **Expected Result:** The checkout API request payload explicitly includes the `affiliate_tracking` ID alongside the order configuration[cite: 1].
* **TC-12: Backend Database Record Verification**
    * Execute a successful checkout and verify the corresponding transaction record in the backend database[cite: 1].
    * **Expected Result:** The table captures the exact affiliate ID used, correct transaction amount, product array bought, and timestamp[cite: 1].
* **TC-13: Standard Checkout (No Affiliate)**
    * Complete a purchase without any affiliate link history[cite: 1].
    * **Expected Result:** The transaction successfully processes; the database `affiliate_id` or equivalent field remains `NULL` or empty, throwing no system errors[cite: 1].
* **TC-14: Abandoned Cart Isolation**
    * Add items to the cart using an affiliate link but abandon the session or clear the browser prior to hitting "Finish"[cite: 1].
    * **Expected Result:** No metrics or transaction entries are generated in the database analytics tables[cite: 1].

---

## 3. Product Team Clarifications (Questions for Product)

To prevent gaps between development and business intent, the following questions must be answered[cite: 1]:

1. **Attribution Model Preference (First Click vs. Last Click):** If a user clicks `?ref=Influencer_A`, and two weeks later clicks `?ref=Influencer_B` before purchasing, who receives the commission? Does the initial or the most recent link take precedence?
2. **ID-to-Name Mapping Registry:** The acceptance criteria mentions rendering `{Influencer_Name}` on the UI based on the link[cite: 1]. Is there an internal registry or lookup service that translates the technical query ID (e.g., `QA_INFLUENCER`) to a readable name[cite: 1]? What is the fallback UI behavior if the lookup fails?
3. **Cookie Lifecycle Post-Purchase:** Once a user successfully completes a purchase, should the `affiliate_tracking` cookie be immediately destroyed (single conversion per link), or should it remain for the duration of the 30 days to track subsequent purchases[cite: 1]?
4. **Incognito & Cross-Session Handling:** How should the system handle users who access the link via private browsing windows or switch devices mid-funnel? Is cookie-based tracking sufficient for this phase, or do we plan to move toward authenticated user-profile tracking?

---

## 4. Deep Dive & Quality Considerations

Beyond standard functional flows, high-quality engineering demands looking into non-functional constraints[cite: 1]:

* **Security & Fraud Prevention:**
    * *Cookie Stuffing / Tampering:* Ensure users cannot arbitrarily edit the `affiliate_tracking` cookie value via the browser console to claim unauthorized rewards or hijack credit.
    * *Cookie Security Flags:* Confirm that the cookie implementation utilizes proper security flags (`Secure`, `SameSite=Lax` or `Strict` to mitigate cross-site request forgery, and `HttpOnly` depending on whether client-side scripts require read/write access).
* **Performance & Load Scalability:**
    * Marketing-driven influencer campaigns typically yield sudden, massive traffic spikes. We must verify that concurrent writes to the metrics database during checkout processing do not trigger row-locking, transaction bottlenecks, or race conditions[cite: 1].
* **Privacy & Cookie Compliance (GDPR/CCPA):**
    * Since this tracking cookie qualifies as a marketing/analytical cookie, it must honor user consent. If a user rejects marketing cookies via the site's privacy banner, the `affiliate_tracking` cookie **must not** be initialized, regardless of the presence of query parameters in the URL[cite: 1].
* **Observability & Alerting:**
    * Introduce logging (e.g., via telemetry tools) to monitor API payload failures or internal database serialization errors regarding affiliate metrics, ensuring rapid triage if tracking breaks in production[cite: 1].