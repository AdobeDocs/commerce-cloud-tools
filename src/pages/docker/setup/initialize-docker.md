---
title: Initialize Cloud Docker for Commerce
description: Learn how to begin preparing your Adobe Commerce project to use with the Cloud Docker for Commerce tool.
keywords:
  - Cloud
  - Docker
  - Tools
---

# Initialize Cloud Docker

Cloud Docker for Commerce is one of the packages in the Cloud Suite for Commerce designed to deploy and manage local Adobe Commerce projects into Docker environments.

<InlineAlert variant="success" slots="text"/>

Cloud Docker for Commerce supports the Adobe Commerce installation for both cloud and on-premises projects. The initialization steps are different for each project type.

## Cloud infrastructure projects

Adobe Commerce on cloud infrastructure tooling contains the `magento/magento-cloud-docker` package, which is installed and updated automatically with the `magento/ece-tools` package.

**To install an Adobe Commerce on cloud infrastructure project**:

1. Download an application template from the [Cloud template repository][cloud-repo]. Be careful to select the branch that corresponds with the Commerce version.

1. Optionally, you can clone the latest template.

   ```bash
   git clone https://github.com/magento/magento-cloud.git <install-directory-name>
   ```

1. Change to the new project directory.

1. Add your [access credentials][magento-creds] to the `auth.json` file.

## On-premises projects

An on-premises installation requires the stand-alone `magento/magento-cloud-docker` package available in the [Cloud Docker GitHub repository][docker-repo]. When you initialize an Adobe Commerce project for Docker development, you must create a [.magento.docker.yml](../configure/configuration-sources.md#unified-configuration) configuration source file to create the Docker containers for the local environment.

**To install an Adobe Commerce on-premises project**:

1. Create a project using [Composer](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/composer).

   ```bash
    composer create-project --repository-url=https://repo.magento.com/ magento/project-enterprise-edition <install-directory-name>
   ```

   This command installs the latest release. To install a specific version, specify the version number, for example `magento/project-enterprise-edition=2.4.6`.

1. Change to the project directory.

1. Add the ece-tools and Cloud Docker for Commerce packages.

   ```bash
   composer require --no-update --dev magento/ece-tools magento/magento-cloud-docker
   ```

1. Create the default configuration source file—[.magento.docker.yml](../configure/configuration-sources.md#unified-configuration)—to build the Docker containers for the local environment.

   ```yaml
   name: magento
   system:
       mode: 'production'
   services:
       php:
           version: '8.2'
           extensions:
               enabled:
                   - xsl
                   - json
                   - redis
       mysql:
           version: '10.6'
           image: 'mariadb'
       redis:
           version: '7.0'
           image: 'redis'
       opensearch:
           version: '2.4'
           image: 'magento/magento-cloud-docker-opensearch'
   hooks:
       build: |
           set -e
           php ./vendor/bin/ece-tools run scenario/build/generate.xml
           php ./vendor/bin/ece-tools run scenario/build/transfer.xml
       deploy: 'php ./vendor/bin/ece-tools run scenario/deploy.xml'
       post_deploy: 'php ./vendor/bin/ece-tools run scenario/post-deploy.xml'
   mounts:
       var:
           path: 'var'
       app-etc:
           path: 'app/etc'
       pub-media:
           path: 'pub/media'
       pub-static:
           path: 'pub/static'
   ```

<InlineAlert variant="info" slots="text"/>

This default configuration file provides the minimum configuration for the Docker environment. See [Configure the Docker environment](../configure/index.md).

## Update the hosts file and install dependencies

Before you use Cloud Docker for Commerce, you must update the `etc/hosts` file and install required dependencies. You can do this manually, or using an installation script.

**To update and install manually**:

1. Add the default `magento2.docker` host to the hosts file to make Cloud Docker recognizable on the local machine.

   ```bash
   echo "127.0.0.1 magento2.docker" | sudo tee -a /etc/hosts
   ```

1. Update the project dependencies.

   ```bash
   composer update
   ```

**To update and install using the installation script**:

1. Install the template dependencies and add the default hostname to your `/etc/hosts` file.

   ```bash
   curl -sL https://github.com/magento/magento-cloud-docker/releases/download/1.3.5/init-docker.sh | bash -s -- --php 8.2
   ```

   If necessary, you can add options to the `init-docker.sh` initialization script to customize your Docker environment. Run the following command to see the available options:

   ```bash
   curl -sL https://github.com/magento/magento-cloud-docker/releases/download/1.3.5/init-docker.sh | bash -s -- --help
   ```

After you complete the installation, you can begin using the Docker environment.

\<!--Link definitions--\>

[cloud-repo]: https://github.com/magento/magento-cloud
[docker-repo]: https://github.com/magento/magento-cloud-docker
[magento-creds]: https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/prerequisites/authentication-keys
