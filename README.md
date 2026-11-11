# Hasmukh Kumar – Static Portfolio

This version is a static, single-page portfolio for GitHub Pages. It does not require Django, Python, SQLite, a database, or a paid hosting service.

## Run locally
Open `index.html` in VS Code with the Live Server extension, or open it directly in a browser.

## Publish with GitHub Pages
1. Create a GitHub repository (for example, `hasmukh-portfolio`).
2. Upload the **contents of this folder** to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.

Your site will be published at `https://YOUR-USERNAME.github.io/hasmukh-portfolio/`.

## Project details and image galleries
The homepage contains exactly three project cards. Clicking a project card opens its details view without loading a separate HTML page. Each project has a gallery with:
- Previous / next controls
- Clickable thumbnails
- Keyboard left / right arrow navigation
- A responsive image layout

All project content is maintained in `assets/js/projects.js` in the `projects` object. To update a project's links, replace the empty values:

```js
github: "https://github.com/YOUR-USERNAME/YOUR-PROJECT",
live: "https://your-live-project.example",
```

If a link is left empty, its row/button is hidden automatically. No placeholder or invented repository URLs are displayed.

To add or remove gallery images, edit the relevant project's `images` array. Use paths relative to this folder, such as `assets/project_images/foodhub1.png`.

## Notes
- The project descriptions and technology labels are starter content based on the supplied project assets and previously shared project context. Review and update them before publishing.
- The contact section uses a `mailto:` link because a static GitHub Pages site cannot process form submissions by itself.
- Keep image paths and filenames unchanged unless you also update the corresponding paths in `assets/js/projects.js` and `index.html`.

## Contact form email delivery (one-time setup)

The contact form uses Web3Forms so visitors can send a message directly from the website without opening Outlook/Gmail and without running a backend or database.

1. Visit https://web3forms.com/ and create a free access key using **kumarhasmukh697@gmail.com** as the receiving email.
2. Open `index.html` and find `YOUR_WEB3FORMS_ACCESS_KEY`.
3. Replace that placeholder with the access key Web3Forms gives you.
4. Save and push the updated files to GitHub.

The first time you configure the service, Web3Forms may ask you to verify the receiving email address. Complete that verification. After the access key is configured, the form submits in the background and shows an on-page success or error message.

The access key is intended for browser-side form submissions. Do not put private SMTP passwords, Gmail app passwords, or other account credentials in this static website.
