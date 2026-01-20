# FINAL YEAR PROJECT REPORT

<br />
<br />
<br />
<br />

## ACCOUNTILL
### A Comprehensive MERN Stack Invoicing & Financial Management System

<br />
<br />
<br />
<br />
<br />

**A PROJECT REPORT SUBMITTED IN PARTIAL FULFILLMENT OF THE REQUIREMENTS FOR THE AWARD OF THE DEGREE OF**

<br />

### BACHELOR OF COMPUTER SCIENCE

<br />
<br />
<br />

**SUBMITTED BY:**

**NAME:** SOUROV ASHIQUL ISLAM  
**STUDENT ID:** 0121230322553  

<br />
<br />
<br />
<br />
<br />

**SUPERVISED BY:**
[Supervisor Name]
[Supervisor Designation]

<br />
<br />
<br />
<br />

**DEPARTMENT OF COMPUTER SCIENCE**
**[UNIVERSITY NAME]**
**JANUARY 2026**

---

<div style="page-break-after: always;"></div>

## DECLARATION

I, **Sourov Ashiqul Islam**, with Student ID **0121230322553**, a student of the Bachelor of Computer Science program, hereby declare that the project report entitled **"ACCOUNTILL: A MERN Stack Invoicing Application"** is a record of original work done by me under the supervision of **[Supervisor Name]**.

This project has not been submitted, in part or in full, for the award of any other degree, diploma, fellowship, or similar title at this or any other university or institution. All sources of information used in this report have been duly acknowledged.

<br />
<br />
<br />
<br />

**Signature:** _________________________

**Name:** Sourov Ashiqul Islam  
**Date:** January 20, 2026

---

<div style="page-break-after: always;"></div>

## APPROVAL SHEET

This is to certify that the project report entitled **"ACCOUNTILL"**, submitted by **Sourov Ashiqul Islam (0121230322553)** in partial fulfillment of the requirements for the degree of **Bachelor of Computer Science**, has been examined and approved.

The project fulfills the requirements of the curriculum and demonstrates the student's ability to apply computer science concepts to practical applications.

<br />
<br />
<br />
<br />

**_________________________**  
**Internal Examiner**

<br />
<br />

**_________________________**  
**External Examiner**

<br />
<br />

**_________________________**  
**Head of Department**

---

<div style="page-break-after: always;"></div>

## ACKNOWLEDGEMENT

I would like to express my deepest gratitude to my project supervisor, **[Supervisor Name]**, for their invaluable guidance, patience, and constructive feedback throughout the development of this project. Their insights helped shape the direction of this application.

I am also grateful to the faculty members of the Department of Computer Science for providing the necessary academic foundation and resources.

I extend my thanks to my parents and family members for their unceasing support and encouragement. Their belief in my potential has always been my driving force.

Finally, I would like to acknowledge the open-source community. The documentation and resources available for React, Node.js, and MongoDB were instrumental in overcoming technical challenges during the development phase.

---

<div style="page-break-after: always;"></div>

## ABSTRACT

In the rapidly evolving landscape of the gig economy and small-medium enterprises (SMEs), efficient financial management is paramount. Traditional methods of invoicing—relying on paper trails, spreadsheets, or disjointed tools—often lead to errors, delayed payments, and poor record-keeping. **Accountill** is a modern, full-stack web application designed to solve these problems by providing a centralized platform for invoicing and client management.

Developed using the **MERN Stack** (MongoDB, Express.js, React, Node.js), Accountill offers a robust solution for freelancers and business owners. The application features a secure authentication system using JSON Web Tokens (JWT) and Google OAuth, ensuring user data privacy. Core functionalities include the creation, management, and tracking of professional invoices, receipts, estimates, and quotations. Users can customize documents, manage client databases, and visualize financial health through an interactive dashboard powered by Apex Charts.

Key innovations in this project include an automated PDF generation engine using `html-pdf`, a seamless email delivery system via Nodemailer for sending invoices directly to clients, and a real-time payment tracking system that updates invoice statuses automatically. This report documents the entire software development lifecycle of Accountill, from requirements elicitation and system design to implementation and testing, demonstrating a scalable architecture suitable for real-world deployment.

---

<div style="page-break-after: always;"></div>

## TABLE OF CONTENTS

**1. CHAPTER 1: INTRODUCTION**
   *   1.1 Introduction
   *   1.2 Background of the Study
   *   1.3 Problem Statement
   *   1.4 Project Motivation
   *   1.5 Objectives of the Project
   *   1.6 Scope of the Project
   *   1.7 Methodology Overview
   *   1.8 Organization of the Report

**2. CHAPTER 2: LITERATURE REVIEW**
   *   2.1 Evolution of Web Applications
   *   2.2 Overview of the MERN Stack
   *   2.3 Frontend Frameworks: Why React?
   *   2.4 Backend Technologies: Node.js & Express
   *   2.5 Database Management: NoSQL & MongoDB
   *   2.6 Comparison with Other Stacks (MEAN, LAMP)
   *   2.7 Review of Existing Invoicing Systems

**3. CHAPTER 3: SYSTEM ANALYSIS & REQUIREMENTS**
   *   3.1 Feasibility Study
   *   3.2 Requirement Elicitation
   *   3.3 Functional Requirements
   *   3.4 Non-Functional Requirements
   *   3.5 System Use Cases
   *   3.6 Data Flow Diagrams (DFD)

**4. CHAPTER 4: SYSTEM DESIGN**
   *   4.1 System Architecture
   *   4.2 Database Design & Schema
   *   4.3 User Interface (UI) Design
   *   4.4 API Endpoint Design
   *   4.5 Component Architecture

**5. CHAPTER 5: IMPLEMENTATION**
   *   5.1 Development Environment & Tools
   *   5.2 Backend Implementation
   *   5.3 Frontend Implementation
   *   5.4 Key Algorithms & Logic
   *   5.5 PDF Generation & Email Service
   *   5.6 User Interface Walkthrough

**6. CHAPTER 6: TESTING & RESULTS**
   *   6.1 Testing Strategy
   *   6.2 Unit Testing
   *   6.3 Integration Testing
   *   6.4 System Testing
   *   6.5 Test Cases & Results

**7. CHAPTER 7: CONCLUSION & FUTURE WORK**
   *   7.1 Conclusion
   *   7.2 Limitations
   *   7.3 Future Enhancements

**8. REFERENCES**

---

<div style="page-break-after: always;"></div>

## CHAPTER 1: INTRODUCTION

### 1.1 Introduction
The digital transformation of business processes has revolutionized how organizations operate. Among these processes, financial management—specifically invoicing and billing—remains a critical function for any specific business entity. **Accountill** is a web-based application developed to streamline these operations. It leverages modern web technologies to provide a seamless, responsive, and secure platform for managing invoices.

### 1.2 Background of the Study
Freelancers and Small-to-Medium Enterprises (SMEs) often struggle with administrative overheads. According to recent surveys, freelancers spend a significant portion of their non-billable time on administrative tasks, including creating invoices, following up on payments, and organizing client details. While large enterprises have access to expensive ERP solutions like SAP or Oracle, these are often cost-prohibitive and overly complex for smaller entities.

### 1.3 Problem Statement
The current landscape of invoicing for small businesses faces several challenges:
1.  **Manual Errors:** Using generic tools like Microsoft Word or Excel leads to calculation errors in taxes, discounts, and totals.
2.  **Lack of Centralization:** Client details, past invoices, and payment records are often scattered across different files and folders.
3.  **Inefficiency:** Manually converting documents to PDF and emailing them is time-consuming.
4.  **Poor Analytics:** Without a dedicated system, tracking outstanding payments and monthly revenue becomes difficult.

### 1.4 Objectives of the Project
The primary goal of Accountill is to democratize access to professional financial tools.
*   **To Develop:** A full-stack web application capable of CRUD (Create, Read, Update, Delete) operations for invoices and clients.
*   **To Automate:** The calculation of sub-totals, VAT, and grand totals to eliminate human error.
*   **To Secure:** Implement robust authentication to ensure that a user's financial data is private and inaccessible to others.
*   **To Integrate:** Email services and PDF generation to streamline the delivery of invoices.
*   **To Visualize:** Provide a dashboard that summarizes financial data into actionable insights (e.g., Total Paid vs. Unpaid).

### 1.5 Scope of the Project
**In-Scope:**
*   User Registration and Authentication (Local & Google OAuth).
*   Profile Management (Logo, Address, Contact Info).
*   Client Management (Add, Edit, Delete Clients).
*   Invoice Management (Create, Edit, Delete, Duplicate).
*   PDF Download and Email functionality.
*   Payment History Logging.

**Out-of-Scope:**
*   Integration with live payment gateways (Stripe/PayPal) for real-time credit card processing (planned for future).
*   Multi-currency automatic conversion rates (currently manual).
*   Inventory management.

### 1.6 Methodology Overview
The project follows the **Agile Software Development** methodology. This iterative approach allowed for continuous feedback and improvement. The development was divided into "sprints," focusing first on the backend API, then the frontend UI, and finally integration and testing.

---

<div style="page-break-after: always;"></div>

## CHAPTER 2: LITERATURE REVIEW

### 2.1 Overview of the MERN Stack
The MERN stack is a JavaScript-based software stack for building dynamic web sites and web applications. It consists of four key technologies:
1.  **MongoDB:** A document-oriented NoSQL database used to store application data. Unlike SQL databases, it uses flexible documents instead of rigid tables.
2.  **Express.js:** A web application framework for Node.js. It simplifies the process of building robust APIs and handling HTTP requests.
3.  **React:** A frontend JavaScript library for building user interfaces. Maintained by Facebook, it allows for the creation of reusable UI components.
4.  **Node.js:** A JavaScript runtime built on Chrome's V8 engine. It allows developers to run JavaScript on the server side.

### 2.2 Comparison with Other Stacks
*   **MERN vs. LAMP (Linux, Apache, MySQL, PHP):** LAMP has been the standard for decades. However, MERN offers a unified language (JavaScript) for both client and server, leading to better developer productivity and code reuse. MongoDB's JSON-like structure maps directly to frontend objects, eliminating the need for complex ORMs required in SQL-based LAMP stacks.
*   **MERN vs. MEAN (Angular instead of React):** While similar, React offers a steeper learning curve but greater flexibility and a larger ecosystem compared to Angular's opinionated structure. React's Virtual DOM also provides superior performance for dynamic applications.

### 2.3 Review of Existing Systems
*   **Zoho Invoice:** A powerful commercial tool. *Limitation:* The free tier is very restrictive, and the UI can be overwhelming for simple needs.
*   **Wave Apps:** A free accounting tool. *Limitation:* It has started restricting features in certain regions and often pushes paid payroll services.
*   **Excel/Word Templates:** The most common competitor. *Limitation:* Static, error-prone, no database, no analytics.

**Accountill** aims to bridge the gap by offering the simplicity of a template with the power of a database-backed application, without the cost or complexity of enterprise software.

---

<div style="page-break-after: always;"></div>

## CHAPTER 3: SYSTEM ANALYSIS

### 3.1 Requirement Elicitation
Requirements were gathered by analyzing the needs of freelance developers and designers. Key pain points identified were the need for "fast invoice creation" and "looking professional."

### 3.2 Functional Requirements
1.  **Authentication Module:**
    *   System must allow users to sign up with Email/Password.
    *   System must verify authentication tokens for protected routes.
    *   System must support Google Login for one-click access.

2.  **Client Module:**
    *   User can add a new client with Name, Email, Address, and Phone.
    *   User can view a list of all clients.
    *   User can update client details.

3.  **Invoice Module:**
    *   User can add multiple items (Description, Quantity, Unit Price) to an invoice.
    *   System must automatically calculate line totals and grand totals including VAT.
    *   User can set invoice status (Paid, Unpaid, Partial).
    *   User can record payments against an invoice.

4.  **Output Module:**
    *   System must generate a PDF version of the invoice.
    *   System must send an email with the PDF attachment to the client's email address.

### 3.3 Non-Functional Requirements
*   **Performance:** The dashboard should load within 2 seconds.
*   **Scalability:** The database should handle thousands of invoices without significant degradation.
*   **Security:** Passwords must be hashed. API endpoints must be protected against unauthorized access.
*   **Usability:** The UI must be responsive (mobile-friendly).

### 3.4 Data Flow Diagram (Level 0)
*   **Input:** User enters credentials -> **Process:** Auth Controller validates -> **Output:** JWT Token returned.
*   **Input:** User submits Invoice Data -> **Process:** Backend Validates & Saves to DB -> **Output:** Success Message & Updated Dashboard.

### 3.5 Use Case Descriptions

**Use Case 1:** Create Invoice
*   **Actor:** Registered User
*   **Precondition:** User is logged in.
*   **Main Flow:**
    1.  User clicks "New Invoice".
    2.  User selects a client from the dropdown or creates a new one.
    3.  User adds items, detailing the service, quantity, and price.
    4.  System updates the total automatically.
    5.  User saves the invoice.
*   **Postcondition:** Invoice is saved in the database and visible in the dashboard.

**Use Case 2:** Send Invoice via Email
*   **Actor:** Registered User
*   **Precondition:** Invoice exists and has a client with a valid email.
*   **Main Flow:**
    1.  User views the invoice details.
    2.  User clicks the "Send Email" icon.
    3.  System compiles the PDF and uses SMTP service to send it.
    4.  System displays "Email Sent" notification.
*   **Postcondition:** Client receives an email with the invoice attached.

---

<div style="page-break-after: always;"></div>

## CHAPTER 4: SYSTEM DESIGN

### 4.1 System Architecture
The application uses a **RESTful Client-Server Architecture**.
*   **Client (Frontend):** React.js Single Page Application (SPA). It handles the presentation layer and state management using Redux.
*   **Server (Backend):** Express.js / Node.js. It serves as the API layer, handling logic, validation, and database communication.
*   **Database:** MongoDB Atlas (Cloud). It stores all persistent data.

### 4.2 Database Design
The database consists of three primary collections. Below is the schema design.

#### 4.2.1 User Collection
| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Unique Identifier |
| `name` | String | Full Name of the user |
| `email` | String | Unique email address |
| `password` | String | Bcrypt hashed password |
| `resetToken` | String | Token for password recovery |
| `expireToken` | Date | Expiration for reset token |

#### 4.2.2 Client Collection
| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Unique Identifier |
| `name` | String | Client Name |
| `email` | String | Client Email |
| `phone` | String | Contact Number |
| `userId` | [String] | ID of the user who owns this client |
| `createdAt` | Date | Record creation timestamp |

#### 4.2.3 Invoice Collection
| Field | Type | Description |
| :--- | :--- | :--- |
| `invoiceNumber` | String | Custom invoice identifier |
| `client` | Object | Embedded object with client snapshot |
| `items` | Array | List of items {name, price, qty} |
| `total` | Number | Grand total amount |
| `status` | String | 'Paid', 'Unpaid', 'Partial' |
| `creator` | [String] | ID of the user who created it |
| `paymentRecords` | Array | History of payments made |

### 4.3 UI/UX Design
The interface is built using **Material-UI (MUI)**. This provides a clean, Google-standard aesthetic.
*   **Dashboard:** Uses Cards to display stats and a doughnut chart for payment distribution.
*   **Forms:** Uses floating labels and validation feedback for a better user experience.
*   **Responsive:** Grid system ensures layout adapts to mobile devices.

---

<div style="page-break-after: always;"></div>

## CHAPTER 5: IMPLEMENTATION

### 5.1 Technology Stack Details
*   **Frontend:** React 17, Redux (Thunk), Axios, Moment.js.
*   **Backend:** Node 14+, Express 4, Mongoose 5.
*   **Utilities:** `nodemailer` for emails, `html-pdf` for document generation.

### 5.2 Implementation of Authentication (Backend)
Authentication is handled via the `user.js` controller. When a user signs up, `bcryptjs` salts and hashes the password 12 rounds before saving. On sign-in, the password is compared. If valid, a `jsonwebtoken` (JWT) is signed with a secret key and sent to the client.

```javascript
// Excerpt from user controller
export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET, { expiresIn: '1h' });
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
}
```

### 5.3 Implementation of State Management (Frontend)
Redux is used to manage global state. This is crucial for keeping the UI in sync. For example, when an invoice is created, the `invoices` reducer updates the state, which automatically triggers a re-render of the invoice list.

**Action Creator Example:**
```javascript
export const createInvoice = (invoice, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.addInvoice(invoice)
        dispatch({ type: ADD_NEW, payload: data })
        history.push(`/invoice/${data._id}`)
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}
```

### 5.4 PDF Generation Logic
The PDF feature is unique. Instead of generating it on the client, the server handles it to ensure consistency across devices.
1.  Frontend sends invoice data to `/invoices`.
2.  Backend passes this data into an HTML template literal function (`documents/invoice.js`).
3.  `html-pdf` converts this HTML string (with CSS styles for A4 layout) into a binary PDF buffer.
4.  The PDF is either saved to a file or piped directly to the response for download.

### 5.5 User Interface Walkthrough

#### 5.5.1 Login and Authentication
The login page provides a secure entry point for the user. It features fields for email and password, as well as a "Sign in with Google" button for OAuth integration.

<br />
<br />

**[PLACEHOLDER FOR SCREENSHOT: Login Page showing Email/Password fields and Google Sign-in button]**
*Figure 5.1: Accountill Login Screen*

<br />
<br />

#### 5.5.2 The Dashboard
Upon successful login, the user is redirected to the main dashboard. This acts as the control center, displaying key metrics:
*   Total amount received.
*   Total annual expected income.
*   Number of unpaid and pending invoices.
*   A graphical chart (pie chart) illustrating the payment history status.

<br />
<br />

**[PLACEHOLDER FOR SCREENSHOT: Dashboard Main View showing metric cards (Total, Paid, Unpaid) and the pie chart]**
*Figure 5.2: User Dashboard displaying financial overview*

<br />
<br />

#### 5.5.3 Creating a New Invoice
The core feature of the application is the invoice creation form. This dynamic form allows users to:
1.  Select existing clients or add new ones on the fly.
2.  Set invoice dates and due dates.
3.  Add line items with descriptions, quantities, and prices. The subtotal updates in real-time.
4.  Add notes and footer messages.

<br />
<br />

**[PLACEHOLDER FOR SCREENSHOT: Create Invoice Form showing fields for client details, item table, and totals]**
*Figure 5.3: Invoice Generation Interface*

<br />
<br />

#### 5.5.4 Invoice Details & Actions
Once an invoice is created, users can view a preview of it. From this screen, they can perform actions such as editing, deleting, downloading the PDF, or sending it via email.

<br />
<br />

**[PLACEHOLDER FOR SCREENSHOT: Invoice Preview Screen showing the formatted invoice and action buttons (Download, Send Email)]**
*Figure 5.4: Final Invoice Preview*

<br />
<br />

#### 5.5.5 Client Management
Users can maintain a database of their clients. The client list shows all added businesses, and clicking on a client allows for editing their contact information.

<br />
<br />

**[PLACEHOLDER FOR SCREENSHOT: Client List showing a table of client names, emails, and phone numbers]**
*Figure 5.5: Client Management Screen*

<br />
<br />
---

<div style="page-break-after: always;"></div>

## CHAPTER 6: TESTING

### 6.1 Testing Strategy
A combination of Black Box testing and White Box testing was used.
*   **Unit Testing:** Individual functions (e.g., total calculation) were tested in isolation.
*   **Integration Testing:** Postman was used to test API endpoints (`POST /signin`, `GET /invoices`) to ensure the database and server communicated correctly.

### 6.2 Test Cases


| Test Case ID | Description | Input Data | Expected Result | Actual Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | User Registration | Valid Name, Email, Password | User created, Token received | **PASS** |
| **TC-02** | Login Failure | Wrong Password | Error 400 "Invalid credentials" | **PASS** |
| **TC-03** | Create Client | Name="Acme Corp", Email="test@acme" | Client added to DB | **PASS** |
| **TC-04** | Create Invoice | Select Client, Add Item: "Web Des", $500 | Invoice created, Subtotal=$500 | **PASS** |
| **TC-05** | Unauthorized Access | Access `/invoices` without Token | Error 401 "Unauthenticated" | **PASS** |
| **TC-06** | PDF Download | Click "Download PDF" | Browser downloads file.pdf | **PASS** |

### 6.3 System Testing Results
The application was deployed to a test environment. It successfully handled concurrent users. The responsiveness was verified on Chrome, Firefox, and Safari APIs. Issues with CSS consistency on mobile devices were identified and fixed during this phase.

---

<div style="page-break-after: always;"></div>

## CHAPTER 7: CONCLUSION

### 7.1 Conclusion
The **Accountill** project successfully demonstrates the power and flexibility of the MERN stack. We have built a fully functional invoicing application that addresses real-world business problems. The system allows users to securely manage their clients, generate professional financial documents, and track their earnings. By automating calculations and document generation, it saves significant time for freelancers.

The project met all its primary objectives:
*   Secure Authentication is operational.
*   CRUD operations for Invoices and Clients are smooth.
*   PDF and Email integration works reliably.
*   The Dashboard provides accurate financial summaries.

### 7.2 Challenges Faced
*   **State Management:** Handling complex state updates for nested invoice items was challenging. Redux proved essential but required significant boilerplate code.
*   **PDF Formatting:** Designing HTML that converts perfectly to A4 PDF required trial and error with CSS print styles.
*   **Security:** Implementing Google OAuth alongside local authentication required careful handling of JWT tokens.

### 7.3 Future Enhancements
To make Accountill a commercial-grade product, the following features are planned:
1.  **Payment Gateway Integration:** Adding Stripe/PayPal to allow clients to pay invoices directly via a link.
2.  **Recurring Invoices:** Automating invoices for subscription-based services.
3.  **Multi-User Teams:** Allowing multiple users to manage a single company account.
4.  **Expense Tracking:** Adding a module to track business expenses, not just income.

---

<div style="page-break-after: always;"></div>

## REFERENCES

1.  **React Documentation.** (2025). *Getting Started with React*. Retrieved from https://reactjs.org/docs/
2.  **Mozilla Developer Network (MDN).** (2025). *Express/Node Introduction*. Retrieved from https://developer.mozilla.org/
3.  **MongoDB.** (2024). *The MongoDB 4.4 Manual*. Retrieved from https://docs.mongodb.com/
4.  **Banks, A. & Porcello, E.** (2020). *Learning React: Modern Patterns for Developing React Apps*. O'Reilly Media.
5.  **Material-UI.** (n.d.). *React Components for Faster and Easier Web Development*. Retrieved from https://material-ui.com/
6.  **JWT.io.** (n.d.). *Introduction to JSON Web Tokens*. Retrieved from https://jwt.io/introduction
7.  **Freeman, A.** (2020). *Pro MERN Stack: Full Stack Web App Development with Mongo, Express, React, and Node*. Apress.
