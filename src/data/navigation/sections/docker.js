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
    ],
  },
  {
    title: "Configure",
    path: "/docker/configure/configuration-sources/",
  },
  {
    title: "Test",
    path: "/docker/test/",
  },
  {
    title: "Upgrade",
    path: "/docker/upgrade-docker-package",
  },
];