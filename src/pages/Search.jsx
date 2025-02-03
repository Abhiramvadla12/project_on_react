
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Category } from "../utils/Data";
import { Link } from "react-router-dom";
import { DefaultCard } from "../components/DefaultCard";
import getData from "../components/api";
import styled from "styled-components";
import PodcastCard from "../components/PodcastCard";
import { useState,useEffect } from "react";
const SearchMain = styled.div`
    padding: 20px 30px;
    padding-bottom: 200px;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;

    @media (max-width: 768px) {
        padding: 20px 9px;
    }
`;

const SearchBar = styled.div`
    max-width: 700px;
    display: flex;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.text_secondary};
    border-radius: 30px;
    cursor: pointer;
    padding: 12px 16px;
    justify-content: flex-start;
    align-items: center;
    gap: 6px;
    color: ${({ theme }) => theme.text_secondary};
    position: relative;

    @media (max-width: 768px) {
        max-width: 100%;
        padding: 10px;
    }
`;

const SuggestionBox = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.bg};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    margin-top: 5px;
    z-index: 1000;
`;

const SuggestionItem = styled.div`
    padding: 10px 15px;
    cursor: pointer;
    font-size: 14px;
    color: ${({ theme }) => theme.text_secondary};

    &:hover {
        background-color: ${({ theme }) => theme.hover};
    }
`;

const Catagories = styled.div`
    margin: 20px 10px;
`;

const Heading = styled.div`
    align-items: flex-start;
    color: ${({ theme }) => theme.text_primary};
    font-size: 22px;
    font-weight: 540;
    margin: 10px 14px;
`;

const BrowseAll = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 14px;
`;

const Loader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`;

const Spinner = styled.div`
    --d: 22px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    color: #25b09b;
    box-shadow: 
        calc(1 * var(--d)) calc(0 * var(--d)) 0 0,
        calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 1px,
        calc(0 * var(--d)) calc(1 * var(--d)) 0 2px,
        calc(-0.707 * var(--d)) calc(0.707 * var(--d)) 0 3px,
        calc(-1 * var(--d)) calc(0 * var(--d)) 0 4px,
        calc(-0.707 * var(--d)) calc(-0.707 * var(--d)) 0 5px,
        calc(0 * var(--d)) calc(-1 * var(--d)) 0 6px;
    animation: l27 1s infinite steps(8);

    @keyframes l27 {
        100% {
            transform: rotate(1turn);
        }
    }
`;

const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.bg};
    border-radius: 10px;
    padding: 20px 30px;
`;

const Podcasts = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 10px;
    gap: 14px;
    padding: 18px 6px;
    @media (max-width: 550px) {
        justify-content: center;
        grid-template-columns: repeat(1, 1fr);
    }
`;

const Search = ({ isFavorite, onFavorite, isLogined, darkMode }) => {
    const [searched, setSearched] = useState("");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestion ,setShowSuggestion] = useState(true);
    const handleChange = (e) => {
        setSearched(e.target.value);
        setShowSuggestion(true)
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getData(); // Call your getData function
                setData(result); // Update state with the fetched data
            } catch (err) {
                setError(err.message); // Handle and display errors
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (searched === "") {
            setSuggestions([]);
        } else {
            const filteredSuggestions = data.filter((element) =>
                element.files.some((item) =>
                    item.title.toLowerCase().includes(searched.toLowerCase()) ||
                    item.description.toLowerCase().includes(searched.toLowerCase()) ||
                    item.creatorName.toLowerCase().includes(searched.toLowerCase())
                )
            );
            setSuggestions(filteredSuggestions);
        }
    }, [searched, data]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setShowSuggestion(false)
        }
    };
    if (loading) {
        return (
            <Loader>
                <Spinner />
            </Loader>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <SearchMain>
            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <SearchBar>
                    <SearchOutlinedIcon style={{ color: "inherit" }} />
                    <input
                        type="text"
                        placeholder="Search artist/Podcasts"
                        aria-label="Search for podcasts or artists"
                        style={{
                            border: "none",
                            outline: "none",
                            width: "100%",
                            backgroundColor: "inherit",
                            padding: "4px 8px",
                            fontSize: "14px",
                            color: darkMode ? "white" : "blue",
                        }}
                        value={searched}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} // Handle Enter key
                    />
                       {suggestions.length > 0 && (
                        showSuggestion &&
                        (<SuggestionBox>
                            {suggestions.map((item, index) =>
                                item.files.map((file, fileIndex) => (
                                    <SuggestionItem
                                        key={`${index}-${fileIndex}`}
                                        onClick={() => setSearched(file.title)}
                                    >
                                        {file.title}
                                    </SuggestionItem>
                                ))
                            )}
                        </SuggestionBox>)
                    )}
                </SearchBar>
            </div>

            {searched === "" ? (
                <Catagories>
                    <Heading>Browse all</Heading>
                    <BrowseAll>
                        {Category.map((element, index) => (
                            <Link to={`/displaypodcast/${element.name.toLowerCase()}`} style={{ textDecoration: "none" }} key={index}>
                                <DefaultCard category={element} />
                            </Link>
                        ))}
                    </BrowseAll>
                </Catagories>
            ) : (
                <div>
                    <FilterContainer>
                        <Podcasts>
                            <PodcastCard
                                apiData={suggestions}
                                type={"all"}
                                onFavorite={onFavorite}
                                isLogined={isLogined}
                                isFavorite={isFavorite}
                            />
                        </Podcasts>
                    </FilterContainer>
                </div>
            )}
        </SearchMain>
    );
};

export default Search;
