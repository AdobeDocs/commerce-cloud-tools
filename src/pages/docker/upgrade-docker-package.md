---
title: Upgrade the Docker package
description: Follow these steps to upgrade the Cloud Docker package.
---

# Upgrade Docker package

We recommend that you use the latest version of Cloud Docker for Commerce. The version requirement is specified in the `composer.json` file for your project. Use the following instructions for the upgrade process.

<InlineAlert variant="info" slots="text"/>

Cloud Docker for Commerce releases sometimes introduce changes to the format and options in the `docker-compose.yml` file. We recommend creating a backup of your existing `docker-compose.yml` file before upgrading so you can review the changes. If you have custom configurations that you want to preserve across builds, move them to the [`docker-compose.override.yml`](docker-quick-reference.md#override-configuration) file before you rebuild or upgrade the Docker environment.

**To update the Cloud Docker for Commerce package for On-premises projects:**

1. On your local workstation, update the Cloud Docker for Commerce package using Composer.

   ```bash
    composer update magento/magento-cloud-docker --with-dependencies
   ```

1. Add, commit, and push code changes.

   ```bash
   git add -A
   ```

   ```bash
   git commit -m "Update magento/magento-cloud-docker"
   ```

   ```bash
   git push origin <branch-name>
   ```

1. Preserve custom configuration.

After you upgrade to the latest version of Cloud Docker for Commerce, [stop and restart the Docker environment](docker-quick-reference.md).
