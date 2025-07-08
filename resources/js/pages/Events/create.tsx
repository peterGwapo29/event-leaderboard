import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { TriangleAlert, X } from 'lucide-react';
import React from 'react';

interface Props {
    onClose: () => void;
}

export default function create({ onClose }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        category: '',
        status: 'Ongoing',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('events.store'), {
            onSuccess: () => {
                setData({
                    name: '',
                    description: '',
                    category: '',
                    status: 'Ongoing',
                });
                onClose();
            },
            preserveScroll: true,
            preserveState: false,
        });
    };

    return (
        <>
            <Head title="Create Participant" />

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-red-400 dark:hover:text-red-600"
                    >
                        <X />
                    </button>

                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
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
                            <Input value={data.name} placeholder="Event name" onChange={(e) => setData('name', e.target.value)} />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input value={data.description} placeholder="Description" onChange={(e) => setData('description', e.target.value)} />
                        </div>

                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Input value={data.category} placeholder="Category" onChange={(e) => setData('category', e.target.value)} />
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
