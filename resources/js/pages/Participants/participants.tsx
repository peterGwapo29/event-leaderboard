import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { UserRoundPlus, CheckCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Participants',
        href: '/participants',
    },
    
];

export default function participants() {
    const { flash } = usePage().props as { flash?: { message?: string } };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Participants" />

            <div>
                {flash?.message && (
                        <Alert>
                            <CheckCheck/>
                            <AlertTitle>Heads up!</AlertTitle>
                            <AlertDescription>
                                Student participants is added successfully.
                            </AlertDescription>
                        </Alert>
                )}
            </div>

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <Link href={route('participants.create')}>
                    <Button className='cursor-pointer bg-green-700 text-white hover:bg-green-600'>
                         <UserRoundPlus/>Add Participants
                    </Button>
                </Link>

                
            </div>
        </AppLayout>
    );
}
