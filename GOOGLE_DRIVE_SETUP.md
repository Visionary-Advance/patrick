# Google Drive Gallery Setup Guide

This guide will help you set up the Google Drive API integration for the gallery page.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name your project (e.g., "Patrick Environmental Gallery")
4. Click "Create"

## Step 2: Enable Google Drive API

1. In your Google Cloud project, go to **APIs & Services** → **Library**
2. Search for "Google Drive API"
3. Click on "Google Drive API"
4. Click **Enable**

## Step 3: Create API Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **API Key**
3. Copy the API key (you'll need this for your .env.local file)
4. Click **Restrict Key** (recommended for security)
5. Under "API restrictions":
   - Select "Restrict key"
   - Check "Google Drive API"
6. Click **Save**

## Step 4: Prepare Your Google Drive Folder

1. Create a folder in Google Drive for your gallery images
2. Upload all images you want to display
3. Right-click the folder → **Share**
4. Click "Change to anyone with the link"
5. Set to **Viewer** access
6. Copy the folder URL (it will look like: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`)
7. Extract the `FOLDER_ID` from the URL (the long string after `/folders/`)

## Step 5: Configure Environment Variables

1. Create or edit the `.env.local` file in your project root
2. Add these lines:

```env
GOOGLE_DRIVE_API_KEY=your_api_key_here
GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here
```

Replace:
- `your_api_key_here` with the API key from Step 3
- `your_folder_id_here` with the folder ID from Step 4

## Step 6: Restart Your Dev Server

```bash
npm run dev
```

Visit `http://localhost:3000/gallery` to see your images!

## Troubleshooting

### "Missing Google Drive credentials" error
- Make sure `.env.local` exists in the project root
- Verify both `GOOGLE_DRIVE_API_KEY` and `GOOGLE_DRIVE_FOLDER_ID` are set
- Restart your development server after adding environment variables

### "Failed to fetch images" error
- Verify the folder is shared publicly (anyone with the link)
- Double-check the folder ID is correct
- Make sure the Google Drive API is enabled in your Google Cloud project
- Verify your API key has access to the Google Drive API

### Images not showing up
- Make sure there are image files in the folder (jpg, png, gif, etc.)
- Check that files are not in a subfolder (only files directly in the specified folder will show)
- Images are sorted by creation date (newest first)

### API quota limits
- Google Drive API has a free quota of 20,000 requests per day per project
- The gallery caches results for 5 minutes to reduce API calls
- For high-traffic sites, consider upgrading to a paid plan or implementing additional caching

## How It Works

1. When the gallery page loads, it calls `/api/gallery`
2. The API route fetches all image files from your Google Drive folder
3. Images are converted to direct view URLs: `https://drive.google.com/uc?export=view&id=FILE_ID`
4. The gallery displays images in a grid with lazy loading
5. Results are cached for 5 minutes to improve performance

## Adding New Images

Simply upload new images to your Google Drive folder! They will automatically appear in the gallery (may take up to 5 minutes due to caching).

Images are sorted by creation date (newest first), so your latest uploads will appear at the top of the gallery.
