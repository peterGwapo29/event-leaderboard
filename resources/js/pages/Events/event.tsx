import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { CalendarPlus2, CircleEllipsis } from 'lucide-react';
import { useState } from 'react';
import CreateModal from './create';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Events',
        href: '/events',
    },
];

interface Events {
    id: number;
    name: string;
    description: string;
    category: string;
    status: string;
}

interface PageProps {
    flash?: {
        message?: string;
    };
    events: Events[];
    [key: string]: unknown;
}

export default function event() {
    const [showModal, setShowModal] = useState(false);
    const { flash, events } = usePage<PageProps>().props;

    const handleStatusChange = (eventId: number, newStatus: string) => {
        router.put(
            route('events.changeStatus', eventId),
            {
                status: newStatus,
            },
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    {showModal && <CreateModal onClose={() => setShowModal(false)} />}
                    <Button
                        onClick={() => {
                            setShowModal(true);
                        }}
                        className="cursor-pointer bg-green-700 text-white hover:bg-green-600"
                    >
                        <CalendarPlus2 />
                        Add Event
                    </Button>

                    {/* {showModalEdit && selectedParticipant && (
                    <EditModal
                        events={selectedParticipant}
                        onClose={() => {
                            setSelectedParticipant(null);
                            setShowModalEdit(false);
                        }}
                    />
                )} */}
                </div>

                <div>
                    {events.length > 0 && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Event ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {events.map((key) => (
                                    <TableRow key={key.id}>
                                        <TableCell className="font-medium">{key.id}</TableCell>
                                        <TableCell className="font-medium">{key.name}</TableCell>
                                        <TableCell>{key.description}</TableCell>
                                        <TableCell>{key.category}</TableCell>
                                        <TableCell className="text-center">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button className="cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800">
                                                        {key.status} <CircleEllipsis className="ml-2" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-40 p-2 text-sm">
                                                    <div className="flex flex-col gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            className="cursor-pointer justify-start"
                                                            onClick={() => handleStatusChange(key.id, 'Upcoming')}
                                                        >
                                                            Upcoming
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            className="cursor-pointer justify-start"
                                                            onClick={() => handleStatusChange(key.id, 'Completed')}
                                                        >
                                                            Completed
                                                        </Button>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>

                                        <TableCell className="flex flex-row justify-center gap-2 text-center">
                                            {/* <Button
                                                className="cursor-pointer bg-blue-500 hover:bg-blue-400 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600"
                                                disabled={processing}
                                                onClick={() => {
                                                    setSelectedParticipant(key);
                                                    setShowModalEdit(true);
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                disabled={processing}
                                                onClick={() => handleDelete(key.student_id, key.first_name, key.last_name, key.middle_name)}
                                                className="cursor-pointer bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:text-white dark:hover:bg-red-600"
                                            >
                                                Delete
                                            </Button> */}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
