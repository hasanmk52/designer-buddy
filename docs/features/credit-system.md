# Credit System

## Overview

Designer Buddy uses a credit-based system to manage AI generation usage. Each new user receives 30 free credits upon registration. Each design generation costs 1 credit.

## Database Schema

### `user_credits` Table

**Location:** `src/lib/schema.ts`

```typescript
export const userCredits = pgTable("user_credits", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  totalCredits: integer("total_credits").default(30).notNull(),
  usedCredits: integer("used_credits").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
```

**Fields:**
- `userId`: Foreign key to user table (primary key)
- `totalCredits`: Total credits allocated (default: 30)
- `usedCredits`: Number of credits consumed (default: 0)
- `createdAt`: Record creation timestamp
- `updatedAt`: Last update timestamp

## API Routes

### Get Credits: `/api/credits`

**Location:** `src/app/api/credits/route.ts`

**Method:** GET

**Authentication:** Required

**Response:**
```json
{
  "totalCredits": 30,
  "usedCredits": 5,
  "remainingCredits": 25
}
```

**Behavior:**
- Returns current credit balance for authenticated user
- Automatically creates credit record with 30 free credits on first access
- Calculates `remainingCredits` as `totalCredits - usedCredits`

### Deduct Credits

Credits are automatically deducted in the `/api/design/generate` endpoint:

```typescript
await db
  .update(userCredits)
  .set({
    usedCredits: credits[0].usedCredits + 1,
  })
  .where(eq(userCredits.userId, userId));
```

## Frontend Integration

### useCredits Hook

**Location:** `src/hooks/use-credits.ts`

Custom React hook for managing credit state:

```typescript
const { credits, loading, error, refreshCredits } = useCredits();
```

**Returns:**
- `credits`: Credit balance object or null
- `loading`: Boolean indicating fetch state
- `error`: Error message or null
- `refreshCredits`: Function to manually refresh credit balance

**Features:**
- Automatic fetch on mount
- Error handling
- Manual refresh capability

### CreditBadge Component

**Location:** `src/components/design/credit-badge.tsx`

Visual indicator of credit balance:

**Features:**
- Displays remaining credits
- Color-coded indicator:
  - Normal (secondary): >5 credits
  - Warning (destructive): ≤5 credits
- Loading skeleton during fetch

## Credit Flow

### 1. User Sign-Up
- User signs in with Google OAuth
- Better Auth creates user account
- Credit record **not** created yet (lazy initialization)

### 2. First Design Access
- User navigates to `/design` page
- `useCredits` hook calls `/api/credits`
- API checks for existing credit record
- If none exists, creates new record with 30 credits
- Returns credit balance to frontend

### 3. Design Generation
- User uploads image and selects options
- Frontend validates credit balance (>0)
- Sends request to `/api/design/generate`
- API validates credits again (server-side check)
- On successful generation:
  - Increments `usedCredits` by 1
  - Generates and returns image
- Frontend refreshes credit balance

### 4. Credit Depletion
- When `remainingCredits` reaches 0
- Generate button becomes disabled
- User sees "no credits remaining" message

## Credit Validation

### Client-Side
```typescript
disabled={
  !selectedImage ||
  !roomType ||
  !theme ||
  isGenerating ||
  (credits?.remainingCredits ?? 0) <= 0
}
```

### Server-Side
```typescript
if (credits.length === 0 || credits[0].totalCredits - credits[0].usedCredits <= 0) {
  return NextResponse.json(
    { message: "Insufficient credits" },
    { status: 403 }
  );
}
```

## Future Enhancements

### Planned Features (Not Yet Implemented)

1. **Credit Purchase System**
   - Integration with payment provider (Stripe, Polar, etc.)
   - Multiple credit packages
   - Transaction history

2. **Credit History**
   - Track individual credit usage
   - Associate with generated designs
   - Usage analytics

3. **Credit Expiration**
   - Time-based credit expiration
   - Promotional credits vs purchased credits

4. **Referral System**
   - Bonus credits for referrals
   - Referral tracking

5. **Subscription Plans**
   - Monthly credit allocations
   - Unlimited generations for premium users

## Database Migration

Credits table was added via Drizzle migration:

```bash
npm run db:generate  # Generate migration
npm run db:migrate   # Apply migration
```

**Migration File:** `drizzle/0001_mixed_banshee.sql`

## Testing Credit System

### Manual Testing

1. Sign in with Google OAuth
2. Navigate to `/design` page
3. Verify 30 credits displayed
4. Generate a design
5. Verify credits decrease to 29
6. Repeat until 0 credits
7. Verify generate button is disabled

### API Testing

```bash
# Get credits (requires authenticated session)
curl -X GET http://localhost:3000/api/credits \
  -H "Cookie: better-auth.session_token=YOUR_TOKEN"
```

## Error Handling

- **User not authenticated**: Redirects to home page
- **Credit fetch fails**: Shows error message, prevents generation
- **Insufficient credits**: Disables generate button, shows warning
- **Database error**: Returns 500, logs error to console
