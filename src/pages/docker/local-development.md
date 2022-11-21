---
title: Prerequisites for local development
description: placeholder
---

# Prerequisites for local development

To use Docker as your local development method, you should be familiar with and install the following software:

- [Docker](https://www.docker.com/get-started)
- Developer mode on macOS systems might require the [Mutagen](https://mutagen.io/documentation/introduction/installation) option for file synchronization.
- [Git](https://git-scm.com) for interaction between your local system and Adobe Commerce on cloud infrastructure source repositories
- Optional:
   - PHP version 8.1
   - [Composer](https://getcomposer.org) version 2.2.4

## Docker engine

Cloud Docker for Commerce requires the following Docker resources to support local Docker development.

-  CPUs: 2
-  Memory: 6.00 GB
-  Swap: 1.00 GB

You can configure Docker resources from the Docker Desktop.

## PHP and Composer

Cloud Docker for Commerce does not require PHP and Composer to be installed locally. We provide an installation script, [init-docker.sh][] to perform PHP and Composer operations.

The `init-docker.sh` script runs the following command, which installs the template dependencies and sets both the PHP version and the Cloud Docker for Commerce image version.

```bash
docker run --rm -e "MAGENTO_ROOT=/app" -v "$(pwd)":/app -v ~/.composer/cache:/root/.composer/cache "magento/magento-cloud-docker-php:${PHP_VERSION}-cli-${IMAGE_VERSION}" composer install --ansi
```

The script option settings determine the PHP version and Cloud Docker for Commerce image version. The script also adds the default hostname, `magento2.docker`, to your `/etc/hosts` file.

> Options in `init-docker.sh`

| Option          | Description |
| :-------------- | :---------- |
| `-p`, `--php`   | PHP version (for installing dependencies). You must specify a PHP version that is compatible with the Adobe Commerce version deployed to the Cloud Docker environment. |
| `-i`, `--image` |  Cloud Docker for Commerce image version (for installing dependencies).<br/>**Default**: `1.1` |
| `--host`        | Domain name to add to the `/etc/hosts` file.<br/>**Default**: `magento2.docker` |
| `--add-host`    | Add domain name to `/etc/hosts` file.<br/>**Default**: true (`yes`) |

### Examples

To run the script with default settings:

```bash
bin/init-docker.sh
```

To install PHP 8.1 and skip adding the domain to the `etc/hosts` file:

```bash
bin/init-docker.sh --php 8.1 --add-host no
```

On initial project installation, you can use cURL to run the installation script and install the template dependencies. See [Update the hosts file and install dependencies](initialization.md#update-the-hosts-file-and-install-dependencies).

### Web server configuration

Cloud Docker for Commerce binds to port `80` on your host environment. Because macOS provides built-in Apache service, and may occupy port `80`, you must stop the service. Also, if you have a web server enabled on your workstation, you must stop the service before launching the Docker environment.

```bash
sudo apachectl stop
```

<InlineAlert variant="info" slots="text"/>

If you start your Docker environment with Apache running, the following error displays: `Cannot start service tls: Ports are not available: port is already allocated`

<!--Link definitions-->

[authentication keys]: https://experienceleague.adobe.com/docs/commerce-operations/installation-guide/prerequisites/authentication-keys.html
[Resolve issues with encryption key]: https://experienceleague.adobe.com/docs/commerce-knowledge-base/kb/troubleshooting/miscellaneous/resolve-issues-with-encryption-key.html
