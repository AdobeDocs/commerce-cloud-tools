module.exports = [
  {
    title: "Introduction",
    path: "/docker/",
  },
  {
    title: "Architecture",
    path: "/docker/containers/",
    pages: [
      {
        title: "CLI containers",
        path: "/docker/containers/cli/",
      },
      {
        title: "Service containers",
        path: "/docker/containers/service/",
      },
    ],
  },
  {
    title: "Setup",
    path: "/docker/setup/",
    pages: [
      {
        title: "Initialize Docker",
        path: "/docker/setup/initialize-docker/",
      },
      {
        title: "File synchronization",
        path: "/docker/setup/synchronize-data/",
      },
    ],
  },
  {
    title: "Deploy",
    path: "/docker/deploy/",
    pages: [
      {
        title: "Production mode",
        path: "/docker/deploy/production-mode/",
      },
      {
        title: "Developer mode",
        path: "/docker/deploy/developer-mode/",
      },
      {
        title: "Docker quick reference",
        path: "/docker/quick-reference/",
      },
    ],
  },
  {
    title: "Configure",
    path: "/docker/configure/",
    pages: [
      {
        title: "Configuration sources",
        path: "/docker/configure/configuration-sources/",
      },
      {
        title: "Manage the database",
        path: "/docker/configure/manage-database/",
      },
      {
        title: "Manage the cron jobs",
        path: "/docker/configure/manage-cron-jobs/",
      },
      {
        title: "Multiple sites",
        path: "/docker/configure/multiple-sites/",
      },
      {
        title: "Custom Docker configuration",
        path: "/docker/configure/custom-docker-compose/",
      },
      {
        title: "Extend Docker",
        path: "/docker/configure/extend-docker-configuration/",
      },
    ],
  },
  {
    title: "Test",
    path: "/docker/test/",
    pages: [
      {
        title: "Application testing",
        path: "/docker/test/application-testing/",
      },
      {
        title: "Code testing",
        path: "/docker/test/code-testing/",
      },
      {
        title: "Configure Xdebug",
        path: "/docker/test/configure-xdebug/",
      },
      {
        title: "Add Blackfire.io",
       path: "/docker/configure/multiple-sites/",
      },
    ],
  },
  {
    title: "Upgrade",
    path: "/docker/upgrade-docker-package",
  },
];