# Culinea Mobile App - Implementation Guide

## Overview

The Culinea mobile app is a React Native/Expo application that provides a personalized meal planning experience with an elegant, calm UX. The implementation follows the detailed UX specifications for a 12-screen flow including onboarding, meal planning, grocery lists, and profile management.

## Architecture

### Tech Stack
- **Framework**: React Native with Expo (SDK 54)
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand with AsyncStorage persistence
- **Animations**: React Native Reanimated
- **UI**: Custom components with Lucide React Native icons
- **Fonts**: Instrument Sans (headings) + Inter (body text)
- **API Client**: TanStack Query (React Query)

### Project Structure

```
apps/mobile/
├── src/
│   ├── app/                      # Expo Router screens
│   │   ├── index.jsx            # Entry point (splash/routing logic)
│   │   ├── onboarding/          # Onboarding flow (6 screens)
│   │   │   ├── index.jsx        # Welcome screen with splash
│   │   │   ├── household.jsx    # Household size selection
│   │   │   ├── time.jsx         # Cooking time preference
│   │   │   ├── diet.jsx         # Dietary preferences
│   │   │   ├── exclusions.jsx   # Ingredient exclusions
│   │   │   └── generating.jsx   # Loading screen
│   │   ├── (tabs)/              # Main app tabs
│   │   │   ├── plan.jsx         # Meal plan screen
│   │   │   ├── grocery.jsx      # Grocery list screen
│   │   │   └── profile.jsx      # Profile/settings screen
│   │   └── paywall.jsx          # Subscription paywall
│   ├── components/              # Reusable UI components
│   │   ├── OptionCard.jsx       # Onboarding option cards
│   │   ├── ProgressBar.jsx      # Onboarding progress indicator
│   │   ├── MealCard.jsx         # Meal display card
│   │   └── RegenerateModal.jsx  # Plan regeneration modal
│   ├── store/                   # Zustand state stores
│   │   ├── onboarding.js        # Onboarding preferences
│   │   └── plan.js              # Meal plan & grocery data
│   └── utils/
│       └── theme.js             # Color theme (light/dark mode)
├── assets/                      # Images and static assets
└── package.json
```

## User Flow

### 1. Onboarding Flow (Linear, Forward-Only)
1. **Splash Screen** (1.5s auto-advance) → Brand identity
2. **Welcome Screen** → Value proposition + "Get Started" CTA
3. **Household Size** (Step 1/4) → Select number of people
4. **Cooking Time** (Step 2/4) → Time preference selection
5. **Dietary Preferences** (Step 3/4) → Diet type (single-select)
6. **Ingredient Exclusions** (Step 4/4) → Optional exclusions (multi-select, skippable)
7. **Generating Screen** → AI loading animation (7.5s)
8. → Redirect to **Main App (Plan Tab)**

### 2. Main App (Tab-Based Navigation)
- **Tab 1: Weekly Plan** (default)
  - Organized by day (Monday-Sunday)
  - Shows breakfast, lunch, dinner for each day
  - Sparkles button → Regenerate Modal
- **Tab 2: Grocery List**
  - Categorized by grocery section (Produce, Meat, Dairy, etc.)
  - Checkboxes to mark items complete
  - Progress indicator
- **Tab 3: Profile**
  - View/edit preferences
  - Subscription management
  - Settings

### 3. Modals
- **Regenerate Modal**: Half-sheet for creating new meal plan
- **Paywall Screen**: Full-screen subscription offer (shown after first free plan)

## Key Features

### 🎨 Design Principles
- **Calm Confidence**: Generous spacing, soft colors, minimal animations
- **Progressive Disclosure**: Show only what's needed
- **One Primary Action**: Clear next step on each screen
- **Forgiving Interaction**: Skip buttons, easy regeneration
- **Immediate Value**: Plan delivered in ~27 seconds

### 🎯 UX Highlights
- Progress bars on onboarding (1/4, 2/4, 3/4, 4/4)
- Reusable `OptionCard` component for consistent selections
- Single-select (radio) and multi-select (checkbox) variants
- Gentle animations (pulse, fade) - no aggressive spinners
- Pre-selected defaults ("No restrictions" diet)
- Category icons for visual hierarchy (🥬 Produce, 🍖 Meat, etc.)

### 📱 Platform Considerations
- **Large tap targets**: Minimum 44pt, typically 48-64pt
- **Safe area insets**: Respected on all screens
- **Dark mode support**: Full theme switching
- **Native feel**: Standard iOS/Android patterns
- **Haptic feedback**: On checkbox toggles (future enhancement)

## State Management

### Onboarding Store (`store/onboarding.js`)
```javascript
{
  diet: "none",
  householdSize: 1,
  cookingTime: "standard",
  exclusions: []
}
```

### Plan Store (`store/plan.js`)
```javascript
{
  currentPlan: [
    {
      date: "Feb 3",
      dayName: "Monday",
      meals: [
        { type: "breakfast", name: "Veggie Scramble", cookTime: 15 },
        { type: "lunch", name: "Quinoa Bowl", cookTime: 20 },
        { type: "dinner", name: "Lemon Chicken", cookTime: 35 }
      ]
    },
    // ... 6 more days
  ],
  groceries: [
    { id: "1", name: "Spinach", amount: "2 bunches", category: "Produce", completed: false },
    // ...
  ],
  lastGenerated: "2026-02-03T10:30:00Z"
}
```

## API Integration (To Be Implemented)

### POST /api/generate-plan
**Request:**
```json
{
  "diet": "vegetarian",
  "householdSize": 2,
  "cookingTime": "standard",
  "exclusions": ["nuts", "garlic"]
}
```

**Response:**
```json
{
  "meals": [ /* 7 days of meals */ ],
  "groceries": [ /* categorized grocery items */ ]
}
```

## Theme System

### Color Palette
**Light Mode:**
- Background: `#F8F9FA` (soft cream)
- Primary: `#1B4332` (deep green)
- Accent: `#74C69D` (light organic green)
- Text: `#1B4332`
- Surface: `#FFFFFF`

**Dark Mode:**
- Background: `#081C15` (ultra deep green)
- Primary: `#74C69D` (flipped for readability)
- Accent: `#B7E4C7`
- Text: `#F8F9FA`
- Surface: `#1B4332`

### Typography
- **Headlines**: Instrument Sans (SemiBold, 600)
- **Body**: Inter (Regular, 400 / Medium, 500 / SemiBold, 600)
- Sizes: 13-32pt depending on hierarchy

## Running the App

### Development
```bash
cd apps/mobile
npm install
npx expo start
```

### Build
```bash
# iOS
eas build --platform ios

# Android
eas build --platform android
```

## Next Steps / TODO

### High Priority
- [ ] Connect to backend API (`/api/generate-plan`)
- [ ] Implement actual meal generation (currently using mock data)
- [ ] Add meal detail screen (recipe, ingredients, instructions)
- [ ] Integrate RevenueCat for subscription management
- [ ] Add haptic feedback on interactions
- [ ] Implement plan regeneration with API

### Medium Priority
- [ ] Add onboarding persistence flag (don't show twice)
- [ ] Implement "Skip" analytics tracking
- [ ] Add error states for API failures
- [ ] Improve grocery list sorting/filtering
- [ ] Add "Share grocery list" feature
- [ ] Implement favorites/saved meals

### Low Priority
- [ ] Add animations to meal cards
- [ ] Implement weekly calendar view
- [ ] Add meal swap/substitution
- [ ] Nutrition information display
- [ ] Shopping mode (aisle-by-aisle)
- [ ] Export to other apps (Notes, Reminders)

## Accessibility
- All interactive elements meet 44pt minimum
- Color contrast ratios meet WCAG AA standards
- Screen reader support via proper labeling (to be implemented)
- Dynamic type support (partially implemented)

## Performance Considerations
- `LazyVStack` used for long lists (grocery, meal cards)
- Images optimized with expo-image
- Animations use native driver (Reanimated)
- State persistence via AsyncStorage (encrypted for sensitive data)

## Testing Strategy
- Manual testing on iOS/Android simulators
- Test onboarding flow completion
- Test state persistence (plan, groceries, preferences)
- Test dark mode switching
- Test tab navigation
- Test modal interactions

## Known Issues / Limitations
1. Mock data currently used (no backend integration)
2. Paywall doesn't process real subscriptions yet
3. No recipe details screen implemented
4. Onboarding can be repeated (no completion flag)
5. No offline support for plan viewing

## Design Assets Needed
- App icon (1024x1024)
- Splash screen image
- Hero images for welcome screen
- Meal photos (optional)
- Marketing screenshots

## Questions for Product/Design
1. Should users be able to edit generated plans manually?
2. What happens if API generation fails? Retry? Show error?
3. Should we allow custom meal additions?
4. Do we need recipe ratings/reviews?
5. Should grocery list integrate with delivery services?

---

**Status**: ✅ MVP complete, ready for backend integration
**Last Updated**: February 3, 2026
**Version**: 1.0.0
