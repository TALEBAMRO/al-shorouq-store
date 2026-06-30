# Table: Settings

## Purpose

Stores global system settings used throughout the application.

This table allows administrators to configure system behavior without modifying the application code.

---

## Primary Key

id (UUID)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | UUID | Yes | Primary Key |
| setting_key | Text | Yes | Unique setting key |
| setting_value | Text | Yes | Setting value |
| data_type | Text | Yes | STRING, NUMBER, BOOLEAN, JSON |
| description | Text | No | Description of the setting |
| updated_by | UUID | No | FK → users.id |
| created_at | Timestamp | Yes | Record creation date |
| updated_at | Timestamp | Yes | Last update date |

---

## Relationships

Users (1)

↓

Settings (Many)

---

## Constraints

- Setting key must be unique.
- Setting value cannot be empty.
- Data type must be one of:
  - STRING
  - NUMBER
  - BOOLEAN
  - JSON

---

## Business Rules

- Only administrators can modify system settings.
- Settings affect the entire application.
- Every change must be recorded in the Audit Logs.
- New settings can be added without changing the database structure.
- The system should validate the value according to its data type.

---

## Initial Settings

| Setting Key | Example Value | Data Type |
|--------------|---------------|-----------|
| store_name | Al-Shorouq Store | STRING |
| currency | ILS | STRING |
| default_country | Palestine | STRING |
| default_language | ar | STRING |
| delivery_fee | 10 | NUMBER |
| support_phone | +970XXXXXXXXX | STRING |
| support_email | info@example.com | STRING |
| enable_registration | true | BOOLEAN |

---

## Indexes

- setting_key (Unique)

---

## Notes

This table stores application configuration only.

Business data such as products, customers, orders and invoices must never be stored here.

System settings are shared across both Retail and Wholesale modules.

---

## Status

🟢 Approved