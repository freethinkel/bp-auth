# BPAuth - Authentication System Demo

A modern authentication system built with Svelte demonstrating best practices for user login.

## Features

- User authentication with email and password
- Responsive design
- Form validation
- Error handling
- Tests

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/freethinkel/bp-auth.git
cd bp-auth

# Install dependencies
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

This will start the development server at `http://localhost:5173` (or another available port).

### Building for Production

```bash
pnpm build
```

The built application will be in the `build` directory.

### Preview Production Build

```bash
pnpm preview
```

## Usage Guide

### Demo Accounts

You can use any of these demo accounts to test the authentication system:

| Email             | Password        | Name                         |
| ----------------- | --------------- | ---------------------------- |
| user1@example.com | $trongp@ssword1 | Bernhard and Sons            |
| user2@example.com | $trongp@ssword2 | Stroman Group                |
| user3@example.com | $trongp@ssword3 | Kutch - Treutel              |
| user4@example.com | $trongp@ssword4 | Pollich, Hermann and Bradtke |
| user5@example.com | $trongp@ssword5 | Schoen Group                 |
| user6@example.com | $trongp@ssword6 | Hansen and Sons              |

### Pages

- **Home**: Overview and demo credentials
- **Login**: Email and password authentication
- **Sign Up**: Registration for new users (Unimplemented)
- **Forgot Password**: Password recovery workflow (Unimplemented)
- **App**: Protected route that requires authentication

## Technical Details

This project demonstrates:

- Client-side form validation
- Simulated API interactions
- Proper error handling
- Responsive design principles
- Accessibility considerations
