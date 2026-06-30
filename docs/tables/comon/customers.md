## Purpose

Stores profile information for all customers.

Authentication and account management are handled through the Users table.

This table contains customer-related business information only.

---

## Primary Key

id (UUID)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | UUID | Yes | Primary Key |
| user_id | UUID | Yes | FK → users.id |
| first_name | Text | Yes | Customer first name |
| last_name | Text | Yes | Customer last name |
| company_name | Text | No | Required for Wholesale customers |
| tax_number | Text | No | Tax identification number |
| commercial_registration | Text | No | Business registration number |
| preferred_language | Text | No | Default: Arabic |
| profile_image | Text | No | Profile image URL |
| notes | Text | No | Internal notes for administrators |
| created_at | Timestamp | Yes | Record creation date |
| updated_at | Timestamp | Yes | Last update date |

---

## Relationships

Users (1)

↓

Customers (0..1)

Customers (1)

↓

Customer Addresses (Many)

Customers (1)

↓

Retail Orders (Many)

Customers (1)

↓

Wholesale Orders (Many)

---

## Constraints

- user_id must be unique.
- Company name is required only for Wholesale customers.
- Tax number and commercial registration are optional.

---

## Business Rules

- Every customer has exactly one user account.
- Every user account belongs to only one customer.
- Customers may have multiple delivery addresses.
- Authentication information is never stored in this table.
- Updating customer information does not affect authentication data.
- Customer type is determined by the user's role.
- Wholesale customers may optionally store company information.

---

## Indexes

- user_id (Unique)
- company_name

---

## Notes

This table stores customer profile information only.

Do not store:

- Username
- Email
- Phone number
- Password
- User role
- Authentication data

Those fields belong to the Users table.

Customer type is determined by the associated user's role (`users.role_id`).

---

## Status

🟢 Approved