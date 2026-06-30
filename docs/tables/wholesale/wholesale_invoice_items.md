# Table: Wholesale Invoice Items

## Purpose

Stores all products included in a wholesale invoice.

Each record represents one invoiced product with its approved quantity and selling price.

Product information is stored as a snapshot to preserve historical invoice data.

---

## Primary Key

id (UUID)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | UUID | Yes | Primary Key |
| wholesale_invoice_id | UUID | Yes | FK → wholesale_invoices.id |
| product_id | UUID | Yes | FK → products.id |
| product_name | Text | Yes | Product name (Snapshot) |
| unit_symbol | Text | Yes | Product unit symbol (Snapshot) |
| quantity | Numeric | Yes | Approved quantity |
| unit_price | Numeric | Yes | Selling price per unit |
| line_total | Numeric | Yes | Quantity × Unit Price |
| notes | Text | No | Item notes |
| created_at | Timestamp | Yes | Record creation date |
| updated_at | Timestamp | Yes | Last update date |

---

## Relationships

Wholesale Invoices (1)

↓

Wholesale Invoice Items (Many)

Products (1)

↓

Wholesale Invoice Items (Many)

---

## Constraints

- Every invoice item must belong to a valid wholesale invoice.
- Every invoice item must reference a valid product.
- Quantity must be greater than zero.
- Unit price must be greater than or equal to zero.
- Line total must be greater than or equal to zero.

---

## Business Rules

- Every wholesale invoice must contain at least one invoice item.
- Product information is stored as a snapshot.
- Unit prices are entered manually by administrators.
- Line total is calculated automatically as:
  Quantity × Unit Price.
- Updating product information does not affect historical invoices.

---

## Indexes

- wholesale_invoice_id
- product_id

---

## Notes

This table stores invoice product information only.

Each row represents one product included in a wholesale invoice.

Historical invoice items should not be deleted.

---

## Status

🟢 Approved