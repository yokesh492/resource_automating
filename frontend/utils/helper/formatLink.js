export default function formatLink(url) {
    try {
      const parsedUrl = new URL(url);
      return `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }
  }