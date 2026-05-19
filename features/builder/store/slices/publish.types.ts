import { PublishIssue } from "../../validation/publish/types";


export type PublishSlice = {
    publishIssues: PublishIssue[];
    publishing: boolean;
    publishModalOpen: boolean;

    validateBeforePublish: () => PublishIssue[];
    publishConfigurator: () => void;
    executePublish: () => Promise<void>;

    clearPublishIssues: () => void;
    setPublishModalOpen: (open: boolean) => void;
};