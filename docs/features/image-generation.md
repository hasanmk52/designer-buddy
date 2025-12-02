# Image Generation Feature

## Overview

Designer Buddy uses Google's Gemini AI (specifically the `gemini-2.5-flash-image` model) to generate interior design transformations. Users upload a photo of their room, select a room type and theme, and the AI generates a redesigned version.

## Implementation

### API Route: `/api/design/generate`

**Location:** `src/app/api/design/generate/route.ts`

**Method:** POST

**Authentication:** Required (Better Auth session)

### Request Flow

1. **Authentication Check**
   - Validates user session using Better Auth
   - Returns 401 if not authenticated

2. **Credit Validation**
   - Checks if user has remaining credits
   - Returns 403 if insufficient credits

3. **Image Processing**
   - Accepts FormData with:
     - `image`: Image file (File)
     - `roomType`: String (e.g., "living room", "bedroom")
     - `theme`: String (e.g., "modern", "tropical")
   - Converts image to base64 for API transmission

4. **AI Generation**
   - Initializes Google Gemini AI client
   - Uses model: `gemini-2.5-flash-image` (configurable via `GEMINI_MODEL` env var)
   - Sends structured prompt with image and parameters
   - Streams response to collect generated image

5. **Credit Deduction**
   - Deducts 1 credit from user's balance
   - Updates database record

6. **Response**
   - Returns generated image as base64 data URL
   - Can be directly displayed in `<img>` tag or downloaded

### Prompt Template

```
Transform this {roomType} into a {theme} style interior design.
Maintain the room's structure and layout while applying the new design theme.
Focus on furniture, colors, textures, and decorative elements that match the {theme} aesthetic.
```

### Configuration

**Environment Variables:**
- `GEMINI_API_KEY`: Google Gemini API key
- `GEMINI_MODEL`: Model to use (default: `gemini-2.5-flash-image`)

### Error Handling

- **401 Unauthorized**: User not authenticated
- **403 Forbidden**: Insufficient credits
- **400 Bad Request**: Missing required fields
- **500 Internal Server Error**: AI generation failed or unexpected error

## Frontend Integration

### Design Editor Page

**Location:** `src/app/design/page.tsx`

**Features:**
- Image upload with drag-and-drop
- Room type selection (dropdown)
- Theme selection (dropdown)
- Real-time credit balance display
- Loading state during generation
- Generated image preview
- Download functionality

### Components

1. **ImageUploader** (`src/components/design/image-uploader.tsx`)
   - Drag-and-drop file upload
   - File validation (5MB max, JPG/PNG/WebP)
   - Image preview

2. **CreditBadge** (`src/components/design/credit-badge.tsx`)
   - Displays remaining credits
   - Warning indicator when credits are low (≤5)

3. **GeneratedImage** (`src/components/design/generated-image.tsx`)
   - Displays generated image
   - Download button
   - Reset/new design button

## Room Types

- Living Room
- Bedroom
- Kitchen
- Bathroom
- Dining Room
- Office
- Outdoor

## Design Themes

- Modern
- Summer
- Professional
- Tropical
- Coastal
- Vintage
- Industrial
- Neoclassic
- Tribal

## Usage Example

```typescript
const formData = new FormData();
formData.append("image", imageFile);
formData.append("roomType", "living room");
formData.append("theme", "modern");

const response = await fetch("/api/design/generate", {
  method: "POST",
  body: formData,
});

const data = await response.json();
// data.imageUrl contains the generated image as base64 data URL
```

## Future Improvements

- Add more room types and themes
- Allow custom prompts
- Save generation history
- Image comparison slider
- Batch processing
- Higher resolution outputs
- More detailed style customization
