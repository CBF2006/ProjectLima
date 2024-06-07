import { getCourses } from "@/db/queries";

const CoursesPage = async () => {
    const data = await getCourses();
    return (
        <div className="h-full max-w-[912 px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Language Courses
            </h1>
            {JSON.stringify(data)}
        </div>
    );
};

export default CoursesPage;