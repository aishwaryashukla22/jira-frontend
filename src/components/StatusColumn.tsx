import { ReactNode, useState } from 'react';
import { DragEndEvent } from '@dnd-kit/react';
import TicketCard from './TicketCard';
import TicketDetailModal from './TicketDetailModal';
import { DragDropProvider, Droppable } from './Drag&Drop';
import { Ticket } from '../mock-data/Cards';
import { BASE_URL } from '../contants';

function groupBy<T>(arr: T[], key: keyof T & string): Map<string, T[]> {
    const dict = new Map<string, T[]>();
    arr.forEach((item) => {
        const val = item[key] as string;
        dict.set(val, [...(dict.get(val) || []), item]);
    });
    return dict;
}

interface StatusColumnProps {
    id: string;
    title: ReactNode;
    content: ReactNode;
}

function StatusColumn({ id, title, content }: StatusColumnProps) {
    return (
        <Droppable id={id}>
            <div className='border rounded-md border-gray-600 min-h-full bg-gray-300 p-4'>
                <div className='ahqt ahri ahrt ahsb ahsp ahsv ahtd ahtf ahtj ahud ahuk'>
                    {title}
                </div>
                <div className='flex flex-col gap-y-4'>
                    {content}
                </div>
            </div>
        </Droppable>
    );
}

interface StatusColumnsProps {
    cards: Ticket[];
    onUpdate: () => void;
}
interface UpdatesInterface {
    status: string
}
export default function StatusColumns({ cards, onUpdate }: StatusColumnsProps) {
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const updateTicket = async ({ ticketId, updates }: { ticketId: string, updates: Partial<UpdatesInterface> }) => {
        const response = await fetch(`${BASE_URL}/api/tickets/${ticketId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }

        return response.json()
    }
    async function handleDragEnd(event: DragEndEvent) {
        if (event.canceled) return;
        const { source, target } = event.operation;
        if (!source || !target) return;
        await updateTicket({ ticketId: String(source.id), updates: { status: String(target.id) } });
        onUpdate();
    }
    const columns = groupBy(cards, 'status');
    const COLUMN_ORDER = ['TODO', 'IN PROGRESS', 'IN REVIEW', 'DONE'];

    return (
        <>
            <DragDropProvider onDragEnd={handleDragEnd}>
                <div className='min-w-full flex flex-row gap-x-8 justify-center'>
                    {COLUMN_ORDER.filter(col => columns.has(col)).map(columnName => (
                        <StatusColumn
                            key={columnName}
                            id={columnName}
                            title={<span>{columnName}</span>}
                            content={columns.get(columnName)!.map(tkt => (
                                <TicketCard
                                    key={tkt.id}
                                    id={tkt.id}
                                    title={tkt.title}
                                    description={tkt.description}
                                    storyPoints={tkt.storyPoints}
                                    profilePicUrl={tkt.assignee.avatar}
                                    type={'STORY'}
                                    onClick={() => setSelectedTicket(tkt)}
                                />
                            ))}
                        />
                    ))}
                </div>
            </DragDropProvider>

            {selectedTicket && (
                <TicketDetailModal
                    isOpen={!!selectedTicket}
                    onClose={() => setSelectedTicket(null)}
                    id={selectedTicket.id}
                    title={selectedTicket.title}
                    description={selectedTicket.description}
                    storyPoints={selectedTicket.storyPoints}
                    profilePicUrl={selectedTicket.assignee.avatar}
                    type={'STORY'}
                />
            )}
        </>
    );
}
