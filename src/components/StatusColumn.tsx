import { ReactNode, useState } from 'react';
import { DragEndEvent } from '@dnd-kit/react';
import TicketCard from './TicketCard';
import { DragDropProvider, Droppable } from './Drag&Drop';
import { Ticket } from '../mock-data/Cards';

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
}

export default function StatusColumns({ cards }: StatusColumnsProps) {
    function handleDragEnd(event: DragEndEvent) {
        // if (event.canceled) return;
        // const { source, target } = event.operation;
        // if (!source || !target) return;
        // setTickets(prev =>
        //     prev.map(ticket =>
        //         ticket.id === String(source.id)
        //             ? { ...ticket, ticketStatus: String(target.id) }
        //             : ticket
        //     )
        // );
    }
    const columns = groupBy(cards, 'status');

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>
            <div className='min-w-full flex flex-row gap-x-8 justify-center'>
                {[...columns.keys()].map(columnName => (
                    <StatusColumn
                        key={columnName}
                        id={columnName}
                        title={<span>{columnName}</span>}
                        content={columns.get(columnName)!.map(tkt => (
                            <TicketCard
                                key={tkt.id}
                                id={tkt.id}
                                title={tkt.title}
                                storyPoints={tkt.storyPoints}
                                profilePicUrl={tkt.assignee.avatar}
                                type={'STORY'}
                            />
                        ))}
                    />
                ))}
            </div>
        </DragDropProvider>
    );
}
