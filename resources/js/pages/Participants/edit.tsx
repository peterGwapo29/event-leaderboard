import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import { TriangleAlert, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Participants {
    student_id: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    course: string;
    year_level: number;
}

interface Props {
  participants: Participants;
  onClose: () => void;
}

export default function edit( { participants, onClose }: Props) {
    
    const {data, setData, put, processing, errors} = useForm({
        student_id: participants.student_id,
        first_name: participants.first_name,
        last_name: participants.last_name,
        middle_name: participants.middle_name,
        course: participants.course,
        year_level: participants.year_level,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('participants.update', participants.student_id), {
        preserveScroll: true,
        onSuccess: () => {
            onClose();
        },
        });
    };
    
    return (
        <>
            <Head title="Edit Participant" />

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 dark:bg-gray-800">
                    <strong>{`Update participant: ${participants.first_name} ${participants.middle_name} ${participants.last_name}`}</strong>
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
                            <Label htmlFor="student_id">Student ID</Label>
                            <Input
                                value={data.student_id}
                                placeholder="Student ID"
                                onChange={(e) => setData('student_id', e.target.value)}
                                className="no-spinner"
                            />
                        </div>

                        <div className="flex flex-col gap-4 md:flex-row md:gap-5">
                            <div className="flex-1">
                                <Label htmlFor="first_name">Firstname</Label>
                                <Input value={data.first_name} placeholder="Firstname" onChange={(e) => setData('first_name', e.target.value)} />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="last_name">Lastname</Label>
                                <Input value={data.last_name} placeholder="Lastname" onChange={(e) => setData('last_name', e.target.value)} />
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="middle_name">Middlename</Label>
                                <Input value={data.middle_name} placeholder="Middlename" onChange={(e) => setData('middle_name', e.target.value)} />
                            </div>
                        </div>

                        <div className='flex flex-col w-full gap-2'>
                            <div className='flex flex-col'>
                                <Label htmlFor="course">Course</Label>
                                <select value={data.course} onChange={(e) => setData('course', e.target.value)} className="form-select border border-gray-200 shadow-xs rounded-md w-full p-2">
                                    <option value="" hidden>
                                        Select Course
                                    </option>
                                    <option value="BSIT">BSIT</option>
                                    <option value="BSBA">BSBA</option>
                                    <option value="BSA">BSA</option>
                                    <option value="BTLED">BTLED</option>
                                </select>
                            </div>

                             <div className='flex flex-col'>
                                <Label htmlFor="year_level">Year Level</Label>
                                <select value={data.year_level} onChange={(e) => setData('year_level', Number(e.target.value))} className="form-select border border-gray-200 shadow-xs rounded-md w-full p-2">
                                    <option value="" hidden>
                                        Select Year Level
                                    </option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
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
