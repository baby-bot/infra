import { getRepositoryOutput } from "@pulumi/github";

export const UI_REPO = getRepositoryOutput({ fullName: "baby-bot/ui" });
