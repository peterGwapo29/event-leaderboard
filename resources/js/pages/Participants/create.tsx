import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import { TriangleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Participants',
        href: '/participants/create',
    },
    
];

export default function create() {
    
    const {data, setData, post, processing, errors} = useForm({
        student_id: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        course: '',
        year_level: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        post(route('participants.store'), {
            onSuccess: () => {
                setData({
                        student_id: '',
                        first_name: '',
                        last_name: '',
                        middle_name: '',
                        course: '',
                        year_level: '',
                });
            }
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Participant" />
            <div className="w-8/15 p-4">
                <form onSubmit={handleSubmit} className='space-y-4'>

                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <TriangleAlert className='icon'/>
                            <AlertTitle>Errors!</AlertTitle>
                            <AlertDescription>
                                {Object.entries(errors).map(([key, message]) => (
                                    <ul>
                                        <li key={key}>{message as string}</li>
                                    </ul>
                                ))}
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className=''>
                        <Label htmlFor='student_id'>Student ID</Label>
                        <Input value={data.student_id} placeholder='Student ID' onChange={ (e) => setData('student_id', e.target.value)} className='no-spinner'></Input>
                    </div>
                    <div className='flex flex-row gap-5'>
                        <div>
                            <Label htmlFor='firstname'>Firstname</Label>
                            <Input value={data.first_name} placeholder='Firstname' onChange={ (e) => setData('first_name', e.target.value)}></Input>
                        </div>

                        <div className=''>
                            <Label htmlFor='lastname'>Lastname</Label>
                            <Input value={data.last_name} placeholder='Lastname' onChange={ (e) => setData('last_name', e.target.value)}></Input>
                        </div>

                        <div className=''>
                            <Label htmlFor='middlename'>Middlename</Label>
                            <Input value={data.middle_name} placeholder='Middlename' onChange={ (e) => setData('middle_name', e.target.value)}></Input>
                        </div>
                    </div>
                    
                    <div className=''>
                        <Label htmlFor='course'>Course</Label>
                        <select value={data.course} onChange={(e) => setData('course', e.target.value)} className='border-input file:text-foreground placeholder:text-muted-foreground flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'>
                            <option hidden defaultValue='' value="" className='text-white bg-gray-800'>Select Course</option>
                            <option value="BSIT" className='text-white bg-gray-800'>BSIT</option>
                            <option value="BSBA" className='text-white bg-gray-800'>BSBA</option>
                            <option value="BSA" className='text-white bg-gray-800'>BSA</option>
                            <option value="BTLED" className='text-white bg-gray-800'>BTLED</option>
                        </select>
                    </div>

                    <div className=''>
                        <Label htmlFor='year_level'>Year Level</Label>
                        <select value={data.year_level} onChange={(e) => setData('year_level', e.target.value)} className='border-input file:text-foreground placeholder:text-muted-foreground flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'>
                            <option hidden defaultValue='' value="" className='text-white bg-gray-800'>Select Year Level</option>
                            <option value="1" className='text-white bg-gray-800'>1</option>
                            <option value="2" className='text-white bg-gray-800'>2</option>
                            <option value="3" className='text-white bg-gray-800'>3</option>
                            <option value="4" className='text-white bg-gray-800'>4</option>
                        </select>
                    </div>

                    <Button className='w-full bg-green-800 text-white font-normal hover:bg-green-700 cursor-pointer'>Submit</Button>
                </form>
            </div>
        </AppLayout>
    );
}
