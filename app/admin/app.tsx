"use client";

import { Admin, DataProvider, Resource, } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { UnitList } from "./unit/list";
import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";

const dataProvider = simpleRestProvider("/api") as DataProvider; // Will break unless you put "as DataProvider" https://github.com/marmelab/react-admin/issues/5476

export const App = () => {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource
                name="courses"
                list={UnitList}
                create={CourseCreate}
                edit={CourseEdit}
                recordRepresentation="title"
            />
            <Resource
                name="units"
                list={UnitList}
                create={CourseCreate}
                edit={CourseEdit}
                recordRepresentation="title"
            />
        </Admin>
    )
};

export default App;