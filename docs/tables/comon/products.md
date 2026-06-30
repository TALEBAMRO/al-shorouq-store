## Purpose

Stores all products available in the store.

Products are shared between the Retail Store and the Wholesale Portal.

Retail customers can view product prices.

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
| unit_id | Integer | Yes | FK → units.id |
| name | Text | Yes | Product name |
| description | Text | No | Product description |
| image_url | Text | No | Product image |
| retail_price | Numeric | Yes | Retail selling price |
| stock_quantity | Numeric | Yes | Current available stock |
| is_active | Boolean | Yes | Default: true |
| created_at | Timestamp | Yes | Record creation date |
| updated_at | Timestamp | Yes | Last update date |

---

## Relationships

Categories (1)

↓

Products (Many)

Units (1)

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
- Product must have a valid unit.
- Retail price must be greater than zero.
- Stock quantity cannot be negative.

---

## Business Rules

- Every product belongs to one category.
- Every product has one measurement unit.
- Products are shared between the Retail Store and the Wholesale Portal.
- Retail customers can view retail prices.
- Wholesale customers never see product prices.
- Wholesale prices are entered manually by the administrator during invoice creation.
- Products should be deactivated instead of permanently deleted whenever possible.
- Stock quantity supports decimal values.

---

## Indexes

- name (Unique)
- category_id
- unit_id
- is_active

---

## Notes

Products use a single image.

Wholesale prices are not stored in this table.

Stock quantity supports decimal values for products sold by weight.

---

## Status

🟢 Approved