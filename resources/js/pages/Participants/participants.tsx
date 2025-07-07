import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CheckCheck, UserRoundPlus } from 'lucide-react';
import Swal from 'sweetalert2'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Participants',
        href: '/participants',
    },
];

interface Participants {
    student_id: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    course: string;
    year_level: number;
}

interface PageProps {
    flash?: {
        message?: string;
    };
    participants: Participants[];
    [key: string]: unknown;
}

export default function participants() {
    const { flash, participants } = usePage<PageProps>().props;
    const { processing, delete: destroy } = useForm();

    function handleDelete(student_id: string, first_name: string, last_name: string, middle_name: string) {
        Swal.fire({
          title: "Are you sure you want to delete?",
          text: `Participants: ${first_name} ${last_name}, ${middle_name} `,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: `Participants ${student_id} ${first_name} ${last_name}, ${middle_name} has been deleted.`,
              icon: "success"
            });
            destroy(route('participants.destroy', student_id));
          }
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Participants" />

            <div>
                {flash?.message && (
                    <Alert>
                        <CheckCheck />
                        <AlertTitle>Heads up!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}
            </div>

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link href={route('participants.create')}>
                    <Button className="cursor-pointer bg-green-700 text-white hover:bg-green-600">
                        <UserRoundPlus />
                        Add Participants
                    </Button>
                </Link>

                <div>
                    {participants.length > 0 && (
                        <Table>
                            <TableCaption>A list of your recent invoices.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Student ID</TableHead>
                                    <TableHead>Firstname</TableHead>
                                    <TableHead>Lastname</TableHead>
                                    <TableHead>Middlename</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Year Level</TableHead>
                                    <TableHead className="text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {participants.map((key) => (
                                    <TableRow key={key.student_id}>
                                        <TableCell className="font-medium">{key.student_id}</TableCell>
                                        <TableCell>{key.first_name}</TableCell>
                                        <TableCell>{key.last_name}</TableCell>
                                        <TableCell>{key.middle_name}</TableCell>
                                        <TableCell>{key.course}</TableCell>
                                        <TableCell>{key.year_level}</TableCell>
                                        <TableCell className="flex flex-row justify-center gap-2 text-center">
                                            <Button className="cursor-pointer bg-blue-500 hover:bg-blue-400 dark:text-white">Edit</Button>
                                            <Button disabled={processing} onClick={() => handleDelete(key.student_id, key.first_name, key.last_name, key.middle_name)} className="cursor-pointer bg-red-600 hover:bg-red-500 dark:text-white">
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
