// File: /app/api/gallery/route.js
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const API_KEY = process.env.GOOGLE_DRIVE_API_KEY;
    const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!API_KEY || !FOLDER_ID) {
      return Response.json(
        { error: 'Missing Google Drive credentials. Please set GOOGLE_DRIVE_API_KEY and GOOGLE_DRIVE_FOLDER_ID in .env.local' },
        { status: 500 }
      );
    }

    // Build the query with proper encoding
    const query = `'${FOLDER_ID}' in parents and mimeType contains 'image/'`;
    const encodedQuery = encodeURIComponent(query);

    const url = `https://www.googleapis.com/drive/v3/files?q=${encodedQuery}&key=${API_KEY}&fields=files(id,name,mimeType,thumbnailLink,webContentLink,createdTime)&orderBy=createdTime desc&pageSize=100`;

    console.log('Fetching from Google Drive API...');
    console.log('Folder ID:', FOLDER_ID);
    console.log('Query:', query);

    // Fetch files from Google Drive folder
    const response = await fetch(url, {
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      console.error('Google Drive API error:', errorData);
      return Response.json(
        {
          error: 'Failed to fetch images from Google Drive',
          details: errorData,
          statusCode: response.status
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    console.log(`Found ${data.files?.length || 0} images`);

    // Transform files into gallery format
    // Using direct lh3 URL without authuser parameter
    const images = data.files?.map(file => ({
      id: file.id,
      name: file.name,
      thumbnail: `https://drive.google.com/thumbnail?id=${file.id}&sz=w600`,
      fullSize: `https://lh3.googleusercontent.com/d/${file.id}`,
      mimeType: file.mimeType,
      createdTime: file.createdTime
    })) || [];

    return Response.json({ images, count: images.length });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return Response.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
