# Table: Categories

## Purpose

Stores product categories used to organize products in the store.

Categories help customers browse products and allow administrators to manage the product catalog efficiently.

---

## Primary Key

id (Integer Identity)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | Integer | Yes | Primary Key |
| name | Text | Yes | Unique category name |
| description | Text | No | Category description |
| image_url | Text | No | Category image URL |
| display_order | Integer | Yes | Default: 0 |
| is_active | Boolean | Yes | Default: true |
| created_at | Timestamp | Yes | Record creation date |
| updated_at | Timestamp | Yes | Last update date |

---

## Relationships

Categories (1)

↓

Products (Many)

---

## Constraints

- Category name must be unique.
- A category cannot be deleted while it is assigned to one or more products.
- Inactive categories cannot be assigned to new products.

---

## Business Rules

- Every product belongs to exactly one category.
- Categories are managed by administrators.
- Categories can be activated or deactivated.
- Inactive categories are hidden from customers.
- Existing categories should be deactivated instead of permanently deleted.

---

## Indexes

- name (Unique)
- display_order
- is_active

---

## Notes

This is a lookup table.

Categories are shared between the Retail Store and the Wholesale Portal.

Deactivating a category does not affect existing products or historical orders.

---

## Status

🟢 Approved