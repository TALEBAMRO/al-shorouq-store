# Table: Retail Payment Methods

## Purpose

Stores all available payment methods for Retail Orders.

This lookup table allows the system to support additional payment methods in future versions without changing the database structure.

---

## Primary Key

id (Integer Identity)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | Integer | Yes | Primary Key |
| name | Text | Yes | Unique payment method name |
| description | Text | No | Payment method description |
| is_active | Boolean | Yes | Default: true |
| created_at | Timestamp | Yes | Record creation date |
| updated_at | Timestamp | Yes | Last update date |

---

## Relationships

Retail Payment Methods (1)

↓

Retail Orders (Many)

---

## Constraints

- Payment method name must be unique.
- A payment method cannot be deleted while it is assigned to one or more retail orders.
- Inactive payment methods cannot be selected during checkout.

---

## Business Rules

- Every retail order must have exactly one payment method.
- Payment methods are managed by administrators only.
- Existing payment methods should be deactivated instead of permanently deleted.
- Inactive payment methods are hidden from customers during checkout.

---

## Indexes

- name (Unique)
- is_active

---

## Initial Data

| Name |
|------|
| Cash on Delivery |

---

## Future Payment Methods

The following payment methods may be added in future versions:

- Visa
- MasterCard
- Apple Pay
- Google Pay
- PayPal

---

## Notes

This is a lookup table.

Retail Orders reference this table using `payment_method_id`.

Version 2 supports only **Cash on Delivery (COD)**.

The table is designed for future expansion without requiring database changes.

---

## Status

🟢 Approved