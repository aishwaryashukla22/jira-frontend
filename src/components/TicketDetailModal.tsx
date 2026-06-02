import { useEffect, useState } from "react";
import Modal from "./Modal";
import ProfilePic from "./ProfilePic";
import type { TicketCardProps } from "./TicketCard";
import { BASE_URL } from "../contants";

interface Comment {
    id: string;
    author: string;
    body: string;
    created_at: string;
}

type TicketDetailModalProps = Omit<TicketCardProps, "onClick"> & {
    isOpen: boolean;
    onClose: () => void;
};

export default function TicketDetailModal({ isOpen, onClose, id, title, description, storyPoints, profilePicUrl, type }: TicketDetailModalProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        setLoading(true);
        fetch(`${BASE_URL}/api/tickets/${id}/comments`)
            .then(res => res.json())
            .then(data => setComments(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [isOpen, id]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="font-mono">{id}</span>
                    <span className="rounded-full bg-indigo-100 text-indigo-700 px-2 py-0.5 text-xs font-medium">{type}</span>
                </div>

                {description && (
                    <p className="text-sm text-gray-700">{description}</p>
                )}

                <div className="flex items-center gap-3 text-sm text-gray-600">
                    <ProfilePic url={profilePicUrl} />
                    <span>{storyPoints} story {storyPoints === 1 ? "point" : "points"}</span>
                </div>

                <hr className="border-gray-200" />

                <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">Comments</h3>
                    {loading ? (
                        <p className="text-sm text-gray-400">Loading comments...</p>
                    ) : comments.length === 0 ? (
                        <p className="text-sm text-gray-400">No comments yet.</p>
                    ) : (
                        <ul className="flex flex-col gap-3">
                            {comments.map(comment => (
                                <li key={comment.id} className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-gray-700">{comment.author}</span>
                                        <span className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{comment.body}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </Modal>
    );
}
