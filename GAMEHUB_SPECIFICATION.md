# GameHub - Gaming Tournament Platform
## Complete Technical & Design Specification

**Version:** 1.0  
**Status:** Ready for Development  
**Target Audience:** Mobile esports enthusiasts, tournament organizers, competitive gaming communities

---

## Executive Summary

GameHub is a premium gaming tournament platform designed to democratize competitive mobile gaming. The platform enables players to discover, join, and create tournaments across popular mobile titles (PUBG Mobile, COD Mobile, Free Fire, FC 26, Valorant) while providing tournament organizers with powerful management tools. Built with a mobile-first approach and startup-grade polish, GameHub delivers a professional competitive gaming experience.

---

## 1. Feature Breakdown & User Flows

### 1.1 Player Journey

#### Tournament Discovery Flow
```
Home Page → Browse Tournaments → Filter by Game → View Tournament Details → Join/Create Team → Confirm Entry → Receive Confirmation
```

**Steps:**
1. User lands on Home, sees featured tournaments
2. Navigates to "Browse Tournaments" or clicks a featured tournament
3. Filters by game title (PUBG, COD, Free Fire, etc.)
4. Views tournament card with key info (prize pool, slots, entry fee)
5. Clicks into Tournament Detail page
6. Reviews Overview, Bracket, Matches, Leaderboard tabs
7. Clicks "Join Tournament"
8. Either joins existing team or creates new team
9. Completes registration (accepts rules, confirms payment if applicable)
10. Receives confirmation + calendar invite

#### Team Creation Flow
```
Tournament Detail → Create Team → Name Team → Invite Players → Set Lineup → Submit Registration
```

**Steps:**
1. From tournament detail, user selects "Create Team"
2. Enters team name, optional logo/avatar
3. Invites teammates via username search or shareable link
4. Waits for teammates to accept (real-time status updates)
5. Once minimum roster met, submits team registration
6. Receives team confirmation + match schedule notifications

#### Profile & Stats Tracking Flow
```
Navigation → My Profile → View Stats → Review Match History → Share Achievements
```

---

### 1.2 Tournament Creator/Admin Journey

#### Tournament Creation Flow
```
Admin Dashboard → Create Tournament → Select Game → Configure Settings → Set Prize Pool → Define Rules → Publish → Monitor
```

**Configuration Options:**
- Game selection (from supported titles)
- Tournament format (Solo/Duo/Squad)
- Player/team count limits
- Entry type (Free/Paid)
- Prize pool distribution (1st: 60%, 2nd: 30%, 3rd: 10% - customizable)
- Match schedule (date/time, timezone)
- Rules & requirements
- Registration deadline

#### Bracket Management Flow
```
Admin Panel → Select Tournament → Bracket Editor → Seed Teams → Generate Bracket → Update Results → Advance Winners
```

**Capabilities:**
- Manual or auto-seeding
- Drag-and-drop bracket adjustments
- Bulk result entry
- Automatic progression logic
- Dispute resolution tools

---

## 2. Page/Screen Structure & Component Details

### 2.1 Home Page

**Purpose:** First impression, engagement driver, quick access to key features

**Components:**

| Section | Component | Description |
|---------|-----------|-------------|
| Hero | Featured Tournament Carousel | Auto-rotating cards showing high-profile tournaments with countdown timers |
| Quick Actions | Game Icon Grid | Large, tappable icons for each supported game (PUBG, COD, Free Fire, FC 26, Valorant) |
| Live Now | Active Tournaments List | Real-time feed of ongoing matches with live scores |
| Upcoming | Next 24 Hours Schedule | Chronological list of upcoming matches with "Remind Me" CTAs |
| Global Leaders | Top 5 Players/Teams | Mini leaderboard with avatars, ratings, win counts |
| CTA Banner | Create Tournament | Prominent button for admins/organizers |

**Layout Notes:**
- Mobile: Single column, sticky bottom navigation
- Desktop: Multi-column grid, top navigation bar
- Animation: Subtle hover effects, smooth transitions between sections

---

### 2.2 Tournaments Browse Page

**Purpose:** Comprehensive tournament discovery with powerful filtering

**Components:**

| Component | Props/Data | Interactions |
|-----------|------------|--------------|
| Game Filter Tabs | ALL, PUBG, FC 26, VALORANT, COD, Free Fire, Apex, etc. | Horizontal scroll on mobile, tab row on desktop |
| Search Bar | Query string | Debounced search across tournament names |
| Sort Dropdown | Options: Popular, Ending Soon, Highest Prize, Newest | Updates list order |
| Tournament Cards (Grid/List) | Array of tournament objects | Click → Tournament Detail |
| Pagination/Infinite Scroll | Page number or cursor | Load more on scroll |

**Tournament Card Structure:**
```
┌─────────────────────────────────┐
│ [Game Icon] Tournament Name     │
│ ─────────────────────────────── │
│ 👥 24/32 Teams    💰 $500 Pool  │
│ 🎟️ Free Entry    ⏰ Starts in 2d│
│ [Join Tournament Button]        │
└─────────────────────────────────┘
```

**Filter State Management:**
- Selected game (default: ALL)
- Entry type (Free/Paid/All)
- Status (Open/Live/Completed)
- Prize range slider
- Date range picker

---

### 2.3 Tournament Detail Page

**Purpose:** Complete tournament information hub with tabbed navigation

**Tab Structure:**

#### Tab 1: Overview
- Tournament banner/header with game artwork
- Key details card: Prize pool, teams registered, format, start date
- Rules section (expandable accordion)
- Organizer info with verification badge
- Join/Register CTA (prominent, sticky on mobile)
- Share buttons (Twitter, Discord, WhatsApp)

#### Tab 2: Bracket (Visual Tournament Tree)
- Interactive bracket visualization
- Zoom/pan controls for large brackets
- Team logos/names in matchup boxes
- Score display for completed matches
- Click matchup → Match detail modal
- Auto-refresh for live matches
- Export/download bracket image

**Bracket Component Technical Specs:**
- SVG-based rendering for scalability
- Responsive layout (collapses on mobile, expands on desktop)
- Color coding: Green (winner), Red (eliminated), Blue (active), Gray (pending)
- Animation: Smooth transitions when results update

#### Tab 3: Matches
- Chronological match schedule
- Match cards showing:
  - Team A vs Team B
  - Scheduled time (with timezone conversion)
  - Status badge (Scheduled/Live/Completed)
  - Score (if completed)
  - "Watch" link (if streaming)
  - "Report Result" (for admins)
- Filter by round/date
- Calendar integration (Add to Google/Apple Calendar)

#### Tab 4: Leaderboard
- Rankings table with columns:
  - Rank (#)
  - Team/Player Name
  - Matches Played
  - Wins
  - Points/Kills (game-specific metrics)
  - Win Rate (%)
  - Trend indicator (↑↓)
- Sortable columns
- Highlight current user's team
- Export to CSV

---

### 2.4 Gamer Profile Page

**Purpose:** Personal stats dashboard and competitive identity

**Sections:**

#### Header
- Avatar/Profile picture
- Gamertag/Username
- Verification badge (if pro/verified)
- Country flag
- Member since date
- Social links (Twitch, YouTube, Twitter)

#### Stats Overview (Cards)
```
┌──────────┬──────────┬──────────┬──────────┐
│  Tournaments │  Matches   │   Wins     │  Rating   │
│     47    │    312    │    89     │   2,450   │
└──────────┴──────────┴──────────┴──────────┘
```

#### Performance Charts
- Win rate over time (line chart)
- Game distribution (pie chart)
- Recent form (last 10 matches W/L)

#### Match History
- Paginated list of recent matches
- Each row: Tournament name, placement, date, K/D/A (if applicable)
- Click → Match detail view

#### Achievements/Badges
- Visual badge collection
- Tooltip explanations
- Progress bars for unlockable badges

#### Teams Section
- Current team(s) with role indicator
- Past teams (historical record)

---

## 3. Data Model

### Core Entities

```typescript
// Player/Gamer
interface Player {
  id: string;                    // UUID
  username: string;              // Unique gamertag
  email: string;                 // Verified email
  avatarUrl?: string;            // Profile picture
  country: string;               // ISO country code
  verified: boolean;             // Pro/creator badge
  socialLinks: {
    twitch?: string;
    youtube?: string;
    twitter?: string;
    discord?: string;
  };
  stats: PlayerStats;
  createdAt: DateTime;
  updatedAt: DateTime;
}

interface PlayerStats {
  tournamentsJoined: number;
  matchesPlayed: number;
  wins: number;
  losses: number;
  rating: number;                // ELO-style rating
  winRate: number;               // Calculated percentage
  averagePlacement: number;
  totalEarnings: number;         // If paid tournaments
  gamesPlayed: GameStats[];      // Per-game breakdown
}

interface GameStats {
  gameId: string;                // Reference to Game entity
  matchesPlayed: number;
  wins: number;
  rating: number;
  kills?: number;                // Game-specific metrics
  deaths?: number;
  assists?: number;
  headshots?: number;
}

// Game Title
interface Game {
  id: string;
  name: string;                  // "PUBG Mobile", "COD Mobile"
  slug: string;                  // "pubg-mobile"
  iconUrl: string;
  bannerUrl?: string;
  category: 'mobile' | 'pc' | 'console';
  active: boolean;
  metadata: {
    maxPlayersPerTeam: number;
    scoringSystem: 'placement' | 'kills' | 'objectives';
  };
}

// Tournament
interface Tournament {
  id: string;
  name: string;
  gameId: string;                // Reference to Game
  organizerId: string;           // Reference to Player (admin)
  description: string;
  format: 'solo' | 'duo' | 'trio' | 'squad';
  maxTeams: number;
  minTeams: number;
  registeredTeams: number;       // Cached count
  entryType: 'free' | 'paid';
  entryFee?: number;             // In cents
  prizePool: number;             // Total in cents
  prizeDistribution: number[];   // [60, 30, 10] percentages
  status: 'registration' | 'live' | 'completed' | 'cancelled';
  registrationDeadline: DateTime;
  startDate: DateTime;
  endDate?: DateTime;
  rules: string;                 // Markdown or rich text
  bracketType: 'single' | 'double' | 'round_robin' | 'swiss';
  currentRound: number;
  settings: {
    checkInRequired: boolean;
    checkInWindowMinutes: number;
    thirdPartyPlaceholders: boolean;
    autoAdvance: boolean;
  };
  createdAt: DateTime;
  updatedAt: DateTime;
}

// Team
interface Team {
  id: string;
  name: string;
  tournamentId: string;
  captainId: string;             // Reference to Player
  logoUrl?: string;
  members: TeamMember[];
  seed?: number;                 // Tournament seeding
  checkedIn: boolean;
  eliminated: boolean;
  eliminatedAt?: DateTime;
  finalRank?: number;
  stats: TeamStats;
  createdAt: DateTime;
}

interface TeamMember {
  playerId: string;
  role: 'captain' | 'member' | 'substitute';
  joinedAt: DateTime;
}

interface TeamStats {
  matchesPlayed: number;
  wins: number;
  losses: number;
  points: number;                // Tournament points
  totalKills?: number;
  averagePlacement: number;
}

// Match
interface Match {
  id: string;
  tournamentId: string;
  round: number;
  matchNumber: number;
  teamAId?: string;              // Nullable for BYEs
  teamBId?: string;
  teamAScore?: number;
  teamBScore?: number;
  winnerId?: string;
  status: 'scheduled' | 'live' | 'completed' | 'pending';
  scheduledAt: DateTime;
  startedAt?: DateTime;
  completedAt?: DateTime;
  reportedBy?: string;           // Player ID who reported
  verified: boolean;             // Admin verified
  streamUrl?: string;
  metadata: {
    mapName?: string;
    gameMode?: string;
    additionalData?: JSON;
  };
}

// Bracket Node (for visualization)
interface BracketNode {
  id: string;
  matchId: string;
  position: { x: number; y: number }; // For rendering
  depth: number;                 // Round level
  connections: string[];         // Child node IDs
}

// Invitation
interface Invitation {
  id: string;
  teamId: string;
  inviterId: string;
  inviteeId: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  expiresAt: DateTime;
  createdAt: DateTime;
}

// Notification
interface Notification {
  id: string;
  userId: string;
  type: 'match_reminder' | 'result_posted' | 'invitation' | 
        'tournament_starting' | 'bracket_updated' | 'message';
  title: string;
  body: string;
  data: JSON;                    // Contextual data (tournamentId, matchId, etc.)
  read: boolean;
  createdAt: DateTime;
}

// Message (Team Chat)
interface Message {
  id: string;
  teamId: string;
  senderId: string;
  content: string;
  attachments?: MessageAttachment[];
  createdAt: DateTime;
  editedAt?: DateTime;
}

interface MessageAttachment {
  type: 'image' | 'file' | 'link';
  url: string;
  metadata?: JSON;
}
```

### Database Schema (PostgreSQL)

```sql
-- Core Tables
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  country CHAR(2),
  verified BOOLEAN DEFAULT FALSE,
  social_links JSONB,
  rating INTEGER DEFAULT 1000,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  icon_url VARCHAR(500),
  banner_url VARCHAR(500),
  category VARCHAR(20),
  active BOOLEAN DEFAULT TRUE,
  metadata JSONB
);

CREATE TABLE tournaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  game_id UUID REFERENCES games(id),
  organizer_id UUID REFERENCES players(id),
  description TEXT,
  format VARCHAR(20),
  max_teams INTEGER,
  min_teams INTEGER,
  entry_type VARCHAR(10),
  entry_fee INTEGER,
  prize_pool INTEGER,
  prize_distribution INTEGER[],
  status VARCHAR(20),
  registration_deadline TIMESTAMP,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  rules TEXT,
  bracket_type VARCHAR(20),
  current_round INTEGER DEFAULT 1,
  settings JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  tournament_id UUID REFERENCES tournaments(id),
  captain_id UUID REFERENCES players(id),
  logo_url VARCHAR(500),
  seed INTEGER,
  checked_in BOOLEAN DEFAULT FALSE,
  eliminated BOOLEAN DEFAULT FALSE,
  final_rank INTEGER,
  stats JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE team_members (
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  player_id UUID REFERENCES players(id),
  role VARCHAR(20),
  joined_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (team_id, player_id)
);

CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES tournaments(id),
  round INTEGER,
  match_number INTEGER,
  team_a_id UUID REFERENCES teams(id),
  team_b_id UUID REFERENCES teams(id),
  team_a_score INTEGER,
  team_b_score INTEGER,
  winner_id UUID REFERENCES teams(id),
  status VARCHAR(20),
  scheduled_at TIMESTAMP,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  reported_by UUID REFERENCES players(id),
  verified BOOLEAN DEFAULT FALSE,
  stream_url VARCHAR(500),
  metadata JSONB
);

CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  inviter_id UUID REFERENCES players(id),
  invitee_id UUID REFERENCES players(id),
  status VARCHAR(20),
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES players(id) ON DELETE CASCADE,
  type VARCHAR(50),
  title VARCHAR(200),
  body TEXT,
  data JSONB,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES players(id),
  content TEXT,
  attachments JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  edited_at TIMESTAMP
);

-- Indexes for Performance
CREATE INDEX idx_tournaments_game_status ON tournaments(game_id, status);
CREATE INDEX idx_tournaments_start_date ON tournaments(start_date);
CREATE INDEX idx_matches_tournament_round ON matches(tournament_id, round);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, read);
CREATE INDEX idx_team_members_player ON team_members(player_id);
```

---

## 4. Admin Workflows

### 4.1 Tournament Management Dashboard

**Access Control:**
- Role-based permissions (Owner, Admin, Moderator, Referee)
- Tournament-specific access grants

**Dashboard Features:**

#### Overview Tab
- Tournament health metrics (registration progress, check-in rate)
- Quick actions (start tournament, pause registration)
- Recent activity feed
- Revenue summary (if paid entries)

#### Participants Management
- List of registered teams with status
- Add/remove teams manually
- Edit team rosters (dispute resolution)
- Export participant list
- Send bulk announcements

#### Bracket Editor
- Visual bracket manipulation interface
- Drag-and-drop team repositioning
- Manual score override
- Regenerate bracket (format changes)
- Preview mode (public view)

**Bracket Editor UI Components:**
```
┌─────────────────────────────────────────────────┐
│ [Regenerate] [Preview] [Export]  [Save Changes]│
├─────────────────────────────────────────────────┤
│                                                 │
│    R1          R2          R3         Finals   │
│  ┌─────┐                                     │
│  │ T1  │──────┐                              │
│  │ 2-1 │      │                              │
│  └─────┘      │  ┌─────┐                    │
│               ├──│ T1  │──────────┐          │
│  ┌─────┐      │  │ TBD │          │          │
│  │ T4  │──────┘  └─────┘          │  ┌─────┐│
│  │ 0-2 │                         ├──│ TBD ││
│  └─────┘                         │  └─────┘│
│                                  │          │
│  ┌─────┐      ┌─────┐           │          │
│  │ T2  │──────│ T3  │───────────┘          │
│  │ 2-0 │      │ 1-2 │                      │
│  └─────┘      └─────┘                      │
│                                             │
└─────────────────────────────────────────────────┘
```

#### Match Scheduling
- Calendar view of all matches
- Bulk reschedule functionality
- Timezone management
- Conflict detection
- Automated reminder scheduling

#### Results Entry
- Quick score entry form
- Batch result upload (CSV)
- Screenshot evidence attachment
- Dispute flagging system
- Approval workflow (referee → admin)

---

### 4.2 Live Tournament Monitoring

**Real-Time Dashboard:**
- Live match feed with scores
- Active player count
- Stream integration (embedded Twitch/YouTube)
- Chat moderation tools
- Emergency pause/cancel controls

**Alert Conditions:**
- Match not started within 15 min of schedule
- Score discrepancy reports
- Player disconnect patterns
- Unusual betting activity (if applicable)

---

## 5. Notification & Alert System Architecture

### 5.1 Notification Types

| Type | Trigger | Channels | Priority |
|------|---------|----------|----------|
| Match Reminder | 30min before scheduled | Push, Email, SMS | High |
| Tournament Starting | 1 hour before start | Push, Email | High |
| Invitation Received | Team invite sent | Push, In-app | Medium |
| Result Posted | Match completed | Push, In-app | Medium |
| Bracket Updated | New round generated | In-app, Email | Low |
| Check-in Required | Check-in window opens | Push, Email | High |
| Message Received | Team chat message | Push, In-app | Medium |
| Admin Announcement | Tournament-wide message | Push, Email, In-app | Variable |

### 5.2 Technical Architecture

```
┌─────────────────────────────────────────────────────┐
│                 Event Bus (Redis Pub/Sub)           │
└─────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ Push Service  │ │ Email Service │ │  SMS Service  │
│ (Firebase/    │ │ (SendGrid/    │ │  (Twilio)     │
│  APNs/FCM)    │ │  SES)         │ │               │
└───────────────┘ └───────────────┘ └───────────────┘
        │                 │                 │
        ▼                 ▼                 ▼
   Mobile Apps        Inboxes         Phone Numbers
   Web Browser
```

### 5.3 Implementation Details

**Event Publishing:**
```typescript
// Example: Match result posted
async function publishMatchResult(matchId: string) {
  const match = await getMatch(matchId);
  const tournament = await getTournament(match.tournamentId);
  
  // Get all affected users
  const affectedUsers = await getMatchParticipants(matchId);
  
  // Publish to event bus
  await redis.publish('notifications', JSON.stringify({
    type: 'result_posted',
    userIds: affectedUsers.map(u => u.id),
    data: {
      matchId: match.id,
      tournamentId: tournament.id,
      tournamentName: tournament.name,
      winnerId: match.winnerId
    }
  }));
}
```

**User Preferences:**
- Granular notification settings per type
- Quiet hours configuration
- Channel preferences (push/email/SMS)
- Tournament-specific mute options

**Rate Limiting:**
- Max 10 push notifications per hour per user
- Email digest option for low-priority alerts
- Deduplication within 5-minute windows

---

## 6. Competitive Leaderboarding Logic

### 6.1 Rating System (ELO-Based)

**Core Formula:**
```
New Rating = Old Rating + K * (Actual Score - Expected Score)

Where:
- K = 32 (standard), 24 (established players >1500 rating), 16 (pros >2000)
- Actual Score = 1 (win), 0.5 (draw), 0 (loss)
- Expected Score = 1 / (1 + 10^((Opponent Rating - My Rating) / 400))
```

**Tournament Placement Scoring:**
```typescript
function calculateTournamentPoints(
  placement: number,
  totalTeams: number,
  kills: number = 0
): number {
  // Base placement points (exponential decay)
  const placementPoints = Math.max(
    0,
    Math.floor(100 * Math.pow(0.9, placement - 1))
  );
  
  // Kill points (game-dependent)
  const killPoints = kills * 2; // Configurable per game
  
  return placementPoints + killPoints;
}
```

### 6.2 Leaderboard Categories

1. **Global Ranking** - All-time ELO across all games
2. **Game-Specific** - Per-title rankings (PUBG ladder, COD ladder)
3. **Tournament Standings** - Current tournament points
4. **Monthly/Weekly** - Time-boxed performance
5. **Regional** - Country/continent filtered

### 6.3 Anti-Cheat & Fair Play

**Detection Mechanisms:**
- Rating volatility monitoring (>200 point swings flagged)
- Smurf detection (new accounts with pro-level performance)
- Team stacking prevention (same IP addresses)
- Match history anomaly detection

**Penalties:**
- Rating rollback
- Temporary suspension
- Permanent ban (repeat offenders)
- Tournament disqualification

---

## 7. Visual Design Direction & Tone

### 7.1 Brand Identity

**Personality:**
- **Energetic** - Dynamic, fast-paced, competitive
- **Professional** - Trustworthy, polished, reliable
- **Inclusive** - Welcoming to all skill levels
- **Modern** - Cutting-edge, tech-forward

**Voice & Tone:**
- Confident but not arrogant
- Clear and direct communication
- Celebratory for wins, supportive for losses
- Gaming-native language without excessive jargon

### 7.2 Color Palette

**Primary Colors:**
```
Electric Purple: #7C3AED    (Primary brand, CTAs)
Neon Cyan:    #06B6D4      (Accents, highlights)
Dark Void:    #0F172A      (Backgrounds, text)
Pure White:   #FFFFFF      (Text on dark)
```

**Secondary Colors:**
```
Victory Gold: #FBBF24      (1st place, winners)
Silver:       #94A3B8      (2nd place)
Bronze:       #B45309      (3rd place)
Danger Red:   #EF4444      (Errors, eliminations)
Success Green:#22C55E      (Live, active, wins)
```

**Game-Specific Accents:**
- PUBG: Orange (#F97316)
- COD: Green (#22C55E)
- Free Fire: Yellow (#EAB308)
- FC 26: Blue (#3B82F6)
- Valorant: Red/Pink (#EC4899)

### 7.3 Typography

**Font Stack:**
```css
/* Headings - Bold, impactful */
font-family: 'Rajdhani', sans-serif;  /* Google Fonts */
font-weight: 600-700;

/* Body - Clean, readable */
font-family: 'Inter', sans-serif;     /* Google Fonts */
font-weight: 400-500;

/* Mono - Stats, scores */
font-family: 'JetBrains Mono', monospace;
```

**Type Scale:**
```
Hero:        64px / 4rem    (Desktop only)
H1:          48px / 3rem
H2:          36px / 2.25rem
H3:          28px / 1.75rem
H4:          22px / 1.375rem
Body Large:  18px / 1.125rem
Body:        16px / 1rem
Small:       14px / 0.875rem
Caption:     12px / 0.75rem
```

### 7.4 UI Components & Patterns

**Cards:**
- Rounded corners (8px-12px)
- Subtle gradients on hover
- Glassmorphism effect for overlays
- Drop shadows for depth (elevation 2-4)

**Buttons:**
- Primary: Solid purple with cyan glow on hover
- Secondary: Outlined with transparent fill
- Tertiary: Text-only with underline animation
- Sizes: Small (32px), Medium (40px), Large (48px)

**Animations:**
- Micro-interactions on all clickable elements
- Loading skeletons for async content
- Confetti explosion on tournament wins
- Smooth page transitions (300ms ease-out)

**Data Visualization:**
- Bracket trees: SVG with CSS animations
- Charts: Recharts or Chart.js with custom theme
- Progress bars: Gradient fills with pulse animation

### 7.5 Mobile-First Considerations

**Breakpoints:**
```css
sm:  640px   /* Large phones */
md:  768px   /* Tablets */
lg:  1024px  /* Laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large screens */
```

**Touch Targets:**
- Minimum 44x44px for all interactive elements
- Generous padding around buttons
- Swipe gestures for secondary actions

**Responsive Patterns:**
- Bottom navigation on mobile, top nav on desktop
- Collapsible filters (drawer on mobile, sidebar on desktop)
- Stacked cards on mobile, grid on desktop
- Full-screen modals on mobile, centered dialogs on desktop

---

## 8. Technical Stack Recommendations

### 8.1 Frontend

**Web Application:**
```
Framework:     Next.js 14+ (React Server Components)
Styling:       Tailwind CSS + Framer Motion
State:         Zustand or TanStack Query
Forms:         React Hook Form + Zod validation
Charts:        Recharts or VisX
Bracket Viz:   Custom SVG or react-tournament-bracket
Maps:          Leaflet (for regional filters)
```

**Mobile Applications:**
```
Framework:     React Native (Expo) or Flutter
State:         Redux Toolkit or Riverpod
Navigation:    React Navigation or GoRouter
Push Notifs:   Firebase Cloud Messaging
Offline:       WatermelonDB or SQLite
```

**Why This Stack:**
- Shared code between web and mobile (React Native)
- Excellent developer experience and ecosystem
- Strong TypeScript support
- Proven at scale for similar platforms

### 8.2 Backend

**API Layer:**
```
Runtime:       Node.js 20+ or Bun
Framework:     Fastify or Express
Language:      TypeScript
GraphQL:       Apollo Server or Yoga (optional)
REST:          OpenAPI 3.0 spec
```

**Database:**
```
Primary:       PostgreSQL 15+ (Relational data)
Cache:         Redis 7+ (Sessions, leaderboards, pub/sub)
Search:        Meilisearch or Elasticsearch (tournament discovery)
Analytics:     ClickHouse or TimescaleDB (stats, events)
```

**Infrastructure:**
```
Hosting:       Vercel (Frontend) + Railway/Fly.io (Backend)
Containers:    Docker + Kubernetes (scale)
CDN:           Cloudflare or AWS CloudFront
Storage:       AWS S3 or Cloudflare R2 (assets, uploads)
Queue:         BullMQ or Celery (background jobs)
```

### 8.3 Third-Party Services

| Service | Purpose | Provider Options |
|---------|---------|------------------|
| Authentication | User login/signup | Auth0, Clerk, Supabase Auth |
| Payments | Entry fees, prizes | Stripe Connect, PayPal |
| Email | Transactional emails | SendGrid, Resend, AWS SES |
| SMS | Critical alerts | Twilio, MessageBird |
| Push Notifications | Mobile alerts | Firebase Cloud Messaging |
| Video Streaming | Match broadcasts | Twitch API, YouTube Live |
| Analytics | Product analytics | PostHog, Mixpanel, Amplitude |
| Error Tracking | Bug monitoring | Sentry, LogRocket |
| Uptime Monitoring | Health checks | Better Uptime, Pingdom |

### 8.4 Security & Compliance

**Must-Have Measures:**
- HTTPS everywhere (TLS 1.3)
- JWT authentication with refresh tokens
- Rate limiting (express-rate-limit)
- SQL injection prevention (parameterized queries)
- XSS protection (content security policy)
- CSRF tokens for state-changing operations
- Input validation (Zod schemas)
- Regular security audits

**Compliance:**
- GDPR (EU users)
- CCPA (California users)
- COPPA (under 13 restrictions)
- Payment Card Industry (PCI DSS) for payments
- Age verification for paid tournaments

---

## 9. Launch MVP Scope

### Phase 1: MVP (Weeks 1-8)

**Core Features (Must Have):**
- [ ] User authentication (email/password, Google OAuth)
- [ ] Player profiles (basic stats, edit profile)
- [ ] Tournament creation (single game, free entry)
- [ ] Tournament browsing (list view, basic filters)
- [ ] Tournament detail (Overview tab only initially)
- [ ] Team creation and joining
- [ ] Basic bracket generation (single elimination)
- [ ] Manual result entry (admin only)
- [ ] Simple leaderboard (tournament standings)
- [ ] Email notifications (critical events only)
- [ ] Responsive web design (mobile-first)

**Games Supported:**
- PUBG Mobile
- COD Mobile
- Free Fire

**Pages:**
1. Home (featured tournaments, simple layout)
2. Browse Tournaments (list + filter)
3. Tournament Detail (Overview + Bracket tabs)
4. User Profile (stats + match history)
5. Admin Dashboard (basic tournament management)

**Technical Scope:**
- Web app only (no native mobile yet)
- PostgreSQL + Redis
- Basic authentication
- Manual tournament approval
- No payment processing (free tournaments only)

---

### Phase 2: Growth (Weeks 9-16)

**Enhanced Features:**
- [ ] Paid tournaments (Stripe integration)
- [ ] Advanced bracket types (double elimination)
- [ ] Live match tracking
- [ ] Team chat/messaging
- [ ] Push notifications
- [ ] Tournament search with full-text
- [ ] Social sharing
- [ ] Achievement system
- [ ] Regional leaderboards
- [ ] Admin referee tools

**Additional Games:**
- FC 26
- Valorant
- Apex Legends Mobile

**Platform Expansion:**
- iOS app (React Native)
- Android app (React Native)
- Progressive Web App (PWA)

---

### Phase 3: Scale (Weeks 17-24)

**Advanced Features:**
- [ ] Automated bracket updates
- [ ] Live streaming integration
- [ ] Advanced analytics dashboard
- [ ] Sponsor/advertisement system
- [ ] API for third-party integrations
- [ ] Custom tournament branding
- [ ] Multi-language support
- [ ] Advanced anti-cheat detection
- [ ] Betting/wagering (region-dependent)
- [ ] Fantasy leagues

**Enterprise Features:**
- White-label tournament hosting
- Dedicated account managers
- SLA guarantees
- Custom integrations
- Advanced reporting

---

### Phase 4: Innovation (Post-Launch)

**Future Possibilities:**
- AI-powered matchmaking
- VR/AR tournament experiences
- Blockchain-based rewards/NFTs
- In-game overlay integration
- Coaching marketplace
- Content creator partnerships
- Physical event coordination
- University/collegiate leagues

---

## 10. Success Metrics & KPIs

### User Metrics
- **DAU/MAU** - Daily/Monthly active users
- **Retention** - D1, D7, D30 retention rates
- **Conversion** - Visitor → Registered → Active Player
- **Engagement** - Tournaments joined per user, time in app

### Business Metrics
- **GMV** - Gross merchandise value (prize pools + entry fees)
- **Revenue** - Platform fees, premium features, ads
- **LTV/CAC** - Lifetime value vs customer acquisition cost
- **Tournament Fill Rate** - % of tournaments reaching capacity

### Quality Metrics
- **NPS** - Net Promoter Score
- **CSAT** - Customer satisfaction surveys
- **Support Tickets** - Volume and resolution time
- **Uptime** - Target 99.9% availability

---

## Appendix A: API Endpoints (Sample)

```yaml
openapi: 3.0.0
info:
  title: GameHub API
  version: 1.0.0

paths:
  /tournaments:
    get:
      summary: List tournaments
      parameters:
        - name: game
          in: query
          schema:
            type: string
        - name: status
          in: query
          schema:
            type: string
            enum: [registration, live, completed]
        - name: page
          in: query
          schema:
            type: integer
      responses:
        200:
          description: Tournament list
    
    post:
      summary: Create tournament
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TournamentCreate'
      responses:
        201:
          description: Tournament created

  /tournaments/{id}:
    get:
      summary: Get tournament details
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        200:
          description: Tournament details

  /tournaments/{id}/bracket:
    get:
      summary: Get tournament bracket
      responses:
        200:
          description: Bracket structure

  /tournaments/{id}/join:
    post:
      summary: Join tournament
      responses:
        200:
          description: Successfully joined

  /players/{id}:
    get:
      summary: Get player profile
      responses:
        200:
          description: Player profile with stats

  /teams:
    post:
      summary: Create team
      responses:
        201:
          description: Team created

  /matches/{id}/result:
    post:
      summary: Report match result
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                score:
                  type: object
                evidence:
                  type: string
      responses:
        200:
          description: Result recorded
```

---

## Appendix B: Wireframe References

### Home Page Layout (Mobile)
```
┌─────────────────────────────┐
│ [Logo]        [Search][👤] │
├─────────────────────────────┤
│                             │
│  🔥 FEATURED TOURNAMENT     │
│  ┌───────────────────────┐  │
│  │   [Banner Image]      │  │
│  │   PUBG Championship   │  │
│  │   $5,000 Prize Pool   │  │
│  │   [Register Now]      │  │
│  └───────────────────────┘  │
│                             │
│  🎮 BROWSE BY GAME          │
│  [PUBG] [COD] [FF] [FC26]  │
│                             │
│  🔴 LIVE NOW                │
│  • Team Alpha vs Beta (2-1) │
│  • Squad Wars Finals        │
│                             │
│  📅 UPCOMING                │
│  • COD Tournament - 2hr     │
│  • Valorant Cup - Tomorrow  │
│                             │
│  🏆 TOP PLAYERS             │
│  1. PlayerOne ⭐ 2,890      │
│  2. ProGamer  ⭐ 2,756      │
│  3. EliteX    ⭐ 2,621      │
│                             │
├─────────────────────────────┤
│ [🏠] [🔍] [➕] [💬] [👤]   │
└─────────────────────────────┘
```

---

## Conclusion

This specification provides a comprehensive blueprint for building GameHub from concept to launch. The document balances detailed technical requirements with flexibility for creative execution, ensuring both design and engineering teams have clear direction while maintaining room for innovation.

**Next Steps:**
1. Review and validate requirements with stakeholders
2. Create detailed wireframes and prototypes
3. Set up development environment and CI/CD
4. Begin Phase 1 MVP development
5. Establish testing protocols and QA processes
6. Plan beta launch with select tournament organizers

**Contact & Iteration:**
This is a living document. As development progresses and user feedback comes in, iterate on these specifications to ensure the product evolves to meet market needs.

---

*Document Version: 1.0*  
*Last Updated: December 2024*  
*Prepared for: GameHub Development Team*
