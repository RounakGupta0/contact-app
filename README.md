# Contact App (React + Vite)

Small contact-management demo built with React and Vite. Features a contact list, add/edit/delete flow, image upload with preview, and a custom CSS loader.

## Features
- List contacts fetched from a simple REST API
- Add / edit / delete contacts (with image upload via multipart/form-data)
- Local image preview before upload (circular preview)
- Responsive layout for small screens
- Lightweight CSS spinner (no external icon required)

## Quick start

1. Install dependencies

```bash
npm install
```

2. Run the development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

## Project structure (important files)
- `index.html` — app root and global scripts
- `src/main.jsx` — React entry
- `src/App.jsx` — top-level app wrapper
- `src/Contact.jsx` — main contact list / form component
- `src/App.css` — global styles (includes responsive rules and image preview styles)

## Notes & tips
- The contact API URL is set in `src/Contact.jsx`. Replace it with your backend if needed.
- Image previews use `URL.createObjectURL` and are revoked on form reset.
- The loader uses a CSS spinner (`.loader-spinner`) so the app does not require Font Awesome for that purpose.
- Tables become horizontally scrollable on smaller screens to avoid layout breakage.

## Contributing
Feel free to open issues or send PRs. Keep changes focused (styles, responsiveness, or API integration updates welcome).

## License
This project is provided as-is. Add a license file if you plan to reuse or distribute it.
