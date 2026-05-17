import { PublishIssue } from "../../validation/publish/types";


export type PublishSlice = {
    publishIssues: PublishIssue[];
    publishing: boolean;

    validateBeforePublish: () => PublishIssue[];
    publishConfigurator: () => Promise<void>;

    clearPublishIssues: () => void;
};