## Purpose

Stores delivery addresses for customers.

Each customer can save multiple delivery addresses and select one during checkout.

This table stores delivery address information only.

---

## Primary Key

id (UUID)

---

## Columns

| Column | Type | Required | Notes |
|----------|----------|----------|----------|
| id | UUID | Yes | Primary Key |
| customer_id | UUID | Yes | FK → customers.id |
| address_label | Text | Yes | Example: Home, Work |
| recipient_name | Text | Yes | Name of the person receiving the order |
| phone | Text | Yes | Delivery contact phone number |
| country | Text | Yes | Default: Palestine |
| city | Text | Yes | City |
| area | Text | Yes | Area / District |
| street | Text | Yes | Street name |
| building | Text | No | Building name or number |
| floor | Text | No | Floor number |
| apartment | Text | No | Apartment number |
| postal_code | Text | No | Postal code |
| landmark | Text | No | Nearby landmark |
| is_default | Boolean | Yes | Default: false |
| is_active | Boolean | Yes | Default: true |
| delivery_notes | Text | No | Optional delivery instructions |
| created_at | Timestamp | Yes | Record creation date |
| updated_at | Timestamp | Yes | Last update date |

---

## Relationships

Customers (1)

↓

Customer Addresses (Many)

---

## Constraints

- customer_id must reference a valid customer.
- Every address belongs to exactly one customer.
- Only one default address is allowed per customer.
- Inactive addresses cannot be selected during checkout.

---

## Business Rules

- Customers can save multiple delivery addresses.
- One address can be marked as the default address.
- If a default address already exists, selecting another address as default removes the default flag from the previous one.
- Addresses can be updated without affecting historical orders.
- Orders store a snapshot of the delivery address at the time of purchase.
- Inactive addresses are hidden from customers.

---

## Indexes

- customer_id
- city
- is_default
- is_active

---

## Notes

This table is used only for customer address management.

Do not update historical order addresses when a customer edits an address.

Each order stores its own delivery address snapshot to preserve order history.

Inactive addresses remain in the database for historical purposes.

---

## Status

🟢 Approved