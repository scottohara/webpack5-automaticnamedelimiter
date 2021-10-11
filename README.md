See: https://github.com/webpack/webpack/discussions/14451

This repository is intended to demonstrate differences between file names produced by webpack 4 vs webpack 5.

The main question is poses is whether `splitChunks.automaticNameDelimiter` is still used in webpack 5.

## Notes:
* `splitChunks.minSize: 0` is used to force webpack to create more output files. Normally this would be discouraged.
* `splitChunks.automaticNameDelimiter: '%'` is used so that we can observe if/how it impacts file names.
* The same webpack config is used for both v4 and v5, with the only difference being how the output directory is cleaned between each bundle run (v4 uses `CleanWebpackPlugin`, v5 uses `output.clean: true`).

## Source files:
* `a.js` and `b.js` both import a module from `c.js`

# Initial setup:
1. Clone this repository (`git clone https://github.com/scottohara/webpack5-automaticnamedelimiter.git`)
2. Change into the directory (`cd webpack5-automaticnamedelimiter`)

# Webpack 4.46.0
3. Checkout the v4 branch (`git checkout v4`)
4. Install dependencies (`npm install`)
5. Bundle (`webpack`)
6. Inspect the contents of the `/dist` directory. Note that the files are:

```shell
a.js
a%b.js
b.js
```

# Webpack 5.58.1
7. Switch to the v5 branch (`git checkout v5`)
8. Install dependencies (`npm install`)
9. Bundle (`webpack`)
10. Inspect the contents of the `/dist` directory. Note that the files are:

```shell
a.js
b.js
src_c_js.js
```

# Results
In both v4 and v5, code that is shared by `a.js` and `b.js` is extracted to it own chunk.

In v4, the name of the shared chunk is the entry chunk names delimited by the `splitChunks.automaticNameDelimiter`.
By default, this chunk would have normally been given the name `a~b.js`, but since we have overridden the default delimiter from `~` to `%`, the name becomes `a%b.js`.

In v5, the name of the shared chunk appears to be the path to the original source file (`src/c.js`), with path separators replaced with underscores, giving `src_c_js.js`.
The `splitChunk.automaticNameDelimiter` does not appear to be used at all.