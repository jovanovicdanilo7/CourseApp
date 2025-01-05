import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";

import { Button } from "../../common/Button/Button";
import { Input } from "../../common/Input/Input";
import { AuthorItem } from "./components/AuthorItem/AuthorItem";
import { getCouresDuration } from "../../helpers/getCourseDuration";

import "./CourseForm.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { saveAuthor } from "../../store/authors/actions";
import { addCourseThunk, updateCourseThunk } from "../../store/courses/thunk";
import { addAuthorThunk, deleteAuthorThunk } from "../../store/authors/thunk";
import { fetchCourseById } from "../../store/services";

interface CourseFormData {
    title: string;
    description: string;
    duration: number;
    authors: string[];
}

interface Author {
    id: string;
    name: string;
}

export function CreateCourse(): JSX.Element {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [duration, setDuration] = useState<number>(0);
    const [authorName, setAuthorName] = useState<string | null>(null);
    const [courseAuthors, setCourseAuthors] = useState<Author[]>([]);
    const [errorAuthorName, setErrorAuthorName] = useState<string | null>(null);
    const navigate = useNavigate();
    const authorsInStore = useSelector((state: RootState) => state.authors);
    const [authorsList, setAuthorsList] = useState<Author[]>(authorsInStore);
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const { courseId } = useParams();

    useEffect(() => {
        if (courseId) {
            const fetchCourse = async () => {
                const course = await fetchCourseById(courseId);

                if (course) {
                    setValue('title', course.title);
                    setValue('description', course.description);
                    setValue('duration', course.duration);
                    
                    const authorObjects = course.authors.map((authorId: string) => {
                        return authorsInStore.find((author: Author) => author.id === authorId);
                    }).filter((author: Author): author is Author => !!author);
    
                    setCourseAuthors(authorObjects);
                    const filteredAuthors = authorsInStore.filter((author: Author) => {
                        return !authorObjects.some((courseAuthor: Author) => courseAuthor.id === author.id);
                    });

                    setAuthorsList(filteredAuthors);
                    setDuration(course.duration);
                }
            };
            fetchCourse();
        }
    }, [courseId, setValue, dispatch]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const courseData: CourseFormData = {
            title: data.title,
            description: data.description,
            duration: parseInt(data.duration),
            authors: courseAuthors.map((author: Author) => author.id)
        };

        if(courseId) {
            await dispatch(updateCourseThunk(user.token, courseId, courseData));
            setTimeout(() => {
                navigate("/courses");
            }, 0); 
        } else {
            const response = await dispatch(addCourseThunk(user.token, courseData));
    
            courseAuthors.forEach((author: Author) => {
                const authorExists = authorsInStore.some((existingAuthor: Author) => existingAuthor.id === author.id);
        
                if (!authorExists) {
                    dispatch(saveAuthor(author));
                }
            });
            setTimeout(() => {
                navigate("/courses");
            }, 0); 
        }
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setDuration(value);
    };

    const handleAuthorNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorName(e.target.value);
    };

    const addAuthor = async () => {
        const isValidName = /^[a-zA-Z\s]+$/.test(authorName?.trim() || "");

        if(authorName && authorName.trim().length > 2 && isValidName) {
            setErrorAuthorName(null);
            const newAuthor = {
                name: authorName
            };
            const createdAuthor = await dispatch(addAuthorThunk(user.token, newAuthor))
            setAuthorsList([...authorsList, createdAuthor]);
            setAuthorName(null);
        } else {
            setErrorAuthorName("Author name must be longer than 2 text characters");
        }
    };

    const addAuthorToCourse = (authorId: string) => {
        const author = authorsList.find(author => author.id === authorId);
        if (author) {
            setAuthorsList(authorsList.filter(a => a.id !== authorId));
            setCourseAuthors([...courseAuthors, author]);
        }
    };

    const deleteAuthor = async (authorId: string) => {
        const author = authorsList.find(author => author.id === authorId);
        if (author) {
            await dispatch(deleteAuthorThunk(user.token, authorId));
            setAuthorsList(authorsList.filter(a => a.id !== authorId));
        }
    }

    const deleteAuthorFromCourse = (authorId: string) => {
        const author = courseAuthors.find(author => author.id === authorId);
        if (author) {
            setCourseAuthors(courseAuthors.filter(a => a.id !== authorId));
            setAuthorsList([...authorsList, author]);
        }
    };

    return (
        <div className="create-course-container">
            <h3>Course Edit/Create Page</h3>

            <form className="create-course-form" onSubmit={ handleSubmit(onSubmit) }>
                <div className="form-container">
                    <div className="main-info">
                        <p>Main Info</p>
                        <Input
                            labelText="Title"
                            placeholderText="Input text"
                            id="title"
                            type="text"
                            error={errors.title?.message as string | undefined}
                            { ...register("title", {
                                required: "Title is required",
                                minLength: { value: 2, message: `Description must be at least 2 characters long` }
                            }) }
                        />
                        <Input
                            labelText="Description"
                            placeholderText="Input text"
                            id="description"
                            type="text"
                            className="description-input"
                            error={errors.description?.message as string | undefined}
                            { ...register("description", {
                                required: "Description is required",
                                minLength: { value: 2, message: `Description must be at least 2 characters long` }
                            }) }
                        />
                    </div>

                    <div className="duration">
                        <p>Duration</p>
                        <div className="duration-data">
                            <div className="duration-data-input">
                                <Input
                                    labelText="Duration"
                                    placeholderText="Input text"
                                    id="duration"
                                    type="number"
                                    error={errors.duration?.message as string | undefined}
                                    { ...register("duration", {
                                        required: "Duration is required",
                                        min: { value: 1, message: "Duration must be greater than 0" },
                                        validate: value => !isNaN(value) || "Duration must be a number"
                                    }) }
                                    onChange={ handleDurationChange }
                                />
                            </div>
                            <span className="duration-data-span">{ duration > 0 ? getCouresDuration(duration) : "00:00" } hours</span>
                        </div>
                    </div>

                    <div className="authors-container">
                        <div className="authors-row">
                            <div className="authors-form">
                                <div className="authors-list">
                                    <div className="author-create">
                                        <p>Authors</p>
                                        <Input
                                            labelText="Author Name"
                                            placeholderText="Input text"
                                            id="authorName"
                                            type="text"
                                            error={errorAuthorName as string | undefined}
                                            value={authorName || ''}
                                            onChange={ handleAuthorNameInput }
                                        />
                                    </div>
                                    <div className="authors-list-button">
                                        <Button
                                            onClick={ addAuthor }
                                            buttonText="Create author"
                                            type="button"
                                        />
                                    </div>
                                </div>

                                <div className="authors-element-available">
                                    <p>Authors List</p>
                                    {authorsList.length === 0 ? (
                                        <span>No authors available</span>
                                    ) : (
                                        authorsList.map(author => (
                                            <AuthorItem
                                                key={author.id} 
                                                onAdd={() => addAuthorToCourse(author.id)}
                                                onDelete={() => deleteAuthor(author.id)}
                                                authorName={author.name} 
                                            />
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="course-authors">
                                <p>Course Authors</p>
                                {courseAuthors.length === 0 ? (
                                    <span>Author list is empty</span>
                                ) : (
                                    courseAuthors.map(author => (
                                        <AuthorItem
                                            key={author.id} 
                                            onClean={() => deleteAuthorFromCourse(author.id)} 
                                            authorName={author.name} 
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="create-course-form-buttons">
                    <div className="create-course-form-cancel-button">
                        <Button 
                            onClick={ () => navigate("/courses") } 
                            buttonText="Cancel" 
                            type="button"
                        />
                    </div>

                    <div className="create-course-form-create-button">
                        <Button 
                            buttonText={ courseId? "Update" : "Create Course" } 
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
