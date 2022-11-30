---
title: Configuration sources
description: See an overview about the different configuration sources for the Cloud Docker for Commerce tool.
---

# Configuration sources

You can create the Docker Compose configuration to build and deploy the Docker containers for your Adobe Commerce project from the following sources:

-  [Adobe Commerce on cloud infrastructure project configuration files](#cloud-configuration-for-commerce) for Cloud projects
-  [Unified configuration](#unified-configuration) (`.magento.docker.yml`) for On-premises projects
-  [CLI configuration](#cli-configuration) using `ece-docker build:compose` command options
-  [Custom Docker Compose configuration file](custom-docker-compose.md) supports installation for both Cloud and On-premises projects

<InlineAlert variant="info" slots="text"/>

When you build the Docker Compose configuration file, the `ece-docker build:compose` command overwrites the existing `docker-compose.yml` configuration file. You can save customizations for the Docker Compose configuration in a `docker-compose.override.yml` file. If the `docker-compose.override.yml` file is present, then the override configuration merges with the base configuration. See [Override configuration](../quick-reference.md#override-configuration).

## Cloud configuration for Commerce

You need the following project configuration files to emulate a Cloud project in the Docker environment.

-  [.magento.app.yaml][application]
-  [.magento/services.yaml][services]

Typically, these files supply the configuration settings in the generated `docker-compose.yml` file when you build and deploy a Cloud Docker environment from an Adobe Commerce on cloud infrastructure project directory.

## Unified configuration

If you do not have or want to use the Adobe Commerce on cloud infrastructure configuration files, Cloud Docker for Commerce supports a unified configuration file, `.magento.docker.yml`.

This configuration file includes the following sections:

```conf
services: [] # List of services
variables: [] # List of environment variables
hooks: [] # List of available hooks
mounts: [] #l List of available mounts
```

### Services

The `services` section specifies the services configuration for the Docker environment with `version` and `enabled` fields.

```yaml
services:
  php:
    version: "7.3"
    enabled: true|false
```

-  `services` can include `php`, `mysql`, `redis`, `elasticsearch`, `rabbitmq`, `cron`, and so on
-  `version` specifies a [supported service version][Service configuration options]. The version must be compatible with the Adobe Commerce version you deploy.
-  `enabled` defaults to `true` if not set

#### PHP service

The PHP service has additional properties: `extensions.enabled` and `extensions.disabled`

```yaml
services:
  php:
    version: "7.2"
    extensions:
      enabled:
        - xsl
      disabled:
        - opcache
```

If `extensions.enabled` is not provided, the PHP service is installed with the default extensions.

#### Cron service

To enable cron, add the `cron` service.

```yaml
services:
  cron:
    jobs:
      run:
        schedule: "* * * * *"
        command: "php bin/magento cron:run"
```

### Hooks

The [hooks][] section specifies the hook name and command list:

```yaml
hooks:
  build: |
    set -e
    php ./vendor/bin/ece-tools run scenario/build/generate.xml
    php ./vendor/bin/ece-tools run scenario/build/transfer.xml
  deploy: |
    php ./vendor/bin/ece-tools run scenario/deploy.xml
  post_deploy: |
    php ./vendor/bin/ece-tools run scenario/post-deploy.xml
```

### Variables

The `variables` section specifies a configuration value to pass into the environment in the following format:

```yaml
variables:
  DUMMY_VARIABLE: "some value"
  DUMMY_ARRAY_VARIABLE:
    TEST_VALUE: "value"
    TEST_VALUE2: 2
```

Array variables must be encoded with base64 encoding for JSON.

### Mounts

The [mounts][] section specifies the path parameters for named mounts:

```yaml
# The mounts that will be performed when the package is deployed.
mounts:
  var:
    path: "var"
  app-etc:
    path: "app/etc"
  pub-media:
    path: "pub/media"
  pub-static:
    path: "pub/static"
```

The `path` is a required parameter to define a mounted volume. The value is a relative path in the container.

## CLI configuration

You can add options to the `ece-docker build:compose` command to quickly change the configuration when you build and deploy the Docker environment.

Use the command help to view the available options:

```bash
php ./vendor/bin/ece-docker build:compose -h
```

<InlineAlert variant="success" slots="text"/>

See [Service configuration options](../containers/index.md#service-configuration-options) for additional information about the service configuration options for the `ece-docker build:compose` command.

<!--Link definitions-->

[hooks]: https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/configure/app/properties/hooks-property.html
[application]: https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/configure/app/configure-app-yaml.html
[services]: https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/configure/app/configure-app-yaml.html
[mounts]: https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/configure/app/properties/properties.html#mounts
[available services]: https://experienceleague.adobe.com/docs/commerce-operations/installation-guide/system-requirements.html
