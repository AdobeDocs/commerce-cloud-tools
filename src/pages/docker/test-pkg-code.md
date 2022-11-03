---
title: Cloud code testing for Commerce
description:
---

# Code testing

In a Cloud Docker for Commerce development environment, you can use the integrated test suite in each [Cloud Suite for Commerce][] package for Magento code testing. The test suites, which use the [Codeception testing framework for PHP][], provide acceptance tests to validate code intended for contribution to Commerce Cloud package repositories.

Before you run tests, you must prepare your Docker environment and update the test configuration file. (See [Prepare the test environment](#prepare-the-docker-environment-for-testing).)

## Test resources

Use the following table to review the test configuration files and available tests for each package.

| Package                       | Test configuration                                                         | Test folder <br>(`src/Test/Functional/Acceptance`)                 |
| ----------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| magento/ece-tools     | [codeception.dist.yml][magento/ece-tools codeception.dist.yml]     | [Acceptance tests][magento/ece-tools Acceptance tests]     |
| magento/magento-cloud-components | [codeception.dist.yml][magento/magento-cloud-components codeception.dist.yml] | [Acceptance tests][magento/magento-cloud-components Acceptance tests] |
| magento/magento-cloud-docker | [codeception.dist.yml][magento/magento-cloud-docker codeception.dist.yml] | [Acceptance tests][magento/magento-cloud-docker Acceptance tests] |
| magento/magento-cloud-components | [codeception.dist.yml][magento/magento-cloud-patches codeception.dist.yml] | [Acceptance tests][magento/magento-cloud-patches Acceptance tests] |

<InlineAlert variant="info" slots="text"/>

For Magento application testing, use the Magento Application Testing (MFTF) framework to run functional tests. See [Application testing](test-app-mftf.md).

## Prepare the Docker environment for testing

**To set up and configure the test environment**:

1. Clone the GitHub repository for the package to test.

   ```bash
   git clone git@github.com:magento/<cloud-suite-package-repository>.git
   ```

   For example:

   ```bash
   git clone git@github.com:magento/ece-tools.git
   ```

1. Stop all services that use the following ports:

   -  `80`—varnish
   -  `443`—web, tls
   -  `3306`—Apache, mysql

1. Add the following hostname to your `/etc/hosts` file.

   ```conf
   127.0.0.1 magento2.docker
   ```

   Alternatively, you can run the following command to add it to the file:

   ```bash
   echo "127.0.0.1 magento2.docker" | sudo tee -a /etc/hosts
   ```

1. Add required project dependencies if you are testing the following packages.

   -  For the `magento/magento-cloud-patches` package:

      ```bash
      composer require "magento/magento-cloud-docker:^1.0.0" --no-update
      ```

   -  For the `magento/magento-cloud-components` package:

      ```bash
      composer require "magento/magento-cloud-docker:^1.0.0" --no-update
      composer require "magento/framework:*" --no-update
      composer require "magento/module-store:*" --no-update
      composer require "magento/module-url-rewrite:*" --no-update
      ```

1. Switch to the preferred PHP version for running tests.

1. Update the project dependencies.

   ```bash
   composer update
   ```

### Add credentials

Add credentials to your Docker environment using any of the following methods:

- Use environment variables
- Load credentials from the environment configuration file
- Add variables directly to the test configuration file

**To add credentials using environment variables**:

1. Create environment variables for your GitHub authentication keys.

   ```bash
   export REPO_USERNAME=your_public_key
   ```

   ```bash
   export REPO_PASSWORD=your_private_key
   ```

1. Some packages require a GitHub authentication during installation. Create an environment variable with your GitHub token that can be used to install these packages.

   ```bash
   `export GITHUB_TOKEN=your_github_token
   ````

**To load credentials from the environment configuration file**:

1. Run the following commands to write credentials to the `./.env` file.

   ```bash
   echo "REPO_USERNAME=your_public_key" >> ./.env
   ```

   ```bash
   echo "REPO_PASSWORD=your_private_key" >> ./.env
   ```

1. Edit the `codeception.dist.yml` file.

   ```yaml
   params:
       - tests/functional/configuration.dist.yml
       - env
       - .env
   ```

1. Add a dependency for the [vlucas/phpdotenv][] package required to load the environment variables.

   ```bash
   composer require "vlucas/phpdotenv": "^3.0"
   ```

**To add credentials directly to the test configuration file**:

1. Open the `codeception.dist.yml` file in an editor.

1. Replace the `%REPO_USERNAME%`, `%REPO_PASSWORD%`, and `%GITHUB_TOKEN%` placeholder values with your credentials:

   ```yaml
   modules:
     config:
       Magento\CloudDocker\Test\Functional\Codeception\TestInfrastructure:
       ...
       composer_magento_username: "%REPO_USERNAME%"
       composer_magento_password: "%REPO_PASSWORD%"
       composer_github_token: "%GITHUB_TOKEN%"
         ...
   ```

## Run tests

By default, functional tests produce a short output. You can receive more detailed output by editing the `codeception.dist.yml` test configuration file to set the `printOutput:` property to `true`.

```yaml
modules:
  config:
    Magento\CloudDocker\Test\Functional\Codeception\TestInfrastructure:
      ...
      printOutput: true
      ...
    Magento\CloudDocker\Test\Functional\Codeception\Docker:
      ...
      printOutput: true
      ...
```

<InlineAlert variant="info" slots="text"/>

You can locate the test configuration file in the root directory for each package. (See [Test resources](#test-resources)).

### Run a specific test

Use the following command format to run a specific functional test:

```bash
./vendor/bin/codecept run Acceptance <TestName>Cest
```

For example, the following test for `magento/ece-tools` code verifies that the post-deploy task runs successfully.

```bash
./vendor/bin/codecept run Acceptance PostDeployCest
```

**Sample response:**

```terminal
Codeception PHP Testing Framework v2.5.6
Powered by PHPUnit 6.5.14 by Sebastian Bergmann and contributors.
Running with seed:
Acceptance Tests (1) -----------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------
PostDeployCest: Test post deploy | {"ADMIN_EMAIL":"admin@example.com"}
 [Magento\MagentoCloud\Test\Functional\Robo\Tasks\GenerateDockerCompose] Running ./bin/ece-docker build:compose
 --mode=functional --php=7.2
...
...
✔ PostDeployCest: Test post deploy | {"ADMIN_EMAIL":"admin@example.com"} (210.41s)
```

<InlineAlert variant="info" slots="text"/>

You can see the available tests for each package in the package source files. See [Test resources](#test-resources).

### Run all tests

Use the following commands to run all available tests for each PHP version:

-  **PHP 7.1**

   ```bash
   ./vendor/bin/codecept run -g php71 --steps
   ```

-  **PHP 7.2**

   ```bash
   ./vendor/bin/codecept run -g php72 --steps
   ```

-  **PHP 7.3**

   ```bash
   ./vendor/bin/codecept run -g php73 --steps
   ```

-  **PHP 7.4**

   ```bash
   ./vendor/bin/codecept run -g php74 --steps
   ```

   If you are testing `magento/ece-tools` code, use the following command:

   ```bash
   ./vendor/bin/codecept run -x php71 -x php72 -x php73 -x php74 --steps
   ```

<InlineAlert variant="help" slots="text"/>

For help with Codeception command options, use the `.vendor/bin/codecept run --help` command, or see the [Codeception CLI documentation][] for the installed version.

<!--Link definitions-->

[Cloud Suite for Commerce]: https://devdocs.magento.com/cloud/release-notes/cloud-tools.html
[Codeception testing framework for PHP]: https://github.com/codeception/codeception
[magento/ece-tools codeception.dist.yml]: https://github.com/magento/ece-tools/blob/2002.1.11/codeception.dist.yml
[magento/magento-cloud-components codeception.dist.yml]: https://github.com/magento/magento-cloud-components/blob/1.0.11/codeception.dist.yml
[magento/magento-cloud-patches codeception.dist.yml]: https://github.com/magento/magento-cloud-patches/blob/1.0.18/codeception.dist.yml
[magento/magento-cloud-docker codeception.dist.yml]: https://github.com/magento/magento-cloud-docker/blob/develop/codeception.dist.yml
[magento/ece-tools Acceptance tests]: https://github.com/magento/ece-tools/tree/2002.1.11/src/Test/Functional/Acceptance
[magento/magento-cloud-components Acceptance tests]: https://github.com/magento/magento-cloud-components/tree/1.0.11/Test/Functional/Acceptance
[magento/magento-cloud-docker Acceptance tests]: https://github.com/magento/magento-cloud-docker/tree/1.3.2/Test/Functional/Acceptance
[magento/magento-cloud-patches Acceptance tests]: https://github.com/magento/magento-cloud-patches/tree/1.0.18/src/Test/Functional/Acceptance
[vlucas/phpdotenv]: https://github.com/vlucas/phpdotenv
[Codeception CLI documentation]: https://github.com/Codeception/Codeception/blob/2.5/src/Codeception/Command/Run.php
