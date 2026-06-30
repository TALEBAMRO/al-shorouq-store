# ERD Planning

---

# Table: Roles

## Purpose

Stores all system roles used for authorization.

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
| created_at | Timestamp | Yes | |
| updated_at | Timestamp | Yes | |

---

## Relationships

roles (1)

↓

users (Many)

---

## Constraints

- Role name must be unique.
- Role cannot be deleted if assigned to users.

---

## Business Rules

- Every user must have one role.
- Roles determine system permissions.

---

## Status

✅ Approved