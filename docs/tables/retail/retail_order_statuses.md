# Table: Retail Order Statuses

## Purpose

Stores all available statuses for Retail Orders.

This lookup table standardizes the retail order workflow throughout the system.

---

## Primary Key

id (Integer Identity)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | Integer | Yes | Primary Key |
| name | Text | Yes | Unique status name |
| description | Text | No | Status description |
| display_order | Integer | Yes | Workflow order |
| is_active | Boolean | Yes | Default: true |
| created_at | Timestamp | Yes | Record creation date |
| updated_at | Timestamp | Yes | Last update date |

---

## Relationships

Retail Order Statuses (1)

↓

Retail Orders (Many)

---

## Constraints

- Status name must be unique.
- Display order must be unique.
- A status cannot be deleted while it is assigned to one or more retail orders.
- Inactive statuses cannot be assigned to new retail orders.

---

## Business Rules

- Every retail order must have exactly one status.
- Statuses are managed by administrators only.
- Existing statuses should be deactivated instead of permanently deleted.
- Inactive statuses are hidden from new order workflows.

---

## Indexes

- name (Unique)
- display_order (Unique)
- is_active

---

## Initial Data

| Display Order | Status |
|---------------|--------|
| 1 | Pending |
| 2 | Processing |
| 3 | Delivered |
| 4 | Completed |
| 5 | Cancelled |

---

## Notes

This is a lookup table.

Retail Orders reference this table using `status_id`.

The retail workflow is intentionally simple and independent from the wholesale workflow.

---

## Status

🟢 Approved