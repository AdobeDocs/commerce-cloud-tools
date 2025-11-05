---
title: Configure the Docker environment
description: Learn how to manage the Cloud Docker for Commerce environment with Composer updates, email, and host management.
keywords:
  - Cloud
  - Configuration
  - Docker
  - Tools
---

# Configure the Docker environment

Cloud Docker for Commerce uses Docker Compose to build and deploy Adobe Commerce to a multi-container Docker application.

You can generate the Docker Compose configuration to build and deploy Docker from the following sources:

- [Adobe Commerce on cloud infrastructure project configuration files](configuration-sources.md#cloud-configuration-for-commerce) for Cloud projects
- [Unified configuration](configuration-sources.md#unified-configuration) for On-premises projects
- [CLI configuration](configuration-sources.md#cli-configuration) using `ece-docker build:compose` command options to override configuration values at runtime
- [Custom Docker Compose configuration file](custom-docker-compose.md) supports installation for both Cloud and On-premises projects

<InlineAlert variant="info" slots="text"/>

When you build the Docker Compose configuration file, the `ece-docker build:compose` command overwrites the existing `docker-compose.yml` configuration file. You can save customizations for the Docker Compose configuration in a `docker-compose.override.yml` file. If the `docker-compose.override.yml` file is present, then the override configuration merges with the base configuration. See [Override configuration](../quick-reference.md#override-configuration).

## Run Composer with Docker

You can run composer using the `docker` command before you create the container instance. This technique is useful to create an application instance during the CI/CD build process, or even during first-time setup.

When you run composer with Docker commands, you must use the [Docker Hub PHP Image Tag][] that matches the Adobe Commerce application version. The following example uses PHP 7.3. You run this command from the project root directory.

```bash
docker run -it  -v $(pwd):/app/:delegated -v ~/.composer/:/root/.composer/:delegated magento/magento-cloud-docker-php:7.3-cli-1.1 bash -c "composer install&&chown www. /app/"
```

This command passes in the current working directory as `/app/`, includes composer from `~/.composer/`, and runs the `composer install` command in the container. After this set up, the command fixes the permissions on the files that have been added or changed.

## Update Composer for Docker

To update the Composer version in Cloud Docker, add the `COMPOSER_VERSION` variable to your `.docker/config.env` file with the version you want to use. For example, to use Composer 2.x with Adobe Commerce >=2.4.2:

```conf
COMPOSER_VERSION=2.0.12
```

When you build your Docker image with this variable, Cloud Docker uses this version to run `composer self-update $COMPOSER_VERSION` for your environment.

## Run Docker on a custom host and port

Sometimes you might want to run Docker on a different host and port, for example if you need more than one Docker instance.

**To configure the custom host and port**:

1. Add the `host` and `port` options to the `build:compose` command.

   ```bash
   ./vendor/bin/ece-docker build:compose --host=magento2.test --port=8080
   ```

1. Add or update the custom host name in your `/etc/hosts` file.

   ```conf
   127.0.0.1 magento2.test
   ```

   Alternatively, you can run the following command to add it to the file:

   ```bash
   echo "127.0.0.1 magento2.test" | sudo tee -a /etc/hosts
   ```

## Set up email

The default Cloud Docker for Commerce configuration includes the [MailHog](../containers/service.md#mailhog-container) service as a replacement for the Sendmail service. Sendmail can cause performance issues in the local Docker environment.

After you start the Docker environment, go to the following URL to access the MailHog service and view outgoing emails: `http://magento2.docker:8025`

\<!--Link definitions--\>

[Docker Hub PHP Image Tag]: https://hub.docker.com/r/magento/magento-cloud-docker-php/tags
