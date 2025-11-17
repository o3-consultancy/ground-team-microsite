# HomeBase UCO — Ground Team Microsite

A Vue 3 application for ground team operations to manage UCO (Used Cooking Oil) container deployments and collections in Abu Dhabi.

## Features

### Authentication
- User login with API-based authentication
- Session persistence with localStorage
- Protected routes with auth guards
- User session tracking for all operations

### Ad-hoc Signup + Deploy
- Create new household signups directly from the field
- Deploy containers immediately upon signup
- Required fields:
  - Full name, phone, email (optional)
  - Villa number and community
  - Address text
  - GPS location (with one-click capture)
  - Container ID
- Uses `/signups/ad-hoc-deploy` endpoint

### Deploy to Existing Households
- Load households awaiting deployment
- Deploy containers to approved households
- Track deployments by user
- Uses `/deployments/perform` endpoint

### Complete Collections
- View pending collection requests
- Record collection metrics (volume and weight)
- Swap full containers with empty ones
- QR code scanner for quick container ID input
- Uses `/deployments/swap` endpoint

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vue Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **ZXing** - QR code scanner library

## Project Structure

```
ground-team-microsite/
├── src/
│   ├── assets/           # Static assets (logo, images)
│   ├── components/       # Vue components
│   │   ├── AdHocForm.vue        # Ad-hoc signup + deploy
│   │   ├── DeployForm.vue       # Deploy to households
│   │   ├── CollectionForm.vue   # Complete collections
│   │   └── QRScanner.vue        # QR code scanner
│   ├── composables/      # Reusable composition functions
│   │   ├── useAuth.js           # Authentication state
│   │   └── useGeolocation.js    # GPS location capture
│   ├── services/         # API service layer
│   │   └── api.js               # All API endpoints
│   ├── styles/           # Global styles
│   │   └── tailwind.css         # Tailwind imports + custom classes
│   ├── views/            # Page components
│   │   ├── Dashboard.vue        # Main dashboard
│   │   ├── Login.vue            # Login page
│   │   ├── Health.vue           # API health check
│   │   └── Success.vue          # Success page
│   ├── router/           # Vue Router configuration
│   │   └── index.js
│   ├── App.vue           # Root component
│   └── main.js           # App entry point
├── .env                  # Environment variables
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── package.json          # Dependencies
```

## Setup

### Prerequisites
- Node.js 16+ and npm
- Access to the HomeBase API

### Installation

```bash
# Install dependencies
npm install
```

### Environment Configuration

Create or update `.env` file:

```env
VITE_API_BASE=https://homebase-api.neutralfuels.net/api
VITE_API_KEY=your_api_key_here
```

### Development

```bash
# Start dev server (http://localhost:8080)
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## API Integration

This application integrates with the HomeBase API. See [API_REFERENCE.md](./API_REFERENCE.md) for complete API documentation.

### Key Endpoints Used

- `POST /auth/login` - User authentication
- `POST /signups/ad-hoc-deploy` - Create signup + household + deployment
- `GET /signups/awaiting-deployment` - List households awaiting deployment
- `POST /deployments/perform` - Deploy container to household
- `GET /collection-requests` - List pending collection requests
- `POST /deployments/swap` - Complete collection and swap containers

## Authentication Flow

1. User logs in at `/login`
2. Credentials sent to `/auth/login`
3. On success, user data stored in localStorage
4. Auth guard checks for stored user on protected routes
5. User ID attached to all operations (`performedBy` field)
6. Logout clears localStorage and redirects to login

## Forms and Operations

### Ad-hoc Signup + Deploy
Creates a complete household with container deployment in one operation:
1. Ground team fills in customer details
2. Captures GPS location (one-click button)
3. Enters container ID to deploy
4. API creates signup, household, and deployment records
5. Signup immediately set to "active" status

### Deploy to Household
For pre-approved signups awaiting deployment:
1. Loads households in "awaiting_deployment" status
2. Ground team enters container ID
3. Performs deployment operation
4. Updates household and container assignment
5. Activates the signup

### Complete Collection
For households with pending collection requests:
1. Loads collection requests with "requested" status
2. Ground team selects request
3. Records volume (L) and weight (kg) collected
4. Scans new empty container QR code (or enters manually)
5. Performs swap operation
6. Marks request as "completed"
7. Updates container assignments

## Styling

### Tailwind Custom Classes

Defined in `src/styles/tailwind.css`:

```css
.card        /* White card with shadow */
.btn         /* Base button styles */
.btn-primary /* Green button (primary actions) */
.btn-secondary /* Blue button (secondary actions) */
.input       /* Form input field */
.label       /* Form label */
```

### Color Palette

- **Primary Blue**: `#003A6D` - Headers, titles
- **Primary Green**: `#B2D235` - Primary buttons
- **Accent Coral**: `#FF6A4D` - Errors, warnings
- **Accent Aqua**: `#3DCFD1` - Focus states
- **Neutral Canvas**: `#F7F9FB` - Page background
- **Neutral Card**: `#E8EDF2` - Card backgrounds

## Features Implemented

✅ User authentication with login/logout
✅ Protected routes with auth guards
✅ Ad-hoc signup and immediate deployment
✅ Deploy containers to approved households
✅ Complete collections with container swap
✅ GPS location capture
✅ QR code scanner for container IDs
✅ Form validation and error handling
✅ Loading states for all operations
✅ User tracking for all operations
✅ Responsive design (mobile-first)
✅ Production-ready build

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Note: Geolocation and QR scanner require HTTPS in production and appropriate browser permissions.

## Security Considerations

- API key stored in environment variable (not committed)
- Authentication required for all operations
- User session validated on each protected route
- HTTPS required for production deployment
- Geolocation permissions requested from user

## Deployment

Build the project:
```bash
npm run build
```

The `dist/` folder contains the production-ready static files. Deploy to any static hosting service:
- Netlify
- Vercel
- AWS S3 + CloudFront
- Azure Static Web Apps
- etc.

### Environment Variables for Deployment

Set these in your deployment platform:
- `VITE_API_BASE` - API base URL
- `VITE_API_KEY` - API key

## Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Create pull request

## License

© Neutral Fuels — All rights reserved
