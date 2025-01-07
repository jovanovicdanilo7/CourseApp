import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Input } from "../../../../common/Input/Input";
import { Button } from "../../../../common/Button/Button";
import { RootState } from "../../../../store";

import "./SearchBar.css";

interface Course {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
}

interface SearchBarProps {
    onSearchResults: (filteredCourses: Course[]) => void;
}

export function SearchBar({ onSearchResults }: SearchBarProps): JSX.Element {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const courses = useSelector((state: RootState) => state.courses);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
    
        if (value === "") {
            onSearchResults(courses);
        }
    };

    const handleSearch = () => {
        const filteredCourses = courses.filter((course: Course) =>
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
        onSearchResults(filteredCourses);
    };

    return (
        <div className="search-bar">
            <div className="search-bar-input">
                <Input
                    labelText=""
                    placeholderText="Input text"
                    id="search"
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            
            <div className="search-bar-button">
                <Button onClick={handleSearch} buttonText="Search" type="button" />
            </div>
        </div>
    );
}
