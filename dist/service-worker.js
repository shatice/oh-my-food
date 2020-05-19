importScripts("/precache-manifest.4f3553a9105499e85eee6a47e172e300.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// self.__precacheManifest = [].concat(self.__precacheManifest || []);

// workbox.setConfig({
//   debug: true,
// });

// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// // workbox.routing.registerRoute(
// //   new RegExp("https://api.npoint.io/(.*)"),
// //   new workbox.strategies.CacheFirst({
// //     cacheName: "api",
// //     method: "GET",
// //     cacheableResponse: { statuses: [0, 200] },
// //     plugins: [
// //       new workbox.expiration.Plugin({
// //         maxEntries: 30,
// //       }),
// //     ],
// //   })
// // );

// self.addEventListener("push", (event) => {
//   let pushMessage = event.data.text();
//   // const options = {
//   //   body: pushMessage,
//   // };
//   event.waitUntil(self.registration.showNotification(pushMessage));
// });

// self.addEventListener("notificationclick", (event) => {
//   event.notification.close();
//   const promiseChain = clients.openWindow("www.google.fr");
//   event.waitUntil(promiseChain);
// });

self.__precacheManifest = [].concat(self.__precacheManifest || []);

workbox.setConfig({
  debug: true,
});

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  new RegExp("https://jsonplaceholder.typicode.com/(.*)"),
  new workbox.strategies.CacheFirst({
    cacheName: "jsonplaceholder",
    method: "GET",
    cacheableResponse: { statuses: [0, 200] },
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp("https://fonts.(?:googleapies|gstatic).com/(.*)"),
  new workbox.strategies.CacheFirst({
    cacheName: "googleapis",
    method: "GET",
    cacheableResponse: { statuses: [0, 200] },
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
    ],
  })
);

let clickUrl;

// [{ title: "test", url: "http://127.0.0.1:8887/#/" }]

self.addEventListener("push", (event) => {
  let pushMessage = event.data.json();

  clickUrl = pushMessage[0].url;

  const options = {
    body: pushMessage[0].title,
    icon: "./img/apple-touch-icon-60x60.png",
    image: "./img/apple-touch-icon-60x60.png",
    vibrate: [200, 100, 200, 100],
    tag: "vibration-sample",
  };

  console.log(
    event.waitUntil(
      self.registration.showNotification(pushMessage[0].title, options)
    )
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  
  const promiseChain = clients.openWindow(clickUrl);
  event.waitUntil(promiseChain);
});
