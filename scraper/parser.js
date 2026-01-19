// // scraper/parser.js

// export function isBlocked(rawText) {
//     if (!rawText) return true;
//     return rawText.includes("DOSarrest") || rawText.includes("Too Many Requests");
// }

// /**
//  * Split text into clean lines
//  */
// function cleanLines(rawText) {
//     return rawText
//         .split("\n")
//         .map(l => l.trim())
//         .filter(Boolean);
// }

// /**
//  * Extract agency & title using structural position
//  */
// function extractHeader(lines) {
//     const idx = lines.findIndex(
//         l => l === "INSTRUCTIONS" || l.startsWith("INSTRUCTIONS")
//     );
//     if (idx < 2) return { agency: "", title: "" };

//     let agency = lines[idx - 2];
//     let title = lines[idx - 1];

//     // Handle multi-line title like "(AEP)"
//     if (title.startsWith("(")) {
//         title = lines[idx - 2];
//         agency = lines[idx - 3] || "";
//     }

//     return { agency, title };
// }

// /**
//  * Extract sectioned content
//  */
// function extractSections(lines) {
//     const sections = {};
//     let current = null;

//     for (const line of lines) {
//         if (
//             line.endsWith("?") ||
//             [
//                 "About this grant",
//                 "Who can apply?",
//                 "When to apply?",
//                 "How much funding can you receive?",
//                 "How to apply?"
//             ].includes(line)
//         ) {
//             current = line;
//             sections[current] = [];
//             continue;
//         }

//         if (current) {
//             sections[current].push(line);
//         }
//     }

//     return {
//         about: sections["About this grant"]?.join(" ") || "",
//         whoCanApply: sections["Who can apply?"]?.join(" ") || "",
//         whenToApply: sections["When to apply?"]?.join(" ") || "",
//         howMuchFunding:
//             sections["How much funding can you receive?"]?.join(" ") || "",
//         howToApply: sections["How to apply?"]?.join(" ") || ""
//     };
// }

// export function extractFunding(rawText) {
//     const match = rawText.match(
//         /(Up to\s+S?\$[\d,]+[^.\n]*|capped at\s+\$[\d,]+)/i
//     );
//     return match ? match[0] : "";
// }

// export function extractCategories(rawText) {
//     const keywords = [
//         "Care",
//         "Community",
//         "Youth",
//         "Health",
//         "Education",
//         "Arts",
//         "Social Service",
//         "Heritage",
//         "Sport"
//     ];

//     return keywords.filter(k => rawText.includes(k));
// }

// /**
//  * MAIN PARSER
//  */
// export function parseGrant(grant) {
//     const { url, rawText } = grant;
//     if (isBlocked(rawText)) return null;

//     const lines = cleanLines(rawText);
//     const { agency, title } = extractHeader(lines);
//     const info = extractSections(lines);

//     return {
//         url,
//         agency,
//         title,
//         funding: extractFunding(rawText),
//         categories: extractCategories(rawText),
//         info
//     };
// }
