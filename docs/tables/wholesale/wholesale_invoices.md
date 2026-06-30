# Table: Wholesale Invoices

## Purpose

Stores invoices generated for wholesale orders.

Each wholesale order generates exactly one invoice after being reviewed by an administrator.

Invoice product details and pricing are stored separately in the Wholesale Invoice Items table.

---

## Primary Key

id (UUID)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | UUID | Yes | Primary Key |
| invoice_number | Text | Yes | Unique invoice number (Example: INV-2026-000001) |
| wholesale_order_id | UUID | Yes | FK → wholesale_orders.id (Unique) |
| payment_method_id | Integer | Yes | FK → wholesale_payment_methods.id |
| invoice_date | Timestamp | Yes | Date and time the invoice was created |
| due_date | Timestamp | No | Optional payment due date |
| subtotal | Numeric | Yes | Total before discounts |
| discount | Numeric | Yes | Default: 0 |
| delivery_fee | Numeric | Yes | Default: 0 |
| total_amount | Numeric | Yes | Final invoice amount |
| paid_amount | Numeric | Yes | Default: 0 |
| remaining_amount | Numeric | Yes | Remaining balance |
| currency | Text | Yes | Default: ILS |
| notes | Text | No | Administrator notes |
| created_at | Timestamp | Yes | Record creation date |
| updated_at | Timestamp | Yes | Last update date |

---

## Relationships

Wholesale Orders (1)

↓

Wholesale Invoice (1)

Wholesale Payment Methods (1)

↓

Wholesale Invoices (Many)

Wholesale Invoice (1)

↓

Wholesale Invoice Items (Many)

---

## Constraints

- Invoice number must be unique.
- Wholesale order must reference a valid wholesale order.
- Each wholesale order can have only one invoice.
- Payment method must reference a valid payment method.
- Subtotal must be greater than or equal to zero.
- Discount must be greater than or equal to zero.
- Delivery fee must be greater than or equal to zero.
- Total amount must be greater than or equal to zero.
- Paid amount must be greater than or equal to zero.
- Remaining amount must be greater than or equal to zero.

---

## Business Rules

- Every wholesale order generates exactly one invoice.
- Every wholesale invoice belongs to exactly one wholesale order.
- Invoice totals are calculated automatically from Wholesale Invoice Items.
- Administrators define product prices during invoice creation.
- Administrators can edit invoices while the related wholesale order is not Completed or Cancelled.
- Invoice totals are recalculated automatically after every modification.
- Paid amount and remaining amount are recalculated automatically after every payment.
- Historical invoice modifications are recorded in the Audit Logs.
- Invoice numbers are generated automatically by the system.

---

## Indexes

- invoice_number (Unique)
- wholesale_order_id (Unique)
- payment_method_id
- invoice_date
- created_at

---

## Notes

This table stores invoice-level information only.

Individual products, quantities and prices are stored in the Wholesale Invoice Items table.

Each wholesale order is linked to exactly one wholesale invoice.

Invoices can be edited while the related wholesale order is still active.

Completed and Cancelled wholesale orders should no longer have their invoices modified.

Invoices must never be permanently deleted.

---

## Status

🟢 Approved