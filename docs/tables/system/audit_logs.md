# Table: Audit Logs

## Purpose

Stores a complete history of important system activities performed by users.

This table is used for security, auditing, troubleshooting, and tracking business operations.

---

## Primary Key

id (UUID)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | UUID | Yes | Primary Key |
| user_id | UUID | No | FK → users.id |
| action | Text | Yes | Action performed |
| entity_type | Text | Yes | Example: Product, Retail Order, Wholesale Invoice |
| entity_id | UUID | No | Related record ID |
| old_values | JSON | No | Data before modification |
| new_values | JSON | No | Data after modification |
| ip_address | Text | No | User IP address |
| user_agent | Text | No | Browser or device information |
| created_at | Timestamp | Yes | Action date and time |

---

## Relationships

Users (1)

↓

Audit Logs (Many)

---

## Constraints

- Action cannot be empty.
- Entity type cannot be empty.
- User ID must reference a valid user when available.

---

## Business Rules

- Every important system action should be recorded.
- Audit logs cannot be edited.
- Audit logs cannot be deleted.
- Every log stores the action date and time.
- Update operations should store both old and new values.
- Create operations store only new values.
- Delete operations store only old values.

---

## Example Actions

| Action | Description |
|----------|-------------|
| LOGIN | User signed in |
| LOGOUT | User signed out |
| CREATE_PRODUCT | Product created |
| UPDATE_PRODUCT | Product updated |
| DELETE_PRODUCT | Product deleted |
| CREATE_RETAIL_ORDER | Retail order created |
| UPDATE_RETAIL_ORDER | Retail order updated |
| CREATE_WHOLESALE_ORDER | Wholesale order created |
| UPDATE_WHOLESALE_ORDER | Wholesale order updated |
| CREATE_INVOICE | Wholesale invoice created |
| UPDATE_INVOICE | Wholesale invoice modified |
| UPDATE_SETTINGS | System settings updated |
| INVENTORY_ADJUSTMENT | Manual stock adjustment |
| CREATE_USER | User account created |
| UPDATE_USER | User account updated |
| DELETE_USER | User account deleted |

---

## Indexes

- user_id
- action
- entity_type
- entity_id
- created_at

---

## Notes

This table is used for auditing and security purposes only.

Audit logs must never be modified or deleted.

The information stored here helps administrators investigate issues, review user activity, and maintain a complete system history.

---

## Status

🟢 Approved