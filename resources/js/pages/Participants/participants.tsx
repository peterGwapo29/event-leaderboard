import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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
                <h1>Participants</h1>
            </div>
        </AppLayout>
    );
}
