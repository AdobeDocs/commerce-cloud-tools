---
title: Manage cron jobs
description:
---

# Manage cron jobs

The [Cron container](containers-cli.md#cron-container) runs the scheduled cron jobs automatically based on the cron configuration defined in the [`crons` property of the `.magento.app.yaml` file][cron-property], and any custom configuration specified in the `docker-compose-override.yml` file.

<InlineAlert variant="info" slots="text"/>

dobe Commerce on cloud infrastructure includes a default cron configuration, which can be further customized in the `.magento.app.yaml` file. See [Set up cron jobs](manage-cron-jobs.md). You can also use the `docker-compose-override.yml` file to customize the Cron container configuration for Docker without updating the environment configuration for the Adobe Commerce on cloud infrastructure project. The custom settings are applied during the build and deploy process.

The Adobe Commerce cron implementation has the following limitations:

-  The `setup:cron:run` and `cron:update` commands are not available on Cloud and Docker for Cloud environments
-  In the Docker environment, cron works only with the CLI container to run the `./bin/magento cron:run` command

To improve the overall performance in the Docker development and production environments, the Cron container is not present by default. You can add the `--with-cron` option to the `ece-tools docker:build` command to enable the Cron container as needed.

```bash
./vendor/bin/ece-docker build:compose --mode="developer" --with-cron --sync-engine="mutagen"
```

**To view the cron log:**

```bash
docker-compose run --rm deploy bash -c "cat /app/var/cron.log"
```

**To run cron jobs manually:**

```bash
docker-compose run --rm cron /usr/local/bin/php bin/magento cron:run
```

<!-- link definitions -->

[cron-property]: https://devdocs.magento.com/cloud/project/magento-app-properties.html#crons
[Set up cron jobs]: https://devdocs.magento.com/cloud/configure/setup-cron-jobs.html
