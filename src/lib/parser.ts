/**
 * Parse uploaded files (PDF, DOCX, TXT) to extract text content.
 * Each parser returns the plain text extracted from the file.
 */

/**
 * Extract text from a TXT file buffer.
 */
export function parseTxt(buffer: ArrayBuffer): string {
  const decoder = new TextDecoder('utf-8');
  return decoder.decode(buffer);
}

/**
 * Extract text from a PDF file buffer using basic approach.
 * For production, consider using pdf.js or a cloud-based solution.
 */
export async function parsePdf(buffer: ArrayBuffer): Promise<string> {
  // In a browser/edge environment, we can use PDF.js
  // For the API route (Node.js), we use a different approach
  // This is a placeholder that reads raw text from the PDF
  const uint8 = new Uint8Array(buffer);
  const text = new TextDecoder('utf-8').decode(uint8);

  // Basic PDF text extraction - look for text between parentheses
  const textMatches = text.match(/\(([^)]*)\)/g) || [];
  const extracted = textMatches
    .map((m) => m.slice(1, -1))
    .filter((t) => t.length > 3)
    .join('\n');

  return extracted || 'Unable to extract text from PDF.';
}

/**
 * Extract text from a DOCX file buffer.
 * DOCX is a ZIP archive containing XML files.
 */
export async function parseDocx(buffer: ArrayBuffer): Promise<string> {
  // For DOCX parsing in the browser/edge runtime, we need a JS-based approach
  // In a real environment, you'd use a library like mammoth.js or docx
  // This is a simplified approach

  try {
    const uint8 = new Uint8Array(buffer);
    let text = new TextDecoder('utf-8').decode(uint8);

    // Try to find text in the document.xml inside the ZIP
    // Look for <w:t> tags in the raw bytes
    const textMatches = text.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
    if (textMatches.length > 0) {
      return textMatches
        .map((m) => {
          const content = m.replace(/<w:t[^>]*>/, '').replace(/<\/w:t>/, '');
          return content;
        })
        .filter((t) => t.trim().length > 0)
        .join(' ');
    }

    // Fallback: try to find any XML text content
    const fallbackMatches = text.match(/>([^<]{10,})</g) || [];
    if (fallbackMatches.length > 0) {
      return fallbackMatches
        .map((m) => m.slice(1, -1))
        .filter((t) => t.trim().length > 0)
        .join('\n');
    }

    return 'Unable to extract text from DOCX.';
  } catch {
    return 'Unable to extract text from DOCX.';
  }
}

/**
 * Extract text from a file based on its MIME type or extension.
 */
export async function parseFile(
  buffer: ArrayBuffer,
  fileName: string
): Promise<string> {
  const ext = fileName.split('.').pop()?.toLowerCase() || '';

  switch (ext) {
    case 'txt':
      return parseTxt(buffer);
    case 'pdf':
      return parsePdf(buffer);
    case 'docx':
      return parseDocx(buffer);
    default:
      throw new Error(`Unsupported file format: .${ext}`);
  }
}
