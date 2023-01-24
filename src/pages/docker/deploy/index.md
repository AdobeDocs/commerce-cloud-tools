---
title: Deploy the Docker environment
description: Deploy your Commerce application in a Docker environment designed for Production preview and testing or for Developer activities.
---

# Deploy the Docker environment

By default, Cloud Docker for Commerce deploys Adobe Commerce to a read-only file system in the Docker environment.

This deployment mirrors the read-only file system in the Production environment. You can deploy a Docker environment in developer mode, which provides an active development environment with full, writable file system permissions.

You use the `ece-docker build:compose` command to generate the Docker Compose configuration file from specified configuration settings and to deploy Adobe Commerce on cloud infrastructure to a local Docker environment. You supply the configuration settings from multiple sources depending on your requirements. See [Configure sources](../configure/configuration-sources.md).

<InlineAlert variant="warning" slots="text"/>

When you run the `ece-docker build:compose` command, it regenerates the `docker-compose.yml` configuration file and overwrites the existing `docker-compose.yml` configuration file. You can save custom configurations across builds by adding the settings to a `docker-compose.override.yml` file. See a detailed example in the [Docker quick reference](../quick-reference.md).

## Launch mode

You can launch a Docker environment in _production_ or _developer_ mode by setting the `mode` option on the `ece-docker build:compose` command:

-  **Production mode**—The `--mode="production"` setting supports an active production environment with read-only file system permissions. This is the default configuration setting for launching a Docker environment. Selecting this option builds the Docker environment in production mode and verifies configured service versions. See [Production mode launch instructions](production-mode.md).

-  **Developer mode**—The `--mode="developer"` setting supports an active development environment with full, writable file system permissions. Selecting this option builds the Docker environment in developer mode and verifies configured service versions. System performance is slower in developer mode because of additional file synchronization operations. See [Developer mode launch instructions](developer-mode.md).

For example, the following command starts the Docker configuration generator for the developer mode:

```bash
./vendor/bin/ece-docker build:compose --mode="developer"
```

To skip the interactive mode, use the `-n, --no-interaction` option.

<InlineAlert variant="info" slots="text"/>

The `mode` option for the `ece-docker build:compose` command does not affect the mode. It determines the Adobe Commerce on cloud infrastructure file system installation and read-only or read-write behavior.

## Stop and start containers

You can stop containers and restore them afterwards using the following methods.

| Action | Command |
| ------ | ------- |
| Suspend containers to continue your work later | `docker compose stop` |
| Stop and remove all containers, images, and volumes | `docker compose down` |
| Start containers from a suspended state | `docker compose start` |

Use the following command to stop and remove the Docker configuration:

```bash
docker compose down -v
```

<InlineAlert variant="warning" slots="text"/>

This command removes all components of your local Docker instance including containers, networks, volumes, and images except for the persistent database and the `magento-sync` volume. See [Rebuild a clean environment](../containers/index.md#rebuild-a-clean-environment).
