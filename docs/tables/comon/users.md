## Purpose

Stores authentication and authorization information for all system users.

This table is responsible only for login, authentication, account status, and authorization.

Business profile information is stored in separate tables such as Employees and Customers.

---

## Primary Key

id (UUID)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | UUID | Yes | Primary Key |
| username | Text | Yes | Unique |
| email | Text | Yes | Unique |
| phone | Text | Yes | Unique |
| password_hash | Text | Yes | Encrypted using bcrypt |
| role_id | Integer | Yes | FK → roles.id |
| is_active | Boolean | Yes | Default: true |
| email_verified_at | Timestamp | No | Email verification date |
| phone_verified_at | Timestamp | No | Phone verification date |
| last_login_at | Timestamp | No | Last successful login |
| created_at | Timestamp | Yes | Record creation date |
| updated_at | Timestamp | Yes | Last update date |

---

## Relationships

Roles (1)

↓

Users (Many)

Users (1)

↓

Employees (0..1)

Users (1)

↓

Customers (0..1)

---

## Constraints

- Username must be unique.
- Email must be unique.
- Phone number must be unique.
- Password must always be stored as a hash.
- Every user must have exactly one role.
- User cannot exist without a valid role.

---

## Business Rules

- Authentication is handled only through this table.
- Users can log in using:
  - Username
  - Email
  - Phone Number
- Plain-text passwords are never stored.
- Passwords must be hashed using bcrypt.
- Every user account belongs to either:
  - Employee
  - Customer
- A user cannot be both an Employee and a Customer at the same time.
- Deactivating a user account prevents login without deleting related business data.
- Email verification is optional and recorded using `email_verified_at`.
- Phone verification is optional and recorded using `phone_verified_at`.

---

## Indexes

- username (Unique)
- email (Unique)
- phone (Unique)
- role_id
- is_active

---

## Notes

This table stores authentication and authorization data only.

Do not store:

- Customer profile
- Employee profile
- Addresses
- Orders
- Invoices
- Business information

Those belong to their respective tables.

---

## Status

🟢 Approved