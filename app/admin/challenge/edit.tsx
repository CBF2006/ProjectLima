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
                        {
                            id: "LISTEN_SELECT",
                            name: "LISTEN_SELECT",
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
                <TextInput 
                source="audioSrc" 
                label="Audio Src" 
                />
            </SimpleForm>
        </Edit>
    );
};

// TextField is ONLY for REPRESENTATION. Use TextInput for inputting text