---
title: Synchronize data
description: Learn to synchronize data in the Docker development environment.
---

# Synchronize data

You can launch a Docker environment in [developer mode](developer-mode.md), which provides an active development environment with full, writable file system permissions.

If you choose this option, the Adobe Commerce application works only if the Docker containers have access to the Adobe Commerce application data. You can provide access either by directly mapping the current working directory or by using a file synchronization tool.

## File synchronization options

The Cloud Docker for Commerce `docker-build` command provides the `--sync-engine <type>` option to select the file synchronization behavior when you build the `docker-compose.yml` configuration file. You can select from the following options:

| Option          | Description         |
| --------------- | ------------------- |
| `native`        | Maps the current working directory to the `/app` directory on each volume, which provides direct access to the data without requiring any synchronization. The `native` option is the default and works for Linux hosts. On macOS or Windows hosts, this option results in extremely slow performance in the Docker environment. |
| `manual-native` | Provides manual control over synchronization. Requires running manual commands. This option provides the best performance for macOS and Windows. |
| `mutagen`       | Uses **Mutagen** for file synchronization. When you select Mutagen, you must [install Mutagen](https://mutagen.io/documentation/introduction/installation) on your host operating system before you [launch Docker in developer mode](developer-mode.md). Use this option on macOS or Windows hosts. |
| `docker-sync`   | **Deprecated in 1.2.3**: Uses **docker-sync** for file synchronization. When you select docker-sync, you must [install docker-sync](https://docker-sync.readthedocs.io/en/latest/#) on your host operating system before you [launch Docker in developer mode](developer-mode.md). Use this option on macOS or Windows hosts. |

### Native option

If you do not specify a `--sync-engine` option, the Cloud Docker build uses the `native` option.

When you start Docker with the `native` file synchronization option, the current working directory maps to the `/app` folder in the containers:

```yaml
  fpm:
    volumes:
      - '.:/app'
  build:
    volumes:
      - '.:/app'
  deploy:
    volumes:
      - '.:/app'
  web:
    volumes:
      - '.:/app'
  cron:
    volumes:
      - '.:/app'
```

### Mutagen and manual-native options

On macOS or Windows systems, we recommend using the `mutagen` or `manual-native` file synchronization options. You can use these options in the `ece-docker build:compose` command by adding the option as the value for `--sync-engine`. For example:

```bash
./vendor/bin/ece-docker build:compose --mode="developer" --sync-engine="mutagen"
```

See [launch Docker in developer mode](developer-mode.md).
