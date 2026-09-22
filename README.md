# My Prayerbook

A traditional Catholic prayerbook for a very busy life, as an installable
offline app. Same deployment pattern as catechism-quest.

## Put it online (GitHub Pages)

1. New repository named `prayerbook`, **Public**, no README needed.
2. "uploading an existing file" → drag in `index.html`, `manifest.json`,
   `sw.js` and the whole `icons` folder. Commit.
3. Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
4. Live at **https://mjbaguhin.github.io/prayerbook/** after a minute or two.

## Install it on the phone

**Android:** open that address in Chrome → three dots → **Install app**
(or use the Install button inside the prayerbook itself). It lands in the
app drawer with the gold cross icon, opens full screen, works with no data.

**iPhone:** Safari → Share → **Add to Home Screen**. Apple blocks the
install prompt, but the result is the same.

Long-pressing the installed icon on Android gives a shortcut straight to
the emergency prayer.

## Files

| file | what it does |
|---|---|
| `index.html` | the whole prayerbook — all 26 prayers, no dependencies |
| `manifest.json` | makes Chrome treat it as an app, not a page |
| `sw.js` | precaches everything so it opens offline |
| `icons/` | home screen and app drawer icons |

## Editing the prayers later

Prayer text lives in the `P` array near the top of the `<script>` block in
`index.html`. Categories are the `CATS` array above it — each prayer's
`cat` must match a category `id`.

**After any edit, bump the cache version in `sw.js`** (`prayerbook-v1` →
`prayerbook-v2`). Without that, already-installed phones keep serving the
old copy from cache.

## Notes

- Not deployable via Apps Script — a deployed Apps Script web app runs in a
  sandboxed `googleusercontent.com` frame, so the service worker can't
  register and there's no install prompt or offline mode.
- Marks, pauses, text size and night mode are stored in `localStorage`,
  per device. Nothing is sent anywhere; there is no backend.
- For a real `.apk` or a Play Store listing, paste the Pages URL into
  pwabuilder.com → Package for stores → Android. Play Console is a one-time
  $25 and needs a privacy policy, so only worth it for a public listing.
