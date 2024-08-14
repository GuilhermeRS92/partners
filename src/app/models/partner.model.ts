export interface Partner {
    createdAt: Date; 
    name: string;
    description: string;
    repositoryGit: string;
    urlDoc: string;
    clients: (number | string)[];
    projects: (number | string)[];
    id: string;
}
