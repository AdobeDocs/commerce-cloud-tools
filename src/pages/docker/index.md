---
title: Cloud Docker for Commerce | Commerce Cloud Tools
description: Use the Cloud Docker tool to deploy Adobe Commerce to a Docker environment for development, testing, and automation tasks.
---

# Cloud Docker for Commerce

Cloud Docker for Commerce provides an option to deploy Adobe Commerce to a Docker environment for development, testing, and automation tasks. It includes the following features:

- **Cross-platform support**—Supports Linux, macOS, and Windows with WSL2
- **Cloud emulation**–Provides a Cloud-like deployment pipeline and filesystem to test code locally before deploying your Adobe Commerce on cloud infrastructure project to Staging or Production servers
- **Adobe Commerce development**—Creates a local development environment for On-premises projects
- **Multiple sync options**—Provides three file synchronization options: `native`, `mutagen`, and `manual-native`. The manual-native option provides the best performance on macOS and Windows.
- **Extensibility**—Use a standard Docker configuration file to extend and customize your development environment

<InlineAlert variant="info" slots="text"/>

Cloud Docker for Commerce is a Magento Community Engineering project supported by the Magento developer community. For details and support information, see [Get support for Cloud Docker for Commerce](get-support.md).

The Cloud Docker environment supports Linux, macOS, and Windows operating systems. The containers should run on any Docker host, but some of the setup scripts require you to install PHP and Composer.

## Adobe Commerce documentation

The Cloud Docker for Commerce guide assumes that you have some working knowledge and understanding of the Adobe Commerce application. You can refer to the Commerce Developer and User guides below:

- [Adobe Commerce on Cloud Infrastructure guide](https://experienceleague.adobe.com/docs/commerce-cloud-service/user-guide/overview.html)
- [Adobe Commerce Developer Documentation](https://developer.adobe.com/commerce/docs) (Adobe Developer site)—Develop, customize, integrate, extend, and use advanced capabilities
- [Adobe Commerce Documentation](https://experienceleague.adobe.com/docs/commerce.html) (Adobe Experience League)—Plan, implement, operate, upgrade, and maintain your Commerce projects

## Composer authentication keys

Before setting up a local workspace, gather the following credentials and account information:

-  **Authentication keys (Composer keys)**

    Authentication keys are 32-character authentication tokens that provide secure access to the Adobe Commerce Composer repository (repo.magento.com), and any other Git services required for development such as GitHub. Your account can have multiple authentication keys. For the workspace setup, start with one specific key for your code repository. If you do not have any keys, contact the Account Owner to create them, or create the [authentication keys][] yourself.

-  **(Optional) Cloud Project account**

   The License Owner or Technical Admin (Super User) should invite you to the Adobe Commerce on cloud infrastructure project. When you receive the e-mail invitation, click the link and follow the prompts to create your account. See [Onboarding to Commerce](https://experienceleague.corp.adobe.com/docs/commerce-cloud-service/start/onboarding.html) for details.

-  **(Optional) Encryption Key**

   When importing an existing Adobe Commerce instance, capture the encryption key used to protect your access and data for the Adobe Commerce database. For details on this key, see [Resolve issues with encryption key][].

<!--Link definitions-->

[authentication keys]: https://experienceleague.adobe.com/docs/commerce-operations/installation-guide/prerequisites/authentication-keys.html
[Resolve issues with encryption key]: https://experienceleague.adobe.com/docs/commerce-knowledge-base/kb/troubleshooting/miscellaneous/resolve-issues-with-encryption-key.html
