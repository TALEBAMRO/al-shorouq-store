# Database Design

## Overview

The Al-Shorouq Store database is designed as a production-ready relational database using PostgreSQL (Supabase).

The system supports two independent business workflows:

- Retail Store (B2C)
- Wholesale Portal (B2B)

Both systems share the same database while maintaining separate business processes where required.

The design focuses on:

- Scalability
- Maintainability
- Security
- Performance
- Future Expansion

---

# Database Goals

- Build a production-ready database.
- Eliminate unnecessary data duplication.
- Keep the database normalized.
- Support future business growth.
- Preserve historical business data.
- Support reporting and analytics.
- Maintain clear relationships between entities.

---

# Database Design Principles

- Follow relational database design principles.
- Every table has a single responsibility.
- Use Foreign Keys to enforce relationships.
- Use Lookup Tables whenever possible.
- Keep transactional data immutable.
- Preserve historical prices and transactions.
- Never duplicate business information.
- Prefer Soft Delete over permanent deletion when appropriate.
- Design every table for future extensibility.

---

# Primary Key Strategy

The project uses two primary key types.

## UUID

Used for all core business entities.

Tables:

- users
- employees
- customers
- customer_addresses
- products
- retail_orders
- retail_order_items
- wholesale_orders
- wholesale_order_items
- wholesale_invoices
- wholesale_invoice_items
- inventory_transactions
- audit_logs

Reasons:

- Better security
- IDs cannot be guessed
- Better integration with external systems
- Production-ready architecture
- Easier future scaling

---

## Integer Identity

Used for lookup tables.

Tables:

- roles
- categories
- units
- retail_order_statuses
- wholesale_order_statuses
- retail_payment_methods
- wholesale_payment_methods
- payment_statuses

Reasons:

- Small datasets
- Faster indexing
- Better readability
- Simpler joins

---

# Planned Tables

## Authentication

- roles
- users

Purpose

Authentication and authorization for:

- Administrators
- Employees
- Retail Customers
- Wholesale Customers

---

## Employees

- employees

Purpose

Store employee profile information.

---

## Customers

- customers
- customer_addresses

Purpose

Store customer profile information.

Supports:

- Multiple addresses
- Customer profiles
- Retail customers
- Wholesale customers

---

## Products

- categories
- units
- products

Purpose

Product catalog management.

Supports:

- Categories
- Product units
- Retail pricing
- Shared products
- Stock management
- Product visibility

---

## Retail

- retail_order_statuses
- retail_payment_methods
- retail_orders
- retail_order_items

Purpose

Retail purchasing workflow.

---

## Wholesale

- wholesale_order_statuses
- wholesale_payment_methods
- wholesale_orders
- wholesale_order_items
- wholesale_invoices
- wholesale_invoice_items

Purpose

Wholesale ordering and invoicing workflow.

---

## Inventory

- inventory_transactions

Purpose

Track every stock movement.

Examples:

- Purchase
- Sale
- Return
- Manual Adjustment

---

## System

- settings
- audit_logs

Purpose

Store system configuration and activity logs.

---

# User Roles

Current Roles

- Admin
- Employee
- Retail Customer
- Wholesale Customer

Additional roles may be added in future versions without changing the database schema.

---

# Retail Workflow

Pending

↓

Processing

↓

Delivered

↓

Completed

↓

Cancelled

---

# Wholesale Workflow

Pending

↓

Under Review

↓

Approved

↓

Invoice Created

↓

Customer Approved

↓

Processing

↓

Delivered

↓

Completed

↓

Cancelled

---

# Main Relationships

Roles

↓

Users

--------------------------------

Users

↓

Employees

--------------------------------

Users

↓

Customers

↓

Customer Addresses

--------------------------------

Categories

↓

Products

--------------------------------

Units

↓

Products

--------------------------------

Retail Order Statuses

↓

Retail Orders

↓

Retail Order Items

↓

Products

--------------------------------

Retail Payment Methods

↓

Retail Orders

--------------------------------

Wholesale Order Statuses

↓

Wholesale Orders

↓

Wholesale Order Items

--------------------------------

Wholesale Orders

↓

Wholesale Invoices

↓

Wholesale Invoice Items

↓

Products

--------------------------------

Wholesale Payment Methods

↓

Wholesale Invoices

--------------------------------
↓

Wholesale Invoices

--------------------------------

Products

↓

Inventory Transactions

--------------------------------

Users

↓

Audit Logs

---

# Database Standards

- Every table has a Primary Key.
- Every relationship uses Foreign Keys.
- Every table has a single responsibility.
- Use Lookup Tables whenever possible.
- Store creation and update timestamps.
- Preserve historical business data.
- Preserve historical order prices.
- Preserve historical invoice data.
- Never update historical transactions.
- Never duplicate business information.
- Use Soft Delete where appropriate.
- Use UUID for core business entities.
- Use Integer Identity for lookup tables.
- Use database constraints to maintain data integrity.
- Keep authentication data separate from business data.

---

# Future Tables

The following tables may be added in future versions.

- coupons
- favorites
- notifications
- product_images
- refresh_tokens
- reviews
- wishlists
- delivery_companies
- shipments
- stock_alerts
- reports

---

# ERD

The Entity Relationship Diagram (ERD) will be created after completing the detailed design of every table.

Each table must include:

- Purpose
- Primary Key
- Columns
- Data Types
- Constraints
- Foreign Keys
- Relationships
- Indexes
- Business Rules

The ERD will represent:

- Entity relationships
- Cardinality
- Foreign Keys
- Lookup tables
- Business entities

---

# Current Design Status

| Module | Status |
|---------------------------|----------------|
| Database Planning | ✅ Completed |
| Core Tables | ✅ Completed |
| Lookup Tables | 🔄 In Progress |
| Retail Module | ⏳ Pending |
| Wholesale Module | ⏳ Pending |
| Inventory Module | ⏳ Pending |
| ERD | ⏳ Pending |
| SQL Implementation | ⏳ Pending |

---

# Notes

The system consists of two independent business modules:

- Retail Store (B2C)
- Wholesale Portal (B2B)

Both modules share:

- Users
- Customers
- Categories
- Products
- Units
- Inventory

Retail customers:

- Can browse products.
- Can view retail prices.
- Can purchase directly.

Wholesale customers:

- Can browse products.
- Cannot view product prices.
- Submit quantity requests only.
- Receive pricing after administrator review.
- Receive invoices generated by administrators.

Wholesale prices are stored only in invoice items.

Historical orders, invoices, inventory transactions, and payment records must never be modified after completion.

---

# Version

Document

Database Design

Version

2.0

Status

🔄 In Progress