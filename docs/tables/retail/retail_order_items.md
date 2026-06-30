# Table: Retail Order Items

## Purpose

Stores all products included in a retail order.

Each record represents one product purchased within a retail order.

Product information is stored as a snapshot to preserve historical order data.

---

## Primary Key

id (UUID)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | UUID | Yes | Primary Key |
| retail_order_id | UUID | Yes | FK → retail_orders.id |
| product_id | UUID | Yes | FK → products.id |
| product_name | Text | Yes | Product name (Snapshot) |
| unit_symbol | Text | Yes | Product unit symbol (Snapshot) |
| quantity | Numeric | Yes | Purchased quantity |
| unit_price | Numeric | Yes | Retail price at purchase time |
| line_total | Numeric | Yes | Quantity × Unit Price |
| created_at | Timestamp | Yes | Record creation date |
| updated_at | Timestamp | Yes | Last update date |

---

## Relationships

Retail Orders (1)

↓

Retail Order Items (Many)

Products (1)

↓

Retail Order Items (Many)

---

## Constraints

- Every order item must belong to a valid retail order.
- Every order item must reference a valid product.
- Quantity must be greater than zero.
- Unit price must be greater than or equal to zero.
- Line total must be greater than or equal to zero.

---

## Business Rules

- Every retail order must contain at least one order item.
- Product information is stored as a snapshot.
- Product prices remain unchanged after the order is created.
- Unit symbols remain unchanged after the order is created.
- Line total is calculated automatically as:
  Quantity × Unit Price.
- Updating product information does not affect historical orders.

---

## Indexes

- retail_order_id
- product_id

---

## Notes

This table stores product-level information only.

Each row represents one product included in a retail order.

Historical order items must never be modified after the order is completed.

---

## Status

🟢 Approved