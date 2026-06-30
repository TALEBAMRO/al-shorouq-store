## Purpose

Stores all system roles used for authorization.

This is a lookup table responsible for defining user roles within the system.

Roles determine what users are allowed to access and perform.

---

## Primary Key

id (Integer Identity)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | Integer | Yes | Primary Key |
| name | Text | Yes | Unique |
| description | Text | No | Role description |
| created_at | Timestamp | Yes | Record creation date |
| updated_at | Timestamp | Yes | Last update date |

---

## Relationships

Roles (1)

↓

Users (Many)

---

## Constraints

- Role name must be unique.
- A role cannot be deleted while it is assigned to one or more users.

---

## Business Rules

- Every user must have exactly one role.
- One role can be assigned to many users.
- Roles determine system permissions.
- Roles are managed only by administrators.

---

## Indexes

- name (Unique)

---

## Initial Data

| Name | Description |
|------|-------------|
| Admin | Full system access |
| Employee | Store employee |
| Retail Customer | Individual customer |
| Wholesale Customer | Wholesale customer |

---

## Notes

This is a lookup table.

Additional roles may be added in future versions without changing the database structure.

Examples:

- Warehouse
- Delivery
- Accountant
- Marketing
- Manager

---

## Status

🟢 Approved