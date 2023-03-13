---
title: Cloud Docker for Commerce | Commerce Cloud Tools
description: Use the Cloud Docker for Commerce tool to deploy Adobe Commerce to a Docker environment for development, testing, and automation tasks.
---

# Cloud Docker for Commerce

Cloud Docker for Commerce provides an option to deploy Adobe Commerce to a Docker environment for development, testing, and automation tasks.

## Features

- **Cross-platform support**—Supports Linux, macOS, and Windows with WSL2
- **Cloud emulation**–Provides a Cloud-like deployment pipeline and filesystem to test code locally before deploying your Adobe Commerce on cloud infrastructure project to Staging or Production servers
- **Adobe Commerce development**—Creates a local development environment for On-premises projects
- **Multiple sync options**—Provides three file synchronization options: `native`, `mutagen`, and `manual-native`. The manual-native option provides the best performance on macOS and Windows.
- **Extensibility**—Use a standard Docker configuration file to extend and customize your development environment

<InlineAlert variant="help" slots="text"/>

Cloud Docker for Commerce is a Magento Community Engineering project supported by the Magento developer community. For details and support information, see [Get support for Cloud Docker for Commerce](get-support.md).

The Cloud Docker environment supports Linux, macOS, and Windows operating systems. The containers should run on any Docker host, but some of the setup scripts require you to install PHP and Composer. See [Cloud Docker package release notes](https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/release-notes/cloud-docker.html) in the _Commerce on Cloud Infrastructure guide_ for the latest updates.

## Adobe Commerce documentation

The Cloud Docker for Commerce guide assumes that you have some working knowledge and understanding of the Adobe Commerce application.

You can refer to the Commerce Developer and User guides below:

- [Adobe Commerce on Cloud Infrastructure guide](https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/overview.html)—Customize deployment into a hosted, pre-provisioned infrastructure
- [Adobe Commerce Developer Documentation](https://developer.adobe.com/commerce/docs/) (Adobe Developer site)—Develop, customize, integrate, extend, and use advanced capabilities
- [Adobe Commerce Documentation](https://experienceleague.adobe.com/docs/commerce.html) (Adobe Experience League)—Plan, implement, operate, upgrade, and maintain your Commerce projects
