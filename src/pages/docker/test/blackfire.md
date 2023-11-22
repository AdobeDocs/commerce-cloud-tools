---
title: Configure Blackfire
description: Learn how to configure Blackfire and automate performance testing.
keywords:
  - Cloud
  - Docker
  - Performance
  - Tools
---

# Configure Blackfire

You can add Blackfire to your Cloud Docker for Commerce environment to fully automate performance testing.

Blackfire.io for Adobe Commerce on cloud infrastructure is a PHP profiler and automated performance testing tool for use in development, integration, staging, and production environments. It enables you to locate and investigate performance issues in your environment at the code level and creates a performance profile by tracking every PHP call, method, and SQL query performed by your code.

<InlineAlert variant="warning" slots="text"/>

You must have a Blackfire license and account to use Blackfire with Adobe Commerce on cloud infrastructure projects. See [Adobe Commerce Cloud support][commerce] or [Blackfire for Magento][magento] on the _Blackfire.io website_.

**To add Blackfire.io to your project configuration**:

1. Add the following Blackfire.io configuration to the `runtime:extensions` section of the `.magento.app.yaml` file.

   ```yaml
   runtime:
     extensions:
       - random-extension-here
       -
         name: blackfire
         configuration:
           server_id: SERVER_ID
           server_token: SERVER_TOKEN
           client_id: CLIENT_ID
           client_token: CLIENT_TOKEN
   ```

1. Generate the `docker-compose.yml` file for developer mode, adding any required [build or service configuration options](../quick-reference.md) and [file synchronization options](../setup/synchronize-data.md#file-synchronization-options) if needed.

   ```bash
   ./vendor/bin/ece-docker build:compose --mode="developer"
   ```

1. Start the Cloud Docker for Commerce environment.

   ```bash
   ./bin/magento-docker up
   ```

   ```bash
   ./bin/magento-docker ece-redeploy
   ```

   <!-- <InlineAlert variant="info" slots="text"/> -->

   If you are using file synchronization, synchronize files as needed. See [Launch Docker in developer mode](../deploy/developer-mode.md).

1. Add context to use locally customized PHP images as described in [Extend the Docker configuration](../configure/extend-docker-configuration.md).

1. Install Adobe Commerce in your Docker environment.

   -  Deploy Adobe Commerce in the Docker container.

      ```bash
      docker compose run --rm deploy cloud-deploy
      ```

      ```bash
      docker compose run --rm deploy magento-command deploy:mode:set developer
      ```

   -  Run post-deploy hooks.

      ```bash
      docker compose run --rm deploy cloud-post-deploy
      ```

   <!-- <InlineAlert variant="help" slots="text"/> -->

   Review messages and notifications during the deployment process and address any errors or notifications as needed.

1. Enable the Varnish cache for the Adobe Commerce application.

   ```bash
   docker compose run --rm deploy magento-command config:set system/full_page_cache/caching_application 2 --lock-env
   ```

   ```bash
   docker compose run --rm deploy magento-command setup:config:set  --http-cache-hosts=varnish
   ```

1. Clear the cache.

   ```bash
   docker compose run --rm deploy magento-command cache:clean
   ```

1. Make sure that necessary containers are up and running.

   ```bash
   docker compose ps
   ```

**To use Blackfire.io for performance testing in Cloud Docker**:

1. Install a profiling client as described in the [Blackfire documentation][].

1. Profile the Adobe Commerce website.

<!--Link definitions-->

[magento]: https://blackfire.io/magento
[commerce]: https://docs.blackfire.io/integrations/paas/adobe-commerce-cloud
[Blackfire documentation]: https://docs.blackfire.io/php/training-resources/book/04-first-profile
