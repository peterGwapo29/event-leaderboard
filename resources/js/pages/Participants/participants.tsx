import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { UserRoundPlus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Participants',
        href: '/participants',
    },
    
];

export default function participants() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Participants" />
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
