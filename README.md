# Designer Buddy

Transform your living spaces with AI-powered interior design. Upload a photo of any room and watch as artificial intelligence reimagines it in your chosen style.

## What is Designer Buddy?

Designer Buddy is an AI-powered interior design application that helps you visualize different design styles for your rooms. Simply upload a photo, select your room type and preferred theme, and let AI generate a professionally redesigned version of your space.

Perfect for homeowners planning renovations, interior designers exploring concepts, or anyone curious about how their space could look with a different aesthetic.

## Features

- **AI-Powered Design Generation**: Uses Google Gemini AI to transform room images
- **Multiple Room Types**: Living rooms, bedrooms, kitchens, bathrooms, dining rooms, offices, and outdoor spaces
- **9 Design Themes**: Modern, Summer, Professional, Tropical, Coastal, Vintage, Industrial, Neoclassic, and Tribal
- **Credit System**: 30 free credits for new users, each design generation uses 1 credit
- **Instant Downloads**: Download your redesigned images immediately
- **Secure Authentication**: Sign in with Google OAuth
- **Real-time Progress**: Visual progress tracking during generation

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **AI**: Google Gemini 2.5 Flash with image generation
- **Authentication**: Better Auth with Google OAuth
- **Database**: PostgreSQL with Drizzle ORM
- **UI**: shadcn/ui components with Tailwind CSS
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or hosted)
- Google Cloud account for OAuth
- Google AI Studio API key (free at <https://aistudio.google.com>)

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd designer-buddy
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Set up environment variables:

Create a `.env` file in the root directory with the following:

```env
# Database
POSTGRES_URL="postgresql://username:password@localhost:5432/designer_buddy"

# Authentication
BETTER_AUTH_SECRET="your-random-32-character-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Google Gemini AI
GEMINI_API_KEY="your-gemini-api-key"
GEMINI_MODEL="gemini-2.5-flash-image"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

4. Set up the database:

```bash
npm run db:generate
npm run db:migrate
```

5. Start the development server:

```bash
npm run dev
```

Visit <http://localhost:3000> to see the application.

## Configuration Guide

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - Your production URL + `/api/auth/callback/google`
5. Copy the Client ID and Client Secret to your `.env` file

### Google Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com)
2. Sign in with your Google account
3. Click "Get API Key"
4. Create a new API key or use an existing one
5. Copy the API key to your `.env` file as `GEMINI_API_KEY`

### Database Setup

**Option 1: Local PostgreSQL**

- Install PostgreSQL on your machine
- Create a database named `designer_buddy`
- Update `POSTGRES_URL` in `.env` with your local credentials

**Option 2: Hosted PostgreSQL (Vercel, Supabase, etc.)**

- Create a PostgreSQL database on your preferred platform
- Copy the connection string to `POSTGRES_URL` in `.env`

## Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript type checking
npm run db:generate  # Generate database migrations
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Drizzle Studio (database GUI)
```

## How It Works

1. **Sign In**: Users authenticate with their Google account
2. **Get Credits**: New users receive 30 free credits automatically
3. **Upload Image**: Drag and drop or select a room photo
4. **Choose Options**: Select room type (bedroom, kitchen, etc.) and design theme (modern, vintage, etc.)
5. **Generate**: Click the generate button to create an AI-redesigned version
6. **Download**: Save the redesigned image to your device

## Credit System

- New users start with 30 free credits
- Each design generation costs 1 credit
- Credits are tracked per user in the database
- Users can view their remaining credits on the dashboard

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/          # Better Auth endpoints
│   │   └── design/        # Design generation API
│   ├── dashboard/         # User dashboard
│   ├── design/           # Design generation page
│   └── page.tsx          # Landing page
├── components/
│   ├── auth/             # Authentication components
│   ├── design/           # Design-specific components
│   └── ui/               # shadcn/ui components
├── contexts/
│   └── credits-context.tsx  # Credits management
└── lib/
    ├── auth.ts           # Authentication config
    ├── db.ts             # Database connection
    └── schema.ts         # Database schema
```

## Limitations

- Generated images are not persisted - users must download them
- No payment integration yet (credit purchases not available)
- Requires active internet connection for AI generation
- Image generation takes 10-30 seconds depending on complexity

## Troubleshooting

### "Server configuration error: Missing API key"

- Ensure `GEMINI_API_KEY` is set in your `.env` file
- Restart the development server after adding the key

### "Insufficient credits"

- Check the dashboard to verify your credit balance
- Credits are automatically assigned on first sign-in

### Database connection errors

- Verify `POSTGRES_URL` is correct in `.env`
- Ensure PostgreSQL is running
- Run `npm run db:migrate` to ensure tables exist

### Google OAuth errors

- Verify redirect URIs match in Google Cloud Console
- Ensure `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Check that `NEXT_PUBLIC_APP_URL` matches your current URL

## Future Enhancements

- Payment integration for credit purchases
- Save and manage design history
- Compare before/after images side by side
- Share designs on social media
- More room types and design themes
- Batch processing for multiple rooms

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

MIT License - feel free to use this project for personal or commercial purposes.
