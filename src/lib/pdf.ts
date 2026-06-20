import { extractText } from "unpdf";

export async function extractPDFText(
  buffer: Buffer
): Promise<string> {
  if (!buffer || buffer.length === 0) {
    throw new Error("PDF buffer is empty.");
  }

  try {
    const { text, totalPages } = await extractText(
      new Uint8Array(buffer),
      {
        mergePages: true,
      }
    );

    console.log(`PDF extracted successfully (${totalPages} pages)`);

    const cleanedText = text
      ?.replace(/\u0000/g, "")
      ?.replace(/\s+/g, " ")
      ?.trim();

    if (!cleanedText) {
      throw new Error("No readable text found in PDF.");
    }

    return cleanedText;
  } catch (error) {
    console.error("PDF Extraction Error:", error);

    if (error instanceof Error) {
      throw new Error(
        `Failed to extract PDF text: ${error.message}`
      );
    }

    throw new Error("Failed to extract text from PDF.");
  }
}