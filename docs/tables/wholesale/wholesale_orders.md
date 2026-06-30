# Table: Wholesale Orders

## Purpose

Stores wholesale customer orders before pricing.

Wholesale customers submit product quantities only.

Pricing is added later by administrators during invoice creation.

---

## Primary Key

id (UUID)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | UUID | Yes | Primary Key |
| order_number | Text | Yes | Unique order number (Example: WHO-2026-000001) |
| customer_id | UUID | Yes | FK → customers.id |
| address_id | UUID | Yes | FK → customer_addresses.id |
| recipient_name | Text | Yes | Delivery recipient (Snapshot) |
| phone | Text | Yes | Delivery phone (Snapshot) |
| country | Text | Yes | Delivery country (Snapshot) |
| city | Text | Yes | Delivery city (Snapshot) |
| area | Text | Yes | Delivery area (Snapshot) |
| street | Text | Yes | Delivery street (Snapshot) |
| building | Text | No | Delivery building (Snapshot) |
| floor | Text | No | Delivery floor (Snapshot) |
| apartment | Text | No | Delivery apartment (Snapshot) |
| postal_code | Text | No | Delivery postal code (Snapshot) |
| landmark | Text | No | Delivery landmark (Snapshot) |
| delivery_notes | Text | No | Delivery notes (Snapshot) |
| status_id | Integer | Yes | FK → wholesale_order_statuses.id |
| order_date | Timestamp | Yes | Date and time the order was placed |
| estimated_delivery_date | Timestamp | No | Estimated delivery date |
| notes | Text | No | Customer notes |
| created_at | Timestamp | Yes | Record creation date |
| updated_at | Timestamp | Yes | Last update date |

---

## Relationships

Customers (1)

↓

Wholesale Orders (Many)

Customer Addresses (1)

↓

Wholesale Orders (Many)

Wholesale Order Statuses (1)

↓

Wholesale Orders (Many)

Wholesale Orders (1)

↓

Wholesale Order Items (Many)

Wholesale Orders (1)

↓

Wholesale Invoice (1)

---

## Constraints

- Order number must be unique.
- Every order must belong to a valid customer.
- Every order must reference a valid customer address.
- Every order must have one order status.

---

## Business Rules

- Wholesale orders do not store product prices.
- Customers submit product quantities only.
- Pricing is handled during invoice creation.
- Each wholesale order can generate only one invoice.
- Delivery address information is stored as a snapshot.
- Updating customer addresses does not affect historical orders.
- Order numbers are generated automatically by the system.
- Completed and cancelled orders cannot be edited.

---

## Indexes

- order_number (Unique)
- customer_id
- address_id
- status_id
- order_date
- created_at

---

## Notes

This table stores order-level information only.

Products are stored in the Wholesale Order Items table.

Pricing information is stored only in Wholesale Invoices and Wholesale Invoice Items.

Each wholesale order is linked to exactly one wholesale invoice.

Historical orders must never be deleted or modified.

---

## Status

🟢 Approved