---
title: Docker development quick reference
description: See a list of common Docker commands.
---

# Cloud Docker quick reference

This Quick Reference provides information about using Docker Compose commands, the Docker Compose configuration generator, and the Cloud Docker for Commerce CLI to configure, deploy, and use your Docker environment for application development. See the following topics for more detailed instructions:

-  [Install prerequisites](initialization.md)
-  [Deploy environment](deploy-docker-environment.md)
-  [Configure and manage your project and environment](manage-docker-environment.md)

## Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications. The following table lists the `docker-compose` commands for building, deploying, and operating Cloud Docker for Commerce. You can also use [Cloud Docker CLI](#cloud-docker-cli) commands to complete Docker Compose tasks.

| Action                                                | Command                                                    |
| :---------------------------------------------------- | :--------------------------------------------------------- |
| Build and start Docker environment                    | `docker-compose up -d`                                     |
| Build environment                                     | `docker-compose run --rm build cloud-build`                |
| Deploy environment                                    | `docker-compose run --rm deploy cloud-deploy`              |
| Run post-deploy hooks                                 | `docker-compose run --rm deploy cloud-post-deploy`         |
| Connect to CLI container                              | `docker-compose run --rm deploy bash`                      |
| Use `ece-tools` command                    | `docker-compose run --rm deploy ece-command <command>`     |
| Use Magento command                                   | `docker-compose run --rm deploy magento-command <command>` |
| Stop and remove Docker environment (removes volumes)  | `docker-compose down -v`                                   |
| Stop Docker environment without destroying containers | `docker-compose stop`                                      |
| Resume Docker environment                             | `docker-compose start`                                     |
| List images                                           | `docker-compose images`                                    |
| List containers and ports                             | `docker-compose ps` or `docker ps`                         |

<InlineAlert variant="info" slots="text"/>

The `--rm` option automatically removes containers when they stop. This setting overrides any restart policy specified in the service configuration and prevents orphaned containers from consuming excess disk space. See [`docker-compose run`][] in the _Docker command-line reference_.

## Docker Compose configuration generator

Use the Cloud Docker for Commerce `.vendor/bin/ece-docker build:compose` CLI commands to generate the Docker configuration files and build your environment.

Use the following command to view the available build options:

```bash
php ./vendor/bin/ece-docker build:compose -h
```

<InlineAlert variant="info" slots="text"/>

See [Service versions](containers.md) for additional information about the service configuration options for the `ece-docker build:compose` command.

### Override configuration

Because the `ece-docker build:compose` command overwrites the base configuration, we recommend saving your customizations in an override configuration file. You can use this method to merge multiple custom configurations. See [Docker Docs: Multiple Compose files][].

The `docker-compose up` command considers the base `docker-compose.yml` configuration by default. If the `docker-compose.override.yml` file is present, then the override configuration merges with the base configuration.

Use the `-f` argument to specify an alternate configuration file. The following example uses the default configuration and merges each custom configuration sequentially:

```bash
docker-compose -f docker-compose.yml -f docker-compose-custom.yml [-f more-custom-docker-compose.yml] up
```

## Cloud Docker CLI

Use the Cloud Docker for Commerce `bin/magento-docker` CLI commands to run `docker-compose` tasks more efficiently. For example, instead of using a separate `docker-compose` command for the build, deploy, and post-deploy tasks in the Docker environment, you can use the `ece-redeploy` command to complete all tasks.

```bash
./bin/magento-docker ece-redeploy
```

The following example shows the `./bin/magento-docker` command and output when connecting to the bash shell:

```bash
./bin/magento-docker bash
```

```terminal
Starting project_redis_1 ... done
Starting project_db_1    ... done
Starting project_elasticsearch_1 ... done
[ ok ] Starting enhanced syslogd: rsyslogd.
root@deploy:/app#
```

| Action                                                                                                         | Command                                |
| :------------------------------------------------------------------------------------------------------------- | :------------------------------------- |
| Connect to bash shell                                                                                          | `./bin/magento-docker bash`            |
| Pull the latest images                                                                                         | `./bin/magento-docker pull`            |
| Build application                                                                                              | `./bin/magento-docker ece-build`       |
| Deploy application                                                                                             | `./bin/magento-docker ece-deploy`      |
| Run post-deploy hooks                                                                                          | `./bin/magento-docker ece-post-deploy` |
| Re-build and redeploy application                                                                             | `./bin/magento-docker ece-redeploy`    |
| Stop containers                                                                                                | `./bin/magento-docker stop`            |
| Start containers                                                                                               | `./bin/magento-docker start`           |
| Restart containers                                                                                             | `./bin/magento-docker restart`         |
| Destroy containers                                                                                             | `./bin/magento-docker down`            |
| Destroy, re-create, and start containers                                                                       | `./bin/magento-docker up`              |
| Clears Redis cache                                                                                             | `./bin/magento-docker flush-redis`     |
| Clears Varnish cache                                                                                           | `./bin/magento-docker flush-varnish`   |
| Access database                                                                                                | `./bin/magento-docker ece-db`          |
| Run a command in a PHP container<br/>Supports the following values for the PHP version: 7.1, 7.2, 7.3, 7.4, 8.0 | `./bin/magento-docker php <version>`   |

Use the following command to view the magento-docker CLI command help:

```bash
./bin/magento-docker -h
```

<!-- Link definitions -->

[Docker Docs: Multiple Compose files]: https://docs.docker.com/compose/extends/#multiple-compose-files
[`docker-compose run`]: https://docs.docker.com/compose/reference/run/
