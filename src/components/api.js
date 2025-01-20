const url = "https://api-backend-3-7wnp.onrender.com/data";

async function getData() {
    let res = await fetch(url);
    let data = await res.json();
    return data; // Return the fetched data
}

export default getData;
