# Table: Inventory Transactions

## Purpose

Stores every inventory movement for products.

Each transaction records stock changes caused by business operations such as purchases, retail sales, wholesale sales, manual adjustments, and returns.

This table provides a complete inventory history for auditing, reporting, and inventory tracking.

---

## Primary Key

id (UUID)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | UUID | Yes | Primary Key |
| product_id | UUID | Yes | FK → products.id |
| transaction_type | Text | Yes | PURCHASE, RETAIL_SALE, WHOLESALE_SALE, ADJUSTMENT, RETURN |
| reference_id | UUID | No | Related Order, Invoice or Manual Adjustment ID |
| quantity | Numeric | Yes | Quantity added or removed |
| stock_before | Numeric | Yes | Stock before transaction |
| stock_after | Numeric | Yes | Stock after transaction |
| notes | Text | No | Transaction notes |
| created_by | UUID | Yes | FK → users.id |
| created_at | Timestamp | Yes | Transaction date |

---

## Relationships

Products (1)

↓

Inventory Transactions (Many)

Users (1)

↓

Inventory Transactions (Many)

---

## Constraints

- Product must reference a valid product.
- Quantity must be greater than zero.
- Stock after the transaction cannot be negative.
- Created by must reference a valid user.

---

## Business Rules

- Every inventory movement must create exactly one inventory transaction.
- Inventory transactions cannot be edited.
- Inventory transactions cannot be deleted.
- Stock levels are updated automatically after every transaction.
- Every transaction stores the stock quantity before and after the movement.
- Manual stock adjustments require administrator permission.

---

## Transaction Types

| Value | Description |
|--------|-------------|
| PURCHASE | Stock received from supplier |
| RETAIL_SALE | Product sold through Retail |
| WHOLESALE_SALE | Product sold through Wholesale |
| ADJUSTMENT | Manual stock adjustment |
| RETURN | Returned products added back to stock |

---

## Indexes

- product_id
- transaction_type
- created_by
- created_at

---

## Notes

This table stores inventory history only.

It should never be used to calculate the current stock directly.

The current stock quantity is stored in the Products table.

Historical inventory transactions must never be modified or deleted.

---

## Status

🟢 Approved