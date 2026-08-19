/**
 * Parse YouTube or Vimeo link to return clean embed URL and platform info
 */
export function parseVideoUrl(url) {
if (!url) return { type: 'unknown', embedUrl: '' };

// YouTube match
const ytMatch = url.match(
/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
);
if (ytMatch && ytMatch[1]) {
return {
    type: 'youtube',
    videoId: ytMatch[1],
    embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?enablejsapi=1`,
};
}

// Vimeo match
const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
if (vimeoMatch && vimeoMatch[1]) {
return {
    type: 'vimeo',
    videoId: vimeoMatch[1],
    embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
};
}

return { type: 'custom', embedUrl: url };
}

export function getEmbedUrl(url) {
return parseVideoUrl(url).embedUrl;
}

/**
 * Auto-grab poster frame thumbnail from YouTube or Vimeo oEmbed API
 */
export async function fetchAutoPosterFrame(videoUrl) {
const { type, videoId } = parseVideoUrl(videoUrl);

try {
if (type === 'youtube' && videoId) {
    // High-res YouTube thumbnail
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

if (type === 'vimeo' && videoId) {
    const res = await fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}`);
    if (res.ok) {
    const data = await res.json();
    return data.thumbnail_url;
    }
}
} catch (error) {
console.error('Failed to auto-fetch poster frame:', error);
}

return '';
}
