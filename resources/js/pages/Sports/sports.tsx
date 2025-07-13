import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { CheckCheck, UserRoundPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import CreateModal from './create';
import EditModal from './edit';
import Swal from 'sweetalert2';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sports',
        href: '/sports',
    },
];

interface Sports {
    id: number;
    name: string;
    instructor: string;
}

interface PageProps {
    flash?: {
        message?: string;
    };
    sports: Sports[];
    [key: string]: unknown;
}

export default function Dashboard() {
    const { flash, sports } = usePage<PageProps>().props;
    const [showModal, setShowModal] = useState(false);
    const [showNotif, setShowNotif] = useState(true);
    const [selectedParticipant, setSelectedParticipant] = useState<Sports | null>(null);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const { processing, delete: destroy } = useForm();

    useEffect(() => {
        if (flash?.message) {
            setShowNotif(true);
            const timeout = setTimeout(() => setShowNotif(false), 3000);
            return () => clearTimeout(timeout);
        }
    }, [flash?.message]);

    function handleDelete(id: number, name: string, instructor: string) {
                Swal.fire({
                    title: 'Are you sure you want to delete?',
                    text: `Sports: ${name} `,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                }).then((result) => {
        
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: `Sports: ${name} has been deleted.`,
                            icon: 'success',
                        });
                        destroy(route('sports.destroy', id), {
                            onSuccess: () => {
                                router.visit(route('sports.index'), {
                                    preserveScroll: true,
                                });
                            },
                        });
                    }
                });
            }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sports" />

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
                        <UserRoundPlus />
                        Add Sport
                    </Button>

                    {showModalEdit && selectedParticipant && (
                        <EditModal
                            sports={selectedParticipant}
                            onClose={() => {
                                setSelectedParticipant(null);
                                setShowModalEdit(false);
                            }}
                        />
                    )}
                </div>

                <div>
                    {sports.length == 0
                        ? 'No list of sports'
                        : sports.length > 0 && (
                              <Table>
                                  <TableHeader>
                                      <TableRow>
                                          <TableHead className="w-[100px]">Sport ID</TableHead>
                                          <TableHead>Sport name</TableHead>
                                          <TableHead>Instructor</TableHead>
                                          <TableHead className="text-center">Action</TableHead>
                                      </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                      {sports.map((key) => (
                                          <TableRow key={key.id}>
                                              <TableCell className="font-medium">{key.id}</TableCell>
                                              <TableCell>{key.name}</TableCell>
                                              <TableCell>{key.instructor}</TableCell>
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
                                                      onClick={() => handleDelete(key.id, key.name, key.instructor)}
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
