# Adobe Commerce Cloud Tools

This repository contains the content for Commerce Cloud Tools, including:

- **Cloud Docker**—For the tool, see the [magento-cloud-docker](https://github.com/magento/magento-cloud-docker) repository.

Install the following for local documentation site builds:

- [node](https://nodejs.org)— `brew node`
- [corepack](https://nodejs.org/api/corepack.html)— `brew corepack`

## Build local and preview the site

1. Clone site and change to site directory.

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

   ```bash
   yarn build
   ```

1. Build site on localhost.

   ```bash
   yarn dev
   ```

   Use CTRL + C to stop serving the site.

1. After you finish with preview, you can clean local build artifacts.

   ```bash
   yarn clean
   ```

   You can use `yarn dev` to launch the site again.

## Repository Template

This repository uses a site template built with the [Adobe I/O Theme](https://github.com/adobe/aio-theme).

View the [demo](https://adobedocs.github.io/dev-site-documentation-template/) running on Github Pages.

### Where to ask for help

The slack channel #adobeio-onsite-onboarding is our main point of contact for help. Feel free to join the channel and ask any questions.

For the documentation developer, please read these sections on how to:

- [Arrange the structure content of your docs](https://github.com/adobe/aio-theme#content-structure)
- [Linking to pages](https://github.com/adobe/aio-theme#links)
- [Using assets](https://github.com/adobe/aio-theme-aio#assets)
- [Setting Global Navigation](https://github.com/adobe/aio-theme#global-navigation)
- [Setting Side Navigation](https://github.com/adobe/aio-theme#side-navigation)
- [Using content blocks](https://github.com/adobe/aio-theme#jsx-blocks)
- [Notes on using Markdown](https://github.com/adobe/aio-theme#writing-enhanced-markdown)

For more in-depth [instructions](https://github.com/adobe/aio-theme#getting-started).

### How to deploy

For any team that wishes to deploy to the adobe.io and stage.adobe.io website, they must be in contact with the dev-site team. Teams will be given a path that will follow the pattern `adobe.io/{product}/`. This will allow doc developers to setup their subpaths to look something like:

```terminal
adobe.io/{product}/docs
adobe.io/{product}/community
adobe.io/{product}/community/code_of_conduct
adobe.io/{product}/community/contribute
```

#### Launching a deploy

You can deploy using the GitHub actions deploy workflow see [deploy instructions](https://github.com/adobe/aio-theme#deploy-to-azure-storage-static-websites).
