# Agriculture Management API

A Node.js and Express REST API for managing farmers, farms, and crops with MongoDB and Mongoose. The project also provides farmer authentication with JWT and email OTP verification through Nodemailer.

## Features

- Farmer registration and login
- JWT token generation for authenticated requests
- Email OTP generation using Node.js `crypto`
- Email OTP delivery using Nodemailer
- OTP verification with a 10-minute expiration
- Farm creation, listing, detail lookup, update, and deletion
- Crop creation, listing, detail lookup, update, and deletion
- MongoDB references between farmers, farms, and crops

## Technology Stack

- Node.js
- Express 5
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt password hashing
- Nodemailer email delivery
- dotenv environment configuration

## Project Structure

```text
config/       MongoDB connection
controllers/  Request handlers for farmers, farms, and crops
mail/         Nodemailer email helper
middleware/   JWT authentication middleware
models/       Mongoose schemas
routes/       Express API routes
app.js        Application entry point
```

## Requirements

- Node.js 18 or newer
- MongoDB running locally or a MongoDB connection string
- SMTP credentials for sending OTP emails

## Installation

1. Open the project directory:

```bash
cd Agriculture_management
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URL=mongodb://127.0.0.1:27017/agriculture_management
JWT_SECRET=replace_with_a_long_random_secret

EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password-or-app-password
```

For Gmail, use an App Password with SMTP. Do not commit the `.env` file or SMTP credentials.

4. Start the API:

```bash
npm run dev
```

Or start it without Nodemon:

```bash
node app.js
```

The server runs at `http://localhost:5000` unless another `PORT` is configured.

## Authentication

The login API returns a JWT token. Farm APIs require the token in the request header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Farmer and crop routes currently do not require the JWT middleware in the route definitions. Use authentication for all application requests, even where it is not currently enforced.

## API Base URLs

- Farmer APIs: `http://localhost:5000/api/farmers`
- Farm APIs: `http://localhost:5000/api/farm`
- Crop APIs: `http://localhost:5000/api/crops`

## Farmer APIs

### 1. Register Farmer

**Full API name:** Register a new farmer account

```http
POST /api/farmers/register
Content-Type: application/json
```

Request body:

```json
{
  "id": 1,
  "name": "John Farmer",
  "email": "john@example.com",
  "password": "Password123",
  "role": "Farmer",
  "profileImage": "https://example.com/profile.jpg",
  "address": "Green Valley",
  "isActive": true
}
```

Required fields: `name`, `email`, and `password`. The password is hashed before it is stored.

Example:

```bash
curl -X POST http://localhost:5000/api/farmers/register ^
  -H "Content-Type: application/json" ^
  -d "{\"id\":1,\"name\":\"John Farmer\",\"email\":\"john@example.com\",\"password\":\"Password123\",\"role\":\"Farmer\"}"
```

### 2. Login Farmer

**Full API name:** Authenticate farmer and generate JWT token

```http
POST /api/farmers/login
Content-Type: application/json
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

The response contains a `token` valid for one hour.

### 3. Send OTP

**Full API name:** Generate and send a farmer email verification OTP

```http
POST /api/farmers/send-otp
Content-Type: application/json
```

Request body:

```json
{
  "email": "john@example.com"
}
```

A six-digit OTP is generated with `crypto.randomInt`, stored without hashing, and emailed through Nodemailer. The OTP expires after 10 minutes.

### 4. Verify OTP

**Full API name:** Verify the farmer email OTP

```http
POST /api/farmers/verify-otp
Content-Type: application/json
```

Request body:

```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

A successful verification removes the OTP and its expiration time from the farmer record.

### 5. Get All Farmers

**Full API name:** Retrieve all registered farmers

```http
GET /api/farmers
```

No request body is required.

## Farm APIs

All farm APIs require a valid JWT header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### 6. Create Farm

**Full API name:** Create a farm for an existing farmer

```http
POST /api/farm
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN
```

Request body:

```json
{
  "farmerId": 1,
  "farmName": "Green Valley Farm",
  "location": "Pune",
  "area": 12.5,
  "areaUnit": "acres",
  "soilType": "Loamy",
  "irrigationType": "Drip",
  "latitude": 18.5204,
  "longitude": 73.8567
}
```

Required fields: `farmerId`, `farmName`, `location`, `area`, and `areaUnit`. `farmerId` is the numeric farmer `id`, not the MongoDB `_id`.

### 7. Get All Farms

**Full API name:** Retrieve all farms with populated farmer details

```http
GET /api/farm
Authorization: Bearer YOUR_JWT_TOKEN
```

### 8. Get Farm by ID

**Full API name:** Retrieve one farm by MongoDB farm ID

```http
GET /api/farm/FARM_MONGODB_ID
Authorization: Bearer YOUR_JWT_TOKEN
```

### 9. Update Farm

**Full API name:** Update an existing farm by MongoDB farm ID

```http
PUT /api/farm/FARM_MONGODB_ID
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN
```

Request body:

```json
{
  "farmName": "Updated Green Valley Farm",
  "location": "Nashik",
  "area": 15,
  "areaUnit": "acres",
  "soilType": "Black soil",
  "irrigationType": "Sprinkler",
  "latitude": 20.011,
  "longitude": 73.79
}
```

### 10. Delete Farm

**Full API name:** Delete a farm by MongoDB farm ID

```http
DELETE /api/farm/FARM_MONGODB_ID
Authorization: Bearer YOUR_JWT_TOKEN
```

## Crop APIs

### 11. Create Crop

**Full API name:** Create a crop linked to a farmer and farm

```http
POST /api/crops
Content-Type: application/json
```

Request body:

```json
{
  "farmerId": "FARMER_MONGODB_ID",
  "farmId": "FARM_MONGODB_ID",
  "cropName": "Tomato",
  "cropType": "Vegetable",
  "variety": "Roma",
  "sowingDate": "2026-09-18",
  "expectedHarvestDate": "2026-12-18",
  "area": 2.5,
  "status": "Planned",
  "expectedProduction": 500,
  "notes": "Use drip irrigation"
}
```

Required fields: `farmerId`, `farmId`, `cropName`, `cropType`, `sowingDate`, `expectedHarvestDate`, `area`, and `status`.

Allowed `cropType` values:

- `Cereal`
- `Legume`
- `Vegetable`
- `Fruit`
- `Cash Crop`

Allowed `status` values:

- `Planned`
- `Sown`
- `Growing`
- `Harvested`
- `Failed`

For crops, `farmerId` and `farmId` are MongoDB ObjectId values.

### 12. Get All Crops

**Full API name:** Retrieve all crops with populated farmer and farm details

```http
GET /api/crops
```

### 13. Get Crop by ID

**Full API name:** Retrieve one crop by MongoDB crop ID

```http
GET /api/crops/CROP_MONGODB_ID
```

### 14. Update Crop

**Full API name:** Update an existing crop by MongoDB crop ID

```http
PUT /api/crops/CROP_MONGODB_ID
Content-Type: application/json
```

Request body:

```json
{
  "farmerId": "FARMER_MONGODB_ID",
  "farmId": "FARM_MONGODB_ID",
  "cropName": "Tomato",
  "cropType": "Vegetable",
  "variety": "Cherry",
  "sowingDate": "2026-09-18",
  "expectedHarvestDate": "2026-12-18",
  "actualHarvestDate": null,
  "area": 3,
  "status": "Growing",
  "expectedProduction": 650,
  "actualProduction": null,
  "notes": "Growth is on schedule"
}
```

The update uses schema validation.

### 15. Delete Crop

**Full API name:** Delete a crop by MongoDB crop ID

```http
DELETE /api/crops/CROP_MONGODB_ID
```

## Typical Testing Order

1. Start MongoDB and the Node.js server.
2. Register a farmer with `POST /api/farmers/register`.
3. Log in with `POST /api/farmers/login` and copy the returned JWT token.
4. Send an OTP with `POST /api/farmers/send-otp`.
5. Read the OTP from the configured email inbox.
6. Verify it with `POST /api/farmers/verify-otp`.
7. Create a farm with `POST /api/farm` using the numeric farmer `id` and the Bearer token.
8. Get the farm MongoDB `_id` from the response.
9. Create a crop with `POST /api/crops` using the farmer and farm MongoDB `_id` values.
10. Test list, detail, update, and delete APIs using the returned MongoDB IDs.

## Common HTTP Responses

Success response format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

Common error statuses:

- `400 Bad Request`: Missing or invalid request fields
- `401 Unauthorized`: Missing, invalid, or expired JWT token
- `404 Not Found`: Requested farmer, farm, crop, or OTP target does not exist
- `500 Internal Server Error`: Database, SMTP, or unexpected server error

## Development Checks

Check JavaScript syntax:

```bash
node --check app.js
node --check controllers/farmerController.js
node --check controllers/farmController.js
node --check controllers/cropsController.js
```

Run the development server:

```bash
npm run dev
```

## Notes

- The application connects to MongoDB using `MONGO_URL`.
- JWT signing uses `JWT_SECRET`.
- OTP emails require valid SMTP configuration.
- Passwords are hashed with bcrypt.
- OTP values are intentionally stored without hashing as requested.
- The current API does not expose a health-check endpoint.
