// Get version from registration
let VERSION = "1.0.0";
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SET_VERSION') {
    VERSION = event.data.version;
  }
});

const CACHE_NAME = `c25k-pwa-${VERSION}`;

// You can also split caches by type
const STATIC_CACHE = `static-${CACHE_NAME}`;
const DYNAMIC_CACHE = `dynamic-${CACHE_NAME}`;
const ASSET_CACHE = `assets-${CACHE_NAME}`;

// Organize your cached content by type
const STATIC_ASSETS = [
  "/",
  "/manifest.json"
];

const IMAGE_ASSETS = [
  "/icons/icon-72x72.png",
  "/icons/icon-96x96.png",
  "/icons/icon-128x128.png",
  "/icons/icon-144x144.png",
  "/icons/icon-180x180.png",
  "/icons/icon-192x192.png",
  "/icons/icon-256x256.png",
  "/icons/icon-384x384.png",
  "/icons/icon-512x512.png",
  "/icons/icon-1024x1024.png",
  // Screenshots
  "/screenshots/screenshot-800x600.png",
  "/screenshots/screenshot-1280x720.png",
  "/screenshots/screenshot-1024x768.png"
];

// Function to prefetch all app routes
const prefetchAllRoutes = async () => {
  const routes = [
    "/",
    // Week routes
    "/week/1",
    "/week/2",
    "/week/3",
    "/week/4",
    "/week/5",
    "/week/6",
    "/week/7",
    "/week/8",
    "/week/9",
    // Workout routes for each week
    ...Array.from({ length: 9 }, (_, weekIndex) => 
      Array.from({ length: 3 }, (_, workoutIndex) => 
        `/week/${weekIndex + 1}/workout/${workoutIndex}`
      )
    ).flat()
  ];

  const cache = await caches.open(DYNAMIC_CACHE);
  
  // Prefetch each route
  await Promise.all(
    routes.map(async (route) => {
      try {
        const response = await fetch(route);
        if (response.ok) {
          await cache.put(route, response.clone());
          console.log(`Successfully cached: ${route}`);
        }
      } catch (error) {
        console.error(`Failed to cache: ${route}`, error);
      }
    })
  );
};

// Install event - cache static resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      // Cache static content with error handling
      caches.open(STATIC_CACHE).then(cache => {
        return cache.addAll(STATIC_ASSETS).catch(error => {
          console.error('Failed to cache static assets:', error);
          return Promise.resolve();
        });
      }),
      // Cache images with error handling
      caches.open(ASSET_CACHE).then(cache => {
        return cache.addAll(IMAGE_ASSETS).catch(error => {
          console.error('Failed to cache image assets:', error);
          return Promise.resolve();
        });
      }),
      // Explicitly cache manifest.json with proper error handling
      caches.open(STATIC_CACHE).then(cache => {
        return fetch('/manifest.json')
          .then(response => {
            if (!response || !response.ok) {
              throw new Error('Failed to fetch manifest.json');
            }
            return cache.put('/manifest.json', response.clone());
          })
          .then(() => {
            console.log('Successfully cached manifest.json');
            return Promise.resolve();
          })
          .catch(error => {
            console.error('Failed to cache manifest.json:', error);
            return Promise.resolve();
          });
      })
    ]).catch(error => {
      console.error('Install event failed:', error);
      return Promise.resolve();
    })
  );
});

// Activate event - clean up old caches and prefetch routes
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all([
        // Clean up old caches
        ...cacheNames.map((cacheName) => {
          if (
            !cacheName.includes(VERSION) && 
            (cacheName.startsWith('static-') || 
             cacheName.startsWith('dynamic-') || 
             cacheName.startsWith('assets-'))
          ) {
            return caches.delete(cacheName);
          }
        }),
        // Prefetch routes after cleanup
        prefetchAllRoutes()
      ]);
    })
  );
});

// Fetch event - implement a "Cache First, Network Fallback" strategy
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  // Special handling for manifest.json
  if (event.request.url.endsWith('/manifest.json')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          const clonedResponse = response.clone();
          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(event.request, clonedResponse);
          });
          return response;
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version if found
      if (response) {
        return response;
      }

      // Clone the request because it's a one-time use stream
      const fetchRequest = event.request.clone();

      // Make network request and cache the response
      return fetch(fetchRequest)
        .then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          // Clone the response because it's a one-time use stream
          const responseToCache = response.clone();

          // Add the response to cache
          caches.open(DYNAMIC_CACHE).then((cache) => {
            // Cache any successful request
            // This includes runtime requests like API calls or dynamic routes
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(async () => {
          // If network request fails and we don't have a cached version,
          // try to return a fallback response
          if (event.request.mode === "navigate") {
            // For navigation requests, try to return the homepage
            const homepage = await caches.match("/");
            if (homepage) {
              return homepage;
            }
          }

          // For API requests or other non-navigation requests,
          // return a proper Response object with appropriate headers
          return new Response(JSON.stringify({ error: "offline" }), {
            status: 503,
            statusText: "Service Unavailable",
            headers: new Headers({
              "Content-Type": "application/json",
              "Cache-Control": "no-cache"
            })
          });
        });
    })
  );
});

// Optional: Listen for push notifications
self.addEventListener("push", (event) => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-72x72.png"
    }

    event.waitUntil(
      self.registration.showNotification("C25K Guide", options)
    )
  }
})
