# Table: Wholesale Order Statuses

## Purpose

Stores all available statuses for Wholesale Orders.

This lookup table standardizes the wholesale order workflow from order submission to completion.

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

Wholesale Order Statuses (1)

↓

Wholesale Orders (Many)

---

## Constraints

- Status name must be unique.
- Display order must be unique.
- A status cannot be deleted while it is assigned to one or more wholesale orders.
- Inactive statuses cannot be assigned to new wholesale orders.

---

## Business Rules

- Every wholesale order must have exactly one status.
- Statuses are managed by administrators only.
- Existing statuses should be deactivated instead of permanently deleted.
- Inactive statuses are hidden from new order workflows.
- The workflow follows the business process approved by Al-Shorouq Store.

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
| 2 | Under Review |
| 3 | Approved |
| 4 | Invoice Created |
| 5 | Customer Approved |
| 6 | Processing |
| 7 | Delivered |
| 8 | Completed |
| 9 | Cancelled |

---

## Notes

This is a lookup table.

Wholesale Orders reference this table using `status_id`.

Wholesale Orders and Wholesale Invoices are separate business entities.

Changing an order status does not modify historical invoice records.

---

## Status

🟢 Approved