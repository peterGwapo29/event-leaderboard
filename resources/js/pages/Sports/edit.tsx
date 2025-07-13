import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { TriangleAlert, X } from 'lucide-react';
import React from 'react';

interface Sports {
    id: number;
    name: string;
    instructor: string;
}

interface Props {
    sports: Sports;
    onClose: () => void;
}

export default function edit({ sports, onClose }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        id: sports.id,
        name: sports.name,
        instructor: sports.instructor,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('sports.update', sports.id), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <>
            <Head title="Edit Sports" />

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 dark:bg-gray-800">
                    <strong>{`Update sports: ${sports.name} `}</strong>
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
                            <Label htmlFor="name">Sport name</Label>
                            <Input
                                value={data.name}
                                placeholder="Sport name"
                                onChange={(e) => setData('name', e.target.value)}
                                className="dark:border dark:border-gray-100 dark:shadow-gray-900"
                            />
                        </div>

                        <div>
                            <Label htmlFor="instructor">Assigned Instructor</Label>
                            <Input
                                value={data.instructor}
                                placeholder="Instructor"
                                onChange={(e) => setData('instructor', e.target.value)}
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
