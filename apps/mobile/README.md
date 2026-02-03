# Culinea Mobile App 🍃

A beautiful, calm meal planning app built with React Native and Expo. Personalized weekly meal plans with smart grocery lists.

## 🎯 Overview

Culinea helps users create personalized weekly meal plans in under 2 minutes. The app features:

- **Smart Onboarding**: 4-step questionnaire (household size, cooking time, diet, exclusions)
- **Weekly Meal Plans**: Breakfast, lunch, and dinner for 7 days
- **Grocery Lists**: Auto-generated, categorized by aisle, with checkboxes
- **Profile Management**: Easy preference editing
- **Premium Features**: Unlimited regenerations (subscription model)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
cd apps/mobile
npm install
```

### Development

```bash
# Start development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android

# Run on web
npx expo start --web
```

## 📱 Features Implemented

### ✅ Onboarding Flow (6 Screens)
1. **Splash & Welcome** - Brand intro with value proposition
2. **Household Size** - Select number of people (1-5+)
3. **Cooking Time** - Choose time preference (15min - 60min+)
4. **Dietary Preferences** - Select diet type (vegetarian, vegan, etc.)
5. **Ingredient Exclusions** - Multi-select common allergens/dislikes
6. **Generating** - Loading screen with status updates

### ✅ Main App (3 Tabs)
- **Meal Plan Tab**: Weekly view organized by day with breakfast/lunch/dinner
- **Grocery List Tab**: Categorized list with completion tracking
- **Profile Tab**: Settings and preference management

### ✅ Additional Screens
- **Paywall**: Subscription offer with pricing
- **Regenerate Modal**: Quick plan refresh

## 🎨 Design System

### Color Palette
- **Primary**: Deep Green `#1B4332`
- **Accent**: Organic Green `#74C69D`
- **Background**: Soft Cream `#F8F9FA`
- **Surface**: White `#FFFFFF`

### Typography
- **Headings**: Instrument Sans (600)
- **Body**: Inter (400, 500, 600)

### Components
All reusable components are in `src/components/`:
- `OptionCard` - Selection cards for onboarding
- `ProgressBar` - Step indicator
- `MealCard` - Individual meal display
- `RegenerateModal` - Plan refresh modal

## 📂 Project Structure

```
apps/mobile/
├── src/
│   ├── app/                    # Expo Router screens
│   │   ├── index.jsx          # Root (routing logic)
│   │   ├── onboarding/        # 6 onboarding screens
│   │   ├── (tabs)/            # Main app (plan, grocery, profile)
│   │   └── paywall.jsx        # Subscription screen
│   ├── components/            # Reusable UI components
│   ├── store/                 # Zustand state management
│   │   ├── onboarding.js     # User preferences
│   │   └── plan.js           # Meal plans & groceries
│   └── utils/
│       └── theme.js          # Color theme system
├── assets/                    # Images, fonts, etc.
├── IMPLEMENTATION.md         # Full technical docs
├── DEVELOPMENT_SUMMARY.md    # Feature checklist
└── package.json
```

## 🔧 Configuration

### State Management (Zustand)

**Onboarding Store** (`store/onboarding.js`):
```javascript
{
  diet: "none",
  householdSize: 1,
  cookingTime: "standard",
  exclusions: []
}
```

**Plan Store** (`store/plan.js`):
```javascript
{
  currentPlan: [...meals],
  groceries: [...items],
  lastGenerated: timestamp
}
```

### Navigation (Expo Router)
File-based routing with automatic navigation setup:
- Stack navigation for onboarding
- Tab navigation for main app
- Modal presentation for paywall

## 🧪 Testing

```bash
# Run all tests (when implemented)
npm test

# Type checking
npm run type-check
```

### Manual Testing Checklist
- [x] Complete onboarding flow
- [x] Navigate all tabs
- [x] Toggle grocery checkboxes
- [x] Switch dark/light mode
- [x] Edit preferences from profile
- [x] Open/close modals
- [ ] API integration (pending backend)

## 📱 Build & Deploy

### Development Build
```bash
# iOS
eas build --profile development --platform ios

# Android
eas build --profile development --platform android
```

### Production Build
```bash
# Configure eas.json first
eas build --profile production --platform all
```

### Submit to Stores
```bash
# App Store
eas submit --platform ios

# Play Store
eas submit --platform android
```

## 🔌 Backend Integration (TODO)

The app is ready for backend integration. Expected API endpoint:

**POST `/api/generate-plan`**

Request:
```json
{
  "diet": "vegetarian",
  "householdSize": 2,
  "cookingTime": "standard",
  "exclusions": ["nuts", "dairy"]
}
```

Response:
```json
{
  "meals": [
    {
      "date": "Feb 3",
      "dayName": "Monday",
      "meals": [
        { "type": "breakfast", "name": "...", "cookTime": 15 },
        { "type": "lunch", "name": "...", "cookTime": 20 },
        { "type": "dinner", "name": "...", "cookTime": 35 }
      ]
    }
    // ... 6 more days
  ],
  "groceries": [
    { "id": "1", "name": "Spinach", "amount": "2 bunches", "category": "Produce" }
    // ...
  ]
}
```

## 🎯 Next Steps

### Immediate Priorities
1. **Backend Connection**: Implement real API calls in `plan.jsx`
2. **Meal Details**: Create recipe detail screen
3. **Subscriptions**: Integrate RevenueCat for payments
4. **Error Handling**: Add proper error states

### Future Enhancements
- Recipe photos and ratings
- Meal favorites/bookmarks
- Custom meal additions
- Nutrition information
- Shopping integrations (Instacart, etc.)
- Social sharing
- Weekly notifications

## 📖 Documentation

- [`IMPLEMENTATION.md`](./IMPLEMENTATION.md) - Full technical implementation guide
- [`DEVELOPMENT_SUMMARY.md`](./DEVELOPMENT_SUMMARY.md) - Feature checklist and progress
- [Expo Docs](https://docs.expo.dev/) - Framework documentation
- [Expo Router Docs](https://expo.github.io/router/docs/) - Navigation

## 🤝 Contributing

1. Follow existing code style
2. Use reusable components where possible
3. Test on both iOS and Android
4. Update documentation for new features
5. Run linter before committing

## 📄 License

Proprietary - Culinea 2026

---

**Status**: ✅ MVP Complete - Ready for Backend Integration

**Built with**: React Native • Expo • Zustand • Expo Router • Reanimated

**Version**: 1.0.0
