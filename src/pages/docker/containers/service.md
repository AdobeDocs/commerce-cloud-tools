---
title: Docker services containers
description: Learn about the Cloud Docker for Commerce service containers, images used, and useful guidance.
keywords:
  - Cloud
  - Docker
  - Tools
---

# Service containers

The following containers provide the services required to build, deploy, and run Adobe Commerce sites.

<InlineAlert variant="info" slots="text"/>

See [Service configuration options](index.md#service-containers) for customizing container configuration when you build the Docker Compose configuration file.

## Database container

- **Container name**: db
- **Docker base image**: [mariadb][], MySQL
- **Ports exposed**: `3306`

You can configure the database container to use either MariaDB or MySQL for the database. The default configuration uses the mariadb image and includes the following volumes:

- `magento-db: /var/lib/mysql`
- `.docker/mysql/docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d`

To use MySQL for the database, add the `--db image` option when you generate the Docker Compose configuration file. See [Service configuration options](index.md#service-containers).

When a database container initializes, it creates a database with the specified name and uses the configuration variables specified in the Docker Compose configuration. The initial start-up process also executes files with `.sh`, `.sql`, and `.sql.gz` extensions that are found in the `/docker-entrypoint-initdb.d` directory. Files are executed in alphabetical order. See [mariadb Docker documentation][mariadb].

To prevent accidental data loss, the database is stored in a persistent `magento-db` volume after you stop and remove the Docker configuration. The next time you use the `docker compose up` command, the Docker environment restores your database from the persistent volume. Manually destroy the database volume using the `docker volume rm <volume_name>` command.

You can inject a MySQL configuration into the database container at creation by adding the configuration to the `docker-compose-override.yml` file using any of the following methods:

-  Use a mount to add a custom `my.cnf` file to the `services` section in the  `docker-compose.override.yml` file:

   ```yaml
     db:
       volumes:
         - path/to/custom.my.cnf:/etc/mysql/conf.d/custom.my.cnf
   ```

-  Add a custom `custom.cnf` file to the `.docker/mysql/mariadb.conf.d` directory:

   ```bash
   cp custom.cnf .docker/mysql/mariadb.conf.d
   ```

-  Add configuration values directly to the `docker-compose.override.yml` file:

   ```yaml
   services:
     db:
       environment:
         - innodb-buffer-pool-size=134217728
   ```

See [Manage the database](../configure/manage-database.md) for details about using the database.

## Elasticsearch container

- **Container name**: elasticsearch
- **Docker base image**: [magento/magento-cloud-docker-elasticsearch][elasticsearch-docker]
- **Ports exposed**: `9200`, `9300`

The Elasticsearch container for Cloud Docker for Commerce is a standard Elasticsearch container with required plugins and configurations for Adobe Commerce.

Use the `--es-env-var` option to customize the Elasticsearch container when you generate the Docker Compose configuration file. You can set Elasticsearch options and specify the environment variables to apply when the container starts, such as the heap size for JVM.

```bash
php vendor/bin/ece-docker build:compose --es-env-var=ES_JAVA_OPTS="-Xms512m -Xmx512m" --es-env-var=node.store.allow_mmapfs=false
```

See [Important Elasticsearch configuration][] in the Elasticsearch documentation for details about available configuration options.

<InlineAlert variant="help" slots="text"/>

If your Cloud project uses Adobe Commerce version 2.3.5 or earlier with MySQL search, add the `--no-es` option to skip the Elasticsearch container configuration when you generate the Docker Compose configuration file: `ece-docker build:compose --no-es`.

### Elasticsearch plugins

The `analysis-icu` and `analysis-phonetic` plugins are installed by default and cannot be skipped. If you use Elasticsearch 6.5 and later, the default Elasticsearch plugins are installed automatically along with any custom plugins added to the `services.yaml`file. When you generate the `docker-compose.yaml` file, you can add additional custom plugins to the Docker environment using the `ES_PLUGINS` environment configuration option.

>The following example adds the `analysis-stempel` and `analysis-nori` plugins to the Docker environment.

```yaml
services:
    elasticsearch:
        environment:
          - 'ES_PLUGINS=analysis-stempel analysis-nori'
```

### Troubleshooting

On some Linux systems, when you launch the Docker environment, the Elasticsearch service fails to start and the following error displays:

```terminal
ERROR: [1] bootstrap checks failed
[1]: max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
```

To fix the error, run the following `sysctl` command to increase the memory map area allocation.

```bash
sysctl -w vm.max_map_count=262144
```

**To permanently update the system setting for** `vm.max_map_count`:

1. Edit the sysctl configuration file (`etc/sysctl.conf`) and set the required value for the `vm.max_map_count` option.

1. Reboot your system.

1. Verify the change.

   ```bash
   sysctl vm.max_map_count
   ```

## OpenSearch container

- **Container name**: opensearch
- **Docker base image**: [magento/magento-cloud-docker-opensearch][opensearch-docker]
- **Ports exposed**: `9200`, `9300`

The OpenSearch container for Cloud Docker for Commerce is a standard OpenSearch container with required plugins and configurations for Adobe Commerce.

Use the `--os-env-var` option to customize the OpenSearch container when you generate the Docker Compose configuration file. You can set OpenSearch options and specify the environment variables to apply when the container starts, such as the heap size for JVM.

```bash
php vendor/bin/ece-docker build:compose --os-env-var=OPENSEARCH_JAVA_OPTS="-Xms512m -Xmx512m" --os-env-var=bootstrap.memory_lock=true
```

See [Important OpenSearch configuration][] in the OpenSearch documentation for details about available configuration options.

<InlineAlert variant="help" slots="text"/>

If your Cloud project uses Adobe Commerce version 2.4.4 or earlier with MySQL or Elasticsearch search, add the `--no-os` option to skip the OpenSearch container configuration when you generate the Docker Compose configuration file: `ece-docker build:compose --no-os`

### OpenSearch plugins

There is a list of OpenSearch plugins: https://opensearch.org/docs/latest/opensearch/install/plugins/

The following plugins are installed by default and **cannot** be skipped:

```text
-  OpenSearch 1.1:
   -  opensearch-notebooks
-  OpenSearch 1.2, 2.3 and 2.4:
   -  opensearch-observability
-  OpenSearch 1.1, 1.2, 2.3 and 2.4:
   -  analysis-icu
   -  analysis-phonetic
   -  opensearch-alerting
   -  opensearch-anomaly-detection
   -  opensearch-asynchronous-search
   -  opensearch-cross-cluster-replication
   -  opensearch-index-management
   -  opensearch-job-scheduler
   -  opensearch-knn
   -  opensearch-performance-analyzer
   -  opensearch-reports-scheduler
   -  opensearch-security
   -  opensearch-sql
-  OpenSearch 2.3, 2.4:
   -  opensearch-geospatial
   -  opensearch-ml
   -  opensearch-notifications
   -  opensearch-notifications-core
-  OpenSearch 2.4:
   -  opensearch-neural-search
   -  opensearch-security-analytics
```

>The following example adds the `opensearch-asynchronous-search` plugin to the Docker environment.

```yaml
services:
    opensearch:
        environment:
          - 'OS_PLUGINS=opensearch-asynchronous-search'
```

## FPM container

- **Container name**: fpm
- **Docker base image**: [magento/magento-cloud-docker-php][php-cloud], which is based on the [php](https://hub.docker.com/_/php) Docker image
- **Ports exposed**: `9000`, `9001`

The FPM container includes the following volumes:

-  Read-only volumes:
   -  `/app`
   -  `/app/vendor`
   -  `/app/generated`
   -  `/app/setup`

-  Read/Write volumes:
   -  `/app/var`
   -  `/app/app/etc`
   -  `/app/pub/static`
   -  `/app/pub/media`

### Customize PHP settings

You can customize PHP service settings for PHP-FPM and CLI containers by adding a `php.ini` file to the root directory of your Adobe Commerce project.

The Cloud Docker deployment process copies the `php.ini` file to the Docker environment after applying the default Docker and extension configurations and applies the settings to the FPM and CLI containers.

<InlineAlert variant="warning" slots="text"/>

If you use the `mutagen` file synchronization tools, the `php.ini` file is available only after the file synchronization completes.

### Customize PHP extensions

You can add custom PHP extensions and manage their status from the `runtime` section of the `.magento.app.yaml` file. See [PHP extensions][]. To test custom extensions without updating the Adobe Commerce on cloud infrastructure environment configuration, you can add the custom configuration to the [`docker-compose.override.yml`][Docker override file]. Configuration settings in this file are applied only when you build and deploy to the Docker environment.

Optionally, you can add Xdebug to your Cloud Docker environment to debug your PHP code. See [Configure Xdebug for Docker](../test/configure-xdebug.md).

## MailHog container

- **Container name**: mailhog
- **Docker base image**: [mailhog][]
- **Ports**: SMTP:`1025`, HTTP:`8025`

The default Cloud Docker configuration includes the [MailHog service][] as a replacement for the Sendmail service. Sendmail can cause performance issues in the local Docker environment.

By default, MailHog listens on port 1025 for SMTP and port 8025 for the frontend dashboard and API (HTTP). You can change the default ports using the `--mailhog-http-port` and `--mailhog-smtp-port` options. When you build the Docker Compose configuration, you can change the default ports:

```bash
./vendor/bin/ece-docker build:compose --mailhog-smtp-port=1025 --mailhog-http-port=8025
```

After updating the configuration and restarting the Docker environment, you can connect to the MailHog service from `http://magento2.docker:8025`, and use port 1025 for SMTP communication.

If needed, you can disable the MailHog service when you generate the Docker Compose configuration:

```bash
./vendor/bin/ece-docker build:compose --no-mailhog
```

## RabbitMQ container

- **Container name**: rabbitmq
- **Docker base image**: [rabbitmq][]
- **Ports exposed**: `4369`, `5671`, `5672`, `25672`

The RabbitMQ container for Cloud Docker for Commerce is a standard RabbitMQ container with no configuration or changes.

## Redis container

- **Container name**: redis
- **Docker base image**: [redis][]
- **Ports exposed**: `6379`

The Redis container for Cloud Docker for Commerce is a standard container with no customization, no persistence, and no additional configuration.

Connect to and run Redis commands using the `redis-cli` property inside the container:

```bash
docker compose run --rm redis redis-cli -h redis
```

## Selenium container

- **Container name**: selenium
- **Docker base image**: [selenium/standalone-chrome/](https://hub.docker.com/r/selenium/standalone-chrome), based on the [selenium/standalone-chrome/](https://hub.docker.com/r/selenium/standalone-chrome/h) Docker image
- **Ports exposed**: `4444`

The Selenium container enables the [Magento Functional Testing Framework (MFTF)](https://devdocs.magento.com/mftf/docs/introduction.html) for application testing in the Cloud Docker environment. See [Application testing](../test/application-testing.md).

## Test container

- **Container name**: test
- **Docker base image**: [magento/magento-cloud-docker-php][php-cloud], based on the [magento/magento-cloud-docker-php][php-cloud] Docker image
- **Ports exposed**: None

The Test container, based on the [magento/magento-cloud-docker-php][php-cloud] Docker image, has a writable file system and is used for application testing in the Cloud Docker environment. See [Application testing](../test/application-testing.md).

## TLS container

- **Container name**: tls
- **Docker base image**: [magento/magento-cloud-docker-nginx:1.19-1.2.0][tls]
- **Ports**: `443` (default), `8080:80` (Varnish bypass)

By default, the TLS container is included with the Docker Compose configuration. However, you can generate a configuration without TLS by adding the `--no-tls` option to the `ece-docker build:compose` command.

The TLS termination proxy container facilitates the Varnish SSL termination over HTTPS.

-  The default port for TLS communication is `443`.
-  If you have Varnish installed in the Docker environment, use port `8080:80` to bypass caching.
-  You can change the default port when you generate the Docker configuration file:

   ```bash
   ./vendor/bin/ece-docker build:compose --tls-port <port-number>
   ```

To increase the timeout on this container, add the following code to the  `docker-compose.override.yml` file:

```yaml
  tls:
    environment:
      - TIMEOUT=600
```

## Varnish container

- **Container name**: varnish
- **Docker base image**: [magento/magento-cloud-docker-varnish][varnish], based on the `[centos]` Docker image

The Varnish container simulates Fastly and is useful for testing VCL snippets.

The **Varnish** service is installed by default. When deployment completes, Adobe Commerce is configured to use Varnish for full page caching (FPC) for Adobe Commerce version 2.2.0 or later. The configuration process preserves any existing custom FPC configuration settings.

In some cases, you might require a Docker environment without Varnish, for example to debug or run performance tests. You can generate the Docker Compose configuration without Varnish by adding the `--no-varnish` option to the `ece-docker build:compose` command.

```bash
./vendor/bin/ece-docker build:compose --mode="developer" --php <version> --no-varnish
```

You can specify `VARNISHD_PARAMS` and other environment variables using ENV to specify custom values for required parameters. This is done by adding the configuration to the `docker-compose.override.yml` file.

**To clear the Varnish cache**:

```bash
docker compose exec varnish varnishadm ban req.url '~' '.'
```

## Web container

- **Container name**: web
- **Docker base image**: [magento/magento-cloud-docker-nginx][nginx], based on the `[centos]` Docker image
- **Ports exposed**: None

The Web container uses NGINX to handle web requests after TLS and Varnish. This container passes all requests to the FPM container to serve the PHP code. See [Request flow](../containers/index.md#request-flow).

This container provides two NGINX configuration options for building the Docker configuration:

-  `--nginx-worker-processes`—to set the number of worker processes for NGINX. The default is `1`.
-  `--nginx-worker-connections`—to set the maximum number of connections that each worker process can handle simultaneously. The default is `1024`.

The [NGINX configuration][nginx configs] for this container is the standard for  Adobe Commerce, which includes the configuration to auto-generate NGINX certificates for the container. You can customize the NGINX configuration by mounting a new configuration file using a volume.

**To mount the custom NGINX configuration file using volumes**:

1. On your local host, create a `./.docker/nginx/etc/` directory.

1. Copy the `nginx.conf` and `vhost.conf` [configuration files][nginx configs] to the new directory.

1. In the `vhost.conf` file, customize the values for variables like `!UPLOAD_MAX_FILESIZE!;` as needed.

1. Add the volume configuration to the `docker-compose.override.yml` file to mount the custom NGINX configuration to the Web container.

```yaml
  services:
    web:
      volumes:
        - ./.docker/nginx/etc/nginx.conf:/etc/nginx/nginx.conf
        - ./.docker/nginx/etc/vhost.conf:/etc/nginx/conf.d/default.conf
   ```

**To mount the custom index.php file using volumes**:

1. Add the volume configuration to the `docker-compose.override.yml` file to mount the custom `index.php` file to the Web container.

```yaml
  services:
    web:
      volumes:
        - ./pub/index.php:/app/pub/index.php:ro
```

## Zookeeper container

- **Container name**: Zookeeper
- **Docker base image**: [zookeeper/latest/][zoo]
- **Ports exposed**: 2181

Developers can use Zookeeper to manage locks to prevent the launch of duplicate cron jobs and cron groups for Adobe Commerce and Magento Open Source projects running on servers with multiple nodes.

For Adobe Commerce projects on Adobe cloud infrastructure, lock provider settings are configured automatically during provisioning. See [Cloud variables](https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/configure/env/stage/variables-cloud.html).

For projects hosted on other infrastructure, developers can add the Zookeeper container to the Docker environment and [configure the service][Configure the lock provider].

```bash
./vendor/bin/ece-docker build:compose --php <version> --with-zookeeper
```

The latest Zookeeper version is installed by default from Docker Hub. You can add the following options to customize the installation:

- `--zookeeper-version`—Specify a specific version to install from Docker Hub.
- `--zookeeper-image`—Specify the Zookeeper image name to install from a custom image.

<!--Link definitions-->

[centos]: https://hub.docker.com/_/centos
[Configure the lock provider]: https://experienceleague.adobe.com/docs/commerce-operations/installation-guide/tutorials/lock-provider.html
[debian:jessie]: https://hub.docker.com/_/debian
[Docker override file]: https://docs.docker.com/compose/extends/
[FPM]: https://php-fpm.org
[elasticsearch-docker]: https://hub.docker.com/r/magento/magento-cloud-docker-elasticsearch
[Important Elasticsearch configuration]: https://www.elastic.co/guide/en/elasticsearch/reference/6.5/important-settings.html
[Important OpenSearch configuration]: https://opensearch.org/docs/latest/opensearch/install/important-settings/
[mailhog]: https://hub.docker.com/u/mailhog
[MailHog service]: https://github.com/mailhog/MailHog
[mariadb]: https://hub.docker.com/_/mariadb
[nginx configs]: https://github.com/magento/magento-cloud-docker/tree/develop/images
[nginx]: https://hub.docker.com/r/magento/magento-cloud-docker-nginx
[opensearch-docker]: https://hub.docker.com/r/magento/magento-cloud-docker-opensearch
[php-cloud]: https://hub.docker.com/r/magento/magento-cloud-docker-php
[PHP extensions]: https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/configure/app/php-settings.html#enable-extensions
[rabbitmq]: https://hub.docker.com/_/rabbitmq
[redis]: https://hub.docker.com/_/redis
[tls]: https://hub.docker.com/r/magento/magento-cloud-docker-nginx
[varnish]: https://hub.docker.com/r/magento/magento-cloud-docker-varnish
[zoo]: https://hub.docker.com/_/zookeeper
