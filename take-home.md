# Tulip QA Automation Engineer Take Home

## Introduction
Thank you for your interest in the QA Automation Engineer position. This take home is split into
two sections, one focusing on evaluating your technical skills with an end-to-end testing
framework and another focused on evaluating your approach to testing a new feature. Once
completed, you will share your approach to these problems in a presentation to a panel of
interviewers.

## Automation Section
This section of take-home assignment is designed to gauge your technical proficiency in
architecture, maintainability, and coding standards.

**Target Website:** https://www.saucedemo.com/

### The Tests
Please create the following three tests using a modern automation framework of your choice
(e.g., Cypress, Playwright, Selenium, etc.).

- Test 1: A user can add a few items to their cart and successfully purchase the items
- Test 2: A user can add at least 3 items to their cart, navigate to the cart, and remove an
item. The existing items remain and the cart number correctly reflects the new count.
- Test 3: A user can sort items using the dropdown four different ways, each sorting
method works as intended

### Additional Specifications
- The credentials for the “standard_user” should be used. Follow best practices for
handling sensitive data in code.
- Setup for each tests should include logging in as the “standard_user”
- The tests should be distinct. Failing one should not automatically fail the others.

## Test Planning Section

This section of the take-home is meant to gauge your ability to build a robust and complete test
plan for a new feature. Completely read through the instructions and build a presentation that
provides answers using the problem statement and the acceptance criteria listed below “New
Feature”
.
## New Feature: Affiliate Links

### Problem Statement:

Scenario: Marketing is launching an Influencer Affiliate Program. Influencers are given
unique URLs (e.g., saucedemo.com/?ref=QA_INFLUENCER) to share with their followers.

### Acceptance Criteria:
- Cookie Persistence: Navigating to the site with a ?ref={id} query parameter stores
the {id} in a browser cookie named affiliate_tracking.

- Duration: This cookie must persist for 30 days, even if the user closes the browser and
returns later without the link.

- Attribution: If the user completes a purchase, the affiliate_tracking ID is sent to
the backend along with the order details.

- UI Feedback: On the "Checkout: Overview" page, a small banner should appear:
"Referral applied: {Influencer_Name}".

- Backend Metrics: Purchases made with the referral applied are tracked in the database
including information about the affiliate used, transaction amount, product(s) bought, and
date of purchase

# The Presentation

Please prepare a short presentation (PDF or Slide Deck) covering the following:

1. Automation Section
   a. Strategy: Why did you choose this tool/framework? What are its pros/cons?
   
   b. Architecture: A diagram or explanation of how you structured your project (e.g.,
      why you organized the tests the way you did). 
   
   c. Logic: Explain how you solved the sorting logic in test 3. Show us the code
      snippet in the slide. 

   d. Demonstration: Please come prepared to run the test suite for us, or at the very
      least provide a video of the suite running

2. Testing Planning Section 

   a. Present Test Plan: Explain how you would approach testing the feature and give
      some examples of tests you might implement, particularly edge and negative test
      cases. 

   b. Questions for Product: If you were given both the problem statement and
      acceptance criteria, what are some questions you might ask the product team to best prepare for testing?

   c. Deep Dive: Other than performing exploratory/functional testing on the feature,
      what other considerations or tests would you perform to make sure the feature is high quality?
      
# Submission Instructions

Before the panel interview, please submit the presentation file and the code you put together for
the automation section (either as a zip of the files or a link to a public GitHub repo).

AI Transparency: We expect that candidates will leverage AI in some capacity when
completing this take home. That’s completely acceptable! If you use AI, please come prepared
to explain where you used AI in this take home and explain why you used it.

Time Limit Suggestion: We value your time. This should take approximately 2–3 hours. If you
find yourself spending more time, please stop and document what you would have done in the
presentation.