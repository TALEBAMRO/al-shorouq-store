# Table: Wholesale Payment Methods

## Purpose

Stores all available payment methods for Wholesale Invoices.

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

Wholesale Payment Methods (1)

↓

Wholesale Invoices (Many)

---

## Constraints

- Payment method name must be unique.
- A payment method cannot be deleted while it is assigned to one or more wholesale invoices.
- Inactive payment methods cannot be assigned to new wholesale invoices.

---

## Business Rules

- Every wholesale invoice must have exactly one payment method.
- Payment methods are managed by administrators only.
- Existing payment methods should be deactivated instead of permanently deleted.
- Inactive payment methods cannot be selected for new invoices.

---

## Indexes

- name (Unique)
- is_active

---

## Initial Data

| Name |
|------|
| Cash |

---

## Future Payment Methods

Additional payment methods can be added in future versions as business requirements evolve.

---

## Notes

This is a lookup table.

Wholesale Invoices reference this table using `payment_method_id`.

Version 2 supports only **Cash**.

The table is designed for future expansion without requiring database changes.

---

## Status

🟢 Approved