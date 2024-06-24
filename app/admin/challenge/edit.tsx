import { SimpleForm, Edit, TextInput, required, ReferenceInput, NumberInput, SelectInput } from "react-admin";

export const ChallengeEdit = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput 
                source="question" 
                validate={[required()]}
                label="Question" 
                />
                <SelectInput 
                    source="type"
                    choices={[
                        {
                            id: "SELECT",
                            name: "SELECT",
                        },
                        {
                            id: "ASSIST",
                            name: "ASSIST",
                        },
                    ]}
                    validate={[required()]}
                /> {/*You can add more options in the array*/}
                <ReferenceInput 
                    source="lessonId"
                    reference="lessons"
                />
                <NumberInput 
                    source="order"
                    validate={[required()]}
                    label="Order"
                />
            </SimpleForm>
        </Edit>
    );
};

// TextField is ONLY for REPRESENTATION. Use TextInput for inputting text