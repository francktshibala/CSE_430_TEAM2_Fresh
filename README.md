# Handcrafted Haven - Team Project

This is our e-commerce platform with user authentication system. The project includes user registration, login, and profile management features.

**Live Demo:** https://cse-430-team-2-fresh-n1h7vwf2r.vercel.app/

## Team Members
- Daniel Adetaba Adongo
- Diane Lish
- Franck Tshibala
- Jhefersson Linares
- Adedeji Azeez

## Getting Started

### What You Need
- Node.js installed on your computer
- Git installed
- A code editor like VS Code

### Setup Steps

1. Clone the repository to your computer
   ```
   git clone https://github.com/francktshibala/CSE_430_TEAM2_Fresh.git
   cd CSE_430_TEAM2_Fresh-1
   ```

2. Install the project dependencies
   ```
   npm install
   ```

3. Create a .env file in the root directory and add these environment variables
   ```
   POSTGRES_URL="postgres://48aae41bde0c2d459b3134f92fe6d24f7d718c88725bfa68281d4f082f036684:sk_PihDdfC_TcRauXKyl6Qzz@db.prisma.io:5432/postgres?sslmode=require"
   
   PRISMA_DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19QaWhEZGZDX1RjUmF1WEt5bDZRenoiLCJhcGlfa2V5IjoiMDFLNVRHV1JCNE43OU1LOUYzRVlDMlpHU1kiLCJ0ZW5hbnRfaWQiOiI0OGFhZTQxYmRlMGMyZDQ1OWIzMTM0ZjkyZmU2ZDI0ZjdkNzE4Yzg4NzI1YmZhNjgyODFkNGYwODJmMDM2Njg0IiwiaW50ZXJuYWxfc2VjcmV0IjoiOWNhZTI3YTQtOTJlMS00ZTEyLWIzNjItOWZkYWEzNjNkZjU2In0.rmopePuf6HHQVATPa8llP8wUym92Ai4U6YrSYCMwyYE"
   
   DIRECT_DATABASE_URL="postgres://48aae41bde0c2d459b3134f92fe6d24f7d718c88725bfa68281d4f082f036684:sk_PihDdfC_TcRauXKyl6Qzz@db.prisma.io:5432/postgres?sslmode=require"
   
   JWT_SECRET="96565157b314db2a02584571a15e3c8cdc741cbb774a760d93b40753217704d1"
   ```

4. Set up the database
   ```
   npx prisma migrate dev
   npx prisma generate
   ```

5. Start the development server
   ```
   npm run dev
   ```

6. Open your browser and go to http://localhost:3000

## How to Work on This Project

### Important Rules
- Never push directly to the main branch
- Always create a new branch for your work
- Create a pull request when you're ready
- Wait for approval before merging

### Creating a New Branch
```
git checkout -b your-feature-name
```

### Making Changes
1. Make your changes
2. Test everything works
3. Commit your changes
4. Push to GitHub
5. Create a pull request

### Available Pages
- /signup - Create a new account
- /login - Sign in to your account
- /profile - View your profile (must be logged in)

## Project Structure
- src/app - Contains all the pages and API routes
- prisma - Database configuration
- public - Static files

## Current Features
- User registration with Basic, Seller, or Admin account types
- Secure login system
- User profile page
- Logout functionality
- Brown-themed design for Handcrafted Haven branding

## Task Assignments

Franck - Login and User Profile (COMPLETED)
- Login functionality
- User profile page

Daniel - Seller Authentication and Profiles
- Authenticated Seller Accounts - Sellers can login and have secure accounts
- Seller Profiles - Artists showcase craftsmanship, stories, and curated collections, about-me section

Diane - Product Browsing and Filtering
- Browse Product Catalog - Users browse through all available items
- Filter by Category - Sort products by type like jewelry, pottery, etc.
- Filter by Price Range - Find items within budget
- Filter by Other Criteria - Additional filtering options

Jhefersson - Reviews and Ratings
- Written Reviews - Users can leave detailed written reviews
- Star Ratings - Users can rate products with stars

Adedeji - Product Management
- Product Listings - Sellers list items with descriptions, pricing, and images

## Need Help?
Contact Franck Tshibala or post in our team chat.