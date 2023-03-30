# Adobe Commerce Cloud Tools

This site contains the latest Adobe Commerce and Magento Open Source developer documentation for ongoing releases of Commerce Cloud Tools, including:

- **Cloud Docker**—For the Cloud Docker for Commerce source code, see the [magento-cloud-docker](https://github.com/magento/magento-cloud-docker) repository.

## Contributors

Our goal is to provide the Adobe Commerce and Magento Open Source communities with comprehensive and quality technical documentation. We believe that to accomplish that goal we need experts from the community to share their knowledge with us and each other. We are thankful to all of our contributors for improving the documentation.

See the [Contribution Guide](https://developer.adobe.com/commerce/contributor/) for details about contributing to Adobe Commerce and Magento Open Source developer documentation.

## Local development

This repository is a [Gatsby project](https://www.gatsbyjs.com/) that uses the [Adobe I/O Theme](https://github.com/adobe/aio-theme).

Install the following for local documentation site builds:

- [`node`](https://nodejs.org)— `brew node`
- [`corepack`](https://nodejs.org/api/corepack.html)— `brew corepack`

**To build and serve the site**:

1. Clone the repository and change to site directory.

1. Enable the `corepack` package.

   ```bash
   corepack enable
   ```

1. Set `yarn` to stable version and install.

   ```bash
   yarn set version stable
   ```

   ```bash
   yarn install
   ```

1. Build site dependencies.

   The `build` command is useful for refreshing the build artifacts without serving the site, but `yarn dev` performs this step.

   ```bash
   yarn build
   ```

1. Build site and serve preview on `localhost`.

   ```bash
   yarn dev
   ```

   Use CTRL + C to stop serving the site.

1. Clean local build artifacts.

   ```bash
   yarn clean
   ```

### Available Commands

| Command | Description |
| ------- | ----------- |
| `yarn build` | Compile site files. |
| `yarn clean` | Clean build artifacts. |
| `yarn dev` | Launch dev server preview. |
| `yarn serve` | Serve the existing site files for testing preview. |
| `yarn start` | Compile site files and serve for testing preview. |
| `yarn test:links` | Test for broken links. |

## Resources

See the following resources to learn more about using the theme:

- [Arranging content structure](https://github.com/adobe/aio-theme#content-structure)
- [Linking to pages](https://github.com/adobe/aio-theme#links)
- [Using assets](https://github.com/adobe/aio-theme#assets)
- [Configuring global navigation](https://github.com/adobe/aio-theme#global-navigation)
- [Configuring side navigation](https://github.com/adobe/aio-theme#side-navigation)
- [Using content blocks](https://github.com/adobe/aio-theme#jsx-blocks)
- [Writing enhanced Markdown](https://github.com/adobe/aio-theme#writing-enhanced-markdown)
- [Deploying the site](https://github.com/adobe/aio-theme#deploy-to-azure-storage-static-websites) _(Adobe employees only)_

If you have questions, open an issue and ask us. We look forward to hearing from you!
