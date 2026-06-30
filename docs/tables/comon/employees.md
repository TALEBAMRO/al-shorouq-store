## Purpose

Stores all products available in the store.

Products are shared between Retail and Wholesale systems.

Retail customers can see product prices.

Wholesale customers can browse products without seeing prices.

---

## Primary Key

id (UUID)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | UUID | Yes | Primary Key |
| category_id | Integer | Yes | FK → categories.id |
| name | Text | Yes | Product name |
| description | Text | No | Product description |
| image_url | Text | No | Product image |
| retail_price | Numeric | Yes | Retail selling price |
| stock_quantity | Numeric | Yes | Current available stock |
| unit | Text | Yes | Example: kg, piece, bottle, pack |
| is_active | Boolean | Yes | Default: true |
| created_at | Timestamp | Yes | Record creation date |
| updated_at | Timestamp | Yes | Last update date |

---

## Relationships

Categories (1)

↓

Products (Many)

Products (1)

↓

Retail Order Items (Many)

Products (1)

↓

Wholesale Order Items (Many)

Products (1)

↓

Wholesale Invoice Items (Many)

Products (1)

↓

Inventory Transactions (Many)

---

## Constraints

- Product name must be unique.
- Product must belong to a valid category.
- Retail price must be greater than zero.
- Stock quantity cannot be negative.
- Unit is required.

---

## Business Rules

- Every product belongs to one category.
- Products may appear in both Retail and Wholesale systems.
- Retail customers can view retail prices.
- Wholesale customers never see prices.
- Wholesale prices are determined by the administrator during invoice creation.
- Inactive products are hidden from customers.
- Existing products should be deactivated instead of deleted whenever possible.

---

## Indexes

- name (Unique)
- category_id
- is_active

---

## Notes

Products use a single image.

Wholesale pricing is not stored in this table.

Stock supports decimal values to allow selling products by weight.

---

## Status

🟢 Approved