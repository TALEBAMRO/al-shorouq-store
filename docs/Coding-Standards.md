# Coding Standards

## Overview

This document defines the coding standards and development guidelines used throughout the Al-Shorouq Store project.

The goal is to keep the project clean, maintainable, scalable, and production-ready.

---

# General Principles

* Write clean and readable code.
* Keep code simple and maintainable.
* Follow the Single Responsibility Principle (SRP).
* Avoid duplicated code (DRY).
* Follow consistent naming conventions.
* Write reusable code whenever possible.
* Prefer composition over duplication.
* Keep business logic separated from UI.
* Always think about future scalability.

---

# Project Structure

The project follows a layered architecture.

Frontend

→ Components

→ Pages

→ Services

→ Hooks

→ Context

→ Utilities

---

Backend

→ Routes

→ Controllers

→ Services

→ Middleware

→ Database

---

# Naming Conventions

## Variables

Use camelCase.

Examples:

```javascript
customerName
productPrice
orderStatus
invoiceNumber
```

---

## Functions

Use verbs.

Examples:

```javascript
createProduct()
updateOrder()
deleteCustomer()
calculateTotal()
generateInvoice()
```

---

## React Components

Use PascalCase.

Examples:

```text
ProductCard.jsx
ProductTable.jsx
OrderDetails.jsx
WholesaleDashboard.jsx
```

---

## Files

React Components

PascalCase

```text
ProductCard.jsx
OrderTable.jsx
```

Services

camelCase

```text
productService.js
orderService.js
invoiceService.js
```

Utilities

camelCase

```text
formatCurrency.js
generateInvoice.js
```

---

# Frontend Standards

* Use Functional Components only.
* Use React Hooks.
* Keep components focused on a single responsibility.
* Create reusable UI components.
* Separate UI from business logic.
* Use Axios Services for API requests.
* Keep JSX clean and readable.
* Avoid deeply nested components.
* Use React Router for navigation.
* Store reusable logic inside custom hooks when appropriate.
* Keep state as local as possible.
* Avoid unnecessary re-renders.

---

# Backend Standards

The backend follows this flow:

Route

↓

Controller

↓

Service

↓

Database

Rules:

* Controllers handle HTTP requests only.
* Services contain business logic.
* Validation before database operations.
* Always use async/await.
* Wrap controller logic in try/catch.
* Return consistent API responses.
* Never expose internal errors.
* Keep controllers lightweight.
* Reuse service methods whenever possible.

---

# API Standards

Follow RESTful API principles.

Use proper HTTP methods.

GET

POST

PUT

PATCH

DELETE

Response format:

Success

```json
{
    "success": true,
    "message": "Operation completed successfully.",
    "data": {}
}
```

Error

```json
{
    "success": false,
    "message": "Validation failed.",
    "errors": []
}
```

Always return appropriate HTTP status codes.

Examples:

* 200 OK
* 201 Created
* 400 Bad Request
* 401 Unauthorized
* 403 Forbidden
* 404 Not Found
* 409 Conflict
* 500 Internal Server Error

---

# Database Standards

* Use UUID for core business tables.
* Use Integer Identity for lookup tables.
* Always use Primary Keys.
* Always use Foreign Keys.
* Keep the database normalized.
* Never duplicate relational data.
* Store historical transactional data.
* Use Soft Delete where appropriate.
* Every table should contain:

```
created_at
updated_at
```

Business entities may also include:

```
deleted_at
```

---

# Authentication Standards

* JWT Authentication.
* Refresh Tokens.
* Password Hashing using bcrypt.
* Role-Based Authorization.
* Secure HTTP-only cookies when applicable.
* Never store plain-text passwords.

---

# Security Standards

* Validate all incoming requests.
* Sanitize user input.
* Prevent SQL Injection.
* Prevent XSS attacks.
* Prevent CSRF where applicable.
* Never trust client-side validation.
* Protect sensitive routes.
* Log important system actions.

---

# Error Handling

* Handle every expected error.
* Return user-friendly error messages.
* Log unexpected errors.
* Never expose stack traces in production.

---

# Logging

Important actions should be logged.

Examples:

* Login
* Logout
* Product Creation
* Product Update
* Product Deletion
* Order Approval
* Invoice Generation
* User Management

---

# Git Workflow

Development should follow feature branches.

Examples:

```
feature/authentication

feature/products

feature/wholesale

feature/dashboard
```

Commit message examples:

```
feat: add wholesale order system

feat: implement JWT authentication

fix: cart quantity bug

fix: invoice calculation issue

refactor: improve authentication service

refactor: optimize product queries

docs: update roadmap

docs: improve API documentation
```

---

# Code Quality

Before every commit:

* No console.log left in production code.
* Remove unused imports.
* Remove dead code.
* Run linting.
* Test affected functionality.
* Keep files organized.

---

# Documentation

Every major feature should include:

* Documentation
* API updates
* Database updates
* Changelog updates

---

# Project Goal

Build a scalable, maintainable, secure, and production-ready e-commerce platform following modern software engineering best practices.

---

# Version

Coding Standards

Version: 2.0

Status: Active
