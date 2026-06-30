# Table: Wholesale Order Items

## Purpose

Stores all products included in a wholesale order.

Each record represents one product requested by a wholesale customer.

Pricing information is not stored in this table and is added later during invoice creation.

---

## Primary Key

id (UUID)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | UUID | Yes | Primary Key |
| wholesale_order_id | UUID | Yes | FK → wholesale_orders.id |
| product_id | UUID | Yes | FK → products.id |
| product_name | Text | Yes | Product name (Snapshot) |
| unit_symbol | Text | Yes | Product unit symbol (Snapshot) |
| quantity | Numeric | Yes | Requested quantity |
| admin_quantity | Numeric | No | Approved quantity after review |
| notes | Text | No | Item notes |
| created_at | Timestamp | Yes | Record creation date |
| updated_at | Timestamp | Yes | Last update date |

---

## Relationships

Wholesale Orders (1)

↓

Wholesale Order Items (Many)

Products (1)

↓

Wholesale Order Items (Many)

---

## Constraints

- Every order item must belong to a valid wholesale order.
- Every order item must reference a valid product.
- Requested quantity must be greater than zero.
- Approved quantity cannot be negative.

---

## Business Rules

- Wholesale orders do not contain product prices.
- Customers submit requested quantities only.
- Administrators may adjust quantities before creating the invoice.
- Product information is stored as a snapshot.
- Updating product information does not affect historical orders.
- Prices are stored only in Wholesale Invoice Items.

---

## Indexes

- wholesale_order_id
- product_id

---

## Notes

This table stores product request information only.

Pricing is handled separately in the Wholesale Invoice Items table.

Historical wholesale order items must never be deleted or modified after order completion.

---

## Status

🟢 Approved