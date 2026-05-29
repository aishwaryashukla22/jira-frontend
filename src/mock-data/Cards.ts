export interface Assignee {
    id: string;
    name: string;
    avatar: string;
}

export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: string;
    storyPoints: number;
    assignee: Assignee;
}

