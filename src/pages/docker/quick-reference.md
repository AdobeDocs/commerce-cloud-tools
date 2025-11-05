---
title: Docker development quick reference
description: See a list of common Docker commands.
keywords:
  - Cloud
  - Docker
  - Tools
---

# Cloud Docker quick reference

A quick reference of common commands for Docker Compose and Cloud Docker for Commerce CLI.

## Docker Compose

Cloud Docker for Commerce uses the Docker Compose tool. The commands reflected in this guide are based on the latest usage defined in the [docker compose CLI reference](https://docs.docker.com/compose/reference/).

The following table lists the `docker compose` commands for building, deploying, and operating Cloud Docker for Commerce.

| Action                                                | Command                                                    |
| :---------------------------------------------------- | :--------------------------------------------------------- |
| Build and start Docker environment                    | `docker compose up -d`                                     |
| Build environment                                     | `docker compose run --rm build cloud-build`                |
| Deploy environment                                    | `docker compose run --rm deploy cloud-deploy`              |
| Run post-deploy hooks                                 | `docker compose run --rm deploy cloud-post-deploy`         |
| Connect to CLI container                              | `docker compose run --rm deploy bash`                      |
| Use `ece-tools` command                               | `docker compose run --rm deploy ece-command <command>`     |
| Use Magento command                                   | `docker compose run --rm deploy magento-command <command>` |
| Stop and remove Docker environment (removes volumes)  | `docker compose down -v`                                   |
| Stop Docker environment without destroying containers | `docker compose stop`                                      |
| Resume Docker environment                             | `docker compose start`                                     |
| List images                                           | `docker compose images`                                    |
| List containers and ports                             | `docker compose ps` or `docker ps`                         |

<InlineAlert variant="info" slots="text"/>

The `--rm` option automatically removes containers when they stop. This setting overrides any restart policy specified in the service configuration and prevents orphaned containers from consuming excess disk space. See [`docker composer run`](https://docs.docker.com/engine/reference/commandline/compose_run/) in the _Docker command-line reference_.

## Configuration generator

Use the Cloud Docker for Commerce `.vendor/bin/ece-docker build:compose` CLI commands to generate the Docker configuration files and build your environment.

Use the following command to view the available build options:

```bash
php ./vendor/bin/ece-docker build:compose -h
```

<InlineAlert variant="info" slots="text"/>

See [Service versions](containers/index.md) for additional information about the service configuration options for the `ece-docker build:compose` command.

### Override configuration

Because the `ece-docker build:compose` command overwrites the base configuration, Adobe recommends saving your customizations in an override configuration file. You can use this method to merge multiple custom configurations. See [Docker Docs: Multiple Compose files](https://docs.docker.com/compose/extends/#multiple-compose-files).

The `docker compose up` command considers the base `docker compose.yml` configuration by default. If the `docker compose.override.yml` file is present, then the override configuration merges with the base configuration.

Use the `-f` argument to specify an alternate configuration file. The following example uses the default configuration and merges each custom configuration sequentially:

```bash
docker compose -f docker compose.yml -f docker compose-custom.yml [-f more-custom-docker compose.yml] up
```

## Cloud Docker CLI

Use the Cloud Docker for Commerce `bin/magento-docker` CLI commands to run `docker compose` tasks more efficiently. For example, instead of using a separate `docker compose` command for the build, deploy, and post-deploy tasks in the Docker environment, you can use the `ece-redeploy` command to complete all tasks.

```bash
./bin/magento-docker ece-redeploy
```

Use the following to connect to the bash shell and begin using the Cloud Docker CLI:

```bash
./bin/magento-docker bash
```

| Action                                                                                                            | Command                                |
|:------------------------------------------------------------------------------------------------------------------| :------------------------------------- |
| Connect to bash shell                                                                                             | `./bin/magento-docker bash`            |
| Pull the latest images                                                                                            | `./bin/magento-docker pull`            |
| Build application                                                                                                 | `./bin/magento-docker ece-build`       |
| Deploy application                                                                                                | `./bin/magento-docker ece-deploy`      |
| Run post-deploy hooks                                                                                             | `./bin/magento-docker ece-post-deploy` |
| Re-build and redeploy application                                                                                 | `./bin/magento-docker ece-redeploy`    |
| Stop containers                                                                                                   | `./bin/magento-docker stop`            |
| Start containers                                                                                                  | `./bin/magento-docker start`           |
| Restart containers                                                                                                | `./bin/magento-docker restart`         |
| Destroy containers                                                                                                | `./bin/magento-docker down`            |
| Destroy, re-create, and start containers                                                                          | `./bin/magento-docker up`              |
| Clears Redis cache                                                                                                | `./bin/magento-docker flush-redis`     |
| Clears Varnish cache                                                                                              | `./bin/magento-docker flush-varnish`   |
| Access database                                                                                                   | `./bin/magento-docker ece-db`          |
| Run a command in a PHP container\<br/\>Supports the following values for the PHP version: 7.1, 7.2, 7.3, 7.4, 8.0 | `./bin/magento-docker php <version>`   |

<InlineAlert variant="help" slots="text1, text2"/>

Use the following command to view the magento-docker CLI command help:

```bash
./bin/magento-docker -h
```
