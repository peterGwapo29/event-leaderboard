import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import { TriangleAlert, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Events {
    id: number;
    name: string;
    description: string;
    category: string;
    status: string;
}

interface Props {
  events: Events;
  onClose: () => void;
}

export default function edit( { events, onClose }: Props) {
    
    const {data, setData, put, processing, errors} = useForm({
        id: events.id,
        name: events.name,
        description: events.description,
        category: events.category,
        status: events.status,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('events.update', events.id), {
        preserveScroll: true,
        preserveState: false,
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
                    <button onClick={onClose} className="close-modal-edit absolute cursor-pointer top-3 right-3 text-gray-500 hover:text-red-400 dark:hover:text-red-600">
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
                            <Label htmlFor="id">Event ID</Label>
                            <Input
                                value={data.id}
                                placeholder="Event ID"
                                onChange={(e) => setData('id', Number(e.target.value))}
                                className="no-spinner"
                            />
                        </div>

                        <div className="flex flex-col gap-4 md:flex-row md:gap-5">
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
                        </div>

                        <Button 
                            disabled={processing} 
                            type="submit" className="w-full bg-green-800 font-normal text-white cursor-pointer hover:bg-green-700"
                            >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );

}
