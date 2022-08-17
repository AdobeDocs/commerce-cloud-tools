---
title: Docker Deployment Tool | Commerce Cloud Tools
description: Use the Commerce Docker Deployment Tool to deploy Adobe Commerce to a Docker environment for development, testing, and automation tasks.
---

# Cloud Docker Deployment Tool for Commerce

Cloud Docker for Commerce provides an option to deploy Adobe Commerce to a Docker environment for development, testing, and automation tasks. It includes the following features:

- **Cross-platform support**—Supports Linux, macOS, and Windows with WSL2
- **Cloud emulation**–Provides a Cloud-like deployment pipeline and filesystem to test code locally before deploying your Adobe Commerce on cloud infrastructure project to Staging or Production servers
- **Adobe Commerce development**—Creates a local development environment for On-premises projects
- **Multiple sync options**—Provides three file synchronization options: `native`, `mutagen`, and `manual-native`. The manual-native option provides the best performance on macOS and Windows.
- **Extensibility**—Use a standard Docker configuration file to extend and customize your development environment

>[!INFO]
>
>Cloud Docker for Commerce is a Magento Community Engineering project supported by the Magento developer community. For details and support information, see [Get support for Cloud Docker for Commerce](get-support.md).

## Host Operating Systems

The Cloud Docker environment supports Linux, macOS, and Windows operating systems. The containers should run on any Docker host, but some of the setup scripts require you to install PHP and Composer.

## Prerequisites

-  [Git][] for interaction between your local system and Adobe Commerce on cloud infrastructure source repositories
-  [Docker][] for Mac 2.2.0.0 or later or Docker for Linux
-  Developer mode on macOS systems might require the [Mutagen][] option for file synchronization.

### Docker engine

Cloud Docker for Commerce requires the following Docker resources to support local Docker development.

-  CPUs: 2
-  Memory: 6.00 GB
-  Swap: 1.00 GB

You can configure Docker resources from the [Docker Desktop].

### PHP and Composer

Cloud Docker for Commerce does not require PHP and Composer to be installed locally. We provide an installation script, [init-docker.sh][] to perform PHP and Composer operations.

The `init-docker.sh` script runs the following command which installs the template dependencies and sets both the PHP version and the Cloud Docker for Commerce image version.

```bash
docker run --rm -e "MAGENTO_ROOT=/app" -v "$(pwd)":/app -v ~/.composer/cache:/root/.composer/cache "magento/magento-cloud-docker-php:${PHP_VERSION}-cli-${IMAGE_VERSION}" composer install --ansi
```

The script option settings determine the PHP version and Cloud Docker for Commerce image version. The script also adds the default hostname, `magento2.docker`, to your `/etc/hosts` file.

> Options in `init-docker.sh`

Option | Description
:----- | :------
`-p`, `--php` | PHP version (for installing dependencies). You must specify a PHP version that is compatible with the Adobe Commerce version deployed to the Cloud Docker environment.
`-i`, `--image` |  Cloud Docker for Commerce image version (for installing dependencies). Defaults to `1.1`
`--host` | Domain name to add to the `/etc/hosts` file. Defaults to `magento2.docker`
`--add-host` | Add domain name to `/etc/hosts` file. Defaults to true (`yes`)
`-h`, `--help` | Get help

#### Examples:

To run the script with default settings:

```bash
bin/init-docker.sh
```

To install PHP 7.3 and skip adding the domain to the `etc/hosts` file:

```bash
bin/init-docker.sh --php 7.3 --add-host no
```

On initial project installation, you can use cURL to run the installation script and install the template dependencies. See [Update the hosts file and install dependencies](initialization.md#update-the-hosts-file-and-install-dependencies).

### Web server configuration

Cloud Docker for Commerce binds to port `80` on your host environment. If you enabled the bundled web server on your workstation, you must stop the service before launching the Docker environment.

```bash
sudo apachectl stop
```

>[!INFO]
>
>If you start your Docker environment with Apache running, the following error displays: `Cannot start service tls: Ports are not available: port is already allocated`

### Composer authentication keys

Before setting up a local workspace, gather the following credentials and account information:

-  **Authentication keys (Composer keys)**

    Authentication keys are 32-character authentication tokens that provide secure access to the Adobe Commerce Composer repository (repo.magento.com), and any other Git services required for development such as GitHub. Your account can have multiple authentication keys. For the workspace setup, start with one specific key for your code repository. If you do not have any keys, contact the Account Owner to create them, or create the [authentication keys][] yourself.

-  **(Optional) Cloud Project account**

   The License Owner or Technical Admin (Super User) should invite you to the Adobe Commerce on cloud infrastructure project. When you receive the e-mail invitation, click the link and follow the prompts to create your account. See [Set up an account][] for details.

-  **(Optional) Encryption Key**

   When importing an existing Adobe Commerce instance, capture the encryption key used to protect your access and data for the Adobe Commerce database. For details on this key, see [Resolve issues with encryption key][].

<!--Link definitions-->

[Git]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[Docker Compose]: https://docs.docker.com/compose/
[Docker]: https://www.docker.com/get-started
[Docker desktop]: https://docs.docker.com/desktop/#configure-docker-desktop
[init-docker.sh]: https://github.com/magento/magento-cloud-docker/blob/develop/bin/init-docker.sh
[Mutagen]: https://mutagen.io/documentation/introduction/installation
[authentication keys]: https://devdocs.magento.com/guides/v2.3/install-gde/prereq/connect-auth.html
[Magento Cloud template]: https://github.com/magento/magento-cloud
[Set up an account]: https://devdocs.magento.com/cloud/before/before-workspace.html#newaccount
[Resolve issues with encryption key]: https://support.magento.com/hc/en-us/articles/360033978652
[magento/magento-cloud-docker GitHub repository]: https://github.com/magento/magento-cloud-docker
