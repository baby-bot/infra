import * as github from "@pulumi/github";
import { uiRepo } from ".";

interface Secret {
  name: string;
  value: string;
  description: string;
}

export const buildUiWorkflowSecrets = () => {
  const secrets: Secret[] = [
    {
      name: "APP_STORE_CONNECT_TEAM_ID",
      value: "YOUR_TEAM_ID",
      description:
        "The ID of your App Store Connect team if you’re in multiple teams.",
    },
    {
      name: "DEVELOPER_APP_ID",
      value: "YOUR_APP_ID",
      description:
        "In App Store Connect, go to the app → App Information → Scroll down to the General Information section of your app and look for Apple ID.",
    },
    {
      name: "DEVELOPER_APP_IDENTIFIER",
      value: "",
      description: "Your app’s bundle identifier.",
    },
    {
      name: "DEV_PORTAL_TEAM_ID",
      value: "YOUR_TEAM_ID",
      description:
        "The ID of your Developer Portal team if you’re in multiple teams.",
    },
    {
      name: "FASTLANE_APPLE_ID",
      value: "YOUR_APPLE_ID",
      description: "The Apple ID or developer email you use to manage the app.",
    },
    {
      name: "GIT_USERNAME",
      value: "YOUR_GIT_USERNAME",
      description: "Your git username.",
    },
    {
      name: "MATCH_PASSWORD",
      value: "YOUR_MATCH_PASSWORD",
      description:
        "The passphrase that you assigned when initializing match, will be used for decrypting the certificates and provisioning profile.",
    },
    { name: "GIT_TOKEN", value: "", description: "Your personal access token" },
    {
      name: "PROVISIONING_PROFILE_SPECIFIER",
      value: "YOUR_PROVISIONING_PROFILE_SPECIFIER",
      description: "The provisioning profile specifier for your app.",
    },
    {
      name: "TEMP_KEYCHAIN_USER",
      value: "YOUR_TEMP_KEYCHAIN_USER",
      description:
        "The username for the temporary keychain that will be created.",
    }, // idk if this is created on the fly or ahead of time manually
    {
      name: "TEMP_KEYCHAIN_PASSWORD",
      value: "YOUR_TEMP_KEYCHAIN_PASSWORD",
      description:
        "The password for the temporary keychain that will be created.",
    },
    {
      name: "APPLE_KEY_ID",
      value: "YOUR_APPLE_KEY_ID",
      description: "App Store Connect API Key ID",
    },
    {
      name: "APPLE_ISSUER_ID",
      value: "YOUR_APPLE_ISSUER_ID",
      description: "App Store Connect API Key Issuer ID",
    },
    {
      name: "APPLE_KEY_CONTENT",
      value: "YOUR_APPLE_KEY_CONTENT",
      description: "App Store Connect API Key, Key file or Key content of .p8",
    },
    {
      name: "CERTIFICATE_STORE_URL",
      value: "YOUR_CERTIFICATE_STORE_URL",
      description: "The repo url of your Match keys (ex:",
    },
  ];

  secrets.forEach((secret) => {
    new github.ActionsSecret(secret.name, {
      repository: uiRepo.name,
      secretName: secret.name,
      plaintextValue: secret.value,
    });
  });
};
