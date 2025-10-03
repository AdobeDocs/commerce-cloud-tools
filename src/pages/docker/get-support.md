---
title: Get support for Cloud Docker for Adobe Commerce
description: Read about the community support mechanisms for Cloud Docker for Commerce.
keywords:
  - Cloud
  - Docker
  - Tools
---

# Get support for Cloud Docker

Cloud Docker for Commerce is a Magento Community Engineering project supported by the Magento developer community. You have several options to get support and learn more about Cloud Docker for Commerce and local development.

-  **[Magento Community Engineering Slack organization][]**–For support, questions, or discussion, chat with us in the **#cloud-docker** and **#cloud** channels. To join, send a request to _engcom@adobe.com_ or sign up using [Slack](https://opensource.magento.com/slack).

-  **[magento/magento-cloud-docker GitHub repository][]**–Visit the GitHub repository to read discussions about current issues, check current development, and submit issues or pull requests to improve the project.

-  **[Magento Cloud Community Engineering demos][]**–Magento hosts Cloud demo sessions where you can learn about developing Adobe Commerce on cloud infrastructure, including information about local development with Cloud Docker for Commerce. For a schedule and recordings of previous demos.

## Troubleshooting

**Fix Elasticsearch map count error:**

When you launch the Docker environment on some Linux systems, the Elasticsearch service fails to start and the following error displays:

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

&lt;!--Link definitions-->

[Magento Cloud Community Engineering demos]: https://spark.adobe.com/page/PbxJoujH7oRTc/
[Magento Community Engineering Slack organization]: https://magentocommeng.slack.com/
[magento/magento-cloud-docker GitHub repository]: https://github.com/magento/magento-cloud-docker
