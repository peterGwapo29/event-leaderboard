import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { TriangleAlert, X } from 'lucide-react';
import React from 'react';

interface Events {
    id: number;
    name: string;
    description: string;
    category: string;
    start_time: string;
    end_time: string;
    status: string;
}

interface Props {
    events: Events;
    onClose: () => void;
}

export default function edit({ events, onClose }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        id: events.id,
        name: events.name,
        description: events.description,
        category: events.category,
        start_time: events.start_time,
        end_time: events.end_time,
        status: events.status,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('events.update', events.id), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <>
            <Head title="Edit Events" />

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 dark:bg-gray-800">
                    <strong>{`Update Events: ${events.id} ${events.name}`}</strong>
                    <button
                        onClick={onClose}
                        className="close-modal-edit absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-red-400 dark:hover:text-red-600"
                    >
                        <X />
                    </button>

                    <form onSubmit={handleUpdate} className="mt-4 space-y-4 text-start">
                        {Object.keys(errors).length > 0 && (
                            <Alert>
                                <TriangleAlert className="icon" />
                                <AlertTitle>Errors!</AlertTitle>
                                <AlertDescription>
                                    <ul className="list-disc pl-5">
                                        {Object.entries(errors).map(([key, message]) => (
                                            <li key={key}>{message as string}</li>
                                        ))}
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        )}

                        <div>
                            <Label htmlFor="name">Event name</Label>
                            <Input
                                value={data.name}
                                placeholder="Event name"
                                onChange={(e) => setData('name', e.target.value)}
                                className="dark:border dark:border-gray-100 dark:shadow-gray-900"
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input
                                value={data.description}
                                placeholder="Description"
                                onChange={(e) => setData('description', e.target.value)}
                                className="dark:border dark:border-gray-100 dark:shadow-gray-900"
                            />
                        </div>

                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Input
                                value={data.category}
                                placeholder="Category"
                                onChange={(e) => setData('category', e.target.value)}
                                className="dark:border dark:border-gray-100 dark:shadow-gray-900"
                            />
                        </div>

                        <div>
                            <Label htmlFor="start_time">Start Time</Label>
                            <Input
                                type="datetime-local"
                                value={data.start_time}
                                placeholder="Start Time"
                                onChange={(e) => setData('start_time', e.target.value)}
                                className="dark:border dark:border-gray-100 dark:shadow-gray-900"
                            />
                        </div>
                        <div>
                            <Label htmlFor="end_time">End Time</Label>
                            <Input
                                type="datetime-local"
                                value={data.end_time}
                                placeholder="End Time"
                                onChange={(e) => setData('end_time', e.target.value)}
                                className="dark:border dark:border-gray-100 dark:shadow-gray-900"
                            />
                        </div>

                        <Button
                            disabled={processing}
                            type="submit"
                            className="w-full cursor-pointer bg-green-800 font-normal text-white hover:bg-green-700"
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
