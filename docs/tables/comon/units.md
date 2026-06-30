## Purpose

Stores measurement units used by products.

Each product must be assigned one measurement unit.

This table ensures consistency across the system and prevents duplicate unit names.

---

## Primary Key

id (Integer Identity)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | Integer | Yes | Primary Key |
| name | Text | Yes | Unique |
| symbol | Text | Yes | Unique |
| is_active | Boolean | Yes | Default: true |
| created_at | Timestamp | Yes | Record creation date |
| updated_at | Timestamp | Yes | Last update date |

---

## Relationships

Units (1)

↓

Products (Many)

---

## Constraints

- Unit name must be unique.
- Unit symbol must be unique.
- A unit cannot be deleted if it is assigned to one or more products.

---

## Business Rules

- Every product must have exactly one measurement unit.
- Units are managed by administrators.
- Inactive units cannot be assigned to new products.
- Existing units should be deactivated instead of deleted.

---

## Indexes

- name (Unique)
- symbol (Unique)
- is_active

---

## Initial Data

| Name | Symbol |
|------|--------|
| Kilogram | kg |
| Gram | g |
| Piece | pc |
| Box | box |
| Pack | pack |
| Bottle | bottle |
| Bundle | bundle |

---

## Notes

This is a lookup table.

Products reference units using `unit_id` instead of storing unit names directly.

---

## Status

🟢 Approved