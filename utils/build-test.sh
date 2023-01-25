# These modules are used in tests, but use ESM (not CommonJS)
# Need to use esbuild to convert modules from ESM to CommonJS
#  (otherwise you'll get an error like "SyntaxError: Cannot use import statement outside a module")
npx esbuild @mdx-js/mdx --bundle --platform=node --outfile=vendor/mdx.js
npx esbuild remark-mdx-code-meta --bundle --platform=node --outfile=vendor/remark-mdx-code-meta.js