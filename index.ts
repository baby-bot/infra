import * as github from "@pulumi/github";

export const uiRepo = github.getRepositoryOutput({ fullName: "baby-bot/ui" });

import { buildUiWorkflowSecrets } from "./buildSecrets";

buildUiWorkflowSecrets();

// Create a new GitHub Actions secret for a repository
const repoSecret = new github.ActionsSecret("myRepoSecret", {
  repository: "my-repo",
  secretName: "MY_SECRET",
  plaintextValue: "supersecretvalue",
});

// Create a new GitHub Actions environment secret for a repository
const envSecret = new github.ActionsEnvironmentSecret("myEnvSecret", {
  repository: "my-repo",
  environment: "production",
  secretName: "MY_ENV_SECRET",
  plaintextValue: "supersecretvalue",
});

// Create a new GitHub Actions organization secret visible to all repositories
const orgSecret = new github.ActionsOrganizationSecret("myOrgSecret", {
  secretName: "MY_ORG_SECRET",
  plaintextValue: "supersecretvalue",
  visibility: "all", // Can be "all", "private", or "selected"
});

// Add specific repositories to an organization secret (if visibility is set to "selected")
const orgSecretRepos = new github.ActionsOrganizationSecretRepositories(
  "myOrgSecretRepos",
  {
    secretName: orgSecret.secretName,
    selectedRepositoryIds: [123456, 789012], // Replace with actual repository IDs
  }
);

// Create an environment-specific variable for a GitHub Actions workflow
const envVariable = new github.ActionsEnvironmentVariable("myEnvVariable", {
  repository: "my-repo",
  environment: "production",
  variableName: "MY_ENV_VAR",
  value: "envvarvalue",
});

// Create an organization-scoped variable for GitHub Actions workflows
const orgVariable = new github.ActionsOrganizationVariable("myOrgVariable", {
  variableName: "MY_ORG_VAR",
  value: "orgvarvalue",
  visibility: "selected", // Can be "all", "private", or "selected"
  selectedRepositoryIds: [123456, 789012], // Replace with actual repository IDs
});

// Create a repository-scoped variable for GitHub Actions workflows
const repoVariable = new github.ActionsVariable("myRepoVariable", {
  repository: "my-repo",
  variableName: "MY_REPO_VAR",
  value: "repovarvalue",
});

// Register stack outputs
export const repoSecretName = repoSecret.secretName;
export const envSecretName = envSecret.secretName;
export const orgSecretName = orgSecret.secretName;
export const envVariableName = envVariable.variableName;
export const orgVariableName = orgVariable.variableName;
export const repoVariableName = repoVariable.variableName;
