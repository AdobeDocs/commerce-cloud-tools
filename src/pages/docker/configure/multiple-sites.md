---
title: Set up multiple websites or stores
description:
---

# Configure multiple websites or stores

Cloud Docker supports multiple websites or stores by adding subdomains to your configuration. See [Understanding websites, stores, and store views][].

**To add support for multiple websites and stores**:

1. Ensure that the `php.ini` file includes the configuration for the `magento-vars.php` file:

   ```ini
   auto_prepend_file = /app/magento-vars.php
   ```

   <InlineAlert variant="info" slots="text"/>

   Cloud Docker for Commerce applies the configuration in the `php.ini` file to the Docker environment if it is included in the root directory of your project.

1. Add each subdomain to the `/etc/hosts` configuration file.

   ```conf
   127.0.0.1 magento2.docker
   127.0.0.1 second.magento2.docker
   ```

After updating the `php.ini` file and adding subdomains, start the Docker environment and complete the following tasks to update the website and store configuration from the [Admin](https://glossary.magento.com/magento-admin):

-  Add specific stores and websites. See [Set up websites, stores, and store views][].
-  Add the configuration for store and website codes to the `magento-vars.php`. See [Modify Adobe Commerce variables][].

<!--Link definitions-->

[Modify Adobe Commerce variables]: https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/configure-store/multiple-sites.html
[Understanding websites, stores, and store views]: https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/configure-store/best-practices.html#store-views
[Set up websites, stores, and store views]: https://experienceleague.adobe.com/docs/commerce-operations/configuration-guide/multi-sites/ms-admin.html
