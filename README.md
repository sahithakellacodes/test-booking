# FindMyStay

#### Description
FindMyStay is a travel website that helps travellers find and book places to stay. 

#### Features
* Website feature secure authentication and authorization using HTTP Cookies and JWT tokens.
* Users can search, filter, and sort hotels as per their requirement. Search results are paginated to navigate through large search results.
* Property owners can create, edit and delete their properties.
* Travellers can make payments using Stripe.

##### Test User Credentials
email: testuser@findmystay.com \
password: 12345678

## Local Setup
Build command: cd client && npm install && npm run build && cd .. && cd server && npm install \
Run Command: cd server && npm run start

### Environment variables for the client
VITE_API_BASE_URL=http://localhost:8080 \
VITE_STRIPE_PUBLISHABLE_KEY= \
VITE_GOOGLE_MAP_API_KEY=

### Environment variables for the server

#### MongoDB URI
MONGODB_URI=

#### JWT secret key
JWT_SECRET_KEY=

#### Server port
PORT=

#### Node environment
NODE_ENV=development

#### Client URL
CLIENT_URL=http://localhost:5173

#### Cloudinary variables
CLOUDINARY_CLOUD_NAME= \
CLOUDINARY_API_KEY= \
CLOUDINARY_API_SECRET=

#### Stripe
STRIPE_SECRET_KEY=