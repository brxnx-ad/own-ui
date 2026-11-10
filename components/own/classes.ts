import clsx, { type ClassValue } from "clsx";

// Let a consumer's content tone replace an earlier text color at the same state.
// Other Tailwind conflicts remain governed by the CSS cascade.
export default function classes(...inputs: ClassValue[]): string {
  const tokens = clsx(inputs).split(/\s+/).filter(Boolean);
  const result: string[] = [];

  for (const token of tokens) {
    let depth = 0;
    let split = -1;
    for (let i = 0; i < token.length; i++) {
      if (token[i] === "[" || token[i] === "(") depth++;
      else if (token[i] === "]" || token[i] === ")") depth--;
      else if (token[i] === ":" && depth === 0) split = i;
    }
    const prefix = token.slice(0, split + 1);
    const utility = token.slice(split + 1);
    if (/^text-content-(soft|base|bold)(?:\/[^ ]+)?!?$/.test(utility)) {
      for (let i = result.length - 1; i >= 0; i--) {
        const previous = result[i];
        if (!previous.startsWith(prefix)) continue;
        const candidate = previous.slice(prefix.length);
        if (/^text-(?:content-(?:soft|base|bold)|(?:gray|primary|success|warning|error|info|surface)-(?:soft|base|bold)|white|black|transparent|current|inherit)(?:\/[^ ]+)?!?$/.test(candidate)) result.splice(i, 1);
      }
    }
    result.push(token);
  }
  return result.join(" ");
}
