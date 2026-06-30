## Authentication

### POST /api/auth/register
Register a new customer.

### POST /api/auth/login
Login using username or email.

### POST /api/auth/logout
Logout current user.

### GET /api/auth/profile
Get logged in user profile.

### PUT /api/auth/profile
Update profile.

---

# Categories

### GET /api/categories

### POST /api/categories

### PUT /api/categories/:id

### DELETE /api/categories/:id

---

# Products

### GET /api/products

### GET /api/products/:id

### POST /api/products

### PUT /api/products/:id

### DELETE /api/products/:id

---

# Retail

### GET /api/retail/orders

### GET /api/retail/orders/:id

### POST /api/retail/orders

### PUT /api/retail/orders/:id

---

# Wholesale

### GET /api/wholesale/orders

### GET /api/wholesale/orders/:id

### POST /api/wholesale/orders

### PUT /api/wholesale/orders/:id

### POST /api/wholesale/orders/:id/review

### POST /api/wholesale/orders/:id/approve

---

# Invoices

### GET /api/invoices

### GET /api/invoices/:id

### POST /api/invoices

### PUT /api/invoices/:id

### DELETE /api/invoices/:id

---

# Customers

### GET /api/customers

### POST /api/customers

### PUT /api/customers/:id

### DELETE /api/customers/:id

---

# Dashboard

### GET /api/dashboard/statistics

### GET /api/dashboard/reports

---

# Backup

### POST /api/backup/create

### GET /api/backup/download

### POST /api/backup/restore