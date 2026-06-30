# Table: Retail Orders

## Purpose

Stores all retail customer orders.

Each order represents a completed checkout created by a retail customer.

Order items are stored separately in the Retail Order Items table.

A snapshot of the delivery address is stored to preserve historical order information.

---

## Primary Key

id (UUID)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | UUID | Yes | Primary Key |
| order_number | Text | Yes | Unique order number (Example: RET-2026-000001) |
| customer_id | UUID | Yes | FK → customers.id |
| address_id | UUID | Yes | FK → customer_addresses.id |
| recipient_name | Text | Yes | Delivery recipient name (Snapshot) |
| phone | Text | Yes | Delivery phone number (Snapshot) |
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
| status_id | Integer | Yes | FK → retail_order_statuses.id |
| payment_method_id | Integer | Yes | FK → retail_payment_methods.id |
| order_date | Timestamp | Yes | Date and time the order was placed |
| subtotal | Numeric | Yes | Total before discounts and delivery |
| delivery_fee | Numeric | Yes | Default: 0 |
| discount | Numeric | Yes | Default: 0 |
| total_amount | Numeric | Yes | Final payable amount |
| currency | Text | Yes | Default: ILS |
| notes | Text | No | Customer order notes |
| created_at | Timestamp | Yes | Record creation date |
| updated_at | Timestamp | Yes | Last update date |
| estimated_delivery_date | Timestamp | No | Estimated Delivery Date

---

## Relationships

Customers (1)

↓

Retail Orders (Many)

Customer Addresses (1)

↓

Retail Orders (Many)

Retail Order Statuses (1)

↓

Retail Orders (Many)

Retail Payment Methods (1)

↓

Retail Orders (Many)

Retail Orders (1)

↓

Retail Order Items (Many)

---

## Constraints

- Order number must be unique.
- Every order must belong to a valid customer.
- Every order must reference a valid customer address.
- Every order must have one order status.
- Every order must have one payment method.
- Subtotal must be greater than or equal to zero.
- Delivery fee must be greater than or equal to zero.
- Discount must be greater than or equal to zero.
- Total amount must be greater than or equal to zero.

---

## Business Rules

- Orders are created only after a successful checkout.
- Customers can view only their own orders.
- Order totals are calculated from Retail Order Items.
- Delivery address information is stored as a snapshot.
- Updating or deleting customer addresses does not affect historical orders.
- Completed and cancelled orders cannot be edited.
- Order numbers are generated automatically by the system.

---

## Indexes

- order_number (Unique)
- customer_id
- address_id
- status_id
- payment_method_id
- order_date
- created_at

---

## Notes

This table stores order-level information only.

Individual products are stored in the Retail Order Items table.

Historical orders must never be deleted or modified.

---

## Status

🟢 Approved