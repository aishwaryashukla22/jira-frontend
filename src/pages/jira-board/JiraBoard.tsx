import { useEffect, useState } from 'react';
import StatusColumns from '../../components/StatusColumn';
import Modal from '../../components/Modal';
import CreateTicketForm from '../../components/CreateTicketForm';
import type { TicketFormData } from '../../components/CreateTicketForm';
import { BASE_URL } from '../../contants';

export default function JiraBoard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tickets, setTickets] = useState([])
    function getTickets() {
        fetch(`${BASE_URL}/api/tickets`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setTickets(data)
            })
            .catch(err => console.error(err))
    }
    useEffect(() => {
        getTickets()
    }, [])
    async function createTicket(data: TicketFormData) {
        const response = await fetch(`${BASE_URL}/api/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }
        getTickets()
        setIsModalOpen(false)
    }
    return (
        <div className='w-full p-10'>
            <div className='text-right m-4'>
                <button className='flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500' onClick={() => setIsModalOpen(true)}>+ Create New Ticket</button>
            </div>
            {tickets && <StatusColumns cards={tickets} onUpdate={getTickets} />}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Ticket">
                <CreateTicketForm onSubmit={createTicket} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    )
}
