# Banex Mall Build Rules

## 1) Build sequence (MANDATORY)
- Never build the whole site in one prompt
- Build one page at a time
- Build max 2 files per task
- Finish structure before polish
- Finish desktop before mobile refinement

## 2) File discipline
- HTML in page files only
- shared styles in `/styles`
- page-specific styles in `/styles/pages`
- shared JS in `/scripts`
- page logic in `/scripts/page`
- mock content only from `/data/*.json`

## 3) UI consistency
- Use tokens from `tokens.css`
- Never hardcode random spacing
- Reuse card classes
- Reuse badge classes
- Use same border radius scale
- Keep shadows soft and premium

## 4) Interaction rules
- hover lift on cards
- fade-up reveal for sections
- sticky nav transition on scroll
- no excessive animations
- prioritize smoothness over complexity

## 5) Safety rules for Roo stability
- one page per prompt
- one refinement pass after initial build
- no full-project rewrite prompts
- no more than 1 model active in same task
- save after each successful file batch
- snapshot working versions

## 6) Quality gate before next page
- spacing clean
- hero polished
- mobile responsive
- no console errors
- images correctly pathed
- no duplicated CSS
- CTA visible above fold