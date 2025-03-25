# Dashboard Application

A modern, customizable dashboard application built with Next.js, featuring user authentication, widget management, and real-time data visualization.

## Features

- 🔐 User Authentication
- 📊 Customizable Widgets
- 📈 Real-time Data Visualization
- 🔄 Real-time Widget State Management
- 📱 Responsive Design

## Technology Stack

### Core Technologies
- **Next.js 15** - React framework for production-grade applications
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **PostgreSQL** - Primary database
- **Drizzle ORM** - Type-safe database ORM

### Key Libraries
- **Recharts** - Composable charting library
- **Lucide Icons** - Beautiful and consistent icons
- **date-fns** - Modern JavaScript date utility library
- **bcryptjs** - Password hashing
- **next-auth** - Authentication solution

## Project Structure

```
dashboard/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   ├── login/                    # Login page
│   └── page.tsx                  # Dashboard page
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   ├── widgets/                  # Widget components
│   └── dashboard-skelton.tsx     # dashboard skelton
│   └── dashboard.tsx             # Main dashboard component
│   └── navbar.tsx                # Navbar component
│   └── theme-forest.tsx          # theme provider for app
│   └── widget-customizer.tsx     # theme provider for app
│   └── widget-grid.tsx           # widget customizer component
├── hooks/                        # Core utilities and types
│   ├── use-mobile.tsx            # component for mobile responsiveness
│   ├── use-toast.ts              # component for mobile responsiveness
├── lib/                          # Core utilities and types
│   ├── db/                       # Database configuration
│   ├── api.ts                    # API client functions
│   ├── dummy-data.ts             # Fallback data for db
│   ├── seed.ts                   # Declare widgets information
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # Utility functions
│   └── widget-data.ts                 # Widget data 
├── scripts/                      # Utility scripts
│   └── setup-db.ts               # Database setup script
└── public/                       # Static assets
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/sarathos584/dashboard-task.git
   cd dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   DB_PASSWORD=your_database_password
   ```

4. **Set up the database**
   ```bash
   npm run setup-db
   ```
   This will:
   - Create necessary tables
   - Seed initial widget data
   - Create demo users

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Key Technical Decisions

### 1. Next.js App Router
- Chosen for its built-in routing, server components, and API routes
- Provides better performance through server-side rendering
- Enables seamless integration of client and server components

### 2. TypeScript
- Implemented for type safety and better developer experience
- Helps catch errors early in development
- Provides better IDE support and documentation

### 3. Drizzle ORM
- Selected for its type-safe database operations
- Provides better developer experience than raw SQL
- Enables automatic type generation from database schema

### 4. Widget System
- Implemented as a modular system with separate components
- Each widget type (statistics, chart, text, activity) is isolated
- Supports easy addition of new widget types

### 5. Authentication
- Uses cookie-based authentication for better security
- Implements proper password hashing with bcrypt
- Stores user preferences in the database

## Challenges and Solutions

### 1. Real-time Widget Updates
**Challenge**: Maintaining widget state across user sessions
**Solution**: 
- Implemented user-specific preferences in the database
- Used optimistic updates for better UX
- Added proper error handling and state reversion

### 2. Database Connection
**Challenge**: Handling database connection issues gracefully
**Solution**:
- Implemented fallback to dummy data when database is unavailable
- Added proper error handling and user feedback
- Created a robust database setup script

### 3. Type Safety
**Challenge**: Ensuring type safety across the application
**Solution**:
- Created comprehensive TypeScript interfaces
- Used Drizzle ORM for type-safe database operations
- Implemented proper type checking for widget data

### 4. Performance
**Challenge**: Optimizing dashboard performance with multiple widgets
**Solution**:
- Implemented lazy loading for widgets
- Used server components where possible
- Optimized database queries with proper indexing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 