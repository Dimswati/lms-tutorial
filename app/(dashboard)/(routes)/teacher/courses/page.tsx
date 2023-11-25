import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'

type Props = {}

const CoursesPage = (props: Props) => {
    return (
        <div className='p-6'>
            <Link href="/teacher/create">
                <Button className=''>
                    New Course
                </Button>
            </Link>
        </div>
    )
}

export default CoursesPage