import ProfilePic from './ProfilePic';
import { Draggable } from './Drag&Drop';

export interface TicketCardProps {
    title: string;
    id: string;
    description: string;
    storyPoints: number;
    profilePicUrl: string;
    type: string;
    onClick?: () => void;
}

export default function TicketCard({ title, id, storyPoints, profilePicUrl, type, onClick }: TicketCardProps) {
    return (
        <Draggable id={id}>
            <div className="relative w-full max-lg:row-start-1 cursor-pointer" onClick={onClick}>
                <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl"></div>
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                    <div className="px-2 pt-2 sm:px-2 sm:pt-2">
                        <p className="mt-2 text-sm font-medium tracking-tight text-gray-950 max-lg:text-center">{title}</p>
                    </div>
                    <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                        <p className="w-full mt-2 max-w-lg text-sm/6 text-gray-600 justify-around">{id}</p>
                        <ProfilePic url={profilePicUrl} />
                    </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl"></div>
            </div>
        </Draggable>
    );
}
