import { useState } from "react";

export interface TicketFormData {
    title: string;
    description: string;
    status: string;
    story_points: number;
    assignee_id: string;
}

interface CreateTicketFormProps {
    onSubmit: (data: TicketFormData) => void;
    onCancel: () => void;
}

const STATUS_OPTIONS = ["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"];

export default function CreateTicketForm({ onSubmit, onCancel }: CreateTicketFormProps) {
    const [form, setForm] = useState<TicketFormData>({
        title: "",
        description: "",
        status: "TODO",
        story_points: 1,
        assignee_id: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === "story_points" ? Number(value) : value,
        }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Title</label>
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {STATUS_OPTIONS.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1 w-24">
                    <label className="text-sm font-medium text-gray-700">Story Points</label>
                    <input
                        name="story_points"
                        type="number"
                        min={1}
                        max={13}
                        value={form.story_points}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Assignee ID</label>
                <input
                    name="assignee_id"
                    value={form.assignee_id}
                    onChange={handleChange}
                    placeholder="e.g. USR-101"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="flex justify-end gap-3 mt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
                >
                    Create
                </button>
            </div>
        </form>
    );
}
