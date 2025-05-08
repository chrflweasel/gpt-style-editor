# JSON Style Editor

A lightweight, web-based application for editing JSON style files used in AI image generation workflows, such as those for ChatGPT. Built with **React**, **TypeScript**, and **Material-UI**, this tool allows users to upload, edit, and export JSON files with a user-friendly, recursive interface.

## Features

- **JSON Upload**: Load JSON style files via a simple file input.
- **Recursive Editor**: Edit nested JSON structures with collapsible sections (using MUI Accordion).
- **Field Editing**: Modify string, number, and color fields intuitively:
    - String/number fields are editable via MUI TextField.
    - Color fields use MUI ColorPicker for hex color selection.
- **Export Options**:
    - Download the modified JSON as a `style.json` file.
    - Copy the JSON to the clipboard.
- **Type-Safe**: Built with TypeScript for robust type checking and maintainability.
- **Responsive Design**: Powered by Material-UI for a modern, accessible UI.

## Tech Stack

- **Frontend**: React, TypeScript, Material-UI, @mui/x-color-picker
- **Build Tool**: Vite
- **Deployment**: Vercel or Netlify (recommended)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/json-style-editor.git
   cd json-style-editor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

## Usage

1. Upload a JSON style file (e.g., one defining a "Digital Neon Wireframe" style).
2. Edit fields:
    - Click on string/number fields to edit them.
    - Use the color picker for hex color values.
3. Save changes and export:
    - Download the modified JSON as a file.
    - Copy the JSON to the clipboard for use in other applications.

## Example JSON

The editor is designed for JSON files like this:

```json
{
  "styleName": "Digital Neon Wireframe",
  "background": {
    "type": "gradient",
    "direction": "horizontal",
    "colors": ["#0A1F33", "#112B44"]
  },
  "mesh": {
    "pattern": "DelaunayTriangulation",
    "line": {
      "color": "#00CFFF",
      "width": 1.2,
      "opacity": 0.6
    }
  }
}
```

## Deployment

### Vercel
1. Push your repository to GitHub.
2. Sign up at [vercel.com](https://vercel.com).
3. Import your repository and deploy with default settings (root directory: `./`).

### Netlify
1. Push your repository to GitHub.
2. Sign up at [netlify.com](https://netlify.com).
3. Connect your repository, set the build command to `npm run build`, and the publish directory to `dist`.

## Future Improvements

- Array support (add/remove elements).
- Input validation (e.g., hex color formats).
- Style preview (e.g., render gradients or mesh patterns).
- Dark/light theme toggle.
- Cloud storage integration for saving JSON files.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your improvements.

## License

MIT License