---
title: Custom Docker configuration
description: Learn how to build a custom Docker Compose configuration for use with Cloud Docker for Commerce.
---

# Build a custom Docker Compose configuration

Instead of using the Adobe Commerce on cloud infrastructure project configuration to build the `docker-compose.yaml` file, you can use the `ece-docker build:custom:compose` command. Using this command with a JSON configuration is the quickest way to change your environment settings.

You provide the configuration as a JSON array as shown in [Example 1](#example-1-custom-docker-composeyaml-file).

For Cloud Docker for Commerce 1.2 and later, you can specify custom images and image versions using the `ece-docker build:custom:compose` command as shown in [Example 2](#example-2-custom-docker-composeyaml-file-with-custom-images-and-image-versions).

### Example 1: Custom `docker-compose.yaml` file

```bash
./vendor/bin/ece-docker build:custom:compose '{"name":"magento","system":{"mode":"production","host":"magento2.test","port":"8080","db":{"increment_increment":3,"increment_offset":2},"mailhog":{"smtp_port":"1026","http_port":"8026"}},"services":{"php":{"version":"7.3","enabled":true,"extensions":{"enabled":["xsl"]}},"mysql":{"version":"10.2","image":"mariadb","enabled":true}, "mailhog": {"enabled":true}}}'
```

This command generates the following `docker-compose.yaml` file.

```yaml
version: '2.1'
services:
  db:
    hostname: db.magento2.test
    image: 'mariadb:10.2'
    environment:
      - MYSQL_ROOT_PASSWORD=magento2
      - MYSQL_DATABASE=magento2
      - MYSQL_USER=magento2
      - MYSQL_PASSWORD=magento2
    ports:
      - '3306'
    volumes:
      - '.docker/mnt:/mnt:rw,delegated'
      - 'magento-magento-db:/var/lib/mysql'
    healthcheck:
      test: 'mysqladmin ping -h localhost -pmagento2'
      interval: 30s
      timeout: 30s
      retries: 3
    command: '--auto_increment_increment=3 --auto_increment_offset=2'
    networks:
      magento:
        aliases:
          - db.magento2.test
  fpm:
    hostname: fpm.magento2.test
    image: 'magento/magento-cloud-docker-php:7.3-fpm-1.2.0'
    extends: generic
    volumes:
      - '.:/app:ro,delegated'
      - 'magento-vendor:/app/vendor:ro,delegated'
      - 'magento-generated:/app/generated:ro,delegated'
      - '.docker/mnt:/mnt:rw,delegated'
    networks:
      magento:
        aliases:
          - fpm.magento2.test
    depends_on:
      db:
        condition: service_healthy
  web:
    hostname: web.magento2.test
    image: 'magento/magento-cloud-docker-nginx:1.19-1.2.0'
    extends: generic
    volumes:
      - '.:/app:ro,delegated'
      - 'magento-vendor:/app/vendor:ro,delegated'
      - 'magento-generated:/app/generated:ro,delegated'
      - '.docker/mnt:/mnt:rw,delegated'
    environment:
      - WITH_XDEBUG=0
    networks:
      magento:
        aliases:
          - web.magento2.test
    depends_on:
      fpm:
        condition: service_started
  varnish:
    hostname: varnish.magento2.test
    image: 'magento/magento-cloud-docker-varnish:6.2-1.2.0'
    networks:
      magento:
        aliases:
          - varnish.magento2.test
    depends_on:
      web:
        condition: service_started
  tls:
    hostname: tls.magento2.test
    image: 'magento/magento-cloud-docker-nginx:1.19-1.2.0'
    extends: generic
    networks:
      magento:
        aliases:
          - magento2.test
    environment:
      UPSTREAM_HOST: varnish
    ports:
      - '8080:80'
      - '443:443'
    depends_on:
      varnish:
        condition: service_started
  generic:
    hostname: generic.magento2.test
    image: 'magento/magento-cloud-docker-php:7.3-cli-1.2.0'
    env_file: ./.docker/config.env
    environment:
      - 'PHP_EXTENSIONS=bcmath bz2 calendar exif gd gettext intl mysqli pcntl pdo_mysql soap sockets sysvmsg sysvsem sysvshm opcache zip xsl'
  build:
    hostname: build.magento2.test
    image: 'magento/magento-cloud-docker-php:7.3-cli-1.2.0'
    extends: generic
    volumes:
      - '.:/app:rw,delegated'
      - 'magento-vendor:/app/vendor:rw,delegated'
      - 'magento-generated:/app/generated:rw,delegated'
      - '~/.composer/cache:/root/.composer/cache:rw,delegated'
    networks:
      magento-build:
        aliases:
          - build.magento2.test
    depends_on:
      db:
        condition: service_healthy
  deploy:
    hostname: deploy.magento2.test
    image: 'magento/magento-cloud-docker-php:7.3-cli-1.2.0'
    extends: generic
    volumes:
      - '.:/app:ro,delegated'
      - 'magento-vendor:/app/vendor:ro,delegated'
      - 'magento-generated:/app/generated:ro,delegated'
      - '.docker/mnt:/mnt:rw,delegated'
    networks:
      magento:
        aliases:
          - deploy.magento2.test
    depends_on:
      db:
        condition: service_healthy
  mailhog:
    hostname: mailhog.magento2.test
    image: 'mailhog/mailhog:latest'
    ports:
      - '1026:1025'
      - '8026:8025'
    networks:
      magento:
        aliases:
          - mailhog.magento2.test
volumes:
  magento-vendor: {  }
  magento-generated: {  }
  magento-magento-db: {  }
networks:
  magento:
    driver: bridge
  magento-build:
    driver: bridge
```

### Example 2: Custom `docker-compose.yaml` file with custom images and image versions

```bash
./vendor/bin/ece-docker build:custom:compose '{"name":"magento","system":{"mode":"production","host":"magento2.test","port":"8080","db":{"increment_increment":3,"increment_offset":2},"mailhog":{"smtp_port":"1026","http_port":"8026"}},"services":{"php":{"image":"php-v1","version":"7.4","enabled":true},"php-cli":{"image-pattern":"%s:%s-cli"},"php-fpm":{"image-pattern":"%s:%s-fpm"},"mysql":{"image":"mariadb-v1","version":"10.3","image-pattern":"%s:%s","enabled":true},"redis":{"image":"redis-v1","enabled":"true","version":"5"},"elasticsearch":{"image":"elasticsearch-v1","image-pattern":"%s:%s","enabled":true,"version":"7.6"},"varnish":{"image":"varnish-v1","image-pattern":"%s:%s","enabled":true,"version":"6.2"},"nginx":{"image":"nginx-v1","version":"1.19","image-pattern":"%s:%s","enabled":"true"},"test":{"enabled":true}},"mounts":{"var":{"path":"var"},"app-etc":{"path":"app\/etc"},"pub-media":{"path":"pub\/media"},"pub-static":{"path":"pub\/static"}}}'
```

This command generates the following images in the Docker environment:

```yaml
services:
  db:
    image: 'mariadb-v1:10.3'
  redis:
    image: 'redis-v1:5'
  fpm:
    image: 'php-v1:7.4-fpm'
  web:
    image: 'nginx-v1:1.19'
  varnish:
    image: 'varnish-v1:6.2'
  tls:
    image: 'nginx-v1:1.19'
  test:
    image: 'php-v1:7.4-cli'
  generic:
    image: 'php-v1:7.4-cli'
  build:
    image: 'php-v1:7.4-cli'
  deploy:
    image: 'php-v1:7.4-cli'
```
