---
title: Production mode
description: Start the Docker environment in production mode.
---

# Production mode

Production mode simulates your Commerce application in production so that you can verify configured services.

Production mode is the default configuration setting for launching the Docker environment with read-only filesystem permissions.

**Prerequisites:**

Complete the [installation steps](../setup/initialize-docker.md).

**To launch the Docker environment in production mode**:

1. In your local environment, start the Docker configuration generator. You can use the service configuration options, such as `--php`, to [specify a version](../containers/index.md#service-configuration-options).

   ```bash
   ./vendor/bin/ece-docker build:compose
   ```

1. _Optional_: If you have a custom PHP configuration file, copy the default configuration DIST file to your custom configuration file and make any necessary changes.

   ```bash
   cp .docker/config.php.dist .docker/config.php
   ```

1. Build files to containers and run in the background.

   ```bash
   docker compose up -d
   ```

1. Install Adobe Commerce in your Docker environment.

   -  Build Adobe Commerce in the Docker container.

      ```bash
      docker compose run --rm build cloud-build
      ```

   -  Deploy Adobe Commerce in the Docker container.

      ```bash
      docker compose run --rm deploy cloud-deploy
      ```

   -  Run post-deploy hooks.

      ```bash
      docker compose run --rm deploy cloud-post-deploy
      ```

1. Configure and connect Varnish.

   ```bash
   docker compose run --rm deploy magento-command config:set system/full_page_cache/caching_application 2 --lock-env
   ```

   ```bash
   docker compose run --rm deploy magento-command setup:config:set --http-cache-hosts=varnish
   ```

1. Clear the cache.

   ```bash
   docker compose run --rm deploy magento-command cache:clean
   ```

1. _Optional_: Restart services if the static content does not synchronize with all images after generation on build phase.

   ```bash
   docker compose restart
   ```

1. Access the local storefront by opening one of the following URLs in a browser:

   -  `http://magento2.docker`

   -  `https://magento2.docker`

1. Use the default credentials to log in to the Admin (`https://magento2.docker/admin`).

   -  username = `Admin`
   -  password = `123123q`

1. Access the default email service: `http://magento2.docker:8025`

<InlineAlert variant="help" slots="text"/>

If you see the `Your connection is not private` error message while using an HTTPS connection, click **Advanced**, then click the **Proceed to magento2.docker (unsafe)** link. If you use Google Chrome and there is no **Advanced** button, then type `thisisunsafe` to bypass the security warnings. For `CURL` requests, add the `-k` or `--insecure` option to ignore certificate warnings.
