# GoodBoy Donation Form

A modern Next.js application for the GoodBoy Foundation to collect donations for Slovak dog shelters.

## Features

- 🎨 **Modern UI** with styled-components and smooth animations
- 🌍 **i18n Support** - Slovak and English localization
- 📱 **Responsive Design** - Works on all devices
- ♿ **Accessibility** - WCAG compliant
- 🔒 **Form Validation** - Zod schema validation with react-hook-form
- 🔄 **Real-time Data** - TanStack Query for server state management
- 💾 **State Management** - Zustand for client state
- 🎯 **SEO Optimized** - Meta tags and OpenGraph support
- 📊 **Live Statistics** - Real-time donor statistics and donation tracking

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: styled-components
- **State Management**: 
  - Server State: TanStack Query (React Query)
  - Client State: Zustand
- **Form Management**: react-hook-form
- **Validation**: Zod
- **Internationalization**: i18next + react-i18next
- **HTTP Client**: Fetch API

## Getting Started

### Prerequisites

- Node.js 20.9.0 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Navigate to the project directory:
```bash
cd goodboy-donation-form
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── donate/            # Donation form page
│   ├── donors/            # Donors statistics page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── common/           # Reusable UI components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── hooks/                # Custom React hooks
├── lib/                  # Libraries and configurations
├── locales/              # Translation files
├── services/             # API services
├── store/                # Zustand stores
├── styles/               # Global styles and theme
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Integration

The application integrates with the GoodRequest Frontend Assignment API:

- **GET /shelters** - Fetch list of shelters
- **GET /donations** - Get donation statistics
- **POST /donate** - Submit a donation

API Documentation: https://frontend-assignment-api.goodrequest.dev/apidoc/

## Form Features

### Donation Type Selection
- General contribution to the foundation
- Contribution to a specific shelter

### Shelter Selection
- Optional for general contributions
- Required for specific shelter contributions
- Dropdown with all available shelters

### Amount Selection
- Predefined amounts: 5€, 10€, 20€, 50€, 100€
- Custom amount input
- Required field

### Personal Information
- First name (2-20 characters, optional)
- Last name (2-30 characters, required)
- Email (valid format, required)
- Phone (Slovak +421 or Czech +420, required)
- GDPR consent checkbox (required)

### Phone Number Features
- Country selector with flags (🇸🇰 Slovakia, 🇨🇿 Czech Republic)
- Automatic formatting
- Validation for Slovak/Czech phone numbers

## Accessibility Features

- Semantic HTML
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Color contrast compliance

## Internationalization

The app supports:
- Slovak (sk) - Default language
- English (en)

Language detection:
1. Browser localStorage
2. Browser language preference

## SEO

Each page includes:
- Meta titles and descriptions
- OpenGraph tags
- Proper heading hierarchy
- Semantic HTML structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

## Contact

For questions or support, contact:
- Email: info@goodboy.sk
- Phone: +421 123 456 789
