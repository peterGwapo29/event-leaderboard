import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { CalendarPlus2, CircleEllipsis, CheckCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import CreateModal from './create';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Swal from 'sweetalert2';
import EditModal from './edit'

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
    const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);
    const [showNotif, setShowNotif] = useState(true);
    const { processing, delete: destroy } = useForm();
    const [selectedParticipant, setSelectedParticipant] = useState<Events | null>(null);
    const [showModalEdit, setShowModalEdit] = useState(false);

    const handleStatusChange = (eventId: number, newStatus: string) => {
        router.put(
            route('events.changeStatus', eventId),
            {
                status: newStatus,
            },
            {
                preserveScroll: true,
                preserveState: false,
            },
        );
    };

    useEffect(() => {
            if (flash?.message) {
                setShowNotif(true);
                const timeout = setTimeout(() => setShowNotif(false), 3000);
                return () => clearTimeout(timeout);
            }
        }, [flash?.message]);

    const getStatusClass = (status: string) => {
        switch (status.toLowerCase()) {
            case 'upcoming':
                return 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800';
            case 'completed':
                return 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900';
            case 'ongoing':
                return 'bg-green-100 text-green-700 hover:bg-green-300 hover:text-green-900';
        }
    };

    function handleDelete(id: number, name: string) {
            Swal.fire({
                title: 'Are you sure you want to delete?',
                text: `Event: ${name} `,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            }).then((result) => {
    
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: `Event: ${name} has been deleted.`,
                        icon: 'success',
                    });
                    destroy(route('events.destroy', id), {
                        onSuccess: () => {
                            router.visit(route('events.index'), {
                                preserveScroll: true,
                                preserveState: false,
                            });
                        },
                    });
                }
            });
        }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events" />

            <div className="notification-bar">
                {flash?.message && showNotif && (
                    <div className="notification-bar">
                        <Alert>
                            <CheckCheck className="icon-notif" />
                            <AlertTitle>Heads up!</AlertTitle>
                            <AlertDescription>{flash.message}</AlertDescription>
                        </Alert>
                    </div>
                )}
            </div>

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

                    {showModalEdit && selectedParticipant && (
                    <EditModal
                        events={selectedParticipant}
                        onClose={() => {
                            setSelectedParticipant(null);
                            setShowModalEdit(false);
                        }}
                    />
                )}
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
                                        <TableCell className='max-w-0 truncate'>{key.description}</TableCell>
                                        <TableCell>{key.category}</TableCell>
                                        <TableCell className="text-center">
                                            <Popover
                                                open={openPopoverId === key.id}
                                                onOpenChange={(open) => {
                                                    setOpenPopoverId(open ? key.id : null);
                                                }}
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button className={`cursor-pointer w-32 h-10 justify-between ${getStatusClass(key.status)}`}>
                                                        {key.status} <CircleEllipsis className="ml-2" />
                                                    </Button>
                                                </PopoverTrigger>

                                                <PopoverContent className="w-40 p-2 text-sm">
                                                    <div className="flex flex-col gap-2">
                                                        {['Ongoing', 'Upcoming', 'Completed'].map((status) => (
                                                            <Button
                                                                key={status}
                                                                variant="ghost"
                                                                className={getStatusClass(status)}
                                                                onClick={() => {
                                                                    if (status === key.status) {
                                                                        setOpenPopoverId(null);
                                                                        return;
                                                                    }
                                                                    handleStatusChange(key.id, status);
                                                                    setOpenPopoverId(null);
                                                                }}
                                                            >
                                                                {status}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>

                                        <TableCell className="flex flex-row justify-center gap-2 text-center">
                                            <Button
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
                                                onClick={() => handleDelete(key.id, key.name)}
                                                className="cursor-pointer bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:text-white dark:hover:bg-red-600"
                                            >
                                                Delete
                                            </Button>
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
