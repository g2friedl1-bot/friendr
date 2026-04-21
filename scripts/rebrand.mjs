import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { join, extname } from "path";

function walk(dir) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      walk(full);
    } else if ([".tsx", ".ts"].includes(extname(entry))) {
      let content = readFileSync(full, "utf8");
      const original = content;
      // Order matters: more specific first
      content = content
        .replace(/orange-500\/10/g, "brand/10")
        .replace(/orange-500\/15/g, "brand/15")
        .replace(/orange-500\/20/g, "brand/20")
        .replace(/orange-500\/30/g, "brand/30")
        .replace(/orange-500\/40/g, "brand/40")
        .replace(/orange-500\/50/g, "brand/50")
        .replace(/orange-500\/60/g, "brand/60")
        .replace(/orange-500/g, "brand")
        .replace(/orange-400/g, "brand-light")
        .replace(/orange-300/g, "brand-light")
        .replace(/amber-400/g, "brand-light")
        .replace(/amber-500/g, "brand");
      if (content !== original) {
        writeFileSync(full, content, "utf8");
        console.log("Updated:", full);
      }
    }
  }
}

walk("src");
console.log("Done.");
