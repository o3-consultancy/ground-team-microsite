# API Endpoint Request: Today's Activity Statistics

**Date:** 2025-01-17
**Requested By:** Ground Team Microsite Frontend Team
**Priority:** Medium
**Status:** Pending Review

---

## Executive Summary

The Ground Team Microsite requires a dedicated endpoint to display daily activity statistics on the dashboard. Currently, there is no efficient way to retrieve a user's daily performance metrics without making multiple separate API calls and processing the data client-side.

---

## Business Requirement

Ground team members need to see their daily performance at a glance when they open the application. This motivates users, provides accountability, and helps track productivity. The dashboard "Today's Summary" section currently shows placeholder values (`-`) because there's no backend support.

---

## Proposed Endpoint

### Endpoint URL
```
GET /api/stats/today
```

### Authentication
- Requires: `x-api-key` header
- User-specific: Results filtered by `assignedTo` parameter

### Query Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `assignedTo` | `string` | **Yes** | User ID to get statistics for | `user_john_doe` |
| `date` | `string` | No | Specific date (ISO format). Defaults to today | `2025-01-17` |
| `timezone` | `string` | No | Timezone for "today". Defaults to UTC | `Asia/Dubai` |

---

## Response Format

### Success Response (200 OK)

```json
{
  "ok": true,
  "date": "2025-01-17",
  "assignedTo": "user_john_doe",
  "timezone": "Asia/Dubai",
  "stats": {
    "signups": {
      "count": 3,
      "breakdown": {
        "adhoc": 2,
        "regular": 1
      }
    },
    "deployments": {
      "count": 5,
      "breakdown": {
        "initial": 4,
        "replacement": 1
      }
    },
    "collections": {
      "count": 4,
      "totalVolumeL": 86.5,
      "totalWeightKg": 78.3,
      "breakdown": {
        "completed": 4,
        "pending": 0
      }
    },
    "deliveries": {
      "count": 1,
      "totalCollectionsDelivered": 4,
      "totalVolumeL": 86.5
    }
  },
  "message": "Statistics retrieved successfully"
}
```

### Error Responses

#### Missing Required Parameter (422)
```json
{
  "detail": [
    {
      "loc": ["query", "assignedTo"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

#### Invalid Date Format (400)
```json
{
  "ok": false,
  "error": "Invalid date format. Use ISO format (YYYY-MM-DD)",
  "message": "Bad Request"
}
```

#### No Data Found (200 OK)
```json
{
  "ok": true,
  "date": "2025-01-17",
  "assignedTo": "user_john_doe",
  "timezone": "Asia/Dubai",
  "stats": {
    "signups": { "count": 0, "breakdown": { "adhoc": 0, "regular": 0 } },
    "deployments": { "count": 0, "breakdown": { "initial": 0, "replacement": 0 } },
    "collections": { "count": 0, "totalVolumeL": 0, "totalWeightKg": 0, "breakdown": { "completed": 0, "pending": 0 } },
    "deliveries": { "count": 0, "totalCollectionsDelivered": 0, "totalVolumeL": 0 }
  },
  "message": "No activity found for this date"
}
```

---

## Implementation Details

### Database Queries Required

The endpoint should aggregate data from the following collections:

#### 1. Signups Count
```javascript
// MongoDB aggregation
db.signups.countDocuments({
  createdBy: assignedTo,
  createdAt: {
    $gte: startOfDay,
    $lt: endOfDay
  }
})

// Breakdown by type
db.signups.aggregate([
  { $match: { createdBy: assignedTo, createdAt: { $gte: startOfDay, $lt: endOfDay } } },
  { $group: { _id: "$type", count: { $sum: 1 } } }
])
```

#### 2. Deployments Count
```javascript
// MongoDB aggregation
db.deployments.countDocuments({
  performedBy: assignedTo,
  performedAt: {
    $gte: startOfDay,
    $lt: endOfDay
  }
})

// Breakdown by type (initial vs replacement)
db.deployments.aggregate([
  { $match: { performedBy: assignedTo, performedAt: { $gte: startOfDay, $lt: endOfDay } } },
  { $group: { _id: "$type", count: { $sum: 1 } } }
])
```

#### 3. Collections Stats
```javascript
// MongoDB aggregation
db.collectionRequests.aggregate([
  {
    $match: {
      assignedTo: assignedTo,
      status: "completed",
      completedAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    }
  },
  {
    $group: {
      _id: null,
      count: { $sum: 1 },
      totalVolumeL: { $sum: "$volumeL" },
      totalWeightKg: { $sum: "$weightKg" }
    }
  }
])
```

#### 4. Deliveries Stats
```javascript
// MongoDB aggregation
db.deliveries.aggregate([
  {
    $match: {
      assignedTo: assignedTo,
      deliveredAt: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    }
  },
  {
    $group: {
      _id: null,
      count: { $sum: 1 },
      totalCollectionsDelivered: { $sum: "$collectionsDelivered" },
      totalVolumeL: { $sum: "$totalVolumeL" }
    }
  }
])
```

### Date/Time Handling

**Important:** The endpoint should respect the user's timezone for accurate "today" calculations.

```python
# Python example
from datetime import datetime, timedelta
import pytz

def get_day_boundaries(date_str=None, timezone='Asia/Dubai'):
    """
    Get start and end of day in the specified timezone
    """
    tz = pytz.timezone(timezone)

    if date_str:
        date = datetime.fromisoformat(date_str)
    else:
        date = datetime.now(tz)

    # Start of day (00:00:00)
    start_of_day = tz.localize(datetime.combine(date.date(), datetime.min.time()))

    # End of day (23:59:59.999999)
    end_of_day = start_of_day + timedelta(days=1) - timedelta(microseconds=1)

    return start_of_day.astimezone(pytz.UTC), end_of_day.astimezone(pytz.UTC)
```

---

## Performance Considerations

### Caching Strategy

Since daily statistics don't change frequently (only when new operations complete), implement caching:

1. **Cache Key Format:** `stats:today:{assignedTo}:{date}`
2. **TTL:** 5 minutes
3. **Invalidation:** Clear cache when user completes any operation

```python
# Cache example
cache_key = f"stats:today:{assigned_to}:{date}"
cached_data = redis.get(cache_key)

if cached_data:
    return json.loads(cached_data)

# Fetch from database
stats = compute_stats(assigned_to, date, timezone)

# Cache for 5 minutes
redis.setex(cache_key, 300, json.dumps(stats))

return stats
```

### Database Indexes Required

Ensure the following indexes exist for optimal performance:

```javascript
// Signups collection
db.signups.createIndex({ createdBy: 1, createdAt: -1 })
db.signups.createIndex({ createdBy: 1, type: 1, createdAt: -1 })

// Deployments collection
db.deployments.createIndex({ performedBy: 1, performedAt: -1 })
db.deployments.createIndex({ performedBy: 1, type: 1, performedAt: -1 })

// Collection Requests collection
db.collectionRequests.createIndex({ assignedTo: 1, status: 1, completedAt: -1 })

// Deliveries collection
db.deliveries.createIndex({ assignedTo: 1, deliveredAt: -1 })
```

---

## Frontend Usage Example

### JavaScript Implementation

```javascript
// src/services/api.js
export function getTodayStats(assignedTo, options = {}) {
    const params = { assignedTo }

    if (options.date) {
        params.date = options.date
    }

    if (options.timezone) {
        params.timezone = options.timezone
    }

    return api.get('/stats/today', { params })
}
```

### Vue Component Usage

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { getTodayStats } from '../services/api'
import { useAuth } from '../composables/useAuth'

const { user } = useAuth()
const stats = ref(null)
const loading = ref(false)
const error = ref('')

async function loadStats() {
  loading.value = true
  error.value = ''

  try {
    const userId = user.value?.userId
    if (!userId) {
      throw new Error('User not authenticated')
    }

    const { data } = await getTodayStats(userId, {
      timezone: 'Asia/Dubai'
    })

    stats.value = data.stats
  } catch (err) {
    error.value = err.response?.data?.detail || err.message || 'Failed to load stats'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadStats()
})
</script>

<template>
  <div class="today-summary">
    <h2>Today's Summary</h2>

    <div v-if="loading">Loading...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="stats" class="stats-grid">
      <div class="stat-card">
        <p class="value">{{ stats.signups.count }}</p>
        <p class="label">Signups</p>
      </div>

      <div class="stat-card">
        <p class="value">{{ stats.deployments.count }}</p>
        <p class="label">Deployments</p>
      </div>

      <div class="stat-card">
        <p class="value">{{ stats.collections.count }}</p>
        <p class="label">Collections</p>
      </div>

      <div class="stat-card">
        <p class="value">{{ stats.deliveries.count }}</p>
        <p class="label">Deliveries</p>
      </div>
    </div>
  </div>
</template>
```

---

## Alternative Approaches Considered

### Option 1: Use Existing Endpoints (Current Workaround)

**Rejected because:**
- Requires 4 separate API calls
- Client-side date filtering is error-prone
- Increased network overhead
- Inconsistent timezone handling
- Higher latency (4 round trips vs 1)

```javascript
// BAD: Current workaround approach
const today = new Date().toISOString().split('T')[0]

const [signupsRes, deploymentsRes, collectionsRes, deliveriesRes] = await Promise.all([
  listSignups({ assignedTo: userId, createdAfter: today }),
  listDeployments({ assignedTo: userId, performedAfter: today }),
  listCollectionRequests({ assignedTo: userId, status: 'completed', completedAfter: today }),
  getDeliveryHistory({ assignedTo: userId, deliveredAfter: today })
])

// Client has to count and aggregate
const stats = {
  signups: signupsRes.data.length,
  deployments: deploymentsRes.data.length,
  collections: collectionsRes.data.length,
  deliveries: deliveriesRes.data.length
}
```

### Option 2: Add Stats to User Profile Endpoint

**Rejected because:**
- User profile should be static data
- Stats change frequently, user profile doesn't
- Breaks single responsibility principle
- Would require recalculating stats on every user fetch

---

## Testing Checklist

### Unit Tests
- [ ] Test with valid assignedTo parameter
- [ ] Test with missing assignedTo parameter (422 error)
- [ ] Test with invalid date format (400 error)
- [ ] Test with future date (returns 0 for all stats)
- [ ] Test with past date (returns historical data)
- [ ] Test timezone conversion (Asia/Dubai vs UTC)
- [ ] Test user with no activity (returns 0s)
- [ ] Test user with activity in multiple timezones

### Integration Tests
- [ ] Test cache hit/miss behavior
- [ ] Test cache invalidation on new operations
- [ ] Test database query performance with indexes
- [ ] Test concurrent requests for same user
- [ ] Test concurrent requests for different users
- [ ] Test response time under load (target: <200ms)

### End-to-End Tests
- [ ] Frontend displays stats correctly
- [ ] Stats update after completing operations
- [ ] Stats reflect correct timezone
- [ ] Error handling displays appropriately
- [ ] Loading states work correctly

---

## Security Considerations

1. **Authorization:** Users should only access their own stats
   - Validate `assignedTo` matches authenticated user
   - Return 403 if user tries to access another user's stats

2. **Rate Limiting:** Prevent abuse
   - Limit to 60 requests per minute per user
   - Return 429 if rate limit exceeded

3. **Input Validation:**
   - Sanitize `assignedTo` parameter
   - Validate date format (ISO 8601)
   - Validate timezone (valid IANA timezone names)

---

## Backwards Compatibility

This is a **new endpoint**, so no breaking changes. However:

1. **Health Check:** Endpoint should be included in `/health` response
2. **Documentation:** Add to API reference documentation
3. **Versioning:** Include in API v1.0

---

## Rollout Plan

### Phase 1: Development (Week 1)
- [ ] Backend implementation
- [ ] Unit tests
- [ ] Database indexes

### Phase 2: Testing (Week 1-2)
- [ ] Integration tests
- [ ] Performance testing
- [ ] Security review

### Phase 3: Staging Deployment (Week 2)
- [ ] Deploy to staging environment
- [ ] Frontend integration testing
- [ ] UAT with ground team

### Phase 4: Production Deployment (Week 3)
- [ ] Deploy to production
- [ ] Monitor performance metrics
- [ ] Gather user feedback

---

## Success Metrics

After deployment, track:

1. **Performance:**
   - Average response time < 200ms
   - 99th percentile response time < 500ms
   - Cache hit rate > 80%

2. **Adoption:**
   - Dashboard page views increase
   - Session duration increases
   - User engagement improves

3. **Reliability:**
   - Error rate < 0.1%
   - Uptime > 99.9%

---

## Future Enhancements

### V2 Features (Future Consideration)

1. **Week/Month Stats:**
   ```
   GET /api/stats/week?assignedTo={userId}
   GET /api/stats/month?assignedTo={userId}
   ```

2. **Comparison Stats:**
   ```json
   {
     "today": { "signups": 3, "deployments": 5 },
     "yesterday": { "signups": 2, "deployments": 4 },
     "change": { "signups": "+50%", "deployments": "+25%" }
   }
   ```

3. **Team Stats:**
   ```
   GET /api/stats/team/today?teamId={teamId}
   ```

4. **Export Stats:**
   ```
   GET /api/stats/export?assignedTo={userId}&format=csv&startDate={date}&endDate={date}
   ```

---

## Questions for API Team

1. **Timezone:** Should we default to `Asia/Dubai` or `UTC`?
2. **Date Range:** Should we support custom date ranges in V1?
3. **Caching:** Is Redis available, or should we use in-memory caching?
4. **Rate Limiting:** What are the current rate limits for other endpoints?
5. **Performance:** What's the acceptable response time SLA?

---

## Contact Information

**Requester:** Ground Team Frontend Team
**Email:** groundteam-dev@neutralfuels.net
**Slack Channel:** #homebase-development
**Project Manager:** [Name]
**Technical Lead:** [Name]

---

## Appendix

### Related API Endpoints

- `GET /api/signups` - List signups
- `GET /api/deployments` - List deployments
- `GET /api/collection-requests` - List collection requests
- `GET /api/deliveries/history` - Delivery history
- `GET /api/deliveries/pending-summary` - Pending delivery summary

### Database Schema References

See separate documentation:
- `schemas/signups.md`
- `schemas/deployments.md`
- `schemas/collection_requests.md`
- `schemas/deliveries.md`

---

**End of Request**
