import type { Product } from "@/data/products";

const SHEETS_STORAGE_KEY = "sidra-sheets-url";

export const getSheetsUrl = () => localStorage.getItem(SHEETS_STORAGE_KEY) || "";
export const setSheetsUrl = (url: string) => localStorage.setItem(SHEETS_STORAGE_KEY, url);

/**
 * Converts a Google Sheets published CSV URL to products.
 * Sheet must be published to web as CSV with columns:
 * name, image, price, originalPrice, description, category, badge, inStock
 */
export async function fetchProductsFromSheet(csvUrl: string): Promise<Product[]> {
  if (!csvUrl) return [];

  // Convert various Google Sheets URL formats to CSV export
  let fetchUrl = csvUrl;
  if (csvUrl.includes("docs.google.com/spreadsheets")) {
    const match = csvUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      fetchUrl = `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv`;
    }
  }

  const res = await fetch(fetchUrl);
  if (!res.ok) throw new Error("Failed to fetch sheet");
  const text = await res.text();
  return parseCSV(text);
}

function parseCSV(csv: string): Product[] {
  const lines = csv.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase());
  const products: Product[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = (values[idx] || "").trim();
    });

    if (!row.name) continue;

    products.push({
      id: 1000 + i,
      name: row.name,
      image: row.image || "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
      price: Number(row.price) || 0,
      originalPrice: row.originalprice ? Number(row.originalprice) : undefined,
      description: row.description || "",
      category: row.category || "General",
      badge: row.badge || undefined,
      inStock: row.instock !== "false" && row.instock !== "0",
    });
  }

  return products;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}
