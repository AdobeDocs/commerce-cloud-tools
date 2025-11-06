---
title: Developer mode
description: Start the Docker environment in developer mode.
keywords:
  - Cloud
  - Deploy
  - Docker
  - Tools
---

# Developer mode

Developer mode supports an active development environment with full, writable file system permissions.

This option builds the Docker environment in developer mode and verifies configured service versions. On macOS and Windows systems, performance is slower in developer mode because of additional file synchronization operations. However, you can improve performance by using either the `manual-native` or the `mutagen` file synchronization option when you generate the `docker-compose.yml` file. See [Synchronizing data in Docker](../setup/synchronize-data.md).

<InlineAlert variant="info" slots="text"/>

The `ece-tools` package supports developer mode starting with version 2002.0.18.

Large files (>1 GB) can cause a period of inactivity. DB dumps and archive files—ZIP, SQL, GZ, and BZ2—are not necessary to sync. You can find exclusions to these file types in the `mutagen.sh` file.

**Prerequisites:**

-  Complete the [installation steps](../setup/initialize-docker.md).
-  [Install file synchronization tools](../setup/synchronize-data.md) if needed.

**To launch the Docker environment in developer mode**:

1. In your local project root, generate the Docker Compose configuration file. You can use the service configuration options, such as `--php`, to [specify a version](../containers/index.md#service-configuration-options).

   ```bash
   ./vendor/bin/ece-docker build:compose --mode="developer"
   ```

   \<!-- \<InlineAlert variant="info" slots="text"/\> --\>

   The `--mode` option in this step determines the mode in a later `deploy` step.

   If necessary, set the option for synchronizing data in Docker. For example:

   ```bash
   ./vendor/bin/ece-docker build:compose --mode="developer" --sync-engine="mutagen"
   ```

   \<!-- \<InlineAlert variant="help" slots="text"/\> --\>

   You can further customize the Docker Compose configuration file by adding additional options to the `build:compose` command. For example, you can set the software version for a service, or add Xdebug configuration. See [service configuration options](../containers/index.md#service-configuration-options).

1. _Optional_: If you have a custom PHP configuration file, copy the default configuration DIST file to your custom configuration file and make any necessary changes.

   ```bash
   cp .docker/config.php.dist .docker/config.php
   ```

1. Build files to containers and run in the background.

   ```bash
   docker compose up -d
   ```

1. If you selected the `manual-native` option, start the file synchronization.

   **To copy all data from the local machine to the Docker volume:**

   ```bash
   ./bin/magento-docker copy-to --all
   ```

   Also, you can provide a specific directory from the local machine to copy to the Docker volume, for example `vendor`:

   ```bash
   ./bin/magento-docker copy-to vendor
   ```

   **To copy all data from the Docker volume to the local machine:**

   ```bash
   ./bin/magento-docker copy-from --all
   ```

   Also, you can provide a specific directory from the Docker volume to copy from, such as `vendor`:

   ```bash
   ./bin/magento-docker copy-from vendor
   ```

1. If you selected `mutagen` for file synchronization, start the file synchronization.

   ```bash
   bash ./mutagen.sh
   ```

   **Important**:

   If you host your Docker environment on Windows and the session start fails, update the `mutagen.sh` file to change the value for the `--symlink-mode` option to `portable`.

1. Install Adobe Commerce in your Docker environment.

   -  For Adobe Commerce version 2.4 and 2.4.1 only, apply patches before you deploy.

      ```bash
      docker compose run --rm deploy php ./vendor/bin/ece-patches apply
      ```

   -  Deploy Adobe Commerce in the Docker container.

      ```bash
      docker compose run --rm deploy cloud-deploy
      ```

   -  Run post-deploy hooks.

       ```bash
       docker compose run --rm deploy cloud-post-deploy
       ```

   \<!-- \<InlineAlert variant="info" slots="text"/\> --\>

   Developer mode does not require the `build` operation.

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

1. Access the local storefront by opening one of the following URLs in a browser:

   -  `http://magento2.docker`

   -  `https://magento2.docker`

1. Use the default credentials to log in to the Admin (`https://magento2.docker/admin`).

   -  username = `Admin`
   -  password = `123123q`

1. Access the default email service: `http://magento2.docker:8025`

<InlineAlert variant="help" slots="text"/>

If you see the `Your connection is not private` error message while using an HTTPS connection, click **Advanced**, then click the **Proceed to magento2.docker (unsafe)** link. If you use Google Chrome and there is no **Advanced** button, then type `thisisunsafe` to bypass the security warnings. For `CURL` requests, add the `-k` or `--insecure` option to ignore certificate warnings.
