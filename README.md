# user-profile API

A REST API where users can register, login, update their bio and upload a profile picture stored on Cloudinary

## Tech Stack
- Node.js, Express
- MongoDB, Mongoose
- JWT Authentication
- Cloudinary
- Zod

## Setup
1. Clone the repo
2. Run `npm install`
3. Create `.env` file with `PORT`, `MONGO_URI`, `JWT_SECRET`, `IMAGE_UPLOAD_API`, `SALT` , `CLOUDINARY_URL` 
4. Run `npm run dev`

## API Routes

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/signup | Register a new user |
| POST | /api/auth/login | Login user |

### User profile
| Method | Route | Description |
|--------|-------|-------------|
| GET | /user/view-profile | Get your profiles |
| PUT | /user/update-picture | Update profile picture |
| PUT | /user/update-bio | Update a bio |
