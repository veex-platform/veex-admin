# VEEX Admin Portal (Next.js SSR)

Industrial-grade administrative dashboard for the VEEX IoT Platform with server-side rendering.

## Features

- Server-Side Rendering (SSR) with Next.js 15
- Real-time device and fleet management
- OTA campaign orchestration
- Analytics dashboard
- Industrial dark-mode design with glassmorphism
- Shared design system with Studio

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Server Components

## Development

```bash
# Install dependencies
npm install

# Set up environment
cp .env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Configuration

### Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_REGISTRY_URL=https://registry.veexplatform.com/api/v1
```

For local development:

```bash
NEXT_PUBLIC_REGISTRY_URL=http://localhost:80/api/v1
```

## Production Build

```bash
npm run build
npm run start
```

## Docker Deployment

```bash
docker build -t veex-admin .
docker run -p 3000:3000 -e NEXT_PUBLIC_REGISTRY_URL=https://registry.veexplatform.com/api/v1 veex-admin
```

## Pages

- `/` - Dashboard with real-time stats
- `/devices` - Device management
- `/fleets` - Fleet organization
- `/ota` - OTA campaign control
- `/analytics` - System analytics
- `/settings` - Configuration

## Design System

Shared with `veex-studio`:

- Logo: Industrial hexagon with VX monogram
- Colors: Blue primary, Emerald accent, Slate neutrals
- Typography: Inter (UI), JetBrains Mono (code)
- Effects: Glassmorphism, smooth transitions

---

[Official Site](https://github.com/veex-platform) | [Documentation](https://github.com/veex-platform/veex-docs)
