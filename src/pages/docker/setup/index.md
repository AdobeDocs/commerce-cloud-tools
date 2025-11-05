---
title: Local development
description: Learn how to use Cloud Docker for Commerce for local development.
keywords:
  - Cloud
  - Docker
  - Tools
---

# Local development

Cloud Docker for Commerce is the recommended tool for effective local development and testing of Adobe Commerce.

Prerequisites include the following software:

- [Docker](https://www.docker.com/get-started)—Tools for managing images and building containers
- [Mutagen](https://mutagen.io/documentation/introduction/installation)—Developer mode on macOS systems might require this option for file synchronization
- [Git](https://git-scm.com)—For interaction between your local system and Adobe Commerce on cloud infrastructure source repositories
- Optional—[See PHP and Composer](#php-and-composer):
   - PHP version 8.1
   - [Composer](https://getcomposer.org) version 2.2.4

## Docker settings

Cloud Docker for Commerce requires the following Docker resources to support local Docker development. You can allot these resources from the _Preferences_ panel in Docker Desktop. Click the **Settings** icon next to your username, then choose the **Resources** tab.

-  CPUs: 2
-  Memory: 6.00 GB
-  Swap: 1.00 GB

## Commerce credentials

Before setting up a local workspace, gather the following credentials and account information:

-  **Authentication keys (Composer keys)**

    Authentication keys are 32-character authentication tokens that provide secure access to the Adobe Commerce Composer repository (repo.magento.com), and any other Git services required for development such as GitHub. Your account can have multiple authentication keys. For the workspace setup, start with one specific key for your code repository. If you do not have any keys, contact the Account Owner to create them, or create the [authentication keys][] yourself.

-  **(Optional) Cloud Project account**

   The License Owner or Technical Admin (Super User) should invite you to the Adobe Commerce on cloud infrastructure project. When you receive the e-mail invitation, click the link and follow the prompts to create your account. See [Onboarding to Commerce](https://experienceleague.adobe.com/docs/commerce-cloud-service/start/onboarding.html) for details.

-  **(Optional) Encryption Key**

   When importing an existing Adobe Commerce instance, capture the encryption key used to protect your access and data for the Adobe Commerce database. For details on this key, see [Resolve issues with encryption key][].

## PHP and Composer

Cloud Docker for Commerce does not require PHP and Composer to be installed locally. Adobe provides an installation script to perform PHP and Composer operations.

The `init-docker.sh` script runs the following command, which installs the template dependencies and sets both the PHP version and the Cloud Docker for Commerce image version.

```bash
docker run --rm -e "MAGENTO_ROOT=/app" -v "$(pwd)":/app -v ~/.composer/cache:/root/.composer/cache "magento/magento-cloud-docker-php:${PHP_VERSION}-cli-${IMAGE_VERSION}" composer install --ansi
```

The script option settings determine the PHP version and Cloud Docker for Commerce image version. The script also adds the default hostname, `magento2.docker`, to your `/etc/hosts` file.

The following table lists the available options to use with the `init-docker.sh` script:

| Option          | Description                                                                                                                                                   |
| :-------------- |:--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `-p`, `--php`   | PHP version (for installing dependencies). Specify a PHP version that is compatible with the Adobe Commerce version deployed to the Cloud Docker environment. |
| `-i`, `--image` | Cloud Docker for Commerce image version (for installing dependencies).\<br/\>**Default**: `1.1`                                                               |
| `--host`        | Domain name to add to the `/etc/hosts` file.\<br/\>**Default**: `magento2.docker`                                                                             |
| `--add-host`    | Add domain name to `/etc/hosts` file.\<br/\>**Default**: true (`yes`)                                                                                         |

### Examples

To run the script with default settings:

```bash
bin/init-docker.sh
```

To install PHP 8.1 and skip adding the domain to the `etc/hosts` file:

```bash
bin/init-docker.sh --php 8.1 --add-host no
```

On initial project installation, you can use cURL to run the installation script and install the template dependencies. See [Update the hosts file and install dependencies](initialize-docker.md#update-the-hosts-file-and-install-dependencies).

## Web server configuration

Cloud Docker for Commerce binds to port `80` on your host environment. Because macOS provides built-in Apache service, and may occupy port `80`, you must stop the service. Also, if you have a web server enabled on your workstation, you must stop the service before launching the Docker environment.

```bash
sudo apachectl stop
```

<InlineAlert variant="error" slots="text"/>

If you start your Docker environment with Apache running, the following error displays: `Cannot start service tls: Ports are not available: port is already allocated`

\<!--Link definitions--\>

[authentication keys]: https://experienceleague.adobe.com/docs/commerce-operations/installation-guide/prerequisites/authentication-keys.html
[Resolve issues with encryption key]: https://experienceleague.adobe.com/docs/commerce-knowledge-base/kb/troubleshooting/miscellaneous/resolve-issues-with-encryption-key.html
